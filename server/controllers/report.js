const Report = require("../models/Report")
const Event = require("../models/Event")
const { NotFound, BadRequest} = require("../errors/index")
const {StatusCodes} = require("http-status-codes")
const getAll = async (req, res) => {
  const { sort, arrange, page, limit, eventId, state } = req.query
  const sortData = {
    [sort || "createdAt"]: arrange || "desc",
  };
  const filter = {};
  if (eventId) {
    filter["event"] = eventId
  }
  if (state) {
    filter["state"] = state
  }
  // console.log(sortData)
  const currentLimit = Number(limit) || 5;
   const currentPage = Number(page) || 1;
   const skip = (currentPage - 1) * currentLimit;
   const reports = await Report.find(filter).sort(sortData).skip(skip).limit(currentLimit);
  const count = await Report.find(filter).count()
  const pages = Math.ceil(count / currentLimit);
    if (!reports) {
        throw new NotFound("Reports not found")
    }
    res.status(StatusCodes.OK).json({ msg: "All reports", reports, pages:{currentPage, pages} })
}

const getOne = async (req, res) => {
  const { reportId } = req.params
  const report = await Report.find({_id:reportId});
  if (!report) {
    throw new NotFound("Report not found");
  }
  res.status(StatusCodes.OK).json({ msg: "Report found", report });
};

const createOne= async (req, res) => {
  const { description, state, currentTime} = req.body
  const { eventId } = req.params
  const event = await Event.findOne({ _id: eventId })
  const diff = new Date(currentTime) - new Date(event.validity)
  if(diff <= 0){
        throw new BadRequest("Event has not yet occurred")
  }
  if (!description || !state) {
    throw new BadRequest("Please provide description and state of event");
  }
  if (!event) {
    throw new BadRequest("Event doesn't exist")
  }
  const data = await Report.findOne({ event: eventId })
  if (data) {
    throw new BadRequest(
      "Event already has a Record"
    );
  }
  const report = await Report.create({description, state, event:eventId});
  if (!report) { 
    throw new NotFound("Report not created");
  }
  res.status(StatusCodes.CREATED).json({ msg: "Report created", report });
};

const updateOne = async (req, res) => {
    const { reportId } = req.params;
  const { description, state } = req.body;
  const report = await Report.findByIdAndUpdate(reportId, {description, state}, {new:true, runValidators:true});
  if (!report) {
    throw new NotFound("Report not found");
  }
  res.status(StatusCodes.OK).json({ msg: "Report updated", report });
};

const deleteOne = async (req, res) => {
  const { reportId } = req.params;
const report = await Report.findOneAndDelete({ _id: reportId });
if (!report) {
  throw new NotFound("Report not found");
}
res.status(StatusCodes.OK).json({ msg: "Report deleted"});
};

module.exports = {updateOne, createOne, getAll, getOne,deleteOne}
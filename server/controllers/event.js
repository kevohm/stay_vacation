const Event = require("../models/Event")
const Report = require("../models/Report")
const { NotFound, NotAuthorized, BadRequest } = require("../errors/index")
const { StatusCodes } = require("http-status-codes")
const checkValidity = (obj) => {
  for (const [key, value] of Object.entries(obj)) {
    if (!Array.isArray(value)) {
      throw new BadRequest(`${key} must be an Array`);
    }
    if (value.length <= 0) {
      throw new BadRequest(`Please provide at least one ${key}`);
    }
    if (key == "Price_choices") {
      for (let i in value) {
        if (!(typeof i !== "object")) {
          throw new BadRequest(`${key} must be an Array of objects`);
        }
       }
    } else {
      for (let i in value) {
        if (typeof i !== "string") {
          throw new BadRequest(`${key} must be an Array of strings`);
        }
      }
    }
  }
  
}
const createEvent = async (req, res) => {
  const {
    country,
    category,
    city,
    description,
    image,
    name,
    price_choices,
    validity,
    createdAt
  } = req.body;
  if (
    (!category || !city || !country || !description || !image || !name || !price_choices || !validity || !createdAt)
  ) {
    throw new BadRequest(
      "please provide city, country, image, name, price_choices, image, createdAt and description"
    );
  }
  checkValidity({
    Category: category,
    Image: image,
    Price_choices: price_choices,
  });
  const body = {
    country,
    city,
    description,
    image,
    name,
    category,
    price_choices,
    validity,
    createdAt,
    updatedAt: createdAt,
  };
    const event = await Event.create(body); 
    if (!event) {
        throw  new BadRequest("Failed to create Event")
    }
    res.status(StatusCodes.CREATED).json({ msg: "New Event created" });
}
const getSingleEvent = async (req, res) => {
    const { eventId } = req.params
    const event = await Event.findOne({ _id: eventId })
    if (!event) {
        throw new NotFound("Event not found")
    }
    res.status(StatusCodes.OK).json({ msg:"Event found", event });
}
const getEvents = async (req, res) => {
  const { sort, arrange, page, limit, category, price_start, price_end, validity} = req.query
  const sortData = {
    [sort || "createdAt"]: arrange || "desc",
  };
  const currentPage = Number(page) || 1
  const currentLimit = Number(limit) || 5;
  const skip = (currentPage - 1) * currentLimit;
  let filter = {}
  if (category) {
    filter["category"] = category
  }
  if (price_start && price_end) {
    const price = { $gte: Number(price_start), $lte: Number(price_end) };
    filter["price_choices.price"] = price
  }
  if(validity){
    filter['validity'] = {$lte:validity}
  }
  
  const events = await Event.find(filter).sort(sortData)
    .skip(skip)
    .limit(currentLimit);
  const count = await Event.find(filter).count();
  const pages = Math.ceil(count / currentLimit)
    res
      .status(StatusCodes.OK)
      .json({ msg: "All Event found", events, pages: { currentPage, pages } });
}
const deleteEvent = async (req, res) => {
    const { eventId } = req.params;
    const event = await Event.findOneAndDelete({ _id: eventId });
    if (!event) {
      throw new NotFound("Event not found");
    }
    res.status(StatusCodes.OK).json({ msg: "Event deleted"});
}
const updateEvent = async (req, res) => {
    const {
      country,
      city,
      description,
      image,
      name,
      category,
      price_choices,
      validity,
      updatedAt
    } = req.body;
  const { eventId } = req.params;
  if (!updatedAt) {
    throw new BadRequest("Please provide date of update");
  }
    const event = await Event.findOneAndUpdate(
      { _id: eventId },
      {
        country,
        city,
        description,
        image,
        name,
        category,
        price_choices,
        validity,
        updatedAt,
      },
      {
        runValidators: true,
        new: true,
      }
    );
    if (!event) {
      throw new NotFound("Event not found");
    }
    res.status(StatusCodes.OK).json({ msg: "Event updated"});
}

module.exports = {
  createEvent,
  getSingleEvent,
  getEvents,
  deleteEvent,
  updateEvent,
};
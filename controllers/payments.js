const Payment = require("../models/Payments")
const Event = require("../models/Event")
const User = require("../models/User");
const Mpesa = require("../utils/PayMpesa")

const { NotFound, NotAuthorized, BadRequest } = require("../errors/index")
const {StatusCodes} = require("http-status-codes")
const getAll = async (req, res) => {
  const {
    userId,
    eventId,
    sort,
    arrange,
    page,
    limit,
    category,
    price_start,
    price_end
  } = req.query;
  const sortData = {
    [sort || "createdAt"]: arrange || "desc",
  }
  const filter = {}
  const currentLimit = Number(limit) || 5
  const currentPage = Number(page) || 1
  const skip = (currentPage - 1) * currentLimit
  if (userId) {
    filter["user"] = userId
  }
  if (eventId) {
    filter["event"] = eventId;
  }
  if (category) {
    filter["category"] = category;
  }
  if (price_start && price_end) {
    const price = { $gte: Number(price_start), $lte: Number(price_end) };
    filter["amount"] = price;
  }
    const payments = await Payment.find(filter)
      .sort(sortData)
      .skip(skip)
    .limit(currentLimit);
  const count = await Payment.find(filter).count()
  const pages = Math.ceil(count / currentLimit)
    if (!payments) {
        throw new NotFound("Payments not found")
    }
    res.status(StatusCodes.OK).json({ msg: "All Payments", payments, pages:{currentPage, pages}});
}

const getPaymentResponse = async(req,res)=>{
  const {paymentId, current} = req.body
  const filter = {_id:paymentId}
    const payment = await Payment.findOne(filter)
    if (!payment) {
        throw new NotFound("Payments not found")
    }
    if(!current){
      throw new NotFound("Current time required")
    }
    if(!payment.requestId){
      throw new BadRequest("invalid details provided")
    }
    const {ResultCode} = await Mpesa.stkQuery(payment.requestId)
    if(ResultCode !== "0"){
      if(new Date(current) - new Date(payment.createdAt) > 15 * 60 * 1000){
        await Payment.findOneAndUpdate(filter,{state:"Failed"},{runValidators:true})
      }
      res.status(StatusCodes.OK).json({ msg: "Payment pending", status:false})
    }else{
      await Payment.findOneAndUpdate(filter,{state:"Paid"},{runValidators:true})
      res.status(StatusCodes.OK).json({ msg: "Payment found", status:true});
    }
}

const getOne = async (req, res) => {
    const {paymentId} = req.params
  const payment = await Payment.findOne({ _id: paymentId });
  if (!payment) {
    throw new NotFound("Payments not found");
  }
  res.status(StatusCodes.OK).json({ msg: "Payment found", payment });
};
const updateOne = async (req, res) => {
    const { paymentId } = req.params;
    const {updatedAt} = req.body
    const payment = await Payment.findOne({ _id: paymentId });
    if(!updatedAt){
      throw new BadRequest("update time required")
    }
    if (!payment) {
      throw new NotFound("Payment not found");
  }
  const diffAt = new Date(updatedAt) - new Date(payment.createdAt)
  if(diffAt < 0){
    throw new BadRequest("invalid updatedAt time");
  }
  const {state, amount, category, currency} = req.body
    const data = await Payment.findByIdAndUpdate(
      payment._id,
      { state, amount, currency, category,updatedAt },
      {
        runValidators: true,
        new: true,
      }
    );
     if (!data) {
       throw new BadRequest("Payment not updated");
     }
     res.status(StatusCodes.OK).json({ msg: "Payment updated", payment:data });
}

const deleteOne = async (req, res) => {
  const { paymentId } = req.params;
  const payment = await Payment.findOne({ _id: paymentId });
  if (!payment) {
    throw new NotFound("Payment not found");
}
  const data = await Payment.findByIdAndDelete(payment._id);
   if (!data) {
     throw new BadRequest("Payment not deleted");
   }
   res.status(StatusCodes.OK).json({ msg: "Payment deleted"});
}

const addUser = async (req, res) => {
  const { eventId} = req.params;
  const { userId } = req.pay;
  const {currentTime} = req.body
  const { data, currency } = req.query;
  const category = data || "Person";
  const event = await Event.findOne({ _id: eventId });
  const user = await User.findOne({ _id: userId });
  if (!user || !event) {
    throw new BadRequest("Invalid details provided");
  }
  if(!currentTime){
    throw new BadRequest("currentTime must be provided");
  }
  // check if event is yet to occurr 24hrs before it
  const diff = new Date(event.validity) - new Date(currentTime) -  (24 * 60 * 60 * 1000)
  if(diff < 0){
        throw new BadRequest("Events can only be paid for 24hrs before")
  }
  const amount = await event.price_choices.find(
    (item) => category === item.category
  );
  if (!amount) {
    throw new BadRequest("Invalid event category provided");
  }
  //make payments
  const paid = await Payment.findOne({ event: eventId, user: userId });
  if(paid && paid.state === "Pending"){
    throw new BadRequest("Wait for payment to be processed");
  }
  if(paid && paid.state === "Paid"){
    throw new BadRequest("Already booked");
  }

  const phone = Number(user.phone_number.slice(1))
  const currentAmount = 1
  const {CheckoutRequestID} = await Mpesa.stkPush(phone,currentAmount)
  const current = await Payment.create({
    event: event._id,
    user: user._id,
    amount: amount.price,
    category,
    currency,
    requestId:CheckoutRequestID,
    createdAt:currentTime,
    updatedAt:currentTime
  });
  if (!current) {
    throw new BadRequest("Unable to Book Event");
  }
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "User booked Event", payment: current });
};
//admin
const removeUser = async (req, res) => {
  const { eventId, userId } = req.params;
  const paid = await Payment.findOne({ event: eventId, user: userId });
  if (!paid) {
    throw new NotFound("Event not booked by user provided");
  }
  const { _id } = paid; 
  const resp = await Payment.findByIdAndDelete(_id);
  if (!resp) {
    throw new BadRequest("Unable to unbook this event");
  }
  res.status(StatusCodes.OK).json({ msg: "Event was unbooked" });
};
module.exports = { getAll, getOne, updateOne, addUser, removeUser,deleteOne,getPaymentResponse };
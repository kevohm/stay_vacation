const Event = require("../models/Event")
const Like = require("../models/Like")
const Dislike = require("../models/Dislike")
const Category = require("../models/Category")
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
    createdAt,
    Amenities
  } = req.body;
  if (
    (!category || !city || !country || !Amenities || !description || !image || !name || !price_choices || !validity || !createdAt)
  ) {
    throw new BadRequest(
      "please provide city, country, image, name, price_choices, image, createdAt and description"
    );
  }
  checkValidity({
    Category: category,
    Image: image,
    Price_choices: price_choices,
    Amenities
  });
  
  const body = {
    country,
    city,
    description,
    image,
    name:name.toLowerCase(),
    category,
    price_choices,
    validity,
    createdAt,
    Amenities,
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
  const { sort, arrange, page, limit, category, price_start, price_end, date, validity, expiry, name, search,categories,eventId} = req.query
  const sortData = {
    [sort || "createdAt"]: arrange || "desc",
  };
  const currentPage = Number(page) || 1
  const currentLimit = Number(limit) || 5;
  const skip = (currentPage - 1) * currentLimit;
  let filter = {}
  if (category) {
    const categoryFound = await Category.findOne({name:category})
    if(!categoryFound){
      throw new BadRequest("category does not exist yet")
    }
    const categoryData = { $in: [categoryFound._id.toString()] }
    filter["category"] = categoryData
  }

  if(categories){
    const categoryData = { $in: categories.split(",") }
    filter["category"] = categoryData
  }
  if (price_start && price_end) {
    const price = { $gte: Number(price_start), $lte: Number(price_end) };
    filter["price_choices.price"] = price
  }
  if(expiry){
    const valid = (validity === "lte")?{$lte:expiry}:{$gte:expiry}
    filter['validity'] = valid
  }
  if(date){
    filter['validity'] = {$gte:date}
  }
  if(expiry && date){
    const valid = (validity === "lte")?{$lte:expiry}:{$gte:expiry}
    const actual = (validity === "lte")?{$gte:date}:{$lte:date}
    filter['validity'] = {...valid,...actual}
  }
  if(name){
    filter['name'] = name
  }
  if(eventId){
    filter["_id"] = { $nin: [ eventId ] }
  }
  if(search){
    const data = [ 
      {description : { $regex: search, $options: 'i' }}, 
    { name: { $regex: search, $options: 'i' }},
    { city: { $regex: search, $options: 'i' } } ]
    filter["$or"]= data
  }
  const events = await Event.find(filter).sort(sortData)
    .skip(skip)
    .limit(currentLimit)
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
      updatedAt,
      Amenities
    } = req.body;
  const { eventId } = req.params;
  if (!updatedAt) {
    throw new BadRequest("Please provide date of update");
  }
  const oldEvent = await Event.findOne({_id:eventId})
  if(!oldEvent){
    throw new BadRequest("invalid event");
  }
  //prevent updating with a date before event was created
  const diffAt = new Date(updatedAt) - new Date(oldEvent.createdAt)
  if(diffAt < 0){
    throw new BadRequest("invalid updatedAt time");
  }
  //prevent updating expired events
  const diff = new Date(updatedAt) - new Date(oldEvent.validity) - 24 * 60 * 60 * 1000
  if(diff > 0){
    throw new BadRequest("Cannot update an event 24 hours before it happens");
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
      Amenities
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

const likeEvent = async (req,res)=>{
  const {eventId} = req.params
  const {userId} = req.user
  const event = await Event.findOne({_id:eventId})
  if(!event){
    throw new NotFound("Event not found")
  }
  const dislike = await Dislike.findOne({event:eventId,user:userId})
  if(dislike){
    await Dislike.findOneAndDelete(dislike._id)
    if(event.dislike > 0){
      await Event.findByIdAndUpdate(eventId,{
        dislike:event.dislike - 1,
      },{
        runValidators: true,
        new: true,
      })
    }
  }
  const like = await Like.findOne({event:eventId,user:userId})
  if(like){
    throw new BadRequest("Already liked event")
  }
  await Like.create({event:eventId,user:userId})
  const newEvent = await Event.findByIdAndUpdate(eventId,{
    like:event.like + 1
  },{
    runValidators: true,
    new: true,
  })
  res.status(StatusCodes.OK).json({msg:"Event liked", event:newEvent})
}
const removeLike = async (req,res)=>{
  const {eventId} = req.params
  const {userId} = req.user
  const event = await Event.findOne({_id:eventId})
  if(!event){
    throw new NotFound("Event not found")
  }
  const like = await Like.findOne({event:eventId,user:userId})
  if(!like){
    throw new BadRequest("Event not liked")
  }
  await Like.findOneAndDelete({_id:like._id})
  await Event.findByIdAndUpdate(eventId,{like:event.like - 1},{runValidators:true,new:true})
  res.status(StatusCodes.OK).json({msg:"Event unliked"})
}

const removeDislike = async (req,res)=>{
  const {eventId} = req.params
  const {userId} = req.user
  const event = await Event.findOne({_id:eventId})
  if(!event){
    throw new NotFound("Event not found")
  }
  const dislike = await Dislike.findOne({event:eventId,user:userId})
  if(!dislike){
    throw new BadRequest("Event not disliked")
  }
  await Dislike.findOneAndDelete({_id:dislike._id})
  await Event.findByIdAndUpdate(eventId,{dislike:event.dislike - 1},{runValidators:true,new:true})
  res.status(StatusCodes.OK).json({msg:"Event undisliked"})
}

const dislikeEvent = async (req,res)=>{
  const {eventId} = req.params
  const {userId} = req.user

  const event = await Event.findOne({_id:eventId})
  if(!event){
    throw new NotFound("Event not found")
  }
  const like = await Like.findOne({event:eventId,user:userId})
  if(like){
    await Like.findOneAndDelete({_id:like._id})
    if(event.like > 0){
      await Event.findByIdAndUpdate(eventId,{like:event.like - 1},{runValidators:true,new:true})
    }
  }
  const dislike = await Dislike.findOne({event:eventId,user:userId})
  if(dislike){
    throw new BadRequest("Already disliked event")
  }
  await Dislike.create({event:eventId,user:userId})
  const newEvent = await Event.findByIdAndUpdate(eventId,{dislike:event.dislike + 1},{runValidators:true,new:true})
  res.status(StatusCodes.OK).json({msg:"Event disiked", event:newEvent})
}

const getCurrentReaction = async(req,res)=>{
  const {userId} = req.user
  const {eventId} = req.params
  const reaction = {}
  const like = await Like.findOne({event:eventId,user:userId})
  const dislike = await Dislike.findOne({event:eventId,user:userId})
  reaction["like"] = (like)?true:false
  reaction["dislike"] = (dislike)?true:false
  res.status(StatusCodes.OK).json({msg:"User reactions found", reaction})
}

module.exports = {
  createEvent,
  getSingleEvent,
  getEvents,
  deleteEvent,
  updateEvent,
  dislikeEvent,
  likeEvent,
  getCurrentReaction,
  removeLike,
  removeDislike
};
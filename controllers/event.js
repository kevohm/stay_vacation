const Event = require("../models/Event")
const Report = require("../models/Report")
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
  const { sort, arrange, page, limit, category, price_start, price_end, valid, name, search,invalid,categories,eventId} = req.query
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
  if(invalid){
      filter['validity'] = {$lte:invalid}
  }
  if(valid){
    filter['validity'] = {$gte:valid}
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

module.exports = {
  createEvent,
  getSingleEvent,
  getEvents,
  deleteEvent,
  updateEvent,
};
const mongoose = require("mongoose")
const Report = require("./Report")
const Comment = require("./Comments")
const Payments = require("./Payments")
const customError = require("../utils/mongoose")
const {BadRequest} = require("../errors/index")
const Event = new mongoose.Schema({
  name: {
    type: String,
    match: [/^([a-zA-Z\s]+)$/, "Name must be alphabets only"],
    required: [true, "Please provide name"],
    minLength: [3, "Name length must be at least 3"],
    maxLength: [40, "Name length must be at most 40"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Please provide description"],
    minLength: [300, "Description length must be at least 300"],
    maxLength: [1000, "Description length must be at most 1000"],
  },
  image: {
    type: [String],
    validate: {
      validator: function (v) {
        return v instanceof Array || v == null || v.length > 0;
      },
      message: "Please provide at least 1 image",
    },
    required: [true, "Please provide image"],
  },
  country: {
    type: String,
    required: [true, "Please provide country"],
    minLength: [3, "Country length must be at least 3"],
    maxLength: [100, "Country length must be at most 100"],
    match: [/^([a-zA-Z\s]+)$/, "Country must be alphabets only"],
  },
  city: {
    type: String,
    required: [true, "Please provide city"],
    minLength: [3, "City length must be at least 3"],
    maxLength: [100, "City length must be at most 100"],
    match: [/^([a-zA-Z\s]+)$/, "City must be alphabets only"],
  },
  price_choices: [
    {
      category: {
        type: String,
        required: [true, "Please provide category for each price"],
        default: "Person",
      },
      price: {
        type: Number,
        required: [true, "Please provide price"],
        match: [/^([0-9]+)$/, "Price must be numbers only no commas"],
      },
    },
  ], 
  category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category', autopopulate:true}],
  Amenities:{
    type: [String],
    required: [true, "Please provide Amenities"],
  },
  like:{
    type:Number,
    default:0
  },
  dislike:{
    type:Number,
    default:0
  },
  validity: {
    type: Date,
    required: [true, "Please provide validity of Event"],
  },
  createdAt: {
    type: Date,
    required: [true, "Please provide date created"],
  },
  updatedAt: {
      type: Date,
      required:[true, "Please provide date updated"]
    }
});
Event.plugin(customError)
Event.plugin(require("mongoose-autopopulate"));
Event.post("findOneAndDelete", async function (doc) {
  const event = doc._id;
  const comment = await Comment.deleteMany({ event });
  const report = await Report.deleteMany({ event });
  const payment = await Payments.deleteMany({ event });
  if (!report || !payment || !comment) {
    throw new BadRequest("Error in removing dependencies")
  }
})

module.exports = mongoose.model("Event", Event)
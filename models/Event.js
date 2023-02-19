const mongoose = require("mongoose")
const Report = require("./Report")
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
    minLength: [3, "Description length must be at least 3"],
    maxLength: [400, "Description length must be at most 40"],
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
    maxLength: [100, "Country length must be at most 40"],
    match: [/^([a-zA-Z\s]+)$/, "Country must be alphabets only"],
  },
  city: {
    type: String,
    required: [true, "Please provide city"],
    minLength: [3, "City length must be at least 3"],
    maxLength: [100, "City length must be at most 40"],
    match: [/^([a-zA-Z\s]+)$/, "City must be alphabets only"],
  },
  max_people: {
    type: Number,
    match: [/^([0-9]+)$/, "Max people must be numbers only"],
    required: [true, "Please provide max people"],
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
  category: {
    type: [String],
    validate: {
      validator: function (v) {
        return v == null || v.length > 0;
      },
      message: "Please provide at least one  Category",
    },
    required: [true, "Please provide Category"],
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

Event.post("findOneAndDelete", async function (doc) {
  const event = doc._id;
  const report = await Report.deleteMany({ event });
  const payment = await Payments.deleteMany({ event });
  if (!report || !payment) {
    throw new BadRequest("Error in removing dependencies")
  }
})
// Event.post("findOneAndUpdate", async function (doc) {
//   const { price_choices } = this._update["$set"];
//   const current = doc.price_choices
//   const missing = []
//   if (price_choices) {
//     await Promise.all(current.forEach(async (item) => {
//       const {category, price} = item
//       const data = price_choices.find((item) => {item.category === category})
//       if (!data) {
//         await Payments.deleteMany({event: doc._id})
//       }
//     }));
//   }
    
// })

module.exports = mongoose.model("Event", Event)
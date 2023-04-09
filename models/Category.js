const mongoose = require("mongoose")
const Event = require("./Event")
const Category = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide description"],
    minLength: [3, "Description length must be at least 3"],
    maxLength: [400, "Description length must be at most 400"],
    unique: [true,"category already exists"]
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

Category.post("findOneAndDelete",async function(doc){
    const id = doc._id
    await Event.updateMany(
        { category:{$in:[id.toString()]} },
        { $pull: { 'category': id.toString() } },
        {runValidators:true,new:true}
      )
})
Category.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Category", Category)
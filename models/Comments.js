const mongoose = require("mongoose")
const Comment = new mongoose.Schema({
  description: {
    type: String,
    required: [true, "Please provide description"],
    minLength: [3, "Description length must be at least 3"],
    maxLength: [400, "Description length must be at most 400"],
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    autopopulate: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    autopopulate: { select: "-password" },
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

Comment.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Comment", Comment)
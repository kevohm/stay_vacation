const mongoose = require("mongoose")

const Report = mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, "Please provide a vivid description of the event"],
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      autopopulate: true,
    },
    state: {
      type:String,
      enum: {
        values: ["Success", "Fail"],
        message:"{VALUE} not supported"
      },
      required:[true, "Please provide event's status"]
    }
  },
  { timestamps: true }
);
Report.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Report", Report)
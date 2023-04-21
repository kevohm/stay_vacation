const mongoose = require("mongoose")

const Payments = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      autopopulate: { select: "-password" },
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      autopopulate: true,
    },
    state: {
      type: String,
      enum: {
        values: ["Paid", "Pending","Failed"],
        message: "{VALUE} is not supported",
      },
      default: "Pending",
    },
    amount: {
      type: Number,
      required: [true, "Please provide amount"],
    },
    category: {
      type: String,
      required: [true, "Please provide category"],
    },
    currency: {
      type: String,
      enum: {
        values: ["ksh", "USD"],
        message: "{VALUE} is not supported",
      },
      default: "ksh",
    },requestId:{
      type:String,
      required: [true, "Please provide requestId"],
    },
    createdAt: {
      type: Date,
      required: [true, "Please provide date created"],
    },
    updatedAt: {
        type: Date,
        required:[true, "Please provide date updated"]
      }
  }
);
Payments.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Payment", Payments)
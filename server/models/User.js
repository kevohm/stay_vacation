const mongoose = require("mongoose")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Report = require("./Report")
const Payments = require("./Payments")
const validator = require("validator")

const UserSchema = new mongoose.Schema({
  phone_number: {
    type: String,
    required: [true, "Please provide Phone Number"],
    minLength: [13, "Phone Number length must be at least 13"],
    match: [/^([0-9+]+)$/, "Phone Number must be numbers only including +"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Please provide name"],
    minLength: [3, "Username length must be at least 3"],
    maxLength: [40, "Username length must be at most 40"],
    match: [
      /^([a-zA-Z0-9\s\u0600-\u06FF\u0660-\u0669\u06F0-\u06F9 _.-]+)$/,
      "Username must be letters and numbers only",
    ],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minLength: [6, "Password length must be at least 6"],
  },

  role: {
    //115115 member
    //116116 admin
    type: String,
    enum: {
      values: ["115115", "116116"],
      message: "{VALUE} is not supported",
    },
    required: [true, "Please provide role"],
    default: "115115",
  },
  createdAt: {
    type: Date,
    required: [true, "Please provide createdAt"],
  },
  updatedAt: {
    type: Date,
    required: [true, "Please provide updatedAt"],
  },
});
 
UserSchema.post("findOneAndDelete", async function (doc) {
  const user = doc._id;
  const report = await Report.deleteMany({ user });
  const payment = await Payments.deleteMany({ user });
  if (!report || !payment) {
    throw new BadRequest("Error in removing dependencies");
  }
});
UserSchema.pre(
  "save",
  async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next()
  }
)
UserSchema.methods.createJWT = function () {
  return jwt.sign({userId:this._id,role:this.role,username:this.username},process.env.JWT_SECRET, {expiresIn:process.env.JWT_LIFETIME})
}
UserSchema.methods.comparePass = async function (pass) {
  const match = await bcrypt.compare(pass, this.password);
  return match
}

module.exports = mongoose.model("User", UserSchema)
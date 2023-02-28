const User = require("../models/User")
const { NotFound,BadRequest, NotAuthorized } = require("../errors/index");
const { StatusCodes } = require("http-status-codes");
const cookieSet = require("../utils/cookie")

const register = async (req, res) => {
  console.log(req.body)
  const { email, password, username, phone_number, createdAt } = req.body;
  if (!email || !password || !username || !phone_number || !createdAt) {
    throw new BadRequest("Please provide all information");
  }
  const user = await User.create({
    email,
    password,
    username,
    phone_number,
    createdAt,
    updatedAt: createdAt
  });
  if (!user)
  {
    throw new BadRequest("Failed to register user");
  }
  res.status(StatusCodes.CREATED).json({ msg:"New user registered"});
} 
const login = async (req, res) => {
  const { body: { email, password }} = req
  if (!email || !password) { 
    throw new BadRequest("Please provide password and email");
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new NotFound("Credentials are invalid"); 
  }
  const isMatch = await user.comparePass(password)
  if (isMatch) {
    const token = user.createJWT();
    cookieSet({res, token})
    res
      .status(StatusCodes.OK)
      .json({
        msg: "You are logged in",
      });
  } else {
    throw new NotAuthorized("Invalid password provided")
  }
};
const logout = async (req, res) => { 
  res.cookie("token", "logout", {
    httpOnly: true, 
    expires: new Date(Date.now() + 1000),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};
module.exports = { register, login, logout };
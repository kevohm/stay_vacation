const User = require("../models/User")
const { NotFound,BadRequest, NotAuthorized } = require("../errors/index");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  const { email, password, username, phone_number } = req.body;
  const user = await User.create({ email, password, username, phone_number });
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
    const {_id} = user
    res
      .status(StatusCodes.OK)
      .json({
        msg: "You are logged in",
        token,
        id:_id
      });
  } else {
    throw new NotAuthorized("Invalid password provided")
  }
};

module.exports = { register, login };
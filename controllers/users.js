const User = require("../models/User")
const { NotFound, BadRequest, NotAuthorized } = require("../errors/index");
const { StatusCodes } = require("http-status-codes");
const cookieSet = require("../utils/cookie")
const getUser = async (req, res) => {
  const { userId } = req.user;
  const user = await User.findOne({ _id: userId }).select("-password");
  if (!user) {
    throw new NotFound("User doesn't exist");
  }

  res.status(StatusCodes.OK).json({
    msg: "User Found",
    user
  });
};
const getAll = async (req,res) => {
    const users = await User.find({}).select("-password")
    res.status(StatusCodes.OK).json({
      msg: "All Users Found",
      users,
    });
}
const updateUser = async (req, res) => {
  const { email, username, phone_number, updatedAt } = req.body;
  const { id } = req.params
  const body = { email, username, phone_number, updatedAt };
  const user = await User.findOne({_id:id})
  if (!user) {
    throw new NotFound("User not found")
  }
  if (!updatedAt) {
    throw new BadRequest("Please provide date of update");
  }
  const updatedData = await User.findByIdAndUpdate(id, body, { new: true, runValidators: true });
  if (!updatedData) {
    throw new BadRequest("Update failed");
  }
  const token = user.createJWT();
  cookieSet({ res, token });
    res.status(StatusCodes.OK).json({msg:"Updated User"})
}
const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOneAndDelete({ _id: id });
  if (!user) {
    throw new NotFound("User not found");
  }
  res.status(StatusCodes.OK).json({ msg: "Deleted User" });
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

module.exports = { getUser, getAll, updateUser, deleteUser, logout };
const User = require("../models/User")
const { NotFound, BadRequest, NotAuthorized } = require("../errors/index");
const { StatusCodes } = require("http-status-codes");

const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id }).select("-password").populate({
    path: "events",
    select: "-password",
  });
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
    const { body} = req
    const {role} = req.user
    const { id } = req.params
    if (role !== "admin") {
        delete body.role
    }
    const user = await User.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!user) {
        throw new NotFound("User not found")
    }
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
module.exports = { getUser, getAll, updateUser, deleteUser };
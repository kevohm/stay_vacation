const User = require("../models/User")
const { NotFound, BadRequest, NotAuthorized } = require("../errors/index");
const { StatusCodes } = require("http-status-codes");
const cookieSet = require("../utils/cookie")
//get current
const getUser = async (req, res) => {
  const { userId } = req.user;
  const user = await User.findOne({ _id: userId }).select("-password");
  if (!user) {
    throw new NotFound("User doesn't exist");
  }
  const { _id, role } = user
  let newRole = role === "116116" ? process.env.ADMIN : process.env.ADMIN;
  res.status(StatusCodes.OK).json({
    msg: "User Found",
    user: { id: _id, role:newRole },
  });
};
const getAll = async (req,res) => {
    const { sort, arrange, page, limit, username, email, phone, userId } = req.query
  const sortData = {
    [sort || "createdAt"]: arrange || "desc",
  };
  const currentPage = Number(page) || 1
  const currentLimit = Number(limit) || 5;
  const skip = (page - 1) * currentLimit;
  let filter = {}
  if (username) {
    filter["username"] = username
  }
  if (email) {
    filter["email"] = email
  }
  if (phone) {
    filter["phone_number"] = phone
  }
  if (userId) {
    filter["_id"] = userId
  }
  const users = await User.find(filter)
    .select("-password -__v")
    .sort(sortData)
    .skip(skip)
    .limit(currentLimit);
  const count = await User.find(filter).count();
  const pages = Math.ceil(count / currentLimit)
    res
      .status(StatusCodes.OK)
      .json({ msg: "All Users found", users, pages: { currentPage, pages } });
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
  if (!id) {
    throw new BadRequest("invalid details provided");
  }
  const user = await User.findOneAndDelete({ _id: id });
  if (!user) {
    throw new NotFound("User not found");
  }
  res.status(StatusCodes.OK).json({ msg: "Deleted User" });
};


module.exports = { getUser, getAll, updateUser, deleteUser };
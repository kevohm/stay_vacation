const Router = require("express").Router()
const {
  getAll,
  getOne,
  updateOne,
  addUser,
  removeUser,
} = require("../controllers/payments");
const {authAdmin} = require("../middleware/index")
Router.route("/").get(getAll)
Router.route("/:paymentId").get(authAdmin, getOne).patch(authAdmin, updateOne)
Router.route("/pay/:eventId").post(addUser);
Router.route("/unPay/:eventId/:userId").post(authAdmin, removeUser);
module.exports = Router
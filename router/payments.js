const Router = require("express").Router()
const {
  getAll,
  getOne,
  updateOne,
  addUser,
  removeUser,
  deleteOne,
  getPaymentResponse
} = require("../controllers/payments");
const {authAdmin,securePay} = require("../middleware/index")
Router.route("/").get(getAll).post(getPaymentResponse);
Router.route("/:paymentId").get(authAdmin, getOne).patch(authAdmin, updateOne).delete(authAdmin, deleteOne )
Router.route("/pay/:eventId/:userID").post(securePay, addUser);
Router.route("/unPay/:eventId/:userId").post(authAdmin, removeUser);

module.exports = Router
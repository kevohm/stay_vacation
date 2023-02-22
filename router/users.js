const express = require("express")
const Router = express.Router()
const {
  getUser,
  getAll,
  updateUser,
  deleteUser,
  logout
} = require("../controllers/users");
const {authAdmin,checkAdmin} =  require("../middleware/index")
Router.route("/").get(authAdmin, getAll)
Router.route("/user").get(getUser);
Router.route("/:id")
  .delete(checkAdmin, deleteUser)
  .patch(checkAdmin, updateUser);
Router.route("/logout").post(logout);
module.exports = Router
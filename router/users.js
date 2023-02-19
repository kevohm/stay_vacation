const express = require("express")
const Router = express.Router()
const {
  getUser,
  getAll,
  updateUser,
  deleteUser,
} = require("../controllers/users");
const {authAdmin} =  require("../middleware/index")
Router.route("/").get(authAdmin,getAll);
Router.route("/:id").get(getUser).delete(deleteUser).patch(updateUser);

module.exports = Router
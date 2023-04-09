const Router  = require("express").Router()
const {getAll,getSingle,createOne,updateOne,deleteOne} = require("../controllers/Category")
const {authenticate,authAdmin} = require("../middleware/index")
Router.route("/").get(getAll).post(authenticate, authAdmin, createOne)
Router.route("/:categoryId").get(getSingle).patch(authenticate, authAdmin,updateOne).delete(authenticate,authAdmin,deleteOne)

module.exports = Router
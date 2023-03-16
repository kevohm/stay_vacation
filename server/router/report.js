const Router = require("express").Router()
const {
  updateOne,
  createOne,
  getAll,
  getOne,
  deleteOne
} = require("../controllers/report");
Router.route("/").get(getAll) 
Router.route("/:eventId").post(createOne)
Router.route("/:reportId").get(getOne).patch(updateOne).delete(deleteOne);

module.exports = Router

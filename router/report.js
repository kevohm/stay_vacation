const Router = require("express").Router()
const {
  updateOne,
  createOne,
  getAll,
  getOne,
} = require("../controllers/report");
Router.route("/").get(getAll) 
Router.route("/:eventId").post(createOne)
Router.route("/:reportId").get(getOne).patch(updateOne);

module.exports = Router

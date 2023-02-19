const Router = require("express").Router()
const {
  updateOne,
  createOne,
  getAll,
  getOne,
} = require("../controllers/report");
Router.route("/").get(getAll) 
Router.route("/:eventId").post(createOne)
Router.route("/:eventId/:reportId").patch(updateOne).get(getOne);

module.exports = Router

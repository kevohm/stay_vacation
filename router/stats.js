const Router = require("express").Router()
const { getStats, getFull } = require("../controllers/stats");
Router.route("/").get(getStats);
Router.route("/all/:type").get(getFull);
module.exports = Router
const Router = require("express").Router()
const {secureUandD} = require("../middleware/index")
const {getAll,getSingle,addComment,updateComment,removeComment} = require("../controllers/comments")
Router.route("/").get(getAll)
Router.route("/:eventId").post(addComment)
Router.route("/:commentId").patch(secureUandD,updateComment).delete(secureUandD,removeComment).get(getSingle)

module.exports = Router
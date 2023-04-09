const Router = require("express").Router()
const {secureUandD, authenticate} = require("../middleware/index")
const {getAll,getSingle,addComment,updateComment,removeComment} = require("../controllers/comments")
Router.route("/").get(getAll)
Router.route("/:eventId").post(authenticate, addComment)
Router.route("/:commentId").patch(authenticate, secureUandD,updateComment).delete(authenticate,secureUandD,removeComment).get(authenticate,getSingle)

module.exports = Router
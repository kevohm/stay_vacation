const express = require("express")
const router = express.Router();
const {
  createEvent,
  getSingleEvent,
  getEvents,
  deleteEvent,
  updateEvent,
  likeEvent,
  dislikeEvent,
  removeDislike,
  removeLike,
  getCurrentReaction
} = require("../controllers/event");
const {authenticate, authAdmin} = require("../middleware/index");
router.route("/create").post(authenticate, authAdmin, createEvent);
router.route("/all").get(getEvents);
router
  .route("/:eventId")
  .get(getSingleEvent)
  .delete(authenticate, authAdmin, deleteEvent)
  .patch(authenticate, authAdmin, updateEvent)
router.route("/like/:eventId").post(authenticate, likeEvent)
router.route("/dislike/:eventId").post(authenticate, dislikeEvent)
router.route("/reaction/:eventId").get(authenticate, getCurrentReaction)
router.route("/undislike/:eventId").delete(authenticate, removeDislike)
router.route("/unlike/:eventId").delete(authenticate, removeLike)
module.exports = router 
const express = require("express")
const router = express.Router();
const {
  createEvent,
  getSingleEvent,
  getEvents,
  deleteEvent,
  updateEvent,
} = require("../controllers/event");
const {authenticate, authAdmin} = require("../middleware/index");
router.route("/create").post(authenticate, authAdmin, createEvent);
router.route("/all").get(getEvents);
router
  .route("/:eventId")
  .get(getSingleEvent)
  .delete(authenticate, authAdmin, deleteEvent)
  .patch(authenticate, authAdmin, updateEvent)
  
module.exports = router
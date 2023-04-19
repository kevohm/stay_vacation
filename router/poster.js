const router = require("express").Router()
const {createPoster,getPoster,getPosters,deletePoster} = require("../controllers/poster")
const {authenticate, authAdmin} = require("../middleware/index")

router.route("/").get(getPosters)
router.route("/:eventId")
.post(authenticate,authAdmin,createPoster)
router.route("/:posterId").get(authenticate,getPoster).delete(authenticate,authAdmin,deletePoster)
module.exports = router
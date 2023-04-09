const express = require("express"); 
const router = express.Router();
const { login, register, logout } = require("../controllers/auth");
router.route("/login").post(login);
router.route("/").post(register)
router.route("/logout").post(logout);
module.exports = router 
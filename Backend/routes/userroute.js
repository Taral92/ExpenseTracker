const express = require("express");
const x = require("../controllers/user.controller");
const auth = require("../middlewares/auth");

const router = express.Router();
router.route("/register").post(x.register);
router.route("/login").post(x.login);

module.exports = router;

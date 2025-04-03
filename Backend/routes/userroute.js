const express = require("express");
const x = require("../controllers/user.controller");
const auth = require("../middlewares/auth");
const add=require('../controllers/expense.controller')
const router = express.Router();
router.route("/register").post(x.register);
router.route("/login").post(x.login);
router.route('/logout').post(x.logout)
router.route('/add').post(auth,add)
module.exports = router;

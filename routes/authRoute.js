const express = require("express");
const {
  registerController,
  loginController,
  currentController,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/register").post(registerController);
router.route("/login").post(loginController);
router.route("/current-user").get(authMiddleware, currentController);
module.exports = router;

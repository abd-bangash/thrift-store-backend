const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  registerUser,
  loginUser,
  resetPassword,
  sendOtp,
  verifyOtp,
  getUserProfile,
} = require("../controllers/user.controller");
const { userAuthMiddleware } = require("../middlewares/auth.midleware");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("userName")
      .isLength({ min: 3 })
      .withMessage("User name must be atleast 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 chracters long"),
  ],
  registerUser
);
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 chracters long"),
  ],
  loginUser
);

router.post(
  "/forgot-password",
  [body("email").isEmail().withMessage("Invalid Email")],
  sendOtp
);

router.post(
  "/verify-otp",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("otp")
      .isLength({ min: 6 })
      .withMessage("OTP must be 6 characters long"),
  ],
  verifyOtp
);
router.post(
  "/reset-password",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("otp")
      .isLength({ min: 6 })
      .withMessage("OTP must be 6 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 chracters long"),
  ],
  resetPassword
);

router.get("/profile", userAuthMiddleware, getUserProfile);

module.exports = router;

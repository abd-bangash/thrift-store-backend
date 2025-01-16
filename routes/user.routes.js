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
  updateUser,
  logoutUser,
} = require("../controllers/user.controller");
const { userAuthMiddleware } = require("../middlewares/auth.midleware");

router.post(
  "/register",
  [
    body("userName")
      .isLength({ min: 3 })
      .withMessage("User name must be at least 3 characters long"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("phone")
      .matches(/^\+?[0-9]{10,15}$/)
      .withMessage("Phone number must be 10–15 digits long"),
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

router.post("/logout", logoutUser);

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

router.put("/profile", userAuthMiddleware, updateUser);

router.get("/profile", userAuthMiddleware, getUserProfile);

module.exports = router;

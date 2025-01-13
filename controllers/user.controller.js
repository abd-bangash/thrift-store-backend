const userModel = require("../models/user.model");
const { validationResult } = require("express-validator");
const { createUser } = require("../services/user.service");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

//sign up
module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { userName, email, password, role } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "email already exists" });
    const hashedPassword = await userModel.hashPassword(password);

    const user = await createUser({
      userName,
      email,
      password: hashedPassword,
      role,
    });

    const token = user.generateAuthToken();

    return res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

//login
module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });

  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isValid = await user.comparePassword(password);
    if (!isValid)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = user.generateAuthToken();
    res.cookie("token", token);

    return res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    return res.status(400).json({ message: "Unable to login" });
  }
};

//get user profile info
module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json(req.user);
};

//forget password controllers
module.exports.sendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const otp = crypto.randomBytes(3).toString("hex");
    const expires = Date.now() + 10 * 60 * 1000;

    user.resetToken = otp;
    user.resetTokenExpires = expires;

    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "khanabdulahadmuhammad@gmail.com",
        pass: "vdco wfrx ocnp ysix",
      },
    });

    const mailOptions = {
      from: "khanabdulahadmuhammad@gmail.com",
      to: email,
      subject: "Password reset OTP",
      text: `Your password reset otp is ${otp}`,
    };

    await transporter.sendMail(mailOptions);
    console.log(Date.now(), expires, otp);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};

module.exports.verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const user = await userModel.findOne({ email, resetToken: otp });
    if (!user) return res.status(400).json({ message: "Invalid OTP" });

    if (user.resetTokenExpires < Date.now())
      return res.status(400).json({ message: "OTP expired" });

    return res.status(200).json({ message: "OTP verified" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.resetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await userModel.findOne({ email, resetToken: otp });
    if (!user) return res.status(400).json({ message: "Invalid OTP" });

    if (user.resetTokenExpires < Date.now())
      return res.status(400).json({ message: "OTP expired" });

    const hashedPassword = await userModel.hashPassword(newPassword);
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpires = null;
    await user.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

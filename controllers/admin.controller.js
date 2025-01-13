const userModel = require("../models/user.model");

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userModel.find();
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

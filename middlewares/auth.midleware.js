const blackListModel = require("../models/blackList.model");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

module.exports.userAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    if (!token) return res.status(400).json({ message: "Unauthorized" });

    const blackListed = await blackListModel.findOne({ token });
    if (blackListed)
      return res.status(400).json({ message: "Token is invalid or expired" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded._id);
    req.user = user;

    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports.adminAuthMiddleware = (req, res, next) => {
  try {
    if (req.user.role !== "admin")
      return res.status(400).json({ message: "Not authorized as admin" });

    return next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

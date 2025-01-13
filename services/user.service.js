const userModel = require("../models/user.model");

module.exports.createUser = async ({ userName, email, password, role }) => {
  if (!userName || !email || !password || !role) {
    throw new Error("All fields are required ");
  }
  const user = await userModel.create({
    userName,
    email,
    password,
    role,
  });
  return user;
};

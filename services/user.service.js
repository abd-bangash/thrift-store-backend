const userModel = require("../models/user.model");

module.exports.createUser = async ({
  userName,
  email,
  password,
  phone,
  role,
}) => {
  if (!userName || !email || !password || !phone) {
    throw new Error("All fields are required ");
  }
  const user = await userModel.create({
    userName,
    email,
    password,
    phone,
    role,
  });
  return user;
};

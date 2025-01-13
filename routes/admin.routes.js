const express = require("express");
const {
  adminAuthMiddleware,
  userAuthMiddleware,
} = require("../middlewares/auth.midleware");
const { getAllUsers } = require("../controllers/admin.controller");
const router = express.Router();

router.get("/users", userAuthMiddleware, adminAuthMiddleware, getAllUsers);

module.exports = router;

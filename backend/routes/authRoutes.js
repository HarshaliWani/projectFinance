const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController.js");
const { body } = require("express-validator");

const router = express.Router();

// User Registration Route (Without Name)
router.post(
  "/register",
  [
    body("email", "Valid email is required").isEmail(),
    body("password", "Password must be at least 6 characters").isLength({ min: 6 }),
  ],
  registerUser
);

// User Login Route
router.post("/login", loginUser);

module.exports = router;
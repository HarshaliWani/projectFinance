const mongoose = require("mongoose");
const validator = require("validator");

// User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: validator.isEmail, // Ensures valid email format
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
    },
    transactions: {
        type: [], // Stores user transactions
    },
    createdAt: {
        type: Date,
        default: Date.now, // Auto-assign current date
    },
});

// Create and export the User model
const User = mongoose.model("User", userSchema);
module.exports = User;
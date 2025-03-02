const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json()); // Allows JSON request body
app.use(cors()); // Enables frontend to talk to backend

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Import transaction routes
const transactionRoutes = require("./routes/transactionRoutes");
app.use("/api/transactions", transactionRoutes);

// Import user routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Simple test route
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
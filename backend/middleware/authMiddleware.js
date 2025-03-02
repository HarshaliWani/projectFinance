const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    
    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const extractedToken = token.replace("Bearer ", ""); 
    console.log("Extracted Token:", extractedToken); // Debugging Line

    const decoded = jwt.verify(extractedToken, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Debugging Line

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err.message);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

module.exports = authMiddleware;

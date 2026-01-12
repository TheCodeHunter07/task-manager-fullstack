const jwt = require("jsonwebtoken");

const JWT_SECRET = "taskmanager_secret_key";

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    // This MUST match authRoutes.js
    req.userId = decoded.accountId;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

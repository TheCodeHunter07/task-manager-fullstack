require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// root route
app.get("/", (req, res) => {
  res.send("Task Manager API is running");
});

// task routes
const taskRoutes = require("./routes/taskRoutes");
app.use("/tasks", taskRoutes);

// auth routes (registered but not tested yet)
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

// MongoDB
mongoose.connect(
  process.env.MONGO_URI
)
.then(() => console.log("✅ MongoDB Atlas connected"))
.catch(err => console.log("❌ MongoDB error:", err));

// server start
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

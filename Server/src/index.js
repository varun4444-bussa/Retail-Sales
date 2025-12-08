
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./utils/db.js";

import userRoutes from "./routes/user.routes.js";
import sampleRoutes from "./routes/sample.routes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/samples", sampleRoutes);

// Start Server
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n❌ Error: Port ${PORT} is already in use.`);
    console.error(`Please either:`);
    console.error(`  1. Stop the process using port ${PORT}`);
    console.error(`  2. Use a different port by setting PORT environment variable`);
    console.error(`\nTo find and kill the process on Windows:`);
    console.error(`  netstat -ano | findstr :${PORT}`);
    console.error(`  taskkill /PID <PID> /F`);
    process.exit(1);
  } else {
    console.error('Server error:', err);
    process.exit(1);
  }
});

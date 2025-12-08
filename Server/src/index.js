import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./utils/db.js";

import userRoutes from "./routes/user.routes.js";
import sampleRoutes from "./routes/sample.routes.js";

dotenv.config();
const app = express();

// Resolve __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://your-render-frontend-url.onrender.com' // OPTIONAL
  ],
  credentials: true
}));

app.use(express.json());

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/samples", sampleRoutes);

// 👉 SERVE FRONTEND (Client/dist)
const clientDistPath = path.join(__dirname, "../../Client/dist");
app.use(express.static(clientDistPath));

// 👉 Catch-all route for SPA (Vite)
app.get("*", (req, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});

// Start Server
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use.`);
    process.exit(1);
  } else {
    console.error('Server error:', err);
    process.exit(1);
  }
});

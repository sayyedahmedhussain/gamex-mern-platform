const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
require("dotenv").config();

const connectDB = require("./config/db");
const navbarRoutes = require("./routes/navbarRoutes"); // legacy (public)
const sectionRoutes = require("./routes/sectionRoutes"); // public read-only (for public website)
const adminRoutes  = require("./routes/adminRoutes");   // protected CRUD
const authRoutes   = require("./routes/authRoutes");    // login / session
const { protect }  = require("./middleware/authMiddleware");

const app = express();

// ── Middleware ─────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// Serve uploaded images as static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ── Image Upload (Multer) ──────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// POST /api/upload  → returns { url: "/uploads/filename.jpg" } (admin only)
app.post("/api/upload", protect, upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  res.json({ url: `/uploads/${req.file.filename}` });
});

// ── Routes ─────────────────────────────────────────────────────────────────
app.get("/", (req, res) => res.send("GameX Admin API Running"));

// Auth routes — POST /api/auth/login, GET /api/auth/me
app.use("/api/auth", authRoutes);

// Legacy navbar route (keep for existing frontend compatibility)
app.use("/api/navbar", navbarRoutes);

// Public read-only routes for the public website — GET /api/sections/<name>
app.use("/api/sections", sectionRoutes);

// Admin CRUD routes (JWT protected) — /api/admin/<section>
app.use("/api/admin", adminRoutes);

// ── Database ───────────────────────────────────────────────────────────────
connectDB();

// ── Start Server ───────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

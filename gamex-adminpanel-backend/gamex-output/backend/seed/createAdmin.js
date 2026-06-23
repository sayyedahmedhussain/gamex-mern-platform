/**
 * One-time script to create the first admin user.
 *
 * Usage:
 *   node seed/createAdmin.js
 *
 * Reads ADMIN_USERNAME, ADMIN_EMAIL, ADMIN_PASSWORD from .env
 * (falls back to sensible defaults if not provided).
 */
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const User = require("../models/User");

const run = async () => {
  await connectDB();

  const username = process.env.ADMIN_USERNAME || "admin";
  const email = (process.env.ADMIN_EMAIL || "admin@gamex.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "ChangeMe123!";

  const existing = await User.findOne({ $or: [{ email }, { username }] });

  if (existing) {
    console.log(`Admin user already exists: ${existing.username} (${existing.email})`);
    process.exit(0);
  }

  const admin = await User.create({ username, email, password, role: "admin" });

  console.log("✅ Admin user created successfully:");
  console.log(`   Username: ${admin.username}`);
  console.log(`   Email:    ${admin.email}`);
  console.log(`   Password: ${password}`);
  console.log("⚠️  Please log in and change this password in production.");

  process.exit(0);
};

run().catch((err) => {
  console.error("Error creating admin user:", err);
  process.exit(1);
});

const mongoose = require("mongoose");

const gameSectionSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ type: String }],
  gameImages: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model("GameSection", gameSectionSchema);
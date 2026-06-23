const mongoose = require("mongoose");

const navLinkSchema = new mongoose.Schema({
  label:     { type: String,  required: true },
  url:       { type: String,  required: true },
  order:     { type: Number,  default: 0 },
  isVisible: { type: Boolean, default: true },
});

const navbarSchema = new mongoose.Schema(
  {
    logoText:  { type: String, default: "" },
    logoImage: { type: String, default: "" },
    links:     [navLinkSchema],
    ctaText:   { type: String, default: "" },
    ctaLink:   { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Navbar", navbarSchema);
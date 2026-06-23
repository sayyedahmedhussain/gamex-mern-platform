const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema({
  headline:        { type: String, default: "" },
  subheadline:     { type: String, default: "" },
  description:     { type: String, default: "" },
  ctaText:         { type: String, default: "" },
  ctaLink:         { type: String, default: "" },
  backgroundImage: { type: String, default: "" },

  // Center logo
  centerImage: { type: String, default: "" },
  centerLabel: { type: String, default: "Gamex Global" },

  // Inner orbit — 4 icons
  innerIcons: {
    type: [String],
    default: [
      "https://gamexglobal.pk/assets/img/icon/icon7.webp",
      "https://gamexglobal.pk/assets/img/icon/icon8.webp",
      "https://gamexglobal.pk/assets/img/icon/icon5.webp",
      "https://gamexglobal.pk/assets/img/icon/icon6.webp",
    ],
  },

  // Outer orbit — 4 icons
  outerIcons: {
    type: [String],
    default: [
      "https://gamexglobal.pk/assets/img/icon/icon2.webp",
      "https://gamexglobal.pk/assets/img/icon/icon1.webp",
      "https://gamexglobal.pk/assets/img/icon/icon4.webp",
      "https://gamexglobal.pk/assets/img/icon/icon3.webp",
    ],
  },
}, { timestamps: true });

module.exports = mongoose.model("Hero", heroSchema);
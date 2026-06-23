const mongoose = require("mongoose");

const partnersSectionSchema = new mongoose.Schema(
  {
    smallTitle: {
      type: String,
      required: true,
    },

    heading: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    partners: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PartnersSection", partnersSectionSchema);
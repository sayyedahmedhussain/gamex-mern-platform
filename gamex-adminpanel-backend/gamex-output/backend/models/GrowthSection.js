const mongoose = require("mongoose");

const growthCardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },
});

const growthSectionSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    mainImage: {
      type: String,
      required: true,
    },

    cards: {
      type: [growthCardSchema],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "GrowthSection",
  growthSectionSchema
);
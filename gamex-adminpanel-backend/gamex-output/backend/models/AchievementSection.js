const mongoose = require("mongoose");

const statSchema = new mongoose.Schema({
  icon: {
    type: String,
    default: "",
  },

  value: {
    type: String,
    required: true,
  },

  label: {
    type: String,
    required: true,
  },
});

const achievementSectionSchema = new mongoose.Schema(
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
      required: true,
    },

    stats: {
      type: [statSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "AchievementSection",
  achievementSectionSchema
);
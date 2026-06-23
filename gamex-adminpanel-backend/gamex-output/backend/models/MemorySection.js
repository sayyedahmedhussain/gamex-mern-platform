const mongoose = require("mongoose");

const memorySectionSchema = new mongoose.Schema(
  {
    subtitle: {
      type: String,
      required: true,
    },

    heading: {
      type: String,
      required: true,
    },

    activitiesTabText: {
      type: String,
      required: true,
    },

    eventsTabText: {
      type: String,
      required: true,
    },

    activityImages: [
      {
        type: String,
      },
    ],

    eventImages: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "MemorySection",
  memorySectionSchema
);
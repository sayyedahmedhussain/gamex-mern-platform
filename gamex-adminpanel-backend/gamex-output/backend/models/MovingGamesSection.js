const mongoose = require("mongoose");

const movingGamesSectionSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true },

    row1Images: [{ type: String }],

    row2Images: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "MovingGamesSection",
  movingGamesSectionSchema
);
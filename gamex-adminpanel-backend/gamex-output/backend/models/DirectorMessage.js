const mongoose = require("mongoose");

const directorMessageSchema = new mongoose.Schema(
  {
    smallTitle: {
      type: String,
      required: true,
    },

    directorName: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    directorImage: {
      type: String,
      default: "",
    },

    designation: {
      type: String,
      default: "",
    },

    signatureName: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "DirectorMessage",
  directorMessageSchema
);
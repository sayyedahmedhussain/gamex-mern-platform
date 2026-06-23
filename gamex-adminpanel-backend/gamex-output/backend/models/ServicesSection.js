const mongoose = require("mongoose");

const serviceItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  icon: {
    type: String, // emoji or image URL
    default: "",
  },
});

const servicesSectionSchema = new mongoose.Schema(
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

    description2: {
      type: String,
      default: "",
    },

    buttonText: {
      type: String,
      default: "Explore All Services",
    },

    services: {
      type: [serviceItemSchema],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "ServicesSection",
  servicesSectionSchema
);
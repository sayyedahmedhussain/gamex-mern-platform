const mongoose = require("mongoose");

const footerSchema = new mongoose.Schema(
  {
    footerTop: { type: String, default: "" },

    about: {
      logo: { type: String, default: "" },
      text: { type: String, default: "" },
      socials: [{ type: String, default: [] }],
    },

    links: {
      title: { type: String, default: "" },
      items: [{ type: String, default: [] }],
    },

    services: {
      title: { type: String, default: "" },
      items: [{ type: String, default: [] }],
    },

    contact: {
      title: { type: String, default: "" },
      items: [{ type: String, default: [] }],
    },

    copyright: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Footer", footerSchema);
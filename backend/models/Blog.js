const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
    content: { type: String, required: true },
    link: { type: String, required: true },
    mainImage: { type: String, required: true }, // Stores uploaded image path
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);

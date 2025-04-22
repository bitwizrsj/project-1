const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    link: { type: String, required: true },
    mainImage: { type: String, required: true }, // Cloudinary URL
    imagePublicId: { type: String }, // Cloudinary public_id
  },
  { 
    timestamps: true 
  }
);

module.exports = mongoose.model("Blog", blogSchema);
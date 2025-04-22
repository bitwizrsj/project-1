const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String, // URL of the uploaded image
      required: true
    },
    imagePublicId: {
      type: String // Cloudinary public_id for the image
    },
    technologies: [String]
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt
  }
);

module.exports = mongoose.model('Project', projectSchema);
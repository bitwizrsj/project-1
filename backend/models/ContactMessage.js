const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create text index for search functionality
contactMessageSchema.index({
  name: 'text',
  email: 'text',
  message: 'text'
});

module.exports = mongoose.model('ContactMessage', contactMessageSchema);
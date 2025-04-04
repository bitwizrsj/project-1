const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    job_title: {
      type: String,
      required: true,
    },
    user_name: {
      type: String,
      required: true,
    },
    user_email: {
      type: String,
      required: true,
    },
    user_phone: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    resume: {
      type: String, // Path to the uploaded resume file
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
applicationSchema.index({
  job_title: 'text',
  user_name: 'text',
  user_email: 'text',
  message: 'text'
});

module.exports = mongoose.model('Application', applicationSchema);
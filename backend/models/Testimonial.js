const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  stars: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  }
}, { timestamps: true });

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

module.exports = Testimonial;

// controllers/testimonialController.js
const Testimonial = require('../models/Testimonial');

// Get all testimonials
const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ message: "Error fetching testimonials", error });
  }
};

// Create a new testimonial
const createTestimonial = async (req, res) => {
  const { name, role, content, stars, image } = req.body;

  try {
    const newTestimonial = new Testimonial({ name, role, content, stars, image });
    await newTestimonial.save();
    res.status(201).json(newTestimonial);
  } catch (error) {
    res.status(500).json({ message: "Error creating testimonial", error });
  }
};

// Update a testimonial
const updateTestimonial = async (req, res) => {
  const { id } = req.params;
  const { name, role, content, stars, image } = req.body;

  try {
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      id,
      { name, role, content, stars, image },
      { new: true }
    );

    if (!updatedTestimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    res.status(200).json(updatedTestimonial);
  } catch (error) {
    res.status(500).json({ message: "Error updating testimonial", error });
  }
};

// Delete a testimonial
const deleteTestimonial = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

    if (!deletedTestimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    res.status(200).json({ message: "Testimonial deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting testimonial", error });
  }
};

module.exports = {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};

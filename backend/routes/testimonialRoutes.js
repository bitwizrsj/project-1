const express = require("express");
const router = express.Router();
const Testimonial = require("../models/Testimonial");

// Get all testimonials
router.get("/", async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: "Error fetching testimonials" });
  }
});

// Add a new testimonial (no image upload)
router.post("/", async (req, res) => {
  try {
    const { content, name, role, stars } = req.body;

    const newTestimonial = new Testimonial({
      content,
      name,
      role,
      stars,
    });

    await newTestimonial.save();
    res.status(201).json({
      message: "Testimonial added successfully!",
      testimonial: newTestimonial,
    });
  } catch (err) {
    console.error("Error adding testimonial:", err);
    res.status(500).json({ error: "Error adding testimonial" });
  }
});

// Update an existing testimonial by ID (no image handling)
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { content, name, role, stars } = req.body;

  try {
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      id,
      {
        content,
        name,
        role,
        stars,
      },
      { new: true }
    );

    if (!updatedTestimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    res.status(200).json({
      message: "Testimonial updated successfully!",
      testimonial: updatedTestimonial,
    });
  } catch (err) {
    console.error("Error updating testimonial:", err);
    res.status(500).json({ error: "Error updating testimonial" });
  }
});

// Delete a testimonial by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

    if (!deletedTestimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    res.status(200).json({ message: "Testimonial deleted successfully!" });
  } catch (err) {
    console.error("Error deleting testimonial:", err);
    res.status(500).json({ error: "Error deleting testimonial" });
  }
});

module.exports = router;

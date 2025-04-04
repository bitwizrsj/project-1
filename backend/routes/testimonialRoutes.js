const express = require("express");
const router = express.Router();
const Testimonial = require("../models/Testimonial");
const upload = require("../middleware/uploadMiddleware"); // Assuming you've created the upload middleware

// Get all testimonials
router.get("/", async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: "Error fetching testimonials" });
  }
});

// Add a new testimonial with image upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { content, name, role, stars } = req.body;
    const image = req.file.path; // Image is uploaded and path is stored

    const newTestimonial = new Testimonial({
      content,
      name,
      role,
      image,
      stars
    });

    await newTestimonial.save();
    res.status(201).json({
      message: "Testimonial added successfully!",
      testimonial: newTestimonial
    });
  } catch (err) {
    console.error("Error adding testimonial:", err);
    res.status(500).json({ error: "Error adding testimonial" });
  }
});

// Update an existing testimonial by ID
router.put("/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params;
  const { content, name, role, stars } = req.body;
  const image = req.file ? req.file.path : undefined; // Image might be updated (if provided)

  try {
    // Find and update the testimonial by ID
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      id,
      {
        content,
        name,
        role,
        stars,
        image: image ? image : undefined, // Update image only if new one is provided
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
    // Find and delete the testimonial by ID
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

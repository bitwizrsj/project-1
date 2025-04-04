const Blog = require("../models/Blog");

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get a single blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Create a new blog with an image upload
exports.createBlog = async (req, res) => {
  try {
    const { title, description, content, link } = req.body;
    const mainImage = req.file ? `/uploads/${req.file.filename}` : null;

    if (!mainImage) return res.status(400).json({ error: "Image is required!" });

    const newBlog = new Blog({ title, description, content, link, mainImage });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update an existing blog with a new image (optional)
exports.updateBlog = async (req, res) => {
  try {
    const { title, description, content, link } = req.body;
    const mainImage = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updatedData = { title, description, content, link };
    if (mainImage) updatedData.mainImage = mainImage; // Update only if a new image is uploaded

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!updatedBlog) return res.status(404).json({ error: "Blog not found" });

    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a blog
exports.deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) return res.status(404).json({ error: "Blog not found" });
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

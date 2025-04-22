const Blog = require("../models/Blog");
const cloudinary = require("../cloudinary");
const stream = require("stream");

// Verify Cloudinary configuration on startup
if (!cloudinary?.config()?.cloud_name) {
  console.error("⚠️ Cloudinary not properly configured!");
  console.log("Current Cloudinary config:", {
    cloud_name: cloudinary.config().cloud_name ? "***" : "MISSING",
    api_key: cloudinary.config().api_key ? "***" : "MISSING"
  });
}

/**
 * Uploads a file to Cloudinary
 * @param {Object} file - Multer file object
 * @returns {Promise} - Resolves with Cloudinary upload result
 */
const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    try {
      if (!file || !file.buffer) {
        throw new Error("Invalid file object");
      }

      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "blog",
          format: "webp",
          quality: "auto",
          transformation: [
            { width: 800, height: 600, crop: "limit" },
            { quality: "auto:best" }
          ]
        },
        (error, result) => {
          if (error) {
            console.error("❌ Cloudinary upload error:", error);
            return reject(new Error("Failed to upload image to Cloudinary"));
          }
          if (!result) {
            return reject(new Error("No result from Cloudinary upload"));
          }
          resolve(result);
        }
      );

      const bufferStream = new stream.PassThrough();
      bufferStream.end(file.buffer);
      bufferStream.pipe(uploadStream);
    } catch (err) {
      console.error("❌ Error in upload stream:", err);
      reject(err);
    }
  });
};

// Get all blogs (sorted by newest first)
// controllers/blogController.js

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }).lean();
    
    // Ensure we always return an array, even if empty
    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs // This will always be an array
    });
    
  } catch (err) {
    console.error("Error fetching blogs:", err);
    res.status(500).json({
      success: false,
      error: "Server error",
      message: err.message
    });
  }
};

// Get single blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        error: "Blog post not found"
      });
    }
    res.json({
      success: true,
      data: blog
    });
  } catch (err) {
    console.error("❌ Error fetching blog:", err);
    res.status(500).json({
      success: false,
      error: "Failed to fetch blog post"
    });
  }
};

// Create new blog post
exports.createBlog = async (req, res) => {
  let cloudinaryResult;
  try {
    // Validate required fields
    const { title, description, content, link } = req.body;
    if (!title || !description || !content || !link) {
      return res.status(400).json({
        success: false,
        error: "Title, description, content, and link are required"
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "Featured image is required"
      });
    }

    // Upload image to Cloudinary
    cloudinaryResult = await uploadToCloudinary(req.file);
    console.log("✅ Image uploaded to Cloudinary:", {
      url: cloudinaryResult.secure_url,
      public_id: cloudinaryResult.public_id
    });

    // Create new blog
    const newBlog = new Blog({
      title,
      description,
      content,
      link,
      mainImage: cloudinaryResult.secure_url,
      imagePublicId: cloudinaryResult.public_id
    });

    // Save to database
    await newBlog.save();

    res.status(201).json({
      success: true,
      message: "Blog post created successfully",
      data: newBlog
    });

  } catch (err) {
    console.error("❌ Error creating blog:", err);

    // Cleanup uploaded image if blog creation failed
    if (cloudinaryResult?.public_id) {
      try {
        await cloudinary.uploader.destroy(cloudinaryResult.public_id);
        console.log("🧹 Cleaned up failed upload:", cloudinaryResult.public_id);
      } catch (cleanupErr) {
        console.error("❌ Failed to cleanup image:", cleanupErr);
      }
    }

    res.status(500).json({
      success: false,
      error: err.message || "Failed to create blog post"
    });
  }
};

// Update blog post
exports.updateBlog = async (req, res) => {
  let cloudinaryResult;
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        error: "Blog post not found"
      });
    }

    const { title, description, content, link } = req.body;
    const updatedData = { title, description, content, link };

    // Handle image update if new file was uploaded
    if (req.file) {
      // Upload new image
      cloudinaryResult = await uploadToCloudinary(req.file);
      updatedData.mainImage = cloudinaryResult.secure_url;
      updatedData.imagePublicId = cloudinaryResult.public_id;

      // Delete old image
      if (blog.imagePublicId) {
        try {
          await cloudinary.uploader.destroy(blog.imagePublicId);
          console.log("🗑️ Deleted old image:", blog.imagePublicId);
        } catch (deleteErr) {
          console.error("❌ Failed to delete old image:", deleteErr);
        }
      }
    }

    // Update blog
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: "Blog post updated successfully",
      data: updatedBlog
    });

  } catch (err) {
    console.error("❌ Error updating blog:", err);

    // Cleanup uploaded image if update failed
    if (cloudinaryResult?.public_id) {
      try {
        await cloudinary.uploader.destroy(cloudinaryResult.public_id);
        console.log("🧹 Cleaned up failed update:", cloudinaryResult.public_id);
      } catch (cleanupErr) {
        console.error("❌ Failed to cleanup image:", cleanupErr);
      }
    }

    res.status(500).json({
      success: false,
      error: err.message || "Failed to update blog post"
    });
  }
};

// Delete blog post
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        error: "Blog post not found"
      });
    }

    // Delete image from Cloudinary
    if (blog.imagePublicId) {
      try {
        await cloudinary.uploader.destroy(blog.imagePublicId);
        console.log("🗑️ Deleted blog image:", blog.imagePublicId);
      } catch (deleteErr) {
        console.error("❌ Failed to delete blog image:", deleteErr);
      }
    }

    // Delete from database
    await Blog.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Blog post deleted successfully"
    });

  } catch (err) {
    console.error("❌ Error deleting blog:", err);
    res.status(500).json({
      success: false,
      error: "Failed to delete blog post"
    });
  }
};
const express = require("express");
const { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog } = require("../controllers/blogController");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// Blog routes
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.post("/", upload.single("mainImage"), createBlog);
router.put("/:id", upload.single("mainImage"), updateBlog);
router.delete("/:id", deleteBlog);

module.exports = router;

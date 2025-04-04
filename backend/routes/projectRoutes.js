const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const projectController = require("../controllers/projectController");

const router = express.Router();

// Create a project with image upload
router.post("/", upload.single("image"), projectController.createProject);

// Get all projects
router.get("/", projectController.getProjects);

// Get project by ID
router.get("/:id", projectController.getProjectById);

// Update project by ID with image upload
router.put("/:id", upload.single("image"), projectController.updateProject);

// Delete project by ID
router.delete("/:id", projectController.deleteProject);

module.exports = router;

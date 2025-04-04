const Project = require("../models/Project");
const path = require("path");

// Create a new project
const createProject = async (req, res) => {
  try {
    const { title, description, technologies } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    // Validation
    if (!title || !description || !image) {
      return res.status(400).json({ error: "Title, description, and image are required." });
    }

    // Create new project
    const newProject = new Project({
      title,
      description,
      image,
      technologies: technologies ? technologies.split(",") : [],
    });

    await newProject.save();
    res.status(201).json({ message: "Project created successfully!", project: newProject });
  } catch (err) {
    console.error("Error creating project:", err);
    res.status(500).json({ error: "Error creating project. Please try again." });
  }
};

// Get all projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ error: "Error fetching projects." });
  }
};

// Get a single project by ID
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found." });
    }
    res.json(project);
  } catch (err) {
    console.error("Error fetching project:", err);
    res.status(500).json({ error: "Error fetching project." });
  }
};

// Update a project
const updateProject = async (req, res) => {
  try {
    const updatedData = req.body;
    if (req.file) {
      updatedData.image = `/uploads/${req.file.filename}`;
    }

    const updatedProject = await Project.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found." });
    }

    res.json({ message: "Project updated successfully!", project: updatedProject });
  } catch (err) {
    console.error("Error updating project:", err);
    res.status(500).json({ error: "Error updating project." });
  }
};

// Delete a project
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found." });
    }
    res.json({ message: "Project deleted successfully!" });
  } catch (err) {
    console.error("Error deleting project:", err);
    res.status(500).json({ error: "Error deleting project." });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};

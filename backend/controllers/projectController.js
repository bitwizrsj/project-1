const Project = require('../models/Project');
const cloudinary = require('cloudinary').v2;
const stream = require('stream');

// Configure Cloudinary (if not already configured in cloudinary.js)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Helper function to upload file to Cloudinary
const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { 
        folder: 'portfolio',
        transformation: [{ width: 800, height: 600, crop: 'limit' }]
      },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );

    const bufferStream = new stream.PassThrough();
    bufferStream.end(file.buffer);
    bufferStream.pipe(uploadStream);
  });
};

// Create a new project
const createProject = async (req, res) => {
  let cloudinaryResult;
  try {
    const { title, description, technologies } = req.body;
    
    // Validation
    if (!title || !description || !req.file) {
      return res.status(400).json({ 
        error: 'Title, description, and image are required.' 
      });
    }

    // Upload image to Cloudinary
    cloudinaryResult = await uploadToCloudinary(req.file);

    // Create new project
    const newProject = new Project({
      title,
      description,
      image: cloudinaryResult.secure_url,
      imagePublicId: cloudinaryResult.public_id,
      technologies: technologies ? technologies.split(',') : []
    });

    await newProject.save();
    
    res.status(201).json({ 
      message: 'Project created successfully!', 
      project: newProject 
    });
  } catch (err) {
    console.error('Error creating project:', err);
    
    // Clean up uploaded image if project creation failed
    if (req.file && cloudinaryResult?.public_id) {
      await cloudinary.uploader.destroy(cloudinaryResult.public_id);
    }
    
    res.status(500).json({ 
      error: 'Error creating project. Please try again.' 
    });
  }
};

// Get all projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ 
      error: 'Error fetching projects.' 
    });
  }
};

// Get a single project by ID
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ 
        error: 'Project not found.' 
      });
    }
    res.json(project);
  } catch (err) {
    console.error('Error fetching project:', err);
    res.status(500).json({ 
      error: 'Error fetching project.' 
    });
  }
};

// Update a project
const updateProject = async (req, res) => {
  let cloudinaryResult;
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ 
        error: 'Project not found.' 
      });
    }

    const { title, description, technologies } = req.body;
    const updatedData = { 
      title, 
      description,
      technologies: technologies ? technologies.split(',') : project.technologies
    };

    // Handle image update if new file was uploaded
    if (req.file) {
      // Upload new image to Cloudinary
      cloudinaryResult = await uploadToCloudinary(req.file);
      
      // Delete old image from Cloudinary
      if (project.imagePublicId) {
        await cloudinary.uploader.destroy(project.imagePublicId);
      }

      updatedData.image = cloudinaryResult.secure_url;
      updatedData.imagePublicId = cloudinaryResult.public_id;
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id, 
      updatedData, 
      { new: true }
    );

    res.json({ 
      message: 'Project updated successfully!', 
      project: updatedProject 
    });
  } catch (err) {
    console.error('Error updating project:', err);
    
    // Clean up uploaded image if update failed
    if (req.file && cloudinaryResult?.public_id) {
      await cloudinary.uploader.destroy(cloudinaryResult.public_id);
    }
    
    res.status(500).json({ 
      error: 'Error updating project.' 
    });
  }
};

// Delete a project
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ 
        error: 'Project not found.' 
      });
    }

    // Delete image from Cloudinary
    if (project.imagePublicId) {
      await cloudinary.uploader.destroy(project.imagePublicId);
    }

    await Project.findByIdAndDelete(req.params.id);
    
    res.json({ 
      message: 'Project deleted successfully!' 
    });
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).json({ 
      error: 'Error deleting project.' 
    });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject
};
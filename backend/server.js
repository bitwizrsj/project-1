const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");
const projectRoutes = require("./routes/projectRoutes"); // Import new project routes
const blogRoutes = require("./routes/blogRoutes"); // Import new blog routes
const multer = require("multer");
const nodemailer = require("nodemailer");
const Application = require('./models/Application');
const ContactMessage = require('./models/ContactMessage');
const testimonialRoutes = require("./routes/testimonialRoutes");

dotenv.config({ path: "./.env" });

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true, optionsSuccessStatus: 200 }));

// Static file serving for uploads
app.use("/uploads", express.static("uploads"));

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/projects", projectRoutes); // Add project routes here
app.use("/api/blogs", blogRoutes); // Add blog routes here
app.use("/api/testimonials", testimonialRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// Configure Multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail
    pass: process.env.EMAIL_PASS, // Your App Password
  },
});

// Job application endpoint (updated)
app.post("/api/apply", upload.single("resume"), async (req, res) => {
  try {
    const { job_title, user_name, user_email, user_phone, message } = req.body;
    const resumePath = req.file.path;

    // Save to MongoDB
    const newApplication = new Application({
      job_title,
      user_name,
      user_email,
      user_phone,
      message,
      resume: resumePath
    });
    await newApplication.save();

    // Send email notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "rohitsj27@gmail.com",
      subject: `New Job Application for ${job_title}`,
      text: `
        Name: ${user_name}
        Email: ${user_email}
        Phone: ${user_phone}
        Cover Letter: ${message}
      `,
      attachments: [{ filename: req.file.originalname, path: resumePath }],
    };

    await transporter.sendMail(mailOptions);

    res.json({ 
      message: "Application submitted successfully!",
      application: newApplication
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to process application." });
  }
});

// Contact form endpoint (updated)
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Save to MongoDB
    const newMessage = new ContactMessage({
      name,
      email,
      message
    });
    await newMessage.save();

    // Send email notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "rohitsj27@gmail.com",
      subject: `New Contact Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ 
      success: true, 
      message: "Message sent successfully",
      contactMessage: newMessage
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to process message" 
    });
  }
});

// Get all applications
app.get('/api/applications', async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching applications' });
  }
});

// Get all contact messages
app.get('/api/contact-messages', async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching messages' });
  }
});

// Delete application
app.delete('/api/applications/:id', async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.json({ message: 'Application deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting application' });
  }
});

// Delete message
app.delete('/api/contact-messages/:id', async (req, res) => {
  try {
    await ContactMessage.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting message' });
  }
});

// 404 error handling
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found." });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({ error: "Internal server error." });
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

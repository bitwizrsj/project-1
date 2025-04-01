const Job = require("../models/Job");

exports.createJob = async (req, res) => {
    try {
        const newJob = new Job(req.body);
        await newJob.save();
        res.status(201).json(newJob);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to create job." });
    }
};

exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to fetch jobs." });
    }
};

exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ error: "Job not found." });
        }
        res.status(200).json(job);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to fetch job." });
    }
};

exports.updateJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!job) {
            return res.status(404).json({ error: "Job not found." });
        }
        res.status(200).json(job);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to update job." });
    }
};

exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) {
            return res.status(404).json({ error: "Job not found." });
        }
        res.status(200).json({ message: "Job deleted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to delete job." });
    }
};

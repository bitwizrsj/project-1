const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    salary: {
        type: String,
        required: true,
    },
    postedAt: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;

const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    icon: {
        type: String,  // We store the icon as a string, ideally a URL or an identifier
        required: true,
    },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;

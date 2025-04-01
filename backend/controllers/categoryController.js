const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
    try {
        const newCategory = new Category(req.body);
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to create category." });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to fetch categories." });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ error: "Category not found." });
        }
        res.status(200).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to fetch category." });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) {
            return res.status(404).json({ error: "Category not found." });
        }
        res.status(200).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to update category." });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ error: "Category not found." });
        }
        res.status(200).json({ message: "Category deleted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unable to delete category." });
    }
};

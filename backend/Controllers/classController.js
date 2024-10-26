const mongoose = require("mongoose");
const classModel = require("../Models/classModel");

const createClass = async (req, res) => {
    const { title, details, banner, category, price } = req.body;

    try {
        const newClass = new classModel({
            title,
            details,
            banner,
            category,
            price,
        });

        const savedClass = await newClass.save();
        res.status(201).json(savedClass);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllClass = async (req, res) => {
    try {
        const allClass = await classModel.find({});
        res.status(200).json(allClass);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateClass = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid ID" });
    }

    try {
        const updatedClass = await classModel.findByIdAndUpdate(id, req.body, { new: true });
        if (updatedClass) {
            res.status(200).json(updatedClass);
        } else {
            return res.status(404).json({ error: "Class not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteClass = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid ID" });
    }

    try {
        const deletedClass = await classModel.findByIdAndDelete(id);
        if (deletedClass) {
            res.status(200).json({ message: "Class deleted successfully", deletedClass });
        } else {
            return res.status(404).json({ error: "Class not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createClass,
    getAllClass,
    updateClass,
    deleteClass,
};

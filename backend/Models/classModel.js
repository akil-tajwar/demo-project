const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    details: {
        type: String
    },
    banner: {
        type: String,
    },
    category: {
        type: String,
    },
    price: {
        type: String,
    },
}, { timestamps: true });

const classModel = mongoose.model("classCollection", classSchema);

module.exports = classModel;

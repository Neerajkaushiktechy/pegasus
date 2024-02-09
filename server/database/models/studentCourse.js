const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    coursename: {
        type: String,
        trim: true
    },
    roleId: {
        type: String,
        trim: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        trim: true,
    },
}, { timestamps: true });

let StudentCourse = mongoose.model("studentcourse", schema);
module.exports = StudentCourse;
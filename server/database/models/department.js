const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    departmentName: {
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

let Department = mongoose.model("department", schema);
module.exports = Department;
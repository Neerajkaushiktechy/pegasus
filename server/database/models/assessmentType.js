const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    assessmentName: {
        type: String,
        trim: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    roleId: {
        type: Number,
    },
    type: {
        type: String,
        trim: true
    },
}, { timestamps: true });

module.exports = mongoose.model('assessmentTypes', schema);
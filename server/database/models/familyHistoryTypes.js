const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
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

module.exports = mongoose.model("familyHistoryTypes", schema, "familyHistoryTypes");

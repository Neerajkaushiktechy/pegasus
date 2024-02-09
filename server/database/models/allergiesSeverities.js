const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    severities: {
        type: String,
        trim: true,
        required: [true, 'Status is requied']
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

let AllergiesSeverities = mongoose.model("allergiesSeverities ", schema, "allergiesSeverities ");
module.exports = AllergiesSeverities;
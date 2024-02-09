const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    reaction: {
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

let AllergiesReaction = mongoose.model("allergiesReaction", schema, "allergiesReaction");
module.exports = AllergiesReaction;
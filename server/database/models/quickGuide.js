const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    categoryName: {
        type: String,
        trim: true,
        required: [true, "categoryName  is requied"],
    },
    title: {
        type: String,
        trim: true,
        required: [true, "Title  is requied"],
    },
    description: {
        type: String,
        trim: true,
        required: [true, "description  is requied"],
    },
    file: {
        type: Array,
        required: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    isDeleted : {
        type : Boolean,
        default : false

    },
    roleId: {
        type: Number,
        trim: true,
        required: [true, 'RoleId is requied']
    },
}, {
    timestamps: true
})
let quickGuideSchema = mongoose.model('quickGuides', schema);
module.exports = quickGuideSchema
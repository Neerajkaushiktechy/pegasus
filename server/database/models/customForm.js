const mongoose = require('mongoose');
const schema = new mongoose.Schema(
    {
    formName: {
        type: String,
        trim: true,
        required: [true, "formName is requied"],
    },
    fields: {
        type: Array,
        required: [true, "field is requied"],
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    modifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
}, {
    timestamps: true
})
module.exports = mongoose.model('customForms', schema);
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    pId: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: [true, 'Patient Id is requied']
    },
    status: {
        type: String,
        trim: true,
        // required: [true, 'Status is requied']
    },
    allergy: {
        type: String,
        trim: true,
        // required: [true, 'Allergy is requied']
    },
    dateOnset: {
        type: Date,
        trim: true
    },
    reaction: {
        type: String,
        trim: true,
    },
    severities: {
        type: String,
        trim: true,
    },
    comment: {
        type: String,
        trim: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    roleId: {
        type: Number,
    },
    formStatus: {
        type: Number,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    submittedTime: {
        type: String,
    },
    assignmentId: {
        type: String,
    },
}, { timestamps: true });

let PatientAllergies = mongoose.model("patientAllergies", schema);
module.exports = PatientAllergies;
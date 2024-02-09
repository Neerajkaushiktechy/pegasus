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
        required: [true, 'Status is requied']
    },
    medicine: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        ref: 'masterMedication',
        // required: [true, 'medicine is requied']
    },
    medication: {
        type: String,
        trim: true,
        // required: [true, 'medication is requied']
    },
    dose: {
        type: String,
        trim: true,
    },
    unit: {
        type: String,
        trim: true,
    },
    route: {
        type: String,
        trim: true,
    },
    frequency: {
        type: String,
        trim: true,
    },
    directions: {
        type: String,
        trim: true,
    },
    duration: {
        type: String,
        trim: true,
    },
    ptInstructions: {
        type: String,
        trim: true,
    },
    quantity: {
        type: Number,
        trim: true,
    },
    refill: {
        type: Number,
        trim: true,
    },
    reasonRx: {
        type: String,
        trim: true,
    },
    prescriber: {
        type: String,
        trim: true,
    },
    file: {
        type: String,
        trim: true,
    },
    startOn: {
        type: Date,
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

let PatientMedication = mongoose.model("patientMedication", schema);
module.exports = PatientMedication;
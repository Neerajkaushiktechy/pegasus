const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    nameTitle: {
        type: String,
        trim: true,
        required: [true, 'Name Title is requied']
    },
    fName: {
        type: String,
        trim: true,
        required: [true, 'First Name is requied']
    },
    lName: {
        type: String,
        trim: true,
        required: [true, 'Last Name is requied']
    },
    gender: {
        type: String,
        trim: true,
        enum: ['Male', 'Female', "Other"],
        required: [true, 'Gender is requied']
    },
    dob: {
        type: Date,
        trim: true,
        required: [true, 'Date of birth is requied']
    },
    email: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    referredBy: {
        type: String,
        trim: true
    },
    country: {
        type: String,
        trim: true,
    },
    state: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
    zipCode: {
        type: String,
        trim: true,
    },
    address1: {
        type: String,
        trim: true,
    },
    address2: {
        type: String,
        trim: true
    },
    avatar: {
        type: String,
        trim: true,
    },
    observation: {
        type: String,
        trim: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    createdBySchoolName: {
        type: String,
        trim: true
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
}, { timestamps: true });

let PatientsDemographic = mongoose.model("patientdemographic", schema, "patientdemographic");
module.exports = PatientsDemographic;
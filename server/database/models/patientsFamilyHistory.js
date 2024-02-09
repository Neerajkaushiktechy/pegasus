const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    pId: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: [true, 'Patient Id is requied']
    },
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
    relation: {
        type: String,
        trim: true,
    },
    isAlive: {
        type: Boolean,
        trim: true
    },
    dod: {
        type: Date,
        trim: true,
    },
    causeDeath: {
        type: String,
        trim: true,
    },
    observation: {
        type: String,
        trim: true
    },
    diseaseList: {
        type: [
            {
                disease: {
                    type: String,
                    trim: true,
                    // required: [true, 'Disease requied']
                },
                diseaseStatus: {
                    type: String,
                    trim: true,
                    // required: [true, 'Disease Status requied']
                },
                ageOfDiagnosis: {
                    type: String,
                    trim: true,
                    // required: [true, 'Age of diagnosis requied']
                },
            }
        ],
        trim: true
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

let PatientsFamilyHistory = mongoose.model("patientsFamilyHistory", schema);
module.exports = PatientsFamilyHistory;
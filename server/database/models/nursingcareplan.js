const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    pId: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: [true, 'Patient Id is requied']
    },
    nursingCarePlan: {
        type: String,
        trim: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    createdByName: {
        type: String,
        trim: true,
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

let PatientNursingcarePlan = mongoose.model("patientNursingcarePlan", schema);
module.exports = PatientNursingcarePlan;
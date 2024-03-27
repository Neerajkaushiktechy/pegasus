const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "student",
        trim: true
    },
    assessmentId: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        ref: "assessmentTool"
    },
    assignmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "assignment"
    },
    assessmentGroupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "assessmentGroup"
    },
    status: {
        type: Number,
        default: 0
    },
    grade: {
        type: String,
        trim: true
    },
    comment: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        trim: true
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        ref: "patientdemographic"
    },
    submittedTime: {
        type: String,
    },
    endDate: {
        type: Date,
        trim: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

let StudentAssignmentStatus = mongoose.model("studentAssignmentStatus", schema, "studentAssignmentStatus");
module.exports = StudentAssignmentStatus;
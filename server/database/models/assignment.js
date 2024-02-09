const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    assessmentType: {
        type: String,
        trim: true,
        required: [true, 'Assessment Type is requied']
    },
    assessmentToolList: {
        type: [],
        trim: true,
        ref: "assessmentTool",
        required: [true, 'Assessment List is requied']
    },
    assessmentGroupList: {
        type: [],
        trim: true,
        ref: "assessmentGroup",
        required: [true, 'Assessment List is requied']
    },
    department: {
        type: String,
        trim: true,
        // required: [true, 'Department List is requied']
    },
    students: {
        type: [],
        trim: true,
        ref: "student",
        required: [true, 'Students List is requied']
    },
    patient: {
        type: mongoose.Types.ObjectId,
        trim: true,
        ref: "patientdemographic",
        required: [true, 'Patient List is requied']
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        trim: true,
        required: [true, 'CreatedBy is requied']
    },
    endDate: {
        type: Date,
        trim: true,
        required: [true, 'End Date is requied']
    },
    roleId: {
        type: Number,
        trim: true,
        required: [true, 'RoleId is requied']
    },
    isDeleted: {
        type: Boolean,
        default: false
    },

}, { timestamps: true });

let Assignment = mongoose.model("assignment", schema, "assignments");
module.exports = Assignment;
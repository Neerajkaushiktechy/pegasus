const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    assessmentTitle: {
        type: String,
        trim: true,
        required: [true, 'Assessment Title is requied']
    },
    module: {
        type: String,
        trim: true,
    },
    duration: {
        type: String,
        trim: true,
        required: [true, 'Duration is requied']
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: function () {
            if (this.roleId === 1) {
              return "user";
            } else if (this.roleId === 3) {
              return "school";
            }
          },
        trim: true,
        required: [true, 'Created By is requied']
    },
    
    roleId: {
        type: Number,
        trim: true,
        required: [true, 'Assesment Type is requied']
    },
    assesmentType: {
        type: String,
        trim: true,
        ref: 'assessmentTypes',
        required: [true, 'Assesment Type is requied']
    },
    isassesmentType: {
        type: Boolean,
    },
    objectives: {
        type: String,
        trim: true,
        required: [true, 'Objectives is requied']
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'Description is requied']
    },
    file: {
        type: String,
        trim: true,
    },
    status: {
        type: Number,
        trim: true,
        default: 0
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    assignmentStatusId: {
        type: String,
        default: ""
    }
}, { timestamps: true });

let AssessmentTool = mongoose.model("assessmentTool", schema, "assessmenttools");
module.exports = AssessmentTool;
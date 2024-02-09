const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    status : {
        type : Boolean,
        trim: true,
        required: [true, 'Status is requied']
    },
    assessmentTitle : {
        type : String,
        trim: true,
        required: [true, 'Assessment Title is requied']
    },
    assessmentList:{
        type : [],
        trim: true,
        ref: "assessmentTool",
        required: [true, 'Assessment List is requied']
    },
    createdBy:{
        type : mongoose.Types.ObjectId,
        trim: true,
        required: [true, 'Assesment Type is requied']
    },
    roleId :  {
        type : Number,
        trim: true,
        required: [true, 'Assesment Type is requied']
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
  
},{ timestamps: true });

let AssessmentGroup = mongoose.model("assessmentGroup",schema,"assessmentgroups");
module.exports = AssessmentGroup;
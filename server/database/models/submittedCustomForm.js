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
        assignmentId: {
            type: String,
        },
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "patientdemographic"
        },
        submittedTime: {
            type: String,
        },
        percentageAverageMarks: {
            type: String,
        },
    }, {
    timestamps: true
})
let SubmittedCustomForm = mongoose.model("submittedCustomForm", schema, "submittedCustomForm");
module.exports = SubmittedCustomForm;
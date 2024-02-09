const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    pId: {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      required: [true, "Patient Id is requied"],
    },
    file: {
      type: String,
      trim: true,
      // required: [true, "File is requied"],
    },
    name: {
      type: String,
      trim: true,
      required: [true, "Name is requied"],
    },
    date: {
      type: Date,
      trim: true,
      required: [true, "Date is requied"],
    },
    documentType: {
      type: String,
      trim: true,
      required: [true, "DocumentType is requied"],
    },
    provider: {
      type: String,
      trim: true,
    },
    notes: {
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
  },
  { timestamps: true }
);

let PatientDocument = mongoose.model("patientDocument", schema);
module.exports = PatientDocument;

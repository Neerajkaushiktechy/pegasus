const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    pId: {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      required: [true, "Patient Id is requied"],
    },
    status: {
      type: String,
      // required: [true, "Status is requied"],
    },
    description: {
      type: String,
      trim: true,
      // required: [true, "Description is requied"],
    },
    domainClass: new mongoose.Schema({
      name: String,
      classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "daignosisMasterClasses",
        default: null,
        // required: [true, "Domain Class is requied"],
      },
    }),
    startDate: {
      type: Date,
      trim: true,
      // required: [true, "Date is requied"],
    },
    editDate: {
      type: Date,
      trim: true,
    },
    type: {
      type: String,
      trim: true,
      required: [true, "Type is requied"],
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
  },
  { timestamps: true }
);

let Patientdiagnosis = mongoose.model("patientdiagnosis", schema);
module.exports = Patientdiagnosis;

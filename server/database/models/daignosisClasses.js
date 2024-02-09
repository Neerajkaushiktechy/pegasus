const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    list: {
      type: Array,
      trim: true,
    },
    domainId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "daignosisDomains",
    },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "daignosisMasterClasses",
    },
    roleId: {
      type: String,
      trim: true
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      trim: true,
    },
  },
  { timestamps: true }
);

let DaignosisClasses = mongoose.model(
  "daignosisClasses",
  schema,
  "daignosisClasses"
);
module.exports = DaignosisClasses;

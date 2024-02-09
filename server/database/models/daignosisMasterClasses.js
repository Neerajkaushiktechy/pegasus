const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
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

let DaignosisMasterClasses = mongoose.model(
  "daignosisMasterClasses",
  schema,
  "daignosisMasterClasses"
);
module.exports = DaignosisMasterClasses;

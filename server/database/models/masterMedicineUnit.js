const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    unit: {
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

let MasterMedicationUnit = mongoose.model("masterMedicationUnit", schema, "masterMedicationUnit");
module.exports = MasterMedicationUnit;
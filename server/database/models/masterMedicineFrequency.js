const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    frequency: {
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

let MasterMedicationFrequency = mongoose.model("masterMedicationFrequency", schema, "masterMedicationFrequency");
module.exports = MasterMedicationFrequency;
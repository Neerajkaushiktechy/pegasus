const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    duration: {
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

let MasterMedicationDuration = mongoose.model("masterMedicationDuration", schema, "masterMedicationDuration");
module.exports = MasterMedicationDuration;
const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    directions: {
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

let MasterMedicationDirection = mongoose.model("masterMedicationDirection", schema, "masterMedicationDirection");
module.exports = MasterMedicationDirection;
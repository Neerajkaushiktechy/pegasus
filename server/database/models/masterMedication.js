const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    uses: {
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

let MasterMedication = mongoose.model("masterMedication", schema, "masterMedication");
module.exports = MasterMedication;

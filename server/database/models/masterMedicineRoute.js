const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    route: {
      type: String,
      trim: true,
    },
    customRoutestatus: {
      type: Number,
      default: 0
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

let MasterMedicationRoute = mongoose.model("masterMedicationRoute", schema, "masterMedicationRoute");
module.exports = MasterMedicationRoute;
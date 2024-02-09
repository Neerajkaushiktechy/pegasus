const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    icd10Problem: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

let MasterDaignosis = mongoose.model(
  "masterDaignosis",
  schema,
  "masterDaignosis"
);
module.exports = MasterDaignosis;

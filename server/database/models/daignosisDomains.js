const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

let DaignosisDomains = mongoose.model(
  "daignosisDomains",
  schema,
  "daignosisDomains"
);
module.exports = DaignosisDomains;

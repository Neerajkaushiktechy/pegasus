const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    documentType: {
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

let DocumentType = mongoose.model("documentType", schema, "documentType");
module.exports = DocumentType;

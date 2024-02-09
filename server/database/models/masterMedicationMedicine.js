const mongoose = require("mongoose");
const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
        },
        list: {
            type: Array,
            trim: true,
        },
        medicationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "masterMedication",
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

let MasterMedicationMedicine = mongoose.model("masterMedicationMedicine", schema, "masterMedicationMedicine");
module.exports = MasterMedicationMedicine;

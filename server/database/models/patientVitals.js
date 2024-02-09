const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    pId: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: [true, 'Patient Id is requied']
    },
    date: {
        type: Date,
        trim: true,
        required: true
    },
    time: {
        type: String,
        trim: true
    },
    bloodPressure: {
        type: {
            mm: {
                type: String,
                trim: true
            },
            hg: {
                type: String,
                trim: true
            }
        },
        trim: true
    },
    height: {
        type: {
            value: {
                type: String,
                trim: true
            },
            measureType: {
                type: String,
                trim: true
            }
        },
        trim: true
    },
    headCirc: {
        type: {
            value: {
                type: String,
                trim: true
            },
            measureType: {
                type: String,
                trim: true
            }
        },
        trim: true
    },
    heartRate: {
        type: String,
        trim: true
    },
    weight: {
        type: {
            value: {
                type: String,
                trim: true
            },
            measureType: {
                type: String,
                trim: true
            }
        },
        trim: true
    },
    tempature: {
        type:
        {
            value: {
                type: String,
                trim: true
            },
            measureType: {
                type: String,
                trim: true
            }
        },
        trim: true
    },
    respiratoryRate: {
        type: String,
        trim: true
    },
    bmi: {
        type: String,
        trim: true
    },
    spo2: {
        type: String,
        trim: true
    },
    inhaledO2: {
        type: String,
        trim: true
    },
    Unspecified: {
        type: Boolean,
        trim: true
    },
    oxygenSupply: {
        type: String,
        trim: true
    },
    comment: {
        type: String,
        trim: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    roleId: {
        type: Number,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    submittedTime: {
        type: String,
    },
    assignmentId: {
        type: String,
    },
}, { timestamps: true });

let PatientsVitals = mongoose.model("patientsVitals", schema);
module.exports = PatientsVitals;
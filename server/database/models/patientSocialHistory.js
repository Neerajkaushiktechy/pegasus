const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    pId: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        required: [true, 'Patient Id is requied']
    },
    tobaccoUse: {
        type: {
            value: {
                type: String,
                trim: true
            },
            effectiveDate: {
                type: String,
                trim: true
            },
            typeOfTobacco: {
                type: String,
                trim: true
            }
        },
        trim: true
    },
    socialHistory: {
        type: String,
        trim: true
    },
    alcoholUse: {
        type: {
            value: {
                type: String,
                trim: true
            },
            standardDrinks: {
                type: String,
                trim: true
            },
            occasionDrink: {
                type: String,
                trim: true
            }
        },
        trim: true
    },
    financial: {
        type: String,
        trim: true
    },
    education: {
        type: String,
        trim: true
    },
    alcoholType: {
        type: String,
        trim: true
    },
    typeofAlcohol: {
        type: String,
        trim: true
    },
    physicalActivity: {
        declineQues: {
            type: Boolean,
            trim: true
        },
        exerciseDays: {
            type: String,
            trim: true
        },
        exerciseMinutes: {
            type: String,
            trim: true
        },
        value: {
            type: String,
            trim: true
        },
    },
    stress: {
        type: String,
        trim: true
    },
    socialIsolation: {
        declineQues: {
            type: Boolean,
            trim: true
        },
        marriedStatus: {
            type: String,
            trim: true
        },
        livingWith: {
            type: String,
            trim: true
        },
        talkTime: {
            type: String,
            trim: true
        },
        meetTime: {
            type: String,
            trim: true
        }
    },
    violence: {
        declineQues: {
            type: Boolean,
            trim: true
        },
        emotional: {
            type: Boolean,
            trim: true
        },
        afraid: {
            type: Boolean,
            trim: true
        },
        hurt: {
            type: Boolean,
            trim: true
        }
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

let PatientSocialHistory = mongoose.model("patientSocialHistory", schema);
module.exports = PatientSocialHistory;
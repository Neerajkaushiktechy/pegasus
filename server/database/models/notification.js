const mongoose = require('mongoose');
const notificationSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    read: {
        type: Number,
        default: 0
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    assessmentId: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        ref: "assessmentTool"
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student'
    },
    assignmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'assignment'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Notification', notificationSchema);

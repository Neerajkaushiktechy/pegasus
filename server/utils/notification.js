const notificationModal = require('../database/models/notification')
const User = require('../database/models/user')
const School = require('../database/models/school')
exports.notificationService = async (studenttId, assignmentId, assessmentId, req) => {
    try {
        let notification = new notificationModal({
            createdBy: req.userId,
            updatedBy: req.userId,
            studentId: studenttId,
            assessmentId: assessmentId,
            message: "Assignment Assigned By",
            assignmentId: assignmentId
        })
        await notification.save();
        notification.populate('assessmentId')
        await User.populate(notification, { path: "createdBy" })
        await School.populate(notification, { path: "createdBy" })
        req.io.to(studenttId).emit('notification', notification)
    }
    catch (err) {
      
    }
}



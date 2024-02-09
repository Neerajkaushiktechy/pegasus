const notificationModal = require('../../database/models/notification');
const User = require('../../database/models/user');
const School = require('../../database/models/school')
exports.getNotificationList = async (req, res) => {
    try {
        const notification = await notificationModal.find({
            studentId: req.userId,
        }).populate('assessmentId').sort({ createdAt : -1 })
        await User.populate(notification, { path: "createdBy" })
        await School.populate(notification, { path: "createdBy" })
        if (!notification) {
            return res.status(400).json({ success: true, data: [], message: "Data not found" });
        }
        return res.status(200).json({ success: true, message: "Notification Data found", data: notification });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "There is some error please try again later",
        });
    }

}


exports.updateNotificationReadStatus = async (req, res) => {
    try {
        await notificationModal.updateMany({ studentId : req.userId}, { read : 1});
        return res.status(200).json({ success: true, message: "Notification updated successfully" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "There is some error please try again later",
        });
    }
};
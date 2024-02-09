const express = require("express");
const router = new express.Router();
const notificationController = require('../controllers/notification/notification')

router.get("/notification", notificationController.getNotificationList);
router.put("/notification", notificationController.updateNotificationReadStatus);
module.exports = router
const express = require("express");
const router = new express.Router();
const quickGuideController = require('../controllers/quickGuide/quickGuide');
const uploadQuickGuide = require('../middleware/uploadFile')
router.post("/quickguide", quickGuideController.addQuickGuide);
router.put('/updateQuickGuideAttachement/:id', uploadQuickGuide.uploadQuickGuidefile('quickGuideFiles'), quickGuideController.addQuickGuideAttachment)
router.get("/quickguide", quickGuideController.getQuickGuide);
router.get("/quickguide/:id", quickGuideController.getQuickGuide);
router.put("/quickguide/:id", uploadQuickGuide.uploadQuickGuidefile('quickGuideFiles') , quickGuideController.updateQuickGuide);
router.delete("/quickguide/:id", quickGuideController.deleteQuickGuide);
router.get("/quickguidedoc/:id/filename/:fileName", quickGuideController.getQuickGudeDocumet);
module.exports = router;
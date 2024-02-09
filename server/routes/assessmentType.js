const express = require("express");
const router = new express.Router();
const assessmentTypeController = require("../controllers/setting/assessmentTypes");

router.post("/assessmentType", assessmentTypeController.addAssessmentType);
router.get("/assessmentType", assessmentTypeController.getAssessmentType);
router.put("/assessmentType/:id", assessmentTypeController.updateAssessmentType);
router.delete("/assessmentType/:id", assessmentTypeController.deleteAssessmentType);
module.exports = router;

const express = require("express");
const router = new express.Router();
const AssessmentTool = require("../controllers/setting/assessmentTool");
const AssessmentGroup = require("../controllers/setting/assessmentGroup");

const uploadFile = require("../middleware/uploadFile");


router.post("/assessmentTool",uploadFile.uploadAssessment("file"),AssessmentTool.postAssessment);
router.get("/assessmentTool", AssessmentTool.getAssessment);
router.put("/assessmentTool/:id",uploadFile.uploadAssessment("file"), AssessmentTool.updateAssessment);
router.delete("/assessmentTool/:id", AssessmentTool.deleteAssessment);
router.get("/assessmentFile/:fileName", AssessmentTool.getAssessmentFile);


router.post("/assessmentGroup",AssessmentGroup.postAssessmentGroup);
router.get("/assessmentGroup", AssessmentGroup.getAssessmentGroup);
router.put("/assessmentGroup/:id",AssessmentGroup.updateAssessmentGroup);
router.delete("/assessmentGroup/:id", AssessmentGroup.deleteAssessmentGroup);



module.exports = router;
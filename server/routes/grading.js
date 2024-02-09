const express = require("express");
const router = new express.Router();
const gradingController = require("../controllers/grading/grading");

router.get("/grading", gradingController.getGradeList);
router.put("/grading/:id", gradingController.updateGrade);
router.get("/gradingFormData", gradingController.gradingFormData);
module.exports = router;
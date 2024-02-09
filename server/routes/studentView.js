const express = require('express');
const router = express.Router();
const StudentAssignmentController = require('../controllers/StudentView/studentAssignment');

// router.get("/myAssignment", StudentAssignmentController.getMyAssignment);
router.get("/myAssignment/:studentId", StudentAssignmentController.getMyAssignment);
router.get("/myAssignmentDetail/:id/:assId/:studentId", StudentAssignmentController.getMyAssignmentDetail);

router.get("/myAssignmentStatus/:id", StudentAssignmentController.getMyAssignmentStatus);
router.post("/myAssignmentStatus", StudentAssignmentController.postMyAssignmentStatus);
router.put("/myAssignmentStatus/:id", StudentAssignmentController.updateMyAssignmentStatus);
router.get("/myCustomAssignmentForm/:name", StudentAssignmentController.myCustomAssignmentForm);
router.get("/myGrades/:studentId", StudentAssignmentController.getMyGrades);
router.put("/updateAssignmnetSubmissionDate/:id", StudentAssignmentController.updateAssignmnetDate);

module.exports = router;
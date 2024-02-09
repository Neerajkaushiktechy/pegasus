const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/student/student');
router.post('/student', StudentController.addStudent)
router.get("/student", StudentController.getStudent);
router.get("/student/:id", StudentController.getStudent);
router.put("/student/:id", StudentController.updateStudent);
router.delete("/student/:id", StudentController.deleteStudent);
router.post('/student/checkemail',StudentController.checkEmail)
router.post('/student/signIn', StudentController.signIn)

module.exports = router;
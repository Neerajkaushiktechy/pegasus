const express = require('express');
const router = express.Router();
const SchoolController = require('../controllers/school/school');
router.post('/school', SchoolController.addSchool)
router.get("/school", SchoolController.getSchool);
router.get("/school/:id", SchoolController.getSchool);
router.put("/school/:id", SchoolController.updateSchool);
router.delete("/school/:id", SchoolController.deleteSchool);
router.post('/school/checkemail', SchoolController.checkEmail)
router.post('/school/signIn', SchoolController.signIn)
router.post('/school/checkUserId', SchoolController.checkUserId)

module.exports = router;
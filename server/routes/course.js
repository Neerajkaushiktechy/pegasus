const express = require("express");
const router = new express.Router();
const courseController = require("../controllers/student/course");

router.post("/course", courseController.addCourse);
router.get("/course", courseController.getCourse);
router.get("/course/:id", courseController.getCourse);
router.put("/course/:id", courseController.updateCourse);
router.delete("/course/:id", courseController.deleteCourse);
module.exports = router;

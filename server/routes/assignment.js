const express = require("express");
const router = new express.Router();
const Assignment = require("../controllers/assignment/assignment");

router.post("/assignment",Assignment.postAssignment);
router.get("/assignment", Assignment.getAssignment);
router.put("/assignment/:id",Assignment.updateAssignment);
router.delete("/assignment/:id", Assignment.deleteAssignment);

module.exports = router;
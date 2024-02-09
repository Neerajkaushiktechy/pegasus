const express = require("express");
const router = new express.Router();
const FamilyHistoryTypeController = require("../controllers/Patient/familyHistoryType");

router.post("/familyType", FamilyHistoryTypeController.addFamilyHistoryType);
router.get("/familyType", FamilyHistoryTypeController.getFamilyHistoryType);
module.exports = router;

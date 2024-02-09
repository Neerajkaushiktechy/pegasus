const express = require("express");
const router = new express.Router;
const user = require("../controllers/user");

router.get("/getUser",user.getUser);
router.get("/getUser:id",user.getUser);

module.exports = router;
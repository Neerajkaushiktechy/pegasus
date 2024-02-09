const express = require("express")
const router = new express.Router;
const authController = require("../controllers/authorganization/authorganization")

router.post("/register",authController.register);
router.post("/signIn",authController.signIn);
router.post('/forgotPaasword',authController.forgotPaasword);
router.post('/resetpassword',authController.changePassword)
router.post('/create-password', authController.createNewPassword)

module.exports = router;
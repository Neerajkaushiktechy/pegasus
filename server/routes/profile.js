const express = require("express");
const router = new express.Router;
const ProflleController = require('../controllers/profile/profile');
const uploadProfile = require('../middleware/uploadFile')
router.get("/getProfile", ProflleController.getProfile);
router.put("/updateProfile", uploadProfile.uploadProfile('profilePic') , ProflleController.updateProfile);
router.post('/change-password', ProflleController.changePassword);
router.get("/profilephoto/:userId/:fileName", ProflleController.getProfileImage);
module.exports =router
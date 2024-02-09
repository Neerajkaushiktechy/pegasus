const express = require("express");
const router = new express.Router();
const customFormController = require('../controllers/customForm/customForm')
router.post('/customForm', customFormController.addCustomForm)
router.post('/checkCustomFormExist', customFormController.checkCustomFormExist)
router.post('/submitCustomForm', customFormController.submitCustomForm)
router.get('/singleCustomForm/:formName', customFormController.singleCustomForm)
module.exports = router;
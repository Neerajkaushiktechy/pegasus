const customForm = require('../../database/models/customForm');
const SubmittedCustomForm = require('../../database/models/submittedCustomForm');
const StudenAssignmentStatus = require('../../database/models/studentAssignmentStatus')
const CustomFrom = require('../../database/models/customForm')
const AssessMentTpes = require("../../database/models/assessmentType");
exports.addCustomForm = async (req, res) => {
    let { formData,
        formName, customFormId } = req.body
    try {
        if (!formData || !formName) {
            return res.status(400).json({
                message: "All input is required",
                success: false
            });
        }
        let params = {
            formName,
            fields: formData,
            createdBy: req.userId,
            updatedBy: req.userId,
            modifiedBy: req.userId,
        }
        if (customFormId !== "" && customFormId !== undefined) {
            await customForm.findByIdAndUpdate({ _id: customFormId }, { $set: params }, { new: true })
        }
        else {
            let saveForm = await new customForm(params)
            await saveForm.save();
            let createAssessmentType = new AssessMentTpes({
                assessmentName: saveForm.formName,
                createdBy: req.userId,
                roleId: req.roleId,
                type: "Custom Form"
            });
            await createAssessmentType.save();
        }


        return res.status(200).json({
            success: true,
            message: "Form  created successfully",
            data: {},
        });
    }
    catch (err) {
        console.log('err', err)
        return res.status(400).json({
            success: false,
            message: "There is some problem please try again later",
        });
    }

}


exports.checkCustomFormExist = async (req, res) => {
    let { formData } = req.body;
    try {
        if (!formData) {
            return res.status(400).json({
                message: "Input is required",
                success: false,
            });
        }
        let checkName = await customForm.findOne({
            formName: { $regex: new RegExp(`^${formData}$`, "i") },
        });
        if (checkName) {
            return res
                .status(400)
                .json({ success: false, message: "Form name already exists" });
        }
        return res.status(200).json({ success: true, message: "" });
    } catch (err) {
        console.log("err", err);
        return res.status(400).json({
            success: false,
            message: "There is some problem, please try again later",
        });
    }
};



async function getAverage(formName, formData) {
    let customForm = await CustomFrom.findOne({ formName: formName });
    let correctFeilds = 0;
    let totalFields = 0;
    formData.forEach((data) => {
        if (
            data.inputType === "select" ||
            data.inputType === "checkbox" ||
            data.inputType === "multicheckbox" ||
            data.inputType === "radiogroup"
        ) {
            totalFields += 1;
            customForm.fields.forEach((customField) => {
                if (
                    data.id === customField.id &&
                    data.inputType === customField.inputType &&
                    (
                        (data.inputType === "multicheckbox" && arraysAreEqual(data.defaultValue, customField.defaultValue)) ||
                        (data.inputType !== "multicheckbox" && data.defaultValue === customField.defaultValue)
                    )
                ) {
                    correctFeilds += 1;
                }
            });
        }
    });
    let percentageAverageMarks = (correctFeilds / totalFields) * 100
    return percentageAverageMarks;
}


function arraysAreEqual(arr1, arr2) {
    if (arr1?.length !== arr2?.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

exports.submitCustomForm = async (req, res) => {
    let { formData, formName, assignmentId, patientId, submittedTime, studentAssignmentSatusId } = req.body;
    try {
        if (!formData || !formName) {
            return res.status(400).json({
                message: "All input is required",
                success: false
            });
        }
        let percentageAverageMarks = await getAverage(formName, formData)
        let saveForm = await new SubmittedCustomForm({
            formName,
            fields: formData,
            createdBy: req.userId,
            updatedBy: req.userId,
            assignmentId,
            patientId,
            submittedTime,
            percentageAverageMarks,
        });
        await saveForm.save();
        let saveMarks = await StudenAssignmentStatus.findByIdAndUpdate({ _id: studentAssignmentSatusId }, {
            $set: {
                grade: percentageAverageMarks
            }
        });
        await saveMarks.save();
        return res.status(200).json({
            success: true,
            message: "Form submitted successfully",
            data: {},
        });
    } catch (err) {
        console.log('err', err);
        return res.status(400).json({
            success: false,
            message: "There is some problem please try again later",
        });
    }
};



exports.singleCustomForm = async (req, res) => {
    let cutomFormName = (atob(req.params.formName));
    try {
        let data = await CustomFrom.findOne({ formName: cutomFormName })
        return res
            .status(200)
            .json({ success: true, message: "Custom form Fetched successfully", data });
    } catch (error) {
        console.log('err', error)
        return res.status(400).json({
            success: false,
            message: "There is some error please try again later",
        });
    }
};
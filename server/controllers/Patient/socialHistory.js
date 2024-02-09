
const PatientSocialHistory = require("../../database/models/patientSocialHistory");

exports.postSocialHistory = async (req, res) => {

    let {
        pId,
        tobaccoUse,
        alcoholUse,
        typeofAlcohol,
        socialHistory,
        financial,
        education,
        physicalActivity,
        stress,
        socialIsolation,
        violence,
        submittedTime,
        assignmentId,
        alcoholType
    } = req.body;

    let newData = new PatientSocialHistory({
        pId,
        tobaccoUse,
        alcoholUse,
        typeofAlcohol,
        socialHistory,
        financial,
        education,
        physicalActivity,
        stress,
        socialIsolation,
        violence,
        createdBy: req.userId,
        updatedBy: req.userId,
        roleId: req.roleId,
        submittedTime,
        assignmentId,
        alcoholType
    });

    try {
        await newData.validate();
        await newData.save();
        return res.status(201).json({ success: true, message: "Data is saved" });
    } catch (err) {
        if (err.name == "ValidationError") {
            return res.status(400).json({
                success: false,
                message: "All Feild is required",
                error: err.message,
            });
        }
        return res.status(400).json({
            success: false,
            message: "There is some problem please try again later",
        });
    }
};

exports.getSocialHistory = async (req, res) => {
    try {
        if (!req.params.pId) {
            return res
                .status(400)
                .json({ success: false, message: "user not found" });
        }
        let data = await PatientSocialHistory.findOne({ pId: req.params.pId });
        if (!data) {
            return res.status(400).json({ success: true, message: "Data not found" });
        }
        return res.status(200).json({ success: true, message: "Data found", data });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "There is some error please try again later",
        });
    }
};

exports.updateSocialHistory = async (req, res) => {
    try {
        if (!req.params.id) {
            return res
                .status(400)
                .json({ success: false, message: "user not found" });
        }
        let {
            pId,
            tobaccoUse,
            alcoholUse,
            socialHistory,
            financial,
            education,
            physicalActivity,
            stress,
            socialIsolation,
            violence,
            alcoholType
        } = req.body;

        await PatientSocialHistory.findByIdAndUpdate(req.params.id, {
            pId,
            tobaccoUse,
            alcoholUse,
            socialHistory,
            financial,
            education,
            physicalActivity,
            stress,
            socialIsolation,
            violence,
            alcoholType,
            createdBy: req.userId,
            updatedBy: req.userId,
            roleId: req.roleId
        });
        return res.status(200).json({ success: true, message: "Data is Updated" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "There is some error please try again later",
        });
    }
};

exports.deleteFamilyHistory = async (req, res) => {
    try {
        if (!req.params.id) {
            return res
                .status(400)
                .json({ success: false, message: "user not found" });
        }
        await PatientSocialHistory.findOneAndDelete(req.params.id, { isDeleted: true });
        return res.status(200).json({ success: true, message: "Data is Deleted" });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "There is some error please try again later",
        });
    }
};

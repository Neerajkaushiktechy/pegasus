const PatientNursingcarePlan = require("../../database/models/nursingcareplan");

exports.addNursingcarePlan = async (req, res) => {
    let { pId, nursingCarePlan, submittedTime, assignmentId } =
        req.body;
    let newData = new PatientNursingcarePlan({
        pId,
        nursingCarePlan,
        createdBy: req.userId,
        updatedBy: req.userId,
        roleId: req.roleId,
        submittedTime,
        assignmentId,
        createdByName: req.fullName
    });
    try {
        await newData.validate();
        await newData.save();
        return res
            .status(201)
            .json({ success: true, message: "Nursing Care Plan data saved" });
    } catch (err) {
        if (err.name === "ValidationError") {
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

exports.getNursingcarePlanList = async (req, res) => {
    try {
        let data;
        if (req.params.pId) {
            data = await PatientNursingcarePlan.aggregate([
                { $match: { $expr: { $eq: ['$pId', { $toObjectId: req.params.pId }] } } },
                { $addFields: { dateOnset: "$dateOnset" } }
            ])
        } else {
            data = await PatientNursingcarePlan.find({ isDeleted: false });
        }
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

exports.updateNursingcarePlan = async (req, res) => {
    try {
        if (!req.params.id) {
            return res
                .status(400)
                .json({ success: false, message: "user not found" });
        }
        let { nursingCarePlan } =
            req.body;
        await PatientNursingcarePlan.findByIdAndUpdate(req.params.id, {
            nursingCarePlan,
            // createdBy: req.userId,
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
exports.deleteNursingcarePlan = async (req, res) => {
    try {
        if (!req.params.id) {
            return res
                .status(400)
                .json({ success: false, message: "user not found" });
        }
        await PatientNursingcarePlan.findByIdAndDelete(req.params.id, { isDeleted: true });
        return res.status(200).json({ success: true, message: "Data is Deleted" });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "There is some error please try again later",
        });
    }
};

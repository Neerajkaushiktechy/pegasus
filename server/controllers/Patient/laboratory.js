const PatientLaboratory = require("../../database/models/laboratory");

exports.addLaboratory = async (req, res) => {
    let { pId, laboratory, submittedTime, assignmentId } =
        req.body;

    let newData = new PatientLaboratory({
        pId,
        laboratory,
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
            .json({ success: true, message: "Laboratory data saved" });
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

exports.getLaboratoryList = async (req, res) => {
    try {
        let data;
        if (req.params.pId) {
            data = await PatientLaboratory.aggregate([
                { $match: { $expr: { $eq: ['$pId', { $toObjectId: req.params.pId }] } } },
                { $addFields: { dateOnset: "$dateOnset" } }
            ])
        } else {
            data = await PatientOtherInformation.find({ isDeleted: false });
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

exports.updateLaboratory = async (req, res) => {
    try {
        if (!req.params.id) {
            return res
                .status(400)
                .json({ success: false, message: "user not found" });
        }
        let { laboratory } =
            req.body;
        await PatientLaboratory.findByIdAndUpdate(req.params.id, {
            laboratory,
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
exports.deleteLaboratory = async (req, res) => {
    try {
        if (!req.params.id) {
            return res
                .status(400)
                .json({ success: false, message: "user not found" });
        }
        await PatientLaboratory.findByIdAndDelete(req.params.id, { isDeleted: true });
        return res.status(200).json({ success: true, message: "Data is Deleted" });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "There is some error please try again later",
        });
    }
};

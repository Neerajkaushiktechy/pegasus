const PatientProsthetics_Aids = require("../../database/models/Prosthetics_Aids");

exports.addProsthetics_Aids = async (req, res) => {
    let { pId, prosthetics_Aids, submittedTime, assignmentId } =
        req.body;

    let newData = new PatientProsthetics_Aids({
        pId,
        prosthetics_Aids,
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
            .json({ success: true, message: "Other data saved" });
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

exports.getProsthetics_AidsList = async (req, res) => {
    try {
        let data;
        if (req.params.pId) {
            data = await PatientProsthetics_Aids.aggregate([
                { $match: { $expr: { $eq: ['$pId', { $toObjectId: req.params.pId }] } } },
                { $addFields: { dateOnset: "$dateOnset" } }
            ])
        } else {
            data = await PatientProsthetics_Aids.find({ isDeleted: false });
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

exports.updateProsthetics_Aids = async (req, res) => {
    try {
        if (!req.params.id) {
            return res
                .status(400)
                .json({ success: false, message: "user not found" });
        }
        let { prosthetics_Aids } =
            req.body;
        await PatientProsthetics_Aids.findByIdAndUpdate(req.params.id, {
            prosthetics_Aids,
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
exports.deleteProsthetics_Aids = async (req, res) => {
    try {
        if (!req.params.id) {
            return res
                .status(400)
                .json({ success: false, message: "user not found" });
        }
        await PatientProsthetics_Aids.findByIdAndDelete(req.params.id, { isDeleted: true });
        return res.status(200).json({ success: true, message: "Data is Deleted" });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "There is some error please try again later",
        });
    }
};

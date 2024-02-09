const PatientsVitals = require("../../database/models/patientVitals");
const MasterOxygenSupply = require('../../database/models/oxygensupllyTypes')

exports.postVital = async (req, res) => {
    let {
        pId,
        date,
        time,
        bloodPressure,
        height,
        headCirc,
        heartRate,
        weight,
        tempature,
        respiratoryRate,
        bmi,
        spo2,
        inhaledO2,
        oxygenSupply,
        comment,
        submittedTime,
        assignmentId
    } = req.body;

    let newData = new PatientsVitals({
        pId,
        date,
        time,
        bloodPressure,
        height,
        headCirc,
        heartRate,
        weight,
        tempature,
        respiratoryRate,
        bmi,
        spo2,
        inhaledO2,
        oxygenSupply,
        comment,
        createdBy: req.userId,
        updatedBy: req.userId,
        roleId: req.roleId,
        submittedTime,
        assignmentId
    });

    try {
        await newData.validate();
        await newData.save();
        return res.status(201).json({ success: true, message: "Data is saved" });
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

exports.getVital = async (req, res) => {

    try {
        let data;
        if (!req.params.pId) {
            return res.status(400).json({ success: false, message: "user not found" });
        }

        data = await PatientsVitals.aggregate([
            {
                $match:
                    { isDeleted: false, $expr: { $eq: ['$pId', { $toObjectId: req.params.pId }] } }
            },
        ]).sort({ createdAt: -1 })

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

exports.updateVital = async (req, res) => {
    try {
        if (!req.params.id) { return res.status(400).json({ success: false, message: "user not found" }); }
        let {
            bloodPressure,
            height,
            headCirc,
            heartRate,
            weight,
            tempature,
            respiratoryRate,
            bmi,
            spo2,
            date,
            time,
            inhaledO2,
            Unspecified,
            oxygenSupply,
            comment
        } = req.body;
        await PatientsVitals.findByIdAndUpdate(req.params.id, {
            bloodPressure,
            height,
            headCirc,
            heartRate,
            weight,
            tempature,
            respiratoryRate,
            bmi,
            spo2,
            inhaledO2,
            Unspecified,
            oxygenSupply,
            comment,
            createdBy: req.userId,
            updatedBy: req.userId,
            roleId: req.roleId,
            date,
            time,
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

exports.deleteVital = async (req, res) => {
    try {
        if (!req.params.id) { return res.status(400).json({ success: false, message: "user not found" }); }
        await PatientsVitals.findByIdAndUpdate(req.params.id, { isDeleted: true });
        return res.status(200).json({ success: true, message: "Data is Deleted" });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "There is some error please try again later",
        });
    }
};


exports.getMasterDataOxygenSupply = async (req, res) => {
    try {
        let data = await MasterOxygenSupply.find({}).sort({ name: 1 });

        if (!data) {
            return res
                .status(400)
                .json({ success: true, message: "MasterOxygenSupply not found" });
        }
        return res
            .status(200)
            .json({ success: true, message: "", data });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "There is some error please try again later",
        });
    }
};
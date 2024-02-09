const PatientDiagnosis = require("../../database/models/patientDiagnosis");
const MasterDaignosis = require("../../database/models/masterDaignosis");
const DaignosisDomains = require("../../database/models/daignosisDomains");
const DaignoClasses = require("../../database/models/daignosisClasses");
const DaignosisMasterClasses = require("../../database/models/daignosisMasterClasses");

exports.diagnosis = async (req, res) => {
  let {
    formData: {
      status,
      description,
      startDate,
      editDate,
      type,
      domainClass,
      comment,
      submittedTime,
      assignmentId
    },
    pId,
  } = req.body;

  if (!domainClass.classId) {
    domainClass.classId = null;
  }

  let newData = new PatientDiagnosis({
    status,
    description,
    startDate,
    editDate,
    type,
    domainClass,
    comment,
    pId,
    createdBy: req.userId,
    updatedBy: req.userId,
    roleId: req.roleId,
    submittedTime,
    assignmentId
  });
  try {
    await newData.save();
    return res
      .status(201)
      .json({ success: true, message: "Daignosis Data Saved" });
  } catch (err) {
    console.log("Validation", err);
    return res
      .status(400)
      .json({ success: false, message: "All Feild is required" });
  }
};
exports.getDaignosis = async (req, res) => {
  try {
    let data;
    if (req.params.id) {
      data = await PatientDiagnosis.find({ pId: req.params.id, isDeleted: false });
    } else {
      data = await PatientDiagnosis.find();
    }
    if (!data) {
      return res.status(400).json({ success: true, message: "User not found" });
    }
    return res.status(200).json({ success: true, message: "User found", data });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};

exports.getDomain = async (req, res) => {
  try {
    let data;
    if (req.params.id) {
      data = await DaignosisDomains.findById(req.params.id);
    } else {
      data = await DaignosisDomains.find();
    }
    if (!data) {
      return res.status(400).json({ success: true, message: "User not found" });
    }
    return res.status(200).json({ success: true, message: "User found", data });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};

exports.getDomainClasses = async (req, res) => {
  try {
    let data;
    if (req.params.classId) {
      data = await DaignosisMasterClasses.findById(req.params.classId).collation({ locale: "en" }).sort({ name: 1 });
    } else {
      if (req.roleId === 1) {
        data = await DaignosisMasterClasses.find({}).collation({ locale: "en" }).sort({ name: 1 });
      }
      else {
        data = await DaignosisMasterClasses.find({
          $or: [
            { createdBy: req.userId },
            { roleId: "1" },
            { createdBy: { $exists: false } },
          ],
        }).collation({ locale: "en" }).sort({ name: 1 });
      }
    }
    if (!data) {
      return res.status(400).json({ success: true, message: "User not found" });
    }
    return res.status(200).json({ success: true, message: "User found", data });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};

exports.getDaignosisDescription = async (req, res) => {
  try {
    let data;
    if (req.params.id) {
      data = await DaignoClasses.find({ classId: req.params.id }).collation({ locale: "en" }).sort({ list: 1 });
    } else {
      if (req.roleId === 1) {
        data = await DaignoClasses.find({}).collation({ locale: "en" }).sort({ list: 1 });
      }
      else {
        data = await DaignoClasses.find({
          $or: [
            { createdBy: req.userId },
            { roleId: "1" },
            { createdBy: { $exists: false } },
          ],
        }).collation({ locale: "en" }).sort({ list: 1 });
      }
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


exports.deleteDiagnosis = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ success: false, message: "Data not found" });
    }
    await PatientDiagnosis.findByIdAndUpdate(req.params.id, { isDeleted: true });
    return res.status(200).json({ success: true, message: "Data is Deleted" });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};
exports.updateDiagnosis = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }
    let {
      formData: {
        status,
        description,
        startDate,
        editDate,
        type,
        domainClass,
        comment,
      },
      pId,
    } = req.body;
    console.log(req.body)
    await PatientDiagnosis.findByIdAndUpdate(req.params.id, {
      status,
      description,
      startDate,
      editDate,
      type,
      domainClass,
      comment,
      pId,
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

exports.getMasterDaignosisData = async (req, res) => {
  try {
    const { query } = req.params;
    const cursor = await MasterDaignosis.find({
      $or: [
        { icd10Problem: { $regex: new RegExp(`^${query}`, "i") } },
        { description: { $regex: new RegExp(`^${query}`, "i") } },
      ],
    });

    res.json({ success: true, message: "Diagnosis data found", data: cursor });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        "There was an error retrieving the diagnosis data. Please try again later.",
      error: error.message,
    });
  }
};
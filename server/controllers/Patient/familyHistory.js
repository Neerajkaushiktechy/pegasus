
const PatientsFamilyHistory = require("../../database/models/patientsFamilyHistory");

exports.familyHistory = async (req, res) => {
  let {
    nameTitle,
    pId,
    fName,
    lName,
    gender,
    dob,
    relation,
    isAlive,
    dod,
    causeDeath,
    observation,
    diseaseList,
    submittedTime,
    assignmentId
  } = req.body;

  let newData = new PatientsFamilyHistory({
    nameTitle,
    pId,
    fName,
    lName,
    gender,
    dob,
    relation,
    isAlive,
    dod,
    causeDeath,
    observation,
    diseaseList,
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

exports.getFamilyHistory = async (req, res) => {
  try {
    if (!req.params.pId) {
      return res.status(400).json({ success: false, message: "user not found" });
    }

    const data = await PatientsFamilyHistory.aggregate([
      {
        $match: {
          isDeleted: false,
          $expr: { $eq: ['$pId', { $toObjectId: req.params.pId }] }
        }
      },
      {
        $addFields: {
          relationObjectId: { $toObjectId: '$relation' },
          // dateOnset: "$dateOnset"
        }
      },
      {
        $lookup: {
          from: 'familyhistorytypes',
          localField: 'relationObjectId',
          foreignField: '_id',
          as: 'relationDetails'
        }
      },
      {
        $addFields: {
          relation: { $arrayElemAt: ['$relationDetails.name', 0] }
        }
      },
      // {
      //   $project: {
      //     relationDetails: 0
      //   }
      // }
    ]);

    if (!data || data.length === 0) {
      return res.status(400).json({ success: true, message: "Data not found" });
    }

    return res.status(200).json({ success: true, message: "Data found", data });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "There is some error. Please try again later.",
    });
  }
};








exports.updateFamilyHistory = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }
    let {
      pId,
      nameTitle,
      fName,
      lName,
      gender,
      dob,
      relation,
      isAlive,
      dod,
      causeDeath,
      observation,
      diseaseList,
    } = req.body;
    await PatientsFamilyHistory.findByIdAndUpdate(req.params.id, {
      pId,
      nameTitle,
      fName,
      lName,
      gender,
      dob,
      relation,
      isAlive,
      dod,
      causeDeath,
      observation,
      diseaseList,
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
      return res.status(400).json({ success: false, message: "user not found" });
    }
    await PatientsFamilyHistory.findByIdAndUpdate(req.params.id, { isDeleted: true });
    return res.status(200).json({ success: true, message: "Data is Deleted" });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};

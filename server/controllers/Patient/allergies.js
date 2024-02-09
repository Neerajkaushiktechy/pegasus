
const PatientAllergies = require("../../database/models/patientAllergies");
const Disease = require("../../database/models/disease");
const AllergiesReaction = require("../../database/models/allergiesReaction");
const AllergiesSeverities = require("../../database/models/allergiesSeverities");

exports.allergies = async (req, res) => {
  let { pId, status, allergy, dateOnset, reaction, severities, comment, submittedTime, assignmentId } =
    req.body;

  let newData = new PatientAllergies({
    pId,
    status,
    allergy,
    dateOnset,
    reaction,
    severities,
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
    return res
      .status(201)
      .json({ success: true, message: "Allergies data saved" });
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

exports.getAllergiesSeverities = async (req, res) => {
  try {
    let data
    if (req.roleId === 1) {
      data = await AllergiesSeverities.find().collation({ locale: "en" }).sort({ severities: 1 });
    }
    else {
      data = await AllergiesSeverities.find({
        $or: [
          { createdBy: req.userId },
          { roleId: "1" },
          { createdBy: { $exists: false } },
        ],
      }).collation({ locale: "en" }).sort({ severities: 1 });
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
exports.getAllergiesReaction = async (req, res) => {
  try {
    let data
    if (req.roleId === 1) {
      data = await AllergiesReaction.find().collation({ locale: "en" }).sort({ reaction: 1 });
    }
    else {
      data = await AllergiesReaction.find({
        $or: [
          { createdBy: req.userId },
          { roleId: "1" },
          { createdBy: { $exists: false } },
        ],
      }).collation({ locale: "en" }).sort({ reaction: 1 });
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
// exports.getAllergiesList = async (req, res) => {
//   try {
//     let data;
//     if (req.params.pId) {
//       data = await PatientAllergies.aggregate([
//         { $match: { $expr: { $eq: ['$pId', { $toObjectId: req.params.pId }] } } },
//         { $addFields: { dateOnset: "$dateOnset" } }
//       ])
//     } else {
//       data = await PatientAllergies.find({ isDeleted: false });
//     }
//     if (!data) {
//       return res.status(400).json({ success: true, message: "Data not found" });
//     }
//     return res.status(200).json({ success: true, message: "Data found", data });
//   } catch (error) {
//     return res.status(400).json({
//       success: false,
//       message: "There is some error please try again later",
//     });
//   }
// };


exports.getAllergiesList = async (req, res) => {
  try {
    let data;
    if (req.params.pId) {
      data = await PatientAllergies.aggregate([
        {
          $match: { $expr: { $eq: ['$pId', { $toObjectId: req.params.pId }] } }
        },
        {
          $addFields: {
            reactionObjectId: { $toObjectId: '$reaction' }, // Convert the string to ObjectId
            severitiesObjectId: { $toObjectId: '$severities' }, // Convert the string to ObjectId
            dateOnset: "$dateOnset"
          }
        },
        {
          $lookup: {
            from: 'allergiesReaction',
            localField: 'reactionObjectId', // Use the converted ObjectId field
            foreignField: '_id',
            as: 'reactionDetails'
          }
        },
        {
          $lookup: {
            from: 'allergiesSeverities ',
            localField: 'severitiesObjectId', // Use the converted ObjectId field
            foreignField: '_id',
            as: 'severitiesDetails'
          }
        },
        {
          $addFields: {
            reaction: { $arrayElemAt: ['$reactionDetails.reaction', 0] }, // Replace reaction with the value from reactionDetails
            severities: { $arrayElemAt: ['$severitiesDetails.severities', 0] }
          }
        },
        {
          $project: {
            reactionDetails: 0,// Remove the reactionDetails field
            severitiesDetails: 0
          }
        }
      ]);
    } else {
      data = await PatientAllergies.aggregate([
        {
          $match: { isDeleted: false }
        },
        {
          $addFields: {
            reactionObjectId: { $toObjectId: '$reaction' }, // Convert the string to ObjectId
            severitiesObjectId: { $toObjectId: '$severities' }, // Convert the string to ObjectId
            dateOnset: "$dateOnset"
          }
        },
        {
          $lookup: {
            from: 'allergiesReaction',
            localField: 'reactionObjectId', // Use the converted ObjectId field
            foreignField: '_id',
            as: 'reactionDetails'
          }
        },
        {
          $lookup: {
            from: 'allergiesSeverities ',
            localField: 'severitiesObjectId', // Use the converted ObjectId field
            foreignField: '_id',
            as: 'severitiesDetails'
          }
        },
        {
          $addFields: {
            reaction: { $arrayElemAt: ['$reactionDetails.reaction', 0] }, // Replace reaction with the value from reactionDetails
            severities: { $arrayElemAt: ['$severitiesDetails.severities', 0] }
          }
        },
        {
          $project: {
            reactionDetails: 0,// Remove the reactionDetails field
            severitiesDetails: 0
          }
        }
      ]);
    }

    if (data.length === 0) {
      return res.status(400).json({ success: true, message: "Data not found" });
    }

    return res.status(200).json({ success: true, message: "Data found", data });
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      success: false,
      message: "There is some error, please try again later",
    });
  }
};



exports.updateAllergies = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }
    let { status, allergy, dateOnset, reaction, severities, comment } =
      req.body;
    await PatientAllergies.findByIdAndUpdate(req.params.id, {
      status,
      allergy,
      dateOnset,
      reaction,
      severities,
      comment,
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
exports.deleteAllergies = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }
    await PatientAllergies.findByIdAndDelete(req.params.id, { isDeleted: true });
    return res.status(200).json({ success: true, message: "Data is Deleted" });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};

exports.addDisease = async (req, res) => {
  let newData = new Disease(req.body);
  try {
    await newData.save();
    return res.status(201).json({ success: true, message: "Welcome" });
  } catch (err) {
    console.log("Validation", err);
    return res
      .status(400)
      .json({ success: false, message: "All Feild is required" });
  }
};


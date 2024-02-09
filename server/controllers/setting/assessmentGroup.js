const { default: mongoose } = require("mongoose");
const AssessmentGroup = require("../../database/models/assessmentGroup");
const Assignment = require("../../database/models/assignment");
const StudentAssignmentStatus = require("../../database/models/studentAssignmentStatus");

exports.postAssessmentGroup = async (req, res) => {
  let {
    status,
    assessmentTitle,
    assessmentList
  } = req.body;
  let newData = new AssessmentGroup({
    status,
    assessmentTitle,
    assessmentList,
    createdBy: req.userId,
    roleId: req.roleId,
  });
  try {
    await newData.validate();
    await newData.save();
    return res.status(201).json({
      success: true,
      message: "Assessment Group is created"
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Please fill required fields",
      });
    }
    return res.status(400).json({
      success: false,
      message: "There is some problem please try again later",
    });
  }
};

exports.getAssessmentGroup = async (req, res) => {
  try {
    let data;
    if (req.roleId === 1) {
      data = await AssessmentGroup.find({ isDeleted: false }).populate({
        path: "assessmentList",
        match: { isDeleted: false }
      });
    } else {
      data = await AssessmentGroup.find({ isDeleted: false, $or: [{ createdBy: new mongoose.Types.ObjectId(req.userId), roleId: req.roleId }, { roleId: 1 }] }).populate({
        path: "assessmentList",
        match: { isDeleted: false }
      });
    }
    if (!data) {
      return res.status(400).json({ success: true, message: "Data not found" });
    }
    return res.status(200).json({ success: true, message: "Data found", data });
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};

exports.updateAssessmentGroup = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ success: false, message: "Data not found" });
    }
    let {
      status,
      assessmentTitle,
      assessmentList,
    } = req.body;
    await AssessmentGroup.findByIdAndUpdate(req.params.id, {
      status,
      assessmentTitle,
      assessmentList,
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
exports.deleteAssessmentGroup = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ success: false, message: "Data not found" });
    }
    await AssessmentGroup.findByIdAndUpdate(req.params.id, { isDeleted: true });
    // await Assignment.updateMany(
    //   {
    //     $or: [
    //       { assessmentToolList: req.params.id },
    //       { assessmentGroupList: req.params.id },
    //     ],
    //   },
    //   { isDeleted: true }
    // );
    // await StudentAssignmentStatus.updateMany({
    //   assessmentGroupId: req.params.id
    // }, { isDeleted: true });
    return res.status(200).json({ success: true, message: "Data is Deleted" });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};

const fs = require("fs");
const AssessmentTool = require("../../database/models/assessmentTool");
const Assignment = require("../../database/models/assignment");
const StudentAssignmentStatus = require("../../database/models/studentAssignmentStatus");
const { default: mongoose } = require("mongoose");

exports.postAssessment = async (req, res) => {
  let {
    assessmentTitle,
    module,
    duration,
    assesmentType,
    objectives,
    description,
    isassesmentType
  } = req.body;
  let file = "";
  if (req.files.length > 0) {
    file = req.files[0].filename;
  }
  let newData = new AssessmentTool({
    assessmentTitle,
    module,
    duration,
    createdBy: req.userId,
    roleId: req.roleId,
    assesmentType,
    objectives,
    description,
    isassesmentType,
    file
  });
  try {
    await newData.validate();
    await newData.save();
    return res.status(201).json({
      success: true,
      message: "Assessment is created"
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

exports.getAssessment = async (req, res) => {
  const pageNmuber = parseInt(req.query.pageNumber) || 1
  const limit = parseInt(req.query.limit) || 5;
  const skip_no = parseInt(pageNmuber - 1) * limit;
  try {
    let countDocuments = 0;
    let data;
    if (req.roleId === 1) {
      data = await AssessmentTool.find({ isDeleted: false }).skip(skip_no).limit(limit).populate("createdBy").sort({ createdAt: -1 });;
      countDocuments = await AssessmentTool.countDocuments({ isDeleted: false });
    } else {
      data = await AssessmentTool.find({ isDeleted: false, $or: [{ createdBy: new mongoose.Types.ObjectId(req.userId), roleId: req.roleId }, { roleId: 1 }] }).skip(skip_no).limit(limit).populate("createdBy").sort({ createdAt: -1 });
      countDocuments = await AssessmentTool.countDocuments({ isDeleted: false, $or: [{ createdBy: new mongoose.Types.ObjectId(req.userId), roleId: req.roleId }, { roleId: 1 }] });
    }
    if (!data) {
      return res.status(400).json({ success: true, message: "Data not found" });
    }
    return res.status(200).json({
      success: true, message: "Data found", data, totalCount: countDocuments,
      totalPages: Math.ceil(countDocuments / limit)
    });
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};
exports.getAssessmentFile = async (req, res) => {
  try {
    if (!req.params.fileName) {
      return res.status(400).json({ success: true, message: "flie not found" });
    }
    return fs.createReadStream(`${__dirname}/../../assessmentFiles/${req.params.fileName}`).pipe(res);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};

exports.updateAssessment = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ success: false, message: "Data not found" });
    }
    let {
      assessmentTitle,
      module,
      duration,
      createdBy,
      assesmentType,
      objectives,
      description,
      isassesmentType
    } = req.body;
    let file = "";
    if (req.body.file) {
      file = req.body.file
    }
    if (req.files.length > 0) {
      file = req.files[0].filename;
    }
    await AssessmentTool.findByIdAndUpdate(req.params.id, {
      assessmentTitle,
      module,
      duration,
      createdBy,
      assesmentType,
      objectives,
      description,
      file,
      isassesmentType
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
exports.deleteAssessment = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ success: false, message: "Data not found" });
    }
    await AssessmentTool.findByIdAndUpdate(req.params.id, { isDeleted: true });
    // await Assignment.findOneAndUpdate({ assessmentToolList: req.params.id }, { isDeleted: true })
    // await Assignment.findOneAndUpdate({ assessmentGroupList: req.params.id }, { isDeleted: true })
    // await Assignment.updateMany(
    //   {
    //     $or: [
    //       { assessmentToolList: req.params.id },
    //       { assessmentGroupList: req.params.id },
    //     ],
    //   },
    //   { isDeleted: true }
    // );
    // await StudentAssignmentStatus.updateMany({ assessmentId: req.params.id }, { isDeleted: true });
    return res.status(200).json({ success: true, message: "Data is Deleted" });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};

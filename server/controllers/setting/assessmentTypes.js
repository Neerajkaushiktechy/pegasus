const AssessMentTpes = require("../../database/models/assessmentType");

exports.addAssessmentType = async (req, res) => {
  try {
    let createAssessmentType = await AssessMentTpes(req.body);
    await createAssessmentType.save();
    return res
      .status(201)
      .json({ success: true, message: "AssessmentType Created successfully" });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "All Feild is required" });
  }
};


exports.getAssessmentType = async (req, res) => {
  try {
    let checkAssessmentTypes = req.roleId === 1 ? { roleId: { $in: [1, 3] } } : req.roleId === 3 ? {
      $or: [{ createdBy: req.userId, roleId: req.roleId }, { roleId: 1 }]
    } : {}
    checkAssessmentTypes.type = "Custom Form"
    let data = await AssessMentTpes.find(checkAssessmentTypes).sort({ createdAt: 1 });
    let findAllData = await AssessMentTpes.find({ createdBy: { $exists: false } }).sort({ assessmentName: 1 })
    let array = [...findAllData, ...data]
    return res
      .status(200)
      .json({ success: true, message: "", data: array });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};


exports.updateAssessmentType = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ success: false, message: "AssessmentType not found" });
    }
    await AssessMentTpes.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).json({ success: true, message: "Course is Updated" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};

exports.deleteAssessmentType = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ success: false, message: "AssessmentType not found" });
    }
    await AssessMentTpes.findByIdAndRemove(req.params.id);
    return res.status(200).json({ success: true, message: "AssessmentType is deleted" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};
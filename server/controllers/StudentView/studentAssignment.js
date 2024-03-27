const Assignment = require("../../database/models/assignment");
const AssessmentTool = require("../../database/models/assessmentTool");
const AssessmentGroupTool = require("../../database/models/assessmentGroup");
const StudentAssignmentStatus = require("../../database/models/studentAssignmentStatus");
const SubmittedCustomForm = require("../../database/models/submittedCustomForm")
const Patient = require("../../database/models/patientDemographic");
const Users = require("../../database/models/user");
const CustomFrom = require("../../database/models/customForm");
const mongoose = require('mongoose')


exports.getMyAssignment = async (req, res) => {
  const pageNmuber = parseInt(req.query.pageNumber) || 1
  const limit = parseInt(req.query.limit)
  const skip_no = parseInt(pageNmuber - 1) * limit;
  try {
    let countDocuments = 0;
    const assignment = await Assignment.find({
      students: req.params.studentId,
      $or: [
        { isDeleted: false },
        { isDeleted: null }
      ]
    })
      .populate({
        path: 'createdBy',
        model: Users,
        select: 'name',
      })
      .populate({
        path: 'patient',
        model: Patient,
        select: 'fName lName',
      }).sort({ createdAt: -1 });
    let allData = await StudentAssignmentStatus.find({
      studentId: req.params.studentId,
      $or: [
        { isDeleted: false },
        { isDeleted: null }
      ]
    })
    const myAssignment = await StudentAssignmentStatus.find({
      studentId: req.params.studentId,
      $or: [
        { isDeleted: false },
        { isDeleted: null }
      ]
    }).skip(skip_no).limit(limit).populate('assessmentId')
      .populate({
        path: 'createdBy',
        model: Users,
        select: 'name',
      })
      .populate({
        path: 'patient',
        model: Patient,
        select: 'fName lName',
      }).sort({ createdAt: -1 });

    countDocuments = allData.length;

    if (!assignment) {
      return res.status(404).json({
        success: false,
        data: [],
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Assignment fetched successfully',
      data: assignment, myAssignment, totalCount: countDocuments, totalPages: Math.ceil(countDocuments / limit)
    });
  } catch (error) {
    console.error('Error while fetching assignment', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};


exports.getMyAssignmentDetail = async (req, res) => {
  try {
    const assignment = await StudentAssignmentStatus.findOne({
      assessmentId: req.params.id, assignmentId: req.params.assId, studentId: req.params.studentId
    }).populate({
      path: 'assessmentId',
      model: AssessmentTool,
      match: { _id: req.params.id }
    }).populate({
      path: 'createdBy',
      model: Users,
      select: 'name',
    }).populate({
      path: 'patient',
      model: Patient,
      select: 'fName + lName',
    });
    if (!assignment) {
      return res.status(404).json({
        success: false,
        data: [],
      });
    }
    await assignment.populate('assessmentId.assesmentType')
    const assignmentDetail = await AssessmentTool.find({ _id: req.params.id })
    return res.status(200).json({
      success: true,
      message: 'Assignment fetched successfully',
      data: [assignment], assignmentDetail
    });
  } catch (error) {
    console.error('Error while fetching assignment', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

exports.getMyAssignmentStatus = async (req, res) => {
  try {
    let data;
    if (req.params.id) {
      data = await StudentAssignmentStatus.find({ _id: req.params.id });
    }
    if (!data) {
      return res
        .status(400)
        .json({ success: true, message: "Assignment Status not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Assignment Status found", data });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};


exports.postMyAssignmentStatus = async (req, res) => {
  let { studentId, assessmentId, status } =
    req.body;
  let newData = new StudentAssignmentStatus({
    studentId,
    assessmentId,
    status,
  });
  try {
    await newData.validate();
    await newData.save();
    return res
      .status(201)
      .json({ success: true, message: "My Assignment Status data saved" });
  } catch (err) {
    if (err.name == "ValidationError") {
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

exports.updateMyAssignmentStatus = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ success: false, message: "My Assignment Satus not found" });
    }
    let {
      status,
    } = req.body;
    await StudentAssignmentStatus.updateOne({ _id: req.params.id, studentId: req.userId, }, { status: status, submittedTime: req.body.submittedTime });;
    return res.status(200).json({ success: true, message: "My Assignment Satus is Updated" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};


exports.myCustomAssignmentForm = async (req, res) => {
  try {
    let data;
    if (req.params.name) {
      // data = await CustomFrom.findOne({ formName: req.params.name });
      const decodedName = decodeURIComponent(req.params.name);
      data = await CustomFrom.findOne({ formName: decodedName });
    }
    if (!data) {
      return res
        .status(400)
        .json({ success: true, message: "Custom Form not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Custom Form found", data });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};


exports.getMyGrades = async (req, res) => {
  const pageNmuber = parseInt(req.query.pageNumber) || 1
  const limit = parseInt(req.query.limit)
  const skip_no = parseInt(pageNmuber - 1) * limit;
  try {
    let countDocuments = 0;
    let allData = await StudentAssignmentStatus.find({
      studentId: req.params.studentId, $or: [
        { isDeleted: false },
        { isDeleted: null }
      ]
    })
    const myAssignment = await StudentAssignmentStatus.find({
      studentId: req.params.studentId, $or: [
        { isDeleted: false },
        { isDeleted: null }
      ]
    }).skip(skip_no).limit(limit).populate('assessmentId').sort({ createdAt: -1 });

    countDocuments = allData.length;

    if (!myAssignment) {
      return res.status(404).json({
        success: false,
        data: [],
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Assignment fetched successfully',
      data: myAssignment, totalCount: countDocuments, totalPages: Math.ceil(countDocuments / limit)
    });
  } catch (error) {
    console.error('Error while fetching assignment', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

exports.updateAssignmnetDate = async (req, res) => {
  let { endDate } = req.body;
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ success: false, message: "Assignment not found" });
    }
    await StudentAssignmentStatus.updateOne({ _id: req.params.id }, { endDate: endDate });;
    return res.status(200).json({ success: true, message: "Assignment Date is Updated" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};

exports.resetAssignment = async (req, res) => {
  console.log("inside")
  try {
    if (!req.params.assId) {
      return res.status(400).json({ success: false, message: "data not found" });
    }
    let { assId, stdId, submitAssId } = req.params;

    // Update StudentAssignmentStatus
    await StudentAssignmentStatus.findByIdAndUpdate(submitAssId, { $set: { grade: "", submittedTime: "", status: 0 } });
    // Check if the document exists before attempting to delete it
    const submittedForm = await SubmittedCustomForm.findOne({ assignmentId: assId, createdBy: stdId });
    if (submittedForm) {
      await SubmittedCustomForm.deleteOne({ assignmentId: assId, createdBy: stdId });
    }
    return res.status(200).json({ success: true, message: "Assignment reset successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: "There is some error please try again later" });
  }
}

const Assignment = require("../../database/models/assignment");
const AssessmentTool = require("../../database/models/assessmentTool");
const AssessmentGroupTool = require("../../database/models/assessmentGroup");
const StudentAssignmentStatus = require("../../database/models/studentAssignmentStatus");
const Patient = require("../../database/models/patientDemographic");
const Student = require("../../database/models/student");
const Users = require("../../database/models/user");
const CustomFrom = require("../../database/models/customForm");
const mongoose = require('mongoose')


exports.getMyAssignment = async (req, res) => {
  try {
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

    const myAssignment = await StudentAssignmentStatus.find({
      studentId: req.params.studentId,
      $or: [
        { isDeleted: false },
        { isDeleted: null }
      ]
    }).populate('assessmentId')
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

    const studentData = await Student.findById({ _id: req.params.studentId });

    if (!assignment) {
      return res.status(404).json({
        success: false,
        data: [],
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Assignment fetched successfully',
      data: assignment, myAssignment, studentData
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
    if (req.roleId === 1) {
      await StudentAssignmentStatus.updateOne({ _id: req.params.id, studentId: req.body.studentId, }, { status: status, submittedTime: req.body.submittedTime });
      return res.status(200).json({ success: true, message: "My Assignment Status is Updated" });
    }
    await StudentAssignmentStatus.updateOne({ _id: req.params.id, studentId: req.userId, }, { status: status, submittedTime: req.body.submittedTime });
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
      data = await CustomFrom.findOne({ formName: req.params.name });
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
  try {
    const myAssignment = await StudentAssignmentStatus.find({
      studentId: req.params.studentId, $or: [
        { isDeleted: false },
        { isDeleted: null }
      ]
    }).populate('assessmentId').sort({ createdAt: -1 });

    if (!myAssignment) {
      return res.status(404).json({
        success: false,
        data: [],
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Assignment fetched successfully',
      data: myAssignment
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
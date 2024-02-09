const Patient = require("../../database/models/patientDemographic");
const School = require("../../database/models/school");
const Student = require("../../database/models/student");
const Assignment = require("../../database/models/assignment");
const AssignmentStatus = require("../../database/models/studentAssignmentStatus");


exports.getDashboardData = async (req, res) => {
    try {
        let data = {};
        let patientCount;
        let schoolCount;
        let studentCount;
        let assignmentCount;
        let completedAssignmentCount;
        let pendingAssignmentsCount;
        if (req.roleId === 1) {
            patientCount = await Patient.countDocuments({ isDeleted: false });
            schoolCount = await School.countDocuments({ isDeleted: false });
            studentCount = await Student.countDocuments({ isDeleted: false });
            assignmentCount = await Assignment.countDocuments({ isDeleted: false });
            completedAssignmentCount = await AssignmentStatus.countDocuments({ status: 2 });
            pendingAssignmentsCount = await AssignmentStatus.countDocuments({ status: 0 });
            data = {
                totalPatient: patientCount,
                totalSchool: schoolCount,
                totalStudent: studentCount,
                totalAssignment: assignmentCount,
                totalCompletedAssignment: completedAssignmentCount,
                totalPendingAssignment: pendingAssignmentsCount
            };
        }
        else if (req.roleId === 3) {
            patientCount = await Patient.countDocuments({ createdBy: req.userId, isDeleted: false });
            studentCount = await Student.countDocuments({ createdBy: req.userId, isDeleted: false });
            assignmentCount = await Assignment.countDocuments({ createdBy: req.userId, isDeleted: false });
            completedAssignmentCount = await AssignmentStatus.countDocuments({ createdBy: req.userId });
            pendingAssignmentsCount = await AssignmentStatus.countDocuments({ createdBy: req.userId });
            data = {
                totalPatient: patientCount,
                totalStudent: studentCount,
                totalAssignment: assignmentCount,
                totalCompletedAssignment: completedAssignmentCount,
                totalPendingAssignment: pendingAssignmentsCount
            };
        }

        if (!data) {
            return res.status(400).json({ success: false, message: "Data not found" });
        }

        return res.status(200).json({ success: true, message: "Data found", data });
    } catch (error) {
        return res.status(400).json({ success: false, message: "There is some error, please try again later" });
    }
};

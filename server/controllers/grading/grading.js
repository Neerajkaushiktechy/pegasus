const PatientAllergies = require("../../database/models/patientAllergies");
const Patientdiagnosis = require("../../database/models/patientDiagnosis");
const PatientDocument = require("../../database/models/patientDocument");
const PatientSocialHistory = require("../../database/models/patientSocialHistory");
const PatientsVitals = require("../../database/models/patientVitals");
const PatientsFamilyHistory = require("../../database/models/patientsFamilyHistory");
const StudentAssignmentStatus = require("../../database/models/studentAssignmentStatus");
const SubmittedCustomForm = require("../../database/models/submittedCustomForm");
const PatientMedication = require("../../database/models/patientMedication");
const PatientNursingCarePlan = require("../../database/models/nursingcareplan");
const PatientNurseNotes = require("../../database/models/nurseNotes");
const PatientLaboratory = require("../../database/models/laboratory");
const PatientTherapy = require("../../database/models/therapy");
const PatientDoctorOrders = require("../../database/models/doctorsOrders");
const PatientProsthetics_Aids = require("../../database/models/Prosthetics_Aids");
const AssessmentTypes = require("../../database/models/assessmentType");

exports.getGradeList = async (req, res) => {
  try {
    let countDocuments = 0;
    let data;
    const today = new Date(req.query.searchText);
    const tomorrow = new Date(req.query.searchText);
    const pageNmuber = parseInt(req.query.pageNumber) || 1
    const limit = parseInt(req.query.limit) || 5;
    const skip_no = parseInt(pageNmuber - 1) * limit;
    tomorrow.setUTCHours(23, 59, 59, 999);
    if (req.roleId === 1) {
      countDocuments = await StudentAssignmentStatus.find({
        $or: [
          { isDeleted: false },
          { isDeleted: null }
        ]
      }).countDocuments();
      if (req.query.searchType === "student") {
        data = await StudentAssignmentStatus.find({
          $or: [
            { isDeleted: false },
            { isDeleted: null }
          ]
        }).skip(skip_no).limit(limit).sort({ createdAt: -1 }).populate({ path: "assessmentId", select: "assessmentTitle assesmentType duration" }).populate({ path: "assignmentId", select: "roleId patient endDate", populate: { path: "patient", select: "fName lName gender dob" } }).populate({ path: "studentId", select: "fName lName", match: { fName: { "$regex": `${req.query.searchText}`, "$options": "i" } } })
        data = await Promise.all(data.map(async (item) => {
          if (item.assessmentId) {
            const assessmentId = item.assessmentId.assesmentType;
            const assessmentType = await AssessmentTypes.findById({ _id: assessmentId });
            item.assessmentId.assesmentType = assessmentType.type;
          }
          return item;
        }));
        data = data.filter((item) => {
          if (item.studentId) return item
        });
      } else if (req.query.searchType === "assesment") {
        data = await StudentAssignmentStatus.find({
          $or: [
            { isDeleted: false },
            { isDeleted: null }
          ]
        }).skip(skip_no).limit(limit).sort({ createdAt: -1 }).populate({ path: "assessmentId", select: "assessmentTitle assesmentType duration", match: { assessmentTitle: { "$regex": `${req.query.searchText}`, "$options": "i" } } }).populate({ path: "assignmentId", select: "roleId patient endDate", populate: { path: "patient", select: "fName lName gender dob" } }).populate({ path: "studentId", select: "fName lName" })
        data = await Promise.all(data.map(async (item) => {
          if (item.assessmentId) {
            const assessmentId = item.assessmentId.assesmentType;
            const assessmentType = await AssessmentTypes.findById({ _id: assessmentId });
            item.assessmentId.assesmentType = assessmentType.type;
          }
          return item;
        }));
        data = data.filter((item) => {
          if (item.assessmentId) return item
        });
      } else if (req.query.searchType === "startDate" && today !== "Invalid Date" && tomorrow !== "Invalid Date") {
        data = await StudentAssignmentStatus.find({
          $or: [
            { isDeleted: false },
            { isDeleted: null }
          ]
        }).skip(skip_no).limit(limit).sort({ createdAt: -1 }).populate({ path: "assessmentId", select: "assessmentTitle assesmentType duration" }).populate({ path: "assignmentId", select: "roleId patient endDate", match: { createdAt: { "$gte": today, "$lt": tomorrow } }, populate: { path: "patient", select: "fName lName gender dob" } }).populate({ path: "studentId", select: "fName lName" })
        data = await Promise.all(data.map(async (item) => {
          if (item.assessmentId) {
            const assessmentId = item.assessmentId.assesmentType;
            const assessmentType = await AssessmentTypes.findById({ _id: assessmentId });
            item.assessmentId.assesmentType = assessmentType.type;
          }
          return item;
        }));
        data = data.filter((item) => {
          if (item.assignmentId) return item
        });
      }
      else if (req.query.searchType === "endDate" && today !== "Invalid Date" && tomorrow !== "Invalid Date") {
        data = await StudentAssignmentStatus.find({
          $or: [
            { isDeleted: false },
            { isDeleted: null }
          ]
        }).skip(skip_no).limit(limit).sort({ createdAt: -1 }).populate({ path: "assessmentId", select: "assessmentTitle assesmentType duration" }).populate({ path: "assignmentId", select: "roleId patient endDate", match: { endDate: { "$gte": today, "$lt": tomorrow } }, populate: { path: "patient", select: "fName lName gender dob" } }).populate({ path: "studentId", select: "fName lName" })
        data = await Promise.all(data.map(async (item) => {
          if (item.assessmentId) {
            const assessmentId = item.assessmentId.assesmentType;
            const assessmentType = await AssessmentTypes.findById({ _id: assessmentId });
            item.assessmentId.assesmentType = assessmentType.type;
          }
          return item;
        }));
        data = data.filter((item) => {
          if (item.assignmentId) return item
        });
      }
      else {
        data = await StudentAssignmentStatus.find({
          $or: [
            { isDeleted: false },
            { isDeleted: null }
          ]
        }).skip(skip_no).limit(limit).sort({ createdAt: -1 }).populate({ path: "assessmentId", select: "assessmentTitle assesmentType duration" }).populate({ path: "assignmentId", select: "roleId patient endDate", populate: { path: "patient" } }).populate({ path: "studentId", select: "fName lName" })
        data = await Promise.all(data.map(async (item) => {
          if (item.assessmentId) {
            const assessmentId = item.assessmentId.assesmentType;
            const assessmentType = await AssessmentTypes.findById({ _id: assessmentId });
            item.assessmentId.assesmentType = assessmentType.type;
          }
          return item;
        }));
      }
    }
    else if (req.roleId === 3) {
      countDocuments = await StudentAssignmentStatus.find({
        createdBy: req.userId, $or: [
          { isDeleted: false },
          { isDeleted: null }
        ]
      }).countDocuments();
      if (req.query.searchType === "student") {
        data = await StudentAssignmentStatus.find({
          createdBy: req.userId, $or: [
            { isDeleted: false },
            { isDeleted: null }
          ]
        }).skip(skip_no).limit(limit).sort({ createdAt: -1 }).populate({ path: "assessmentId", select: "assessmentTitle assesmentType duration" }).populate({ path: "assignmentId", select: "roleId patient endDate", populate: { path: "patient", select: "fName lName gender dob" } }).populate({ path: "studentId", select: "fName lName", match: { fName: { "$regex": `${req.query.searchText}`, "$options": "i" } } })
        data = await Promise.all(data.map(async (item) => {
          if (item.assessmentId) {
            const assessmentId = item.assessmentId.assesmentType;
            const assessmentType = await AssessmentTypes.findById({ _id: assessmentId });
            item.assessmentId.assesmentType = assessmentType.type;
          }
          return item;
        }));
        data = data.filter((item) => {
          if (item.studentId) return item
        });
      } else if (req.query.searchType === "assesment") {
        data = await StudentAssignmentStatus.find({
          createdBy: req.userId, $or: [
            { isDeleted: false },
            { isDeleted: null }
          ]
        }).skip(skip_no).limit(limit).sort({ createdAt: -1 }).populate({ path: "assessmentId", select: "assessmentTitle assesmentType duration", match: { assessmentTitle: { "$regex": `${req.query.searchText}`, "$options": "i" } } }).populate({ path: "assignmentId", select: "roleId patient endDate", populate: { path: "patient", select: "fName lName gender dob" } }).populate({ path: "studentId", select: "fName lName" })
        data = await Promise.all(data.map(async (item) => {
          if (item.assessmentId) {
            const assessmentId = item.assessmentId.assesmentType;
            const assessmentType = await AssessmentTypes.findById({ _id: assessmentId });
            item.assessmentId.assesmentType = assessmentType.type;
          }
          return item;
        }));
        data = data.filter((item) => {
          if (item.assessmentId) return item
        });
      } else if (req.query.searchType === "startDate" && today !== "Invalid Date" && tomorrow !== "Invalid Date") {
        data = await StudentAssignmentStatus.find({
          createdBy: req.userId, $or: [
            { isDeleted: false },
            { isDeleted: null }
          ]
        }).skip(skip_no).limit(limit).sort({ createdAt: -1 }).populate({ path: "assessmentId", select: "assessmentTitle assesmentType duration" }).populate({ path: "assignmentId", select: "roleId patient endDate", match: { createdAt: { "$gte": today, "$lt": tomorrow } }, populate: { path: "patient", select: "fName lName gender dob" } }).populate({ path: "studentId", select: "fName lName" })
        data = await Promise.all(data.map(async (item) => {
          if (item.assessmentId) {
            const assessmentId = item.assessmentId.assesmentType;
            const assessmentType = await AssessmentTypes.findById({ _id: assessmentId });
            item.assessmentId.assesmentType = assessmentType.type;
          }
          return item;
        }));
        data = data.filter((item) => {
          if (item.assignmentId) return item
        });
      }
      else if (req.query.searchType === "endDate" && today !== "Invalid Date" && tomorrow !== "Invalid Date") {
        data = await StudentAssignmentStatus.find({
          createdBy: req.userId, $or: [
            { isDeleted: false },
            { isDeleted: null }
          ]
        }).skip(skip_no).limit(limit).sort({ createdAt: -1 }).populate({ path: "assessmentId", select: "assessmentTitle assesmentType duration" }).populate({ path: "assignmentId", select: "roleId patient endDate", match: { endDate: { "$gte": today, "$lt": tomorrow } }, populate: { path: "patient", select: "fName lName gender dob" } }).populate({ path: "studentId", select: "fName lName" })
        data = await Promise.all(data.map(async (item) => {
          if (item.assessmentId) {
            const assessmentId = item.assessmentId.assesmentType;
            const assessmentType = await AssessmentTypes.findById({ _id: assessmentId });
            item.assessmentId.assesmentType = assessmentType.type;
          }
          return item;
        }));
        data = data.filter((item) => {
          if (item.assignmentId) return item
        });
      } else {
        data = await StudentAssignmentStatus.find({
          createdBy: req.userId, $or: [
            { isDeleted: false },
            { isDeleted: null }
          ]
        }).skip(skip_no).limit(limit).sort({ createdAt: -1 }).populate({ path: "assessmentId", select: "assessmentTitle assesmentType duration" }).populate({ path: "assignmentId", select: "roleId patient endDate", populate: { path: "patient" } }).populate({ path: "studentId", select: "fName lName" })
        data = await Promise.all(data.map(async (item) => {
          if (item.assessmentId) {
            const assessmentId = item.assessmentId.assesmentType;
            const assessmentType = await AssessmentTypes.findById({ _id: assessmentId });
            item.assessmentId.assesmentType = assessmentType.type;
          }
          return item;
        }));
      }
    }

    return res.status(200).json({
      success: true, message: "Data found", data, totalCount: countDocuments,
      totalPages: Math.ceil(countDocuments / limit),
    });
  } catch (error) {
    console.log(error, 'error')
    return res.status(400).json({ success: false, message: "There is some error please try again later" });
  }
}







exports.gradingFormData = async (req, res) => {
  try {
    if (!req.query.assignmentId && !req.query.assignmentType && !req.query.studentId) {
      return res.status(400).json({ success: false, message: "There is some error please try again later" });
    }

    let data;
    switch (req.query.assignmentType) {
      case "Allergies":
        data = await PatientAllergies.findOne({ createdBy: req.query.studentId, assignmentId: req.query.assignmentId })
        break;
      case "Diagnosis":
        data = await Patientdiagnosis.findOne({ createdBy: req.query.studentId, assignmentId: req.query.assignmentId })
        break;
      case "Vitals":
        data = await PatientsVitals.findOne({ createdBy: req.query.studentId, assignmentId: req.query.assignmentId })
        break;
      case "Documents":
        data = await PatientDocument.findOne({ createdBy: req.query.studentId, assignmentId: req.query.assignmentId })
        break;
      case "Family History":
        data = await PatientsFamilyHistory.findOne({ createdBy: req.query.studentId, assignmentId: req.query.assignmentId })
        break;
      case "Social History":
        data = await PatientSocialHistory.findOne({ createdBy: req.query.studentId, assignmentId: req.query.assignmentId })
        break;
      case "Medication":
        data = await PatientMedication.findOne({ createdBy: req.query.studentId, assignmentId: req.query.assignmentId })
        break;
      case "Nursing Care Plan":
        data = await PatientNursingCarePlan.findOne({ createdBy: req.query.studentId, assignmentId: req.query.assignmentId })
        break;

      case "Nurse Notes":
        data = await PatientNurseNotes.findOne({ createdBy: req.query.studentId, assignmentId: req.query.assignmentId })
        break;

      case "Laboratory":
        data = await PatientLaboratory.findOne({ createdBy: req.query.studentId, assignmentId: req.query.assignmentId })
        break;

      case "Therapy":
        data = await PatientTherapy.findOne({ createdBy: req.query.studentId, assignmentId: req.query.assignmentId })
        break;

      case "Doctor Orders":
        data = await PatientDoctorOrders.findOne({ createdBy: req.query.studentId, assignmentId: req.query.assignmentId })
        break;

      case "Prosthetics/Aids":
        data = await PatientProsthetics_Aids.findOne({ createdBy: req.query.studentId, assignmentId: req.query.assignmentId })
        break;

      default:
        data = await SubmittedCustomForm.findOne({ createdBy: req.query.studentId, assignmentId: req.query.assignmentId })
    }
    return res.status(200).json({ success: true, message: "Data found", data });
  } catch (error) {
    return res.status(400).json({ success: false, message: "There is some error please try again later" });
  }
}


exports.updateGrade = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ success: false, message: "user not found" });
    }
    let { grade, comment } = req.body;
    await StudentAssignmentStatus.findByIdAndUpdate(req.params.id, { grade, comment });
    return res.status(200).json({ success: true, message: "Grade successfully Updated" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: "There is some error please try again later" });
  }
}
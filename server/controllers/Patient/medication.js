const PatientMedication = require("../../database/models/patientMedication");
const MasterMedication = require("../../database/models/masterMedication");
const MasterMedicationUnit = require("../../database/models/masterMedicineUnit");
const MasterMedicationRoute = require("../../database/models/masterMedicineRoute");
const MasterMedicationFrequency = require("../../database/models/masterMedicineFrequency");
const MasterMedicationDirections = require("../../database/models/masterMedicineDirections");
const MasterMedicationDuration = require("../../database/models/masterMedicineDuration");
const MasterMedicationMedicine = require("../../database/models/masterMedicationMedicine");
const MasterReaction = require("../../database/models/allergiesReaction");
const MasterSeverities = require("../../database/models/allergiesSeverities");
const MasterFamilyHistoryTypes = require("../../database/models/familyHistoryTypes");
const MasterDocumentType = require("../../database/models/doumentType");
const MasterDepartment = require("../../database/models/department");
const MasterStudentCourse = require("../../database/models/studentCourse");
const MasterMedicine = require("../../database/models/masterMedicationMedicine");
const MasterDaignosisDomainClass = require("../../database/models/daignosisMasterClasses");
const MasterDaignosisList = require("../../database/models/daignosisClasses");

exports.getMedicationFormData = async (req, res) => {
  try {
    let medicationList;
    let medicationUnit;
    let medicationRoute;
    let medicationFrequency;
    let medicationDirections;
    let medicationDuration
    if (req.roleId === 1) {
      medicationList = await MasterMedication.find({}).collation({ locale: "en" }).sort({ name: 1 });
      medicationUnit = await MasterMedicationUnit.find({}).collation({ locale: "en" }).sort({ unit: 1 });
      medicationRoute = await MasterMedicationRoute.find({}).collation({ locale: "en" }).sort({ route: 1 });
      medicationFrequency = await MasterMedicationFrequency.find({}).collation({ locale: "en" }).sort({ frequency: 1 });
      medicationDirections = await MasterMedicationDirections.find({}).collation({ locale: "en" }).sort({ directions: 1 });
      medicationDuration = await MasterMedicationDuration.find({}).collation({ locale: "en" }).sort({ duration: 1 })
    }
    else {
      medicationList = await MasterMedication.find({
        $or: [
          { createdBy: req.userId },
          { roleId: "1" },
          { createdBy: { $exists: false } },
        ],
      }).collation({ locale: "en" }).sort({ name: 1 });
      medicationUnit = await MasterMedicationUnit.find({
        $or: [
          { createdBy: req.userId },
          { roleId: "1" },
          { createdBy: { $exists: false } },
        ],
      }).collation({ locale: "en" }).sort({ unit: 1 });
      medicationRoute = await MasterMedicationRoute.find({
        $or: [
          { createdBy: req.userId },
          { roleId: "1" },
          { createdBy: { $exists: false } },
        ],
      }).collation({ locale: "en" }).sort({ route: 1 });
      medicationFrequency = await MasterMedicationFrequency.find({
        $or: [
          { createdBy: req.userId },
          { roleId: "1" },
          { createdBy: { $exists: false } },
        ],
      }).collation({ locale: "en" }).sort({ frequency: 1 });
      medicationDirections = await MasterMedicationDirections.find({
        $or: [
          { createdBy: req.userId },
          { roleId: "1" },
          { createdBy: { $exists: false } },
        ],
      }).collation({ locale: "en" }).sort({ directions: 1 });
      medicationDuration = await MasterMedicationDuration.find({
        $or: [
          { createdBy: req.userId },
          { roleId: "1" },
          { createdBy: { $exists: false } },
        ],
      }).collation({ locale: "en" }).sort({ duration: 1 });
    }
    Promise.all([medicationList, medicationUnit, medicationRoute, medicationFrequency, medicationDirections, medicationDuration]).then((values) => {
      return res.status(200).json({ success: true, message: "Data found", medicationList, medicationUnit, medicationRoute, medicationFrequency, medicationDirections, medicationDuration });
    })
      .catch((error) => {
        return res.status(400).json({ success: false, message: "There is some error please try again later" });
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
}

exports.postMedication = async (req, res) => {
  let { pId, status, quantity, startOn, comment, medicine, refill, reasonRx, prescriber, imageUrl, dose, unit, route, frequency, directions, duration, ptInstructions, submittedTime,
    assignmentId, medication } = req.body;
  let file = "";
  if (req.files?.length > 0) {
    file = req.files[0].filename;
  }

  if (!medicine) {
    medicine = null;
  }

  let newData = new PatientMedication({
    pId,
    status,
    quantity,
    startOn,
    comment,
    medicine,
    refill,
    reasonRx,
    file,
    prescriber,
    imageUrl,
    dose,
    unit,
    route,
    frequency,
    directions,
    duration,
    ptInstructions,
    submittedTime,
    assignmentId,
    createdBy: req.userId,
    updatedBy: req.userId,
    roleId: req.roleId,
    medication
  });

  try {
    await newData.validate();
    await newData.save();
    return res
      .status(201)
      .json({ success: true, message: "Medation data saved" });
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

exports.getMedication = async (req, res) => {
  try {
    let data;
    if (req.params.pId) {
      data = await PatientMedication.find({ pId: req.params.pId, isDeleted: false }).populate("medicine");
    } else {
      data = await PatientMedication.find({ isDeleted: false }).populate("medicine");
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
exports.updateMedication = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }
    let { pId, status, quantity, startOn, comment, medicine, refill, reasonRx, prescriber, imageUrl, dose, unit, route, frequency, directions, duration, ptInstructions, medication } = req.body;
    let file = "";
    if (req.files.length > 0) {
      file = req.files[0].filename;
    }
    await PatientMedication.findByIdAndUpdate(req.params.id, {
      pId,
      status,
      quantity,
      startOn,
      comment,
      medicine,
      refill,
      reasonRx,
      file,
      prescriber,
      imageUrl,
      dose,
      unit,
      route,
      frequency,
      directions,
      duration,
      ptInstructions,
      medication,
      createdBy: req.userId,
      updatedBy: req.userId,
      roleId: req.roleId,
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
exports.deleteMedication = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }
    await PatientMedication.findByIdAndUpdate(req.params.id, { isDeleted: true });
    return res.status(200).json({ success: true, message: "Data is Deleted" });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};

exports.addCustomMasterData = async (req, res) => {
  let { name, type, description, uses, list, medicineId } = req.body;
  let lowerCaseType = type.toLowerCase()
  let listArray
  if (lowerCaseType === "medicine" || lowerCaseType === "domainclass") {
    listArray = list.split(",").map(item => item.trim());
  }
  let newData;
  try {
    switch (lowerCaseType?.toLowerCase()) {
      case "route":
        newData = new MasterMedicationRoute({
          route: name,
          customRoutestatus: 1,
          roleId: req.roleId,
          createdBy: req.userId,
        });
        break;
      case "medicine":
        newData = new MasterMedication({
          name,
          description,
          uses,
          roleId: req.roleId,
          createdBy: req.userId,
        });
        await newData.save();
        const newDocument = new MasterMedicine({
          name: newData.name,
          list: listArray,
          medicationId: newData._id,
          roleId: req.roleId,
          createdBy: req.userId,
        });
        await newDocument.save();
        break;
      case "medication":
        try {
          const updatedMedicine = await MasterMedicine.findByIdAndUpdate(
            medicineId,
            {
              $push: { list: name },
            },
            { new: true }
          );
          if (!updatedMedicine) {
            return res.status(404).json({
              success: false,
              message: "Medicine not found",
            });
          }
          return res.status(201).json({
            success: true,
            message: "Medication updated successfully",
            data: updatedMedicine,
          });
        } catch (err) {
          console.error('Error updating medicine:', err);
          return res.status(500).json({
            success: false,
            message: "Error updating medicine",
          });
        }
      case "frequency":
        newData = new MasterMedicationFrequency({
          frequency: name,
          roleId: req.roleId,
          createdBy: req.userId,
        });
        break;

      case "directions":
        newData = new MasterMedicationDirections({
          directions: name,
          roleId: req.roleId,
          createdBy: req.userId,
        });
        break;

      case "unit":
        newData = new MasterMedicationUnit({
          unit: name,
          roleId: req.roleId,
          createdBy: req.userId,
        });
        break;

      case "duration":
        newData = new MasterMedicationDuration({
          duration: name,
          roleId: req.roleId,
          createdBy: req.userId,
        });
        break;

      case "reaction":
        newData = new MasterReaction({
          reaction: name,
          roleId: req.roleId,
          createdBy: req.userId,
        });
        break;

      case "severities":
        newData = new MasterSeverities({
          severities: name,
          roleId: req.roleId,
          createdBy: req.userId,
        });
        break;

      case "relation":
        newData = new MasterFamilyHistoryTypes({
          name: name,
          roleId: req.roleId,
          createdBy: req.userId,
        });
        break;

      case "documenttype":
        newData = new MasterDocumentType({
          documentType: name,
          roleId: req.roleId,
          createdBy: req.userId,
        });
        break;

      case "department":
        newData = new MasterDepartment({
          departmentName: name,
          roleId: req.roleId,
          createdBy: req.userId,
        });
        break;

      case "course":
        newData = new MasterStudentCourse({
          coursename: name,
          roleId: req.roleId,
          createdBy: req.userId,
        });
        break;

      case "domainclass":
        newData = new MasterDaignosisDomainClass({
          name,
          roleId: req.roleId,
          createdBy: req.userId,
        });
        await newData.save();
        const data = new MasterDaignosisList({
          name: newData.name,
          list: listArray,
          classId: newData._id,
          roleId: req.roleId,
          createdBy: req.userId,
        });
        await data.save();

        break;
      default:

        return;
    }
    await newData.save();
    return res
      .status(201)
      .json({ success: true, message: "Master Data Saved", data: newData });
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      success: false,
      message: "There is some error please try again later",
    });
  }
};

exports.getMedicationMedicine = async (req, res) => {
  try {
    let data;
    if (req.params.id) {
      data = await MasterMedicationMedicine.find({ medicationId: req.params.id })
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
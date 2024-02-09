const express = require("express");
const router = new express.Router();
const patientDemographicController = require("../controllers/patient/demographic");
const patientDiagnosisController = require("../controllers/patient/diagnosis");
const patientAllergiesController = require("../controllers/patient/allergies");
const patientFamilyHistoryController = require("../controllers/patient/familyHistory");
const patientDocumentController = require("../controllers/Patient/patientDocument")
const patientVitalController = require("../controllers/Patient/vitals");
const patientInformationController = require("../controllers/Patient/patientAllInformation");
const patientSocialHistory = require("../controllers/patient/socialHistory");
const patientMedication = require("../controllers/Patient/medication");
const patientNursingcarePlan = require("../controllers/Patient/nursingcareplan");
const patientNursesNotes = require("../controllers/Patient/nurseNotes");
const patientLaboratory = require("../controllers/Patient/laboratory");
const patientTherapy = require("../controllers/Patient/therapy");
const doctorsOrders = require("../controllers/Patient/doctorsOrders");
const prosthetics_Aids = require("../controllers/Patient/Prosthetics_Aids");

const uploadFile = require("../middleware/uploadFile");
const file = require("../middleware/patientsDocuments");


//DemographicController
router.get("/patientDemographicRefferNames", patientDemographicController.getRefferNames);
router.post("/patientDemographic", uploadFile.uploadAvatarFile("avatar"), patientDemographicController.demographic);
router.get("/patientDemographic", patientDemographicController.getDemographic);
router.get("/patientDemographic/:id", patientDemographicController.getDemographic);
router.put("/patientDemographic/:id", uploadFile.uploadAvatarFile("avatar"), patientDemographicController.updateDemographic);
router.delete("/patientDemographic/:id", patientDemographicController.deleteDemographic);
router.get("/patientImage/:fileName", patientDemographicController.getPatientImage);
router.post('/checkemail', patientDemographicController.checkEmail)

//Diagnosis

router.post("/patientDiagnosis", patientDiagnosisController.diagnosis);
router.get("/patientDiagnosis", patientDiagnosisController.getDaignosis);
router.delete("/patientDiagnosis/:id", patientDiagnosisController.deleteDiagnosis);
router.get("/patientDiagnosis/domains", patientDiagnosisController.getDomain);
router.get(
  "/patientDiagnosis/domainClasses",
  patientDiagnosisController.getDomainClasses
);
router.get(
  "/patientDiagnosis/daignosisDescription/:id",
  patientDiagnosisController.getDaignosisDescription
);
router.get("/patientDiagnosis/:id", patientDiagnosisController.getDaignosis);
router.get(
  "/patientDiagnosis/masterData/:query",
  patientDiagnosisController.getMasterDaignosisData
);
router.put("/patientDiagnosis/:id", patientDiagnosisController.updateDiagnosis);

//Allergies

router.post("/patientAllergies", patientAllergiesController.allergies);
router.get("/patientAllergies/:pId", patientAllergiesController.getAllergiesList);
router.delete("/patientAllergies/:id", patientAllergiesController.deleteAllergies);
router.put("/patientAllergies/:id", patientAllergiesController.updateAllergies);
router.get("/allergiesReaction", patientAllergiesController.getAllergiesReaction);
router.get("/allergiesSeverities", patientAllergiesController.getAllergiesSeverities);

//familyHistory

router.post("/patientfamilyHistory", patientFamilyHistoryController.familyHistory);
router.get("/patientfamilyHistory/:pId", patientFamilyHistoryController.getFamilyHistory);
router.delete(
  "/patientfamilyHistory/:id",
  patientFamilyHistoryController.deleteFamilyHistory
);
router.put("/patientfamilyHistory/:id", patientFamilyHistoryController.updateFamilyHistory);

//Document

router.post("/addDisease", patientAllergiesController.addDisease);
router.post("/patientDocument", file("docFile"), patientDocumentController.addDocument);
router.get("/patientDocument", patientDocumentController.getDocument);
router.get("/patientDocument/:id", patientDocumentController.getDocument);
router.delete("/patientDocument/:id", patientDocumentController.deleteDocument);
router.put("/patientDocument/:id", file("docFile"), patientDocumentController.updateDocument);
router.get("/patientDocumentType", patientDocumentController.getDocumentType);
router.get(
  "/patientDocument/getDocumentFiles/:fileName",
  patientDocumentController.getDocumentFiles
);

//Vital

router.post("/patientVital", patientVitalController.postVital);
router.get("/patientVital/:pId", patientVitalController.getVital);
router.delete("/patientVital/:id", patientVitalController.deleteVital);
router.put("/patientVital/:id", patientVitalController.updateVital);
router.get('/getmasterDataOxygenSupply', patientVitalController.getMasterDataOxygenSupply)

//All data
router.get("/allPatientData", patientInformationController.getAllData);
router.get("/allPatientData/:id", patientInformationController.getAllData);
router.get("/patientVitalData/:id", patientInformationController.getVitalData);


// Social History
router.post("/patientSocialHistory", patientSocialHistory.postSocialHistory);
router.get("/patientSocialHistory/:pId", patientSocialHistory.getSocialHistory);
router.put("/patientSocialHistory/:id", patientSocialHistory.updateSocialHistory);

//  Medication
router.get("/medicationFormData", patientMedication.getMedicationFormData);
router.post("/medication", uploadFile.uploadMedicationFile("file"), patientMedication.postMedication);
router.get("/medication/:pId", patientMedication.getMedication);
router.put("/medication/:id", uploadFile.uploadAvatarFile("file"), patientMedication.updateMedication);
router.delete("/medication/:id", patientMedication.deleteMedication);
router.get("/medicationMedicine/:id", patientMedication.getMedicationMedicine);
//add master data
router.post("/addMasterData", patientMedication.addCustomMasterData);

//Nursing Care Plan
router.post("/patientNursingcarePlan", patientNursingcarePlan.addNursingcarePlan);
router.get("/patientNursingcarePlan/:pId", patientNursingcarePlan.getNursingcarePlanList);
router.delete("/patientNursingcarePlan/:id", patientNursingcarePlan.deleteNursingcarePlan);
router.put("/patientNursingcarePlan/:id", patientNursingcarePlan.updateNursingcarePlan);

//Nurses Notes 
router.post("/patientNursesNotes", patientNursesNotes.addNursesNotes);
router.get("/patientNursesNotes/:pId", patientNursesNotes.getNursesNotesList);
router.delete("/patientNursesNotes/:id", patientNursesNotes.deleteNursesNotes);
router.put("/patientNursesNotes/:id", patientNursesNotes.updateNursesNotes);


// laboratory 
router.post("/patientLaboratory", patientLaboratory.addLaboratory);
router.get("/patientLaboratory/:pId", patientLaboratory.getLaboratoryList);
router.delete("/patientLaboratory/:id", patientLaboratory.deleteLaboratory);
router.put("/patientLaboratory/:id", patientLaboratory.updateLaboratory);

// Therapy 
router.post("/patientTherapy", patientTherapy.addTherapy);
router.get("/patientTherapy/:pId", patientTherapy.getTherapyList);
router.delete("/patientTherapy/:id", patientTherapy.deleteTherapy);
router.put("/patientTherapy/:id", patientTherapy.updateTherapy);


// DoctorsOrders 
router.post("/doctorsOrders", doctorsOrders.addDoctorsOrders);
router.get("/doctorsOrders/:pId", doctorsOrders.getDoctorsOrdersList);
router.delete("/doctorsOrders/:id", doctorsOrders.deleteDoctorsOrders);
router.put("/doctorsOrders/:id", doctorsOrders.updateDoctorsOrders);

// Prosthetics_Aids 
router.post("/prosthetics_Aids", prosthetics_Aids.addProsthetics_Aids);
router.get("/prosthetics_Aids/:pId", prosthetics_Aids.getProsthetics_AidsList);
router.delete("/prosthetics_Aids/:id", prosthetics_Aids.deleteProsthetics_Aids);
router.put("/prosthetics_Aids/:id", prosthetics_Aids.updateProsthetics_Aids);
module.exports = router;

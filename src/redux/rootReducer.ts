import { combineReducers } from "redux";

import { SignReducer, LoginReducer ,schoolLoginReducer ,studentLoginReducer , forgotPasswordReducer , changePasswordReducer , createPasswordReducer } from "./modules/auth/reducer";
import { UserReducer } from "./modules/home/reducer";
import { Diagnosis } from "./modules/patients/daignosis/reducer";
import {
  RefferNames,
  postDemographic,
  getDemographic,
  updateDemographic,
  checkEmailForDemoGraphic
} from "./modules/patients/demographic/reducer";
import {
  getAllergy,
  postAllergy,
  getAllergyReaction,
  getAllergySeverties,
  deleteAllergy,
  updateAllergy,
} from "./modules/patients/allergies/reducer";
import { postFamilyHistory, getFamilyData,deleteFamilyHistory,updateFamilyHistory , getFamilyHistoryType } from "./modules/patients/familyHistory/reducer";
import {getProviderName, getDocumentType, getDocumentData,postDocumentData,deleteDocument,updateDocument,downloadDocument,} from "./modules/patients/documents/reducer"
import { postVitals, getVitals, deleteVitals, updateVitals , getOxygensupplyMasterData } from "./modules/patients/vitals/reducer";
import { getDepartments } from './modules/students/department/reducer'
import { getCourses } from './modules/students/course/reducer'
import { poststudent ,getStudent ,deleteStudent ,updateStudent ,checkEmail } from './modules/students/student/reducer'

import { getPatientInformationData,getPatientVitalsData } from "./modules/patients/patientInformation/reducer";
import { postSocial,getSocial,updateSocial } from "./modules/patients/socialHistory/reducer";
import { postschool ,getSchool , updateSchool , deleteSchool , checkSchoolEmail , checkSchoolUserId} from './modules/school/reducer';
import { getAssessment,postAssessment,deleteAssessment,updateAssessment , getAssessmentType , postAssessmentType } from './modules/setting/assessmentTool/reducer';
import { getAssessmentGroup,postAssessmentGroup,deleteAssessmentGroup,updateAssessmentGroup } from "./modules/setting/assessmentGroup/reducer";
import { getAssignment,postAssignment,deleteAssignment,updateAssignment } from "./modules/assignment/reducer";
import { getGrading,getFormData,updateGrading } from "./modules/grading/reducer";
import {getMyAssignmentData, getMyAssignmentDetailData, getMyAssignmentStatusData, postMyAssignmentStatusData, updateMyAssignmentStatus, getMyCustomAssignmentForm, getMyGradesData, updateAssignmentSubmissionDate, resetAssignment} from "./modules/studentView/myAssignments/reducer";
import { postCustomForm, submitCustomForm } from "./modules/customform/reducer"
import { getProfile , updateProfile , changePassord } from './modules/profile/reducer'
import { getNotification , updateNotificationData } from './modules/notification/reducer'
import { postquickguide , getquickguide , updatequickguide ,deletequickguide } from './modules/quickGuide/reducer'
import { getMedication , postMedication , updateMedication ,deleteMedication,getMedicationFormData,postCustomMedicationRoute,getMedicationMedicine } from './modules/patients/medication/reducer'
import {getNursingCarePlan, deleteNursingCarePlan, postNursingCarePlan, updateNursingCarePlan } from './modules/patients/nursingCarePlan/reducer'
import {getNursesNotesPlan, postNursesNotesPlan, deleteNursesNotesPlan, updateNursesNotesPlan } from './modules/patients/nursesNotes/reducer'
import {getLaboratory, postLaboratory, deleteLaboratory, updateLaboratory } from './modules/patients/laboratory/reducer'
import {getDoctorsOrders, postDoctorsOrders, deleteDoctorsOrders, updateDoctorsOrders } from './modules/patients/doctorsOrders/reducer'
import {getTherapy, postTherapy, deleteTherapy, updateTherapy } from './modules/patients/therapy/reducer'
import {getProsthetics_Aids, postProsthetics_Aids, deleteProsthetics_Aids, updateProsthetics_Aids } from './modules/patients/prosthetics_Aids/reducer'


const rootReducer = combineReducers({
  auth: SignReducer,
  login: LoginReducer,
  user: UserReducer,
  diagnosis: Diagnosis,
  refferNames: RefferNames,
  postDemographic: postDemographic,
  checkEmailForDemoGraphic,
  getDemographic: getDemographic,
  updateDemographic: updateDemographic,
  getAllergy: getAllergy,
  postAllergy: postAllergy,
  getAllergyReaction: getAllergyReaction,
  getAllergySeverties: getAllergySeverties,
  deleteAllergy: deleteAllergy,
  updateAllergy: updateAllergy,
  postFamilyHistory:postFamilyHistory,
  getFamilyData:getFamilyData,
  deleteFamilyHistory:deleteFamilyHistory,
  updateFamilyHistory:updateFamilyHistory,
  getFamilyHistoryType,
  getProviderName:getProviderName,
  getDocumentType:getDocumentType,
  getDocumentData:getDocumentData,
  postDocumentData:postDocumentData,
  deleteDocument:deleteDocument,
  updateDocument:updateDocument,
  downloadDocument:downloadDocument,
  postVitals,
  getVitals,
  deleteVitals,
  updateVitals,
  getOxygensupplyMasterData,
  getDepartments,
  getCourses,
  poststudent : poststudent,
  getStudent,
  deleteStudent,
  updateStudent,
  checkEmail,
  getPatientInformationData,
  getPatientVitalsData,
  postSocial,
  getSocial,
  updateSocial,
  postschool,
  getSchool,
  updateSchool,
  deleteSchool,
  checkSchoolEmail,
  checkSchoolUserId,
  getAssessment,postAssessment,deleteAssessment,updateAssessment,
  getAssessmentGroup,postAssessmentGroup,deleteAssessmentGroup,updateAssessmentGroup,
  schoolLoginReducer,
  studentLoginReducer,
  forgotPasswordReducer,
  changePasswordReducer,
  createPasswordReducer,
  getAssignment,postAssignment,deleteAssignment,updateAssignment,
  getMyAssignmentData,
  getMyAssignmentDetailData,
  getMyAssignmentStatusData,
  postMyAssignmentStatusData,
  updateMyAssignmentStatus,
  getMyCustomAssignmentForm,
  getMyGradesData,
  updateAssignmentSubmissionDate,
  resetAssignment,
  postCustomForm,
  submitCustomForm,
  getAssessmentType,
  postAssessmentType,
  getProfile,
  updateProfile,
  changePassord,
  getGrading,
  getFormData,
  updateGrading,
  getNotification,
  updateNotificationData,
  postquickguide,
  getquickguide,
  updatequickguide,
  deletequickguide,
  getMedication,
  postMedication,
  updateMedication,
  deleteMedication,
  getMedicationFormData,
  postCustomMedicationRoute,
  getMedicationMedicine,
  getNursingCarePlan,
  deleteNursingCarePlan,
  postNursingCarePlan,
  updateNursingCarePlan,
  getNursesNotesPlan,
  postNursesNotesPlan,
  deleteNursesNotesPlan,
  updateNursesNotesPlan,
  getLaboratory,
  postLaboratory,
  deleteLaboratory,
  updateLaboratory,
  getTherapy,
  postTherapy,
  deleteTherapy,
  updateTherapy,
  getDoctorsOrders,
  postDoctorsOrders,
  deleteDoctorsOrders,
  updateDoctorsOrders,
  getProsthetics_Aids,
  postProsthetics_Aids,
  deleteProsthetics_Aids,
  updateProsthetics_Aids,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;

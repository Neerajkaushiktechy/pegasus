import { all, fork } from "redux-saga/effects";
import apiSaga from "./modules/auth/sagas";
import userSaga from "./modules/home/sagas";
import diagnosisWatcher from "./modules/patients/daignosis/sagas";
import demographicSaga from "./modules/patients/demographic/sagas";
import allergiesSaga from "./modules/patients/allergies/sagas";
import familyHistorySaga from "./modules/patients/familyHistory/sagas";
import documentSaga from "./modules/patients/documents/sagas";
import vitalsSaga from "./modules/patients/vitals/sagas";
import getDepartmentWatcher from "./modules/students/department/saga"
import getcourseWatcher from "./modules/students/course/saga";
import studentWatcher from './modules/students/student/saga'
import patientInformationSaga from "./modules/patients/patientInformation/sagas";
import socialHistorySaga from "./modules/patients/socialHistory/sagas";
import SchoolSagaWatcher from './modules/school/saga';
import assessmentToolSaga from './modules/setting/assessmentTool/sagas';
import assessmentGroupsaga from './modules/setting/assessmentGroup/sagas';
import assignmentSaga from './modules/assignment/sagas';
import myAssignmentSaga from './modules/studentView/myAssignments/sagas';
import customFormSage from './modules/customform/saga'
import profileSage from './modules/profile/saga';
import grading from './modules/grading/sagas';
import notification from './modules/notification/saga'
import QuickGuide from "./modules/quickGuide/saga";
import medication  from "./modules/patients/medication/sagas";
import nursingCarePlanSaga  from "./modules/patients/nursingCarePlan/sagas";
import nursesNotesSaga  from "./modules/patients/nursesNotes/sagas";
import laboratorySaga  from "./modules/patients/laboratory/sagas";
import therapySaga  from "./modules/patients/therapy/sagas";
import doctorsOrders  from "./modules/patients/doctorsOrders/sagas";
import prosthetics_Aids  from "./modules/patients/prosthetics_Aids/sagas";
export function* rootSaga() {
  yield all(
    [
      ...apiSaga,
      ...userSaga,
      ...demographicSaga,
      ...allergiesSaga,
      ...familyHistorySaga,
      ...documentSaga,
      ...vitalsSaga,
      ...getDepartmentWatcher,
      ...getcourseWatcher,
      ...studentWatcher,
      ...patientInformationSaga,
      ...socialHistorySaga,
      ...SchoolSagaWatcher,
      ...assessmentToolSaga,
      ...assessmentGroupsaga,
      ...assignmentSaga,
      ...myAssignmentSaga,
      ...customFormSage,
      ...profileSage,
      ...grading,
      ...notification,
      ...QuickGuide,
      ...medication,
      ...nursingCarePlanSaga,
      ...nursesNotesSaga,
      ...laboratorySaga,
      ...therapySaga,
      ...doctorsOrders,
      ...prosthetics_Aids,
      diagnosisWatcher
    ].map((saga) => fork(saga))
  );
}

import { useState, useEffect } from "react";
import { Input, FormControl, Typography, Grid, Box, Button, Paper, FormLabel, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import DialogBox from "../../../../components/DialogBox";
import { getFormDataRequest, updateRequest } from "../../../../redux/modules/grading/action";
import { useSelector } from "react-redux";
import SocialHistoryFrom from "../../../Patient/SocialHistory/components/SocialHistortForm/index";
import AllergiesFrom from "../../../Patient/Allergies/components/AllergiesForm";
import FamilyHistoryFrom from "../../../Patient/FamilyHistory/components/FamilyHistoryForm";
import VitaForm from "../../../Patient/Vital/components/vitalForm";
import DocumentsForm from "../../../Patient/Document/components/DocumentsForm";
import AddDiagnosis from "../../../Patient/Diagnosis/components/add-diagnosis";
import { DynamicFormComponent } from "../../../CustomForm/components/DynamicFormBuilder";
import PatientCard from "../../../../components/Dashboard/PatientCard";
import MedicationFrom from "../../../Patient/Medication/components/MedicationFrom";
import NursingCarePlanFrom from "../../../Patient/Others/NursingCarePlan/components/NursingCareForm/index";
import NurseNotesForm from "../../../Patient/Others/NursesNotes/components/NursesNotesForm/index";
import LaboratoryForm from "../../../Patient/Others/Laboratory/components/LaboratoryForm/index";
import TherapyFrom from "../../../Patient/Others/Therapy/components/TherapyForm/index";
import DoctorOrdersFrom from "../../../Patient/Others/DoctorsOrders/components/DoctorsOrdersForm/index";
import Prosthetics_AidsFrom from "../../../Patient/Others/Prosthetics_Aids/components/Prosthetics_AidsForm/index";
type props = {
    setShowList: any,
    assignmentData: any
}
export default function CheckAssessmentForm({ setShowList, assignmentData }: props) {
    let dispatch = useDispatch();
    let [formData, setFormData] = useState<any>({
        grade: assignmentData?.assignmentGrade || "",
        comment: assignmentData?.assignmentComment || "",
        formEditData: {}
    });
    let [showAlert, setShowAlert] = useState({
        show: false,
        title: "",
        success: true
    });

    let { updateGrading, getFormData } = useSelector((state: any) => {
        let { updateGrading, getFormData } = state;
        return { updateGrading, getFormData }
    })
    useEffect(() => {
        if (assignmentData?.assignmentType) {
            dispatch(getFormDataRequest({ assignmentType: assignmentData?.assignmentType, assignmentId: assignmentData?.assignmentId, studentId: assignmentData?.studentId }))
        }
    }, [dispatch]);

    useEffect(() => {
        if (getFormData?.data?.success) {
            setFormData((prevalue: any) => {
                return {
                    ...prevalue,
                    formEditData: getFormData?.data?.data || {}
                }
            })
        }
        if (updateGrading?.data?.success) {
            setShowAlert({ show: true, title: updateGrading.data?.message, success: true })
            delete updateGrading?.data
        }
        if (updateGrading?.error) {
            setShowAlert({ show: true, title: updateGrading.error?.message, success: false })
            delete updateGrading?.error
        }
    }, [updateGrading, getFormData]);


    const updateData = (e: any) => {
        setFormData((prevalue: any) => {
            return {
                ...prevalue,
                [e?.target.name]: e?.target.value,
            };
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        dispatch(updateRequest({ id: assignmentData?.id, data: { grade: formData.grade, comment: formData.comment } }))
    };

    const renderForm = () => {
        switch (assignmentData?.assignmentType) {
            case "Allergies":
                return <AllergiesFrom editData={{ ...formData.formEditData, onlyView: true }} checkAssignment={true} />
            case "Diagnosis":
                return <AddDiagnosis editData={{ ...formData.formEditData, onlyView: true }} checkAssignment={true} />
            case "Vitals":
                return <VitaForm editData={{ ...formData.formEditData, onlyView: true }} checkAssignment={true} />
            case "Documents":
                return <DocumentsForm editData={{ ...formData.formEditData, onlyView: true }} checkAssignment={true} />
            case "Family History":
                return <FamilyHistoryFrom editData={{ ...formData.formEditData, onlyView: true }} checkAssignment={true} />
            case "Social History":
                return <SocialHistoryFrom editData={{ ...formData.formEditData, onlyView: true }} checkAssignment={true} />
            case "Medication":
                return <MedicationFrom editData={{ ...formData.formEditData, onlyView: true }} checkAssignment={true} />
            case "Nursing Care Plan":
                return <NursingCarePlanFrom editData={{ ...formData.formEditData, onlyView: true }} checkAssignment={true} />
            case "Nurse Notes":
                return <NurseNotesForm editData={{ ...formData.formEditData, onlyView: true }} checkAssignment={true} />
            case "Laboratory":
                return <LaboratoryForm editData={{ ...formData.formEditData, onlyView: true }} checkAssignment={true} />
            case "Therapy":
                return <TherapyFrom editData={{ ...formData.formEditData, onlyView: true }} checkAssignment={true} />
            case "Doctor Orders":
                return <DoctorOrdersFrom editData={{ ...formData.formEditData, onlyView: true }} checkAssignment={true} />
            case "Prosthetics/Aids":
                return <Prosthetics_AidsFrom editData={{ ...formData.formEditData, onlyView: true }} checkAssignment={true} />
            default:
                return <DynamicFormComponent fields={formData?.formEditData?.fields} formName={formData?.formEditData?.formName} checkAssignment={true} type="studentcustomform" checkFormType="grading" />;
        }
    }
    return (
        <>

            <PatientCard cardType="singleCard" avatar={assignmentData?.patientDetail?.avatar} age={`${new Date().getFullYear() - new Date(assignmentData?.patientDetail?.dob).getFullYear()}`} nameTitle={assignmentData?.patientDetail?.nameTitle} name={`${assignmentData?.patientDetail?.fName} ${assignmentData?.patientDetail?.lName}`} gender={assignmentData?.patientDetail?.gender} />
            <Paper>
                <Stack p={2} direction="row" justifyContent="space-between" alignItems="center" spacing={2} bgcolor="primary.light" sx={{ padding: "6px 20px" }}>
                    <Typography>Check {assignmentData?.assignmentType}</Typography>
                    <Button
                        onClick={() => { setShowList(true); }}>
                        <CloseIcon sx={{ width: "36px", height: "36px" }} />
                    </Button>
                </Stack>
                <Box p={2} component="form" onSubmit={(e) => { handleSubmit(e); }}>
                    <Box sx={{ marginBottom: "20px" }} >
                        {renderForm()}
                    </Box>
                    <Box sx={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", padding: "20px", borderRadius: "6px", border: "1px solid #440e66", background: "#ccc" }}>
                        <Typography sx={{ color: "#440e66", marginBottom: "20px", fontWeight: "500" }}>Grading Details</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl variant="standard" >
                                    <FormLabel htmlFor="status" required>
                                        Grade in %
                                    </FormLabel>
                                    <Input
                                        sx={{ marginTop: "10px !important" }}
                                        id="grade"
                                        placeholder="Grade"
                                        required
                                        name="grade"
                                        type="number"
                                        disableUnderline
                                        onChange={(e) => {
                                            updateData(e);
                                        }}
                                        value={formData?.grade}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl variant="standard" fullWidth>
                                    <FormLabel htmlFor="comment">
                                        comment
                                    </FormLabel>
                                    <Input
                                        sx={{ padding: "14px", marginTop: "10px !important" }}
                                        id="comment"
                                        name="comment"
                                        fullWidth
                                        disableUnderline
                                        multiline
                                        minRows="5"
                                        onChange={(e) => {
                                            updateData(e);
                                        }}
                                        value={formData?.comment}
                                    />
                                </FormControl>
                            </Grid>

                        </Grid>
                    </Box>

                    <Box mt="50px" textAlign="right">
                        <Button variant="outlined" color="secondary" sx={{ mr: "20px" }} onClick={() => {
                            setShowList(true);
                        }}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="secondary" type="submit">
                            {assignmentData.assignmentGrade ? "Update" : "Save"}
                        </Button>
                    </Box>
                </Box>
            </Paper>
            <DialogBox buttonIcon={showAlert.title === "There is some error please try again later" || showAlert.title === "Please fill required fields" ? "error" : ""} openDialog={showAlert.show} handleSubmit={() => { setShowAlert({ show: false, title: "", success: true }); setShowList(true) }} title={showAlert.title} buttonText="Ok" />
        </>
    );
}
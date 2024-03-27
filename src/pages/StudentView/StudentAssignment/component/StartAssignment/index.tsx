import { Avatar, Paper, Box, Typography, Button, Stack, Divider, IconButton, Grid, Tooltip, List, ListItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { API_BASE_URL } from '../../../../../utils/globalConstants';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import PatientInformation from "../../../../Patient/PatientInformation/index"
import ModalPopup from '../../../../../components/Modal';
import { useState, useEffect, ElementType } from 'react';
import { fetchPatientInformationRequest, fetchPatientVitalRequest } from '../../../../../redux/modules/patients/patientInformation/action';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import AllergiesFrom from "../../../../Patient/Allergies/components/AllergiesForm/index";
import VitalsFrom from "../../../../Patient/Vital/components/vitalForm/index";
import DaignosisForm from "../../../../Patient/Diagnosis/components/add-diagnosis/index";
import DocumentFrom from "../../../../Patient/Document/components/DocumentsForm/index";
import FamilyHistoryFrom from "../../../../Patient/FamilyHistory/components/FamilyHistoryForm/index";
import SocialHistoryFrom from "../../../../Patient/SocialHistory/components/SocialHistortForm/index";
import NursingCarePlanFrom from "../../../../Patient/Others/NursingCarePlan/components/NursingCareForm/index";
import NurseNotesForm from "../../../../Patient/Others/NursesNotes/components/NursesNotesForm/index";
import LaboratoryForm from "../../../../Patient/Others/Laboratory/components/LaboratoryForm/index";
import TherapyFrom from "../../../../Patient/Others/Therapy/components/TherapyForm/index";
import DoctorOrdersFrom from "../../../../Patient/Others/DoctorsOrders/components/DoctorsOrdersForm/index";
import Prosthetics_AidsFrom from "../../../../Patient/Others/Prosthetics_Aids/components/Prosthetics_AidsForm/index";
import { fetchMyAssignmentStatusDataRequest, getMyCustomAssignmentFormRequest } from '../../../../../redux/modules/studentView/myAssignments/action';
import CharComponent from "../../../../../components/Chart";
import CircleIcon from '@mui/icons-material/Circle';
import { DynamicFormComponent } from '../../../../CustomForm/components/DynamicFormBuilder';
import Loader from "../../../../../components/Loader";
import moment from 'moment';
import MedicationFrom from '../../../../Patient/Medication/components/MedicationFrom';
import { getRole } from '../../../../../utils/commonUtil';
const Item = styled(Paper)(({ theme }) => ({
    boxShadow: "none",
    borderRadius: "10px",
    border: "1px solid #CCCCCC",
    padding: "20px",
    textAlign: "center"
}));

type props = {
    avatar?: string,
}


export default function StartAssignment({ avatar }: props) {
    const [showDiagnosisForm, setShowDiagnosisForm] = useState(false);
    const [showAssignment, setshowAssignment] = useState(false)
    const [showToolTip, setshowToolTip] = useState(true)
    const [assessmentType, setassessmentType] = useState<string | undefined>();
    const [time, setTime] = useState<string | undefined>();
    const [stopwatchTime, setStopwatchTime] = useState<number | undefined>();
    const [durationTime, setDurationTime] = useState([])
    let dispatch = useDispatch();
    let { assignmentId, patientid, statusId, studentId } = useParams();
    // let { studentId } = useParams();

    const [showInformationCard, setshowInformationCard] = useState(true)
    const [showListData, setShowListData] = useState(false)


    let { getPatientInformationData, getMyAssignmentDetailData, getMyCustomAssignmentForm, getMyAssignmentStatusData, getPatientVitalsData }: any = useSelector((state: any) => {
        let { getPatientInformationData, getMyAssignmentDetailData, getMyCustomAssignmentForm, getMyAssignmentStatusData, getPatientVitalsData } = state;
        return { getPatientInformationData, getMyAssignmentDetailData, getMyCustomAssignmentForm, getMyAssignmentStatusData, getPatientVitalsData }
    })

    useEffect(() => {
        let paramsid: any = patientid
        let asssessmentId: any = assignmentId
        let statusObjId: any = statusId;
        let stdId: any = studentId;
        dispatch(fetchPatientInformationRequest(atob(paramsid)))
        dispatch(fetchPatientVitalRequest(atob(paramsid)))
        dispatch(fetchMyAssignmentStatusDataRequest({ statusObj: atob(statusObjId), assObj: atob(asssessmentId), studentId: atob(stdId) }))
        const duration = getMyAssignmentDetailData?.data?.data.map((item: any) => item.assessmentId.duration)
        if (duration !== undefined) {
            setDurationTime(duration)
            setTime(duration[0])
            const [hours, minutes] = duration[0].split(":").map(Number); // Parse hours and minutes
            const durationMilliseconds = ((hours * 60 + minutes) * 60) * 1000; // Calculate total duration in milliseconds
            setStopwatchTime(durationMilliseconds);
        }
    }, [patientid, assignmentId, statusId, getMyAssignmentDetailData?.data?.success, getMyAssignmentStatusData?.data?.success]);

    useEffect(() => {
        if (stopwatchTime === 0 || stopwatchTime === undefined) {
            return;
        }
        const interval = setInterval(() => {
            setStopwatchTime(prevTime => prevTime ? prevTime - 1000 : undefined);
        }, 1000);
        return () => clearInterval(interval);
    }, [stopwatchTime]);

    const hours = Math.floor((stopwatchTime || 0) / (1000 * 60 * 60)); // Calculate hours
    const minutes = Math.floor(((stopwatchTime || 0) % (1000 * 60 * 60)) / (1000 * 60)); // Calculate remaining minutes
    const seconds = Math.floor(((stopwatchTime || 0) % (1000 * 60)) / 1000); // Calculate remaining seconds
    const stopwatchTimeString = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    const durationMilliseconds = moment.duration(durationTime[0]).asMilliseconds();
    const stopwatchTimeDuration = moment.duration(stopwatchTimeString);
    const remainingTimeMilliseconds = durationMilliseconds - stopwatchTimeDuration.asMilliseconds();
    const spendTime = moment.utc(remainingTimeMilliseconds).format('HH:mm:ss');

    useEffect(() => {
        const assessmentTypes = getMyAssignmentDetailData?.data?.data.map((item: any) => item.assessmentId.assesmentType?.assessmentName)
        if (assessmentTypes !== undefined && stopwatchTimeString != undefined && (assessmentTypes[0] !== "Allergies" || assessmentTypes[0] !== "Vitals" || assessmentTypes[0] !== "Documents" || assessmentTypes[0] !== "Family History" || assessmentTypes[0] !== "Social History" || assessmentTypes[0] !== "Diagnosis" || assessmentTypes[0] !== "Medication" || assessmentTypes[0] !== "Nursing Care Plan" || assessmentTypes[0] !== "Nurse Notes" || assessmentTypes[0] !== "Laboratory" || assessmentTypes[0] !== "Therapy" || assessmentTypes[0] !== "Doctor Orders" || assessmentTypes[0] !== "Prosthetics/Aids")) {
            dispatch(getMyCustomAssignmentFormRequest(encodeURIComponent(assessmentTypes[0])));

        }
    }, [patientid, assignmentId, getMyAssignmentDetailData?.data?.success, dispatch]);

    const openModal = (e: any) => {
        e.preventDefault();
        let paramsid: any = patientid
        dispatch(fetchPatientInformationRequest(atob(paramsid)))
        setShowListData(true)
    }
    const renderForm = () => {
        let paramsid: any = patientid
        let id: any = statusId
        let patientId = atob(paramsid)
        const getId = atob(id)
        const assessmentId = getId
        const assessmentTypes = getMyAssignmentDetailData?.data?.data.map((item: any) => item.assessmentId.assesmentType.assessmentName)
        const assignmentId = getMyAssignmentStatusData?.data?.data.map((data: any) => data.assignmentId)
        if (assessmentTypes != undefined && stopwatchTimeString != undefined && assignmentId != undefined)
            switch (assessmentTypes[0]) {
                case "Allergies":
                    return <AllergiesFrom patientId={patientId} assessmentId={assessmentId} submittedTime={spendTime} assignmentId={assignmentId[0]} />
                case "Vitals":
                    return <VitalsFrom patientId={patientId} assessmentId={assessmentId} submittedTime={spendTime} assignmentId={assignmentId[0]} />
                case "Documents":
                    return <DocumentFrom patientId={patientId} assessmentId={assessmentId} submittedTime={spendTime} assignmentId={assignmentId[0]} />
                case "Family History":
                    return <FamilyHistoryFrom patientId={patientId} assessmentId={assessmentId} submittedTime={spendTime} assignmentId={assignmentId[0]} />
                case "Social History":
                    return <SocialHistoryFrom patientId={patientId} assessmentId={assessmentId} submittedTime={spendTime} assignmentId={assignmentId[0]} />
                case "Diagnosis":
                    return <DaignosisForm type="myassingment" patientId={patientId} assessmentId={assessmentId} submittedTime={spendTime} setShowDiagnosisForm={setShowDiagnosisForm} assignmentId={assignmentId[0]} />
                case "Medication":
                    return <MedicationFrom patientId={patientId} assessmentId={assessmentId} submittedTime={spendTime} assignmentId={assignmentId[0]} />
                case "Nursing Care Plan":
                    return < NursingCarePlanFrom patientId={patientId} assessmentId={assessmentId} submittedTime={spendTime} assignmentId={assignmentId[0]} />
                case "Nurse Notes":
                    return <NurseNotesForm patientId={patientId} assessmentId={assessmentId} submittedTime={spendTime} assignmentId={assignmentId[0]} />
                case "Laboratory":
                    return <LaboratoryForm patientId={patientId} assessmentId={assessmentId} submittedTime={spendTime} assignmentId={assignmentId[0]} />
                case "Therapy":
                    return <TherapyFrom patientId={patientId} assessmentId={assessmentId} submittedTime={spendTime} assignmentId={assignmentId[0]} />
                case "Doctor Orders":
                    return <DoctorOrdersFrom patientId={patientId} assessmentId={assessmentId} submittedTime={spendTime} assignmentId={assignmentId[0]} />
                case "Prosthetics/Aids":
                    return <Prosthetics_AidsFrom patientId={patientId} assessmentId={assessmentId} submittedTime={spendTime} assignmentId={assignmentId[0]} />
                default:
                    return <DynamicFormComponent fields={getMyCustomAssignmentForm?.data?.data?.fields} formName={getMyCustomAssignmentForm?.data?.data?.formName} type="studentcustomform" patientId={patientId} assessmentId={assessmentId} submittedTime={spendTime} assignmentId={assignmentId[0]} />;
            }

    }

    const getreaction = () => {
        const reaction = getPatientInformationData?.data?.Allergies?.map((problem: any) => problem.allergy);
        const reactionString = reaction?.join(' / ');
        return (
            <Box sx={{
                maxWidth: "380px", whiteSpace: "nowrap",
                overflow: "hidden", textOverflow: "ellipsis",
                marginBottom: "10px"
            }}>
                <Typography variant="body2" display="inline" color="text.secondary" paragraph marginBottom={"0"}>
                    Allergies : {reactionString}
                </Typography>
            </Box>
        )
    }
    const getproblemDescription = () => {
        const descriptions = getPatientInformationData?.data?.Problem?.map((problem: any) => problem.description);
        return (
            <Box sx={{
                maxWidth: "380px", whiteSpace: "nowrap",
                overflow: "hidden", textOverflow: "ellipsis",
                marginRight: "14px", paddingRight: "14px", marginBottom: "10px"
            }}>
                <Typography variant="body2" display="inline" color="text.secondary" paragraph marginBottom={"0"}
                    sx={{ paddingRight: "14px", marginRight: "14px", marginBottom: "0" }}>
                    Daignosis : {descriptions}
                </Typography>
            </Box>
        )
    }

    if (getMyAssignmentStatusData.loading) {
        return <Loader />
    }
    return (
        <>
            <Box>
                <Box sx={{ background: "#FFFFFF", boxShadow: "0px 1px 60px rgba(190, 190, 190, 0.08)", borderRadius: "10px", padding: "20px", marginTop: "20px", marginBottom: "20px" }}>
                    <Stack direction={"row"} display={"flex"} justifyContent={"space-between"}>
                        {getPatientInformationData?.data?.Demographic?._id && (
                            <Typography sx={{ fontSize: "25px", fontWeight: "500", color: "#440E66" }} pb={4}>{getPatientInformationData?.data.Demographic.fName} {getPatientInformationData?.data.Demographic.lName}</Typography>
                        )}
                        {showInformationCard === true ? (
                            <Box display={"flex"} justifyContent={"end"}><IconButton onClick={() => setshowInformationCard(false)} edge="start"><KeyboardArrowUpIcon /></IconButton></Box>
                        ) : <Box display={"flex"} justifyContent={"end"}><IconButton onClick={() => setshowInformationCard(true)} edge="start"> <ExpandMoreIcon /></IconButton></Box>}
                    </Stack>
                    {
                        showInformationCard === true ? (
                            <Grid container spacing={2} p={2}>
                                <Grid item md={4} xs={12}>
                                    <Box sx={{ display: "flex" }}>
                                        {getPatientInformationData?.data?.Demographic?._id && (
                                            <Box sx={{ marginRight: "16px" }}>
                                                {getPatientInformationData?.data?.Demographic?.avatar?.length !== 0 ? (
                                                    <Avatar variant="rounded" alt={""} src={`${API_BASE_URL}patientImage/${getPatientInformationData?.data?.Demographic?.avatar}`} sx={{ width: "120px", height: "100px", marginBottom: "10px", borderRadius: "10px" }} />
                                                ) :
                                                    <Avatar variant="rounded" sx={{ width: "120px", height: "100px", marginBottom: "10px", borderRadius: "10px" }} />}
                                            </Box>
                                        )}
                                        <Box>
                                            {getPatientInformationData?.data?.Demographic?._id && (
                                                <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>

                                                    <Typography variant="body2" color="text.secondary" paragraph sx={{ borderRight: "1px solid #017BAC", paddingRight: "14px", marginRight: "14px", marginBottom: "0" }}>
                                                        Age: {getPatientInformationData?.data.Demographic.age}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary" paragraph sx={{ marginBottom: "0" }}>
                                                        Gender : {getPatientInformationData?.data.Demographic.gender}
                                                    </Typography>
                                                </Box>
                                            )}
                                            <Box >
                                                <Typography variant="body2" color="text.secondary" paragraph sx={{ marginBottom: "10px" }}>
                                                    MRN :
                                                </Typography>
                                            </Box>
                                            {getPatientInformationData?.data?.Demographic?._id && (
                                                <Box>
                                                    <Typography variant="body2" color="text.secondary" paragraph sx={{ marginBottom: "10px" }}>
                                                        D.O.B : {getPatientInformationData?.data.Demographic.dob}
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item md={5} xs={12}>
                                    <Box>
                                        {getproblemDescription()}
                                        {getreaction()}
                                    </Box>
                                </Grid>
                                <Grid item md={2} xs={12}>
                                    <Box >
                                        <Box>
                                            <Button sx={{ textDecoration: "underline" }} onClick={(e) => openModal(e)}>
                                                View More
                                            </Button>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item md={12} xs={12}>
                                    <Box>
                                        <Box>
                                            <Divider />
                                        </Box>
                                    </Box>
                                </Grid>
                                <CharComponent chartData={getPatientVitalsData?.data?.data} />
                            </Grid>
                        ) : ""
                    }
                </Box >
                <Grid container spacing={2} p={2}>
                    <Grid item md={4} xs={12} id="print-content">
                        <Box textAlign="right" pb="18px">
                            <Typography textAlign="left" fontWeight={"600"} pl={2}>{assessmentType}</Typography>
                        </Box>
                    </Grid>
                    <Grid item md={8} xs={12}>
                        <Stack textAlign="right" pb="18px" direction={"row"} alignItems={"end"} display={"flex"} justifyContent={"flex-end"}>
                            <Typography pr={"30px"}> Total Duration - {time} (HH:MM) </Typography>
                            {getRole() === 2 ? (
                                <Typography sx={{
                                    background: "#440E66",
                                    opacity: "0.6",
                                    borderRadius: "7px",
                                    padding: "4px 8px",
                                    width: "100px",
                                    height: "39px",
                                    color: "white"
                                }}>{stopwatchTimeString}</Typography>
                            ) : null}

                        </Stack>
                    </Grid>
                </Grid>
                {showToolTip === true ? (
                    <Grid item display="flex" justifyContent="flex-end">
                        <Tooltip title="" placement="right-end" onClick={() => { setshowAssignment(true); setshowToolTip(false) }} sx={{
                            position: "fixed",
                            right: "0",
                        }}>
                            <Button sx={{
                                zIndex: "9",
                                position: "absolute",
                                right: "0",
                                top: "65",
                                background: "#440E66",
                                borderRadius: "30px 0px 0px 30px !important",
                                color: "white"
                            }}> <NavigateBeforeIcon />Show Assessment</Button>
                        </Tooltip>
                    </Grid>
                ) : null}
                {showAssignment === true ? (
                    <Box sx={{
                        width: "430px",
                        zIndex: "9",
                        padding: "40px 10px",
                        position: "absolute",
                        right: "0",
                        top: "70",
                        background: "#440E66",
                        boxShadow: "0px 4px 54px rgba(120, 118, 118, 0.25)",
                        borderRadius: "30px 0px 0px 30px",
                    }}> {(getMyAssignmentDetailData?.data && getMyAssignmentDetailData?.data?.data?.length > 0) ?
                        getMyAssignmentDetailData?.data?.data.map((item: any) => (
                            <Box p={2} className="scrollHeight" sx={{ minHeight: "400px", overflowY: "scroll", height: "400px" }}>
                                <Box>
                                    <Typography color={"white"} sx={{ textDecoration: "underline", fontSize: "18px", fontWeight: "600" }}>Assignment Objectives</Typography>
                                    <List>
                                        <ListItem sx={{ width: '100%', padding: "0px", margin: "0px", display: "flex", alignItems: "baseline" }}>
                                            <CircleIcon sx={{ height: "10px", width: "8px", marginRight: "10px", color: "white" }} />
                                            <Typography color={"white"} sx={{ fontSize: "18px", fontWeight: "400" }}>{item.assessmentId.objectives}</Typography>
                                        </ListItem>
                                    </List>
                                </Box>
                                <Box pt={3}>
                                    <Typography color={"white"} sx={{ textDecoration: "underline", fontSize: "18px", fontWeight: "600" }}>Assignment Description</Typography>
                                    <Typography pt={2} color={"white"} sx={{ fontSize: "18px", fontWeight: "400" }}> {item.assessmentId.description}</Typography>
                                </Box>
                            </Box>
                        )) : ""}
                        <Grid item md={8} xs={12}>
                            <Box textAlign="center" pb="18px" mt="40px">
                                <Button variant="outlined" color="primary" sx={{ mr: "20px", mb: "10px", backgroundColor: "white" }} onClick={() => { setshowToolTip(true); setshowAssignment(false) }}>
                                    Hide
                                </Button>
                                <Button sx={{ mr: "20px", mb: "10px" }} variant="contained" color="secondary" type="submit">
                                    Print
                                </Button>
                            </Box>
                        </Grid>
                    </Box>
                ) : null}
                <Box>
                    {renderForm()}
                </Box>
            </Box >
            <ModalPopup classField={"infoPopUp"} view="" patientInfo={true} type="assignment" width={"80%"} show={showListData} setshow={setShowListData} childern={<PatientInformation setshow={setShowListData} />} />
        </>
    )
}
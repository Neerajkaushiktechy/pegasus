import {
    Box,
    Typography,
    Button,
    Stack,
    Card,
    List,
    ListItem,
    IconButton,
    Grid
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../../components/Loader";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from "react-router-dom";
import { fetchMyAssignmentStatusDataRequest, updateMyAssignmentStatusRequest, updateAssignmentSubmissionDateRequest } from "../../../../../redux/modules/studentView/myAssignments/action";
import pdf from "../../../../../assets/pdf.png";
import { API_BASE_URL } from "../../../../../utils/globalConstants";
import moment from "moment";
import { getRole, getUserId } from "../../../../../utils/commonUtil";
import ModalPopup from "../../../../../components/Modal";
import DatePickerComponent from "../../../../../components/DatePicker";
import dayjs from "dayjs";

type props = {
    editData?: any
}


export default function MyAssignmentDetail({ editData }: props) {
    const [show, setshow] = useState<boolean>(false);
    let [formData, setFormData] = useState({
        endDate: "",
    });
    const [assignmentUpdate, setassignmentUpdate] = useState({
        id: "",
        endDate: null
    })
    let dispatch = useDispatch();
    let navigate = useNavigate()
    let { id, statusId } = useParams();
    let { studentId } = useParams();
    let stdId: any = studentId
    let { getMyAssignmentDetailData, getMyAssignmentStatusData, updateAssignmentSubmissionDate } = useSelector((state: any) => {
        let { getMyAssignmentDetailData, getMyAssignmentStatusData, updateAssignmentSubmissionDate
        } = state;
        return { getMyAssignmentDetailData, getMyAssignmentStatusData, updateAssignmentSubmissionDate }
    })

    useEffect(() => {
        let asssessmentId: any = id
        let statusObjId: any = statusId;
        let stdId: any = studentId

        //dispatch
        if (getRole() === 1 || getRole() === 3) {
            dispatch(fetchMyAssignmentStatusDataRequest({ statusObj: atob(statusObjId), assObj: atob(asssessmentId), studentId: atob(stdId) }))
        }
        else {
            let studentId = getUserId()
            dispatch(fetchMyAssignmentStatusDataRequest({ statusObj: atob(statusObjId), assObj: atob(asssessmentId), studentId: studentId }))
        }
        if(updateAssignmentSubmissionDate?.data?.success) {
            setshow(false)
        }
    }, [id, statusId, dispatch, updateAssignmentSubmissionDate?.data?.success])

    const getCurrentDate = () => {
        const currentDate = moment();
        const formattedDate = currentDate.format('YYYY-MM-DD');
        return formattedDate
    }

    const handlePrint = () => {
        const printContent = document.getElementById("print-content");
        if (printContent) {
            const originalContents = document.body.innerHTML;
            document.body.innerHTML = printContent.innerHTML;
            window.print();
            document.body.innerHTML = originalContents;
        }
    }
    const handleStartAssignment = (e: any) => {
        let paramsid: any = statusId;
        let assessmentId = atob(paramsid)
        let status = 1
        if (getRole() === 2) {
            let stdId = getUserId()
            dispatch(updateMyAssignmentStatusRequest({ status, assessmentId }))
            navigate(`/startAssignment/${id}/${btoa(e)}/${statusId}/${btoa(stdId)}`)
        }
        else navigate(`/startAssignment/${id}/${btoa(e)}/${statusId}/${studentId}`)
    };

    const handleSubmitAssignmentDate = () => {
        dispatch(updateAssignmentSubmissionDateRequest({ ...assignmentUpdate }))
    }

    if (getMyAssignmentStatusData.loading) {
        return <Loader />
    }

    const changeEndDateAssignMent = (item: any) => {
        setassignmentUpdate((prev: any) => ({ ...prev, endDate: item?.endDate, id: item?._id }))
        setshow(true)
        delete updateAssignmentSubmissionDate.data
    }
    return (
        <>  {(getMyAssignmentDetailData?.data && getMyAssignmentDetailData?.data?.data?.length > 0) ?
            getMyAssignmentDetailData?.data?.data.map((item: any) => (
                getMyAssignmentStatusData?.data?.data.map((data: any) => (
                    <Box key={item._id}>
                        <Stack direction="row" pb={3}>
                            {getRole() == 1 || getRole() === 3 ? (
                                <IconButton sx={{ height: "31px" }} onClick={() => navigate(`/myAssignment/${stdId}`)}
                                >
                                    <ArrowBackIcon />
                                </IconButton>
                            ) :
                                <IconButton sx={{ height: "31px" }} onClick={() => navigate('/myAssignment')}
                                >
                                    <ArrowBackIcon />
                                </IconButton>}

                            <Typography sx={{ color: "#440E66", fontWeight: "500" }}>{item.assessmentId.assessmentTitle} for {item?.patient?.fName + " " + item?.patient?.lName}</Typography>
                        </Stack>
                        <Box>
                            <Card sx={{ marginBottom: "10px" }} id="print-content">
                                <Box p={2}>
                                    <Box>
                                        <Typography fontWeight={"600"}>Assignment Objectives</Typography>
                                        <List>
                                            <ListItem>
                                                <Typography><strong>&#8226;</strong> {item.assessmentId.objectives}</Typography>
                                            </ListItem>
                                        </List>
                                    </Box>
                                    <Box pt={3}>
                                        <Typography fontWeight={"600"}>Assignment Description</Typography>
                                        <Typography pt={2}>{item.assessmentId.description}</Typography>
                                    </Box>
                                    {item?.assessmentId?.file ? (
                                        <Box pt={3}>
                                            <Stack direction={"row"}>
                                                <a href={`${API_BASE_URL}assessmentFile/${item.assessmentId.file}`} target="_blank" rel="noopener noreferrer">
                                                    <img src={pdf} alt="pdf" />
                                                </a>
                                                <Typography sx={{ fontWeight: "500", padding: "12px" }}>{item.assessmentId.file}</Typography>
                                            </Stack>
                                        </Box>
                                    ) : ""}
                                </Box>
                            </Card>
                            <Grid container spacing={2} p={2}>
                                <Grid item md={4} xs={12} id="print-content">
                                    <Box textAlign="right" pb="18px">
                                        <Typography textAlign="left" fontWeight={"600"} pl={2}>Created By : {item?.createdBy?.name}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item md={8} xs={12}>
                                    <Box textAlign="right" pb="18px">
                                        {getRole() === 1 || getRole() === 3 ? (
                                            <Button
                                                onClick={() => changeEndDateAssignMent(item)}
                                                sx={{ mr: "20px", mb: "10px" }}
                                                variant="contained"
                                                color="secondary"
                                            // type="submit"
                                            >
                                                Change Assignment Submission Date
                                            </Button>
                                        ) : null}
                                        <Button onClick={() => handlePrint()} variant="outlined" color="primary" sx={{ mr: "20px", mb: "10px", boxShadow: "0px 2.9477px 40px rgba(0, 0, 0, 0.25)", borderColor: "purple" }}>
                                            Print
                                        </Button>
                                        {/* {data?.status === 0 || data?.status === 1 ? (
                                            <Button onClick={() => handleStartAssignment(item.patient._id)} sx={{ mr: "20px", mb: "10px" }} variant="contained" color="secondary" type="submit">
                                                Start Assignment
                                            </Button>
                                        ) : <Typography sx={{ mr: "20px", mb: "10px", color: "#440E66", fontWeight: "500" }} >Assignment Completed</Typography>} */}
                                        {getRole() === 1 || getRole() === 3 ? (
                                            <Button
                                                onClick={() => handleStartAssignment(item?.patient._id)}
                                                sx={{ mr: "20px", mb: "10px" }}
                                                variant="contained"
                                                color="secondary"
                                                type="submit"
                                            >
                                                View Assignment
                                            </Button>
                                        ) :
                                            data?.status === 0 || data?.status === 1 ? (
                                                item?.endDate?.split("T")[0] >= getCurrentDate() ? (
                                                    <Button
                                                        onClick={() => handleStartAssignment(item?.patient._id)}
                                                        sx={{ mr: "20px", mb: "10px" }}
                                                        variant="contained"
                                                        color="secondary"
                                                        type="submit"
                                                    >
                                                        Start Assignment
                                                    </Button>
                                                ) : (
                                                    <Typography sx={{ mr: "20px", mb: "10px", color: "#440E66", fontWeight: "500" }}>
                                                        Assignment Submission Time Expired
                                                    </Typography>
                                                )
                                            ) : (
                                                <Typography sx={{ mr: "20px", mb: "10px", color: "#440E66", fontWeight: "500" }}>
                                                    Assignment Completed
                                                </Typography>
                                            )}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                )))) : ""}
            <ModalPopup show={show} setshow={setshow} childern={<DatePickerComponent name="date" value={assignmentUpdate?.endDate != null ? dayjs(assignmentUpdate?.endDate) : null} onChange={(value: string) => setassignmentUpdate((prev: any) => ({ ...prev, endDate: value }))} setshow={setshow} showButton={true} padding={true} onClick={() => handleSubmitAssignmentDate()} />} type="assignment" view={undefined} />

        </>
    );
}
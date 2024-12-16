import TableList from "../../../../../components/Dashboard/TableList";
import { Stack, TableRow, Tooltip, Typography, Zoom, styled } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useEffect, useState } from "react";
import Loader from "../../../../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMyAssignmentDataRequest, fetchMyGradesDataRequest, updateMyAssignmentStatusRequest } from "../../../../../redux/modules/studentView/myAssignments/action";
import { clearDialouge } from "../../../../../redux/modules/patients/daignosis/action";
import DialogBox from "../../../../../components/DialogBox";
import IconButton from '@mui/material/IconButton';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { encrypt } from "../../../../..//utils/encryptDecrypt";
import { getUserId, getRole } from "../../../../../utils/commonUtil";
import { assert } from "console";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.text.secondary,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function MyAssignmentList() {
    let { id } = useParams();
    let studentId: any = id
    let navigate = useNavigate();
    let [showDialouge, setDialouge] = useState({
        show: false,
        message: ""
    });
    const [openDialog, setOpenDialog] = useState(false);
    const [assessmentId, setAssessmentId] = useState('');
    const [myAssignmentData, setMyAssignmentData] = useState();
    let tableHead =
        getRole() === 2
            ? ["Assignment Title", "Patient Name", "Module", "Duration(HH:MM)", "Status"]
            : ["Assignment Title", "Assigned Date", "Submitted Date", "Module", "Total Duration(HH:MM)", "Time Taken", "Status", "Reset"];

    let dispatch = useDispatch();
    let { getMyAssignmentData, diagnosis, getMyGradesData } = useSelector((state: any) => {
        let { getMyAssignmentData, diagnosis, getMyGradesData
        } = state;
        return { getMyAssignmentData, diagnosis, getMyGradesData }
    })

    useEffect(() => {
        if (getRole() === 1 || getRole() === 3) {
            let studentId: any = id
            dispatch(fetchMyAssignmentDataRequest({ studentId: atob(studentId) }))
            dispatch(fetchMyGradesDataRequest({ studentId: atob(studentId) }))
        }
        else {
            let studentId = getUserId()
            dispatch(fetchMyAssignmentDataRequest({ studentId: studentId }))
        }
        if (diagnosis?.message != "") {
            setDialouge({ show: true, message: diagnosis?.message })
        }
    }, [])

    useEffect(() => {
        if (getMyAssignmentData?.data?.myAssignment) {
            const mappedData = getMyAssignmentData.data.myAssignment.map((item: any) => {
                return item;
            });
            setMyAssignmentData(mappedData);
        }
    }, [getMyAssignmentData]);


    const getStatus = (item: number) => {
        if (item === 0) return "Not Started"
        else if (item === 1) return "In Progress"
        else if (item === 2) return "Completed"
    }
    const handleCloseDialog = () => {
        setDialouge({ show: false, message: '' })
        diagnosis.message = ""
        dispatch(clearDialouge())
    }

    const getGrade = (item: any) => {
        if (item >= 60 && (item !== null || item !== undefined)) {
            return (<StyledTableCell align="center" sx={{
                color: "#04d504", minInlineSize: "-webkit-fill-available",
            }}>{item}%</StyledTableCell>)
        }
        else if (item < 60 && item >= 40 && (item !== null || item !== undefined)) {
            return (<StyledTableCell align="center" sx={{ color: "#045cff" }}>{item}%</StyledTableCell>)
        }
        else if (item < 40 && (item !== null || item !== undefined)) {
            return (<StyledTableCell align="center" sx={{ color: "red" }}>{item}%</StyledTableCell>)
        }
        else {
            return (<StyledTableCell align="center">Not Yet</StyledTableCell>)
        }
    }

    const checkSubmittedDate = (status: number, date: any) => {
        if (status == 1 || status == 0) {
            return (<StyledTableCell align="center" >Not yet</StyledTableCell>)
        }
        else if (status == 2) {
            return (<StyledTableCell align="center" >{date.split("T")[0]}</StyledTableCell>)
        }

    }

    if (getMyAssignmentData.loading) {
        return <Loader />
    }

    const handleReset = () => {
        let studentId: any = id
        dispatch(updateMyAssignmentStatusRequest({ studentId: atob(studentId), assessmentId, status: 0 }))
        dispatch(fetchMyAssignmentDataRequest({ studentId: atob(studentId) }))
        setOpenDialog(false);
    }

    const calculateDateDifference = (submittedDate: any) => {
        const dateNow = new Date();
        const endDate = new Date(submittedDate);
        const diffTime = Math.abs(endDate?.getTime() - dateNow.getTime()); // Get the difference in milliseconds
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
        return diffDays;
    };

    return (
        <>
            <>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems={"center"}
                    spacing={2}
                    sx={{ marginBottom: "20px" }}
                >
                    <Typography>{getRole() === 2 ? "My Assignment" : getMyAssignmentData?.data?.studentData?.fName+" Assignment"}</Typography>
                </Stack >
                <TableList tableHead={tableHead} type={true}>
                    {getRole() === 2 ? (
                        getMyAssignmentData?.data && getMyAssignmentData?.data?.myAssignment?.length > 0 ? (
                            getMyAssignmentData?.data?.myAssignment?.map((item: any, index: number) => (
                                <StyledTableRow key={`${item.createdAt}${index}`}>
                                    <StyledTableCell component="th" scope="row" onClick={() => navigate(`/myAssignmentDetail/${btoa(item.assessmentId
                                        ._id)}/${btoa(item._id)}`)} sx={{ color: "#440E66", textDecoration: "underline", cursor: "pointer" }}>{item.assessmentId
                                            .assessmentTitle}</StyledTableCell>
                                    <StyledTableCell align="center">{item?.patient?.fName} {item?.patient?.lName} </StyledTableCell>
                                    <StyledTableCell align="center">{item.assessmentId
                                        .module}</StyledTableCell>
                                    <StyledTableCell align="center">{item.assessmentId
                                        .duration}</StyledTableCell>
                                    <StyledTableCell align="center">{getStatus(item
                                        .status)}</StyledTableCell>
                                </StyledTableRow>
                            ))
                        ) : (
                            <StyledTableRow>
                                <StyledTableCell
                                    component="th"
                                    scope="row"
                                    align="center"
                                    colSpan={tableHead.length + 1}
                                >
                                    <h1>THERE IS NO DATA HERE</h1>
                                </StyledTableCell>
                            </StyledTableRow>
                        )
                    ) : (
                        getMyGradesData?.data && getMyGradesData?.data?.data?.length > 0 && getMyAssignmentData?.data && getMyAssignmentData?.data?.myAssignment?.length > 0 ? (
                            getMyAssignmentData?.data?.myAssignment?.map((data: any, i: number) => (
                                <StyledTableRow key={`${data._id}${i}`}>
                                    <StyledTableCell component="th" scope="row" onClick={() => navigate(`/myAssignmentDetail/${btoa(data.assessmentId
                                        ._id)}/${btoa(data._id)}/${studentId}`)} sx={{ color: "#440E66", textDecoration: "underline", cursor: "pointer" }}>{data.assessmentId
                                            .assessmentTitle}</StyledTableCell>
                                    <StyledTableCell align="center">{data.createdAt.split("T")[0]}</StyledTableCell>
                                    {checkSubmittedDate(data.status, data.updatedAt)}
                                    <StyledTableCell align="center">{data.assessmentId
                                        .module}</StyledTableCell>
                                    <StyledTableCell align="center">{data.assessmentId
                                        .duration}</StyledTableCell>
                                    <StyledTableCell align="center">{data.status === 2 ? data.submittedTime : "Not Yet"}</StyledTableCell>
                                    <StyledTableCell align="center">{getStatus(data.status)}</StyledTableCell>
                                    <StyledTableCell align="center" sx={{ cursor: `${i === 0 && data.status === 2 && calculateDateDifference(data?.updatedAt) <= 365 ? 'pointer' : ''}` }}>
                                        <IconButton className={`${i === 0 && data.status === 2 && calculateDateDifference(data?.updatedAt) <= 365 ? '' : 'disabledCell'}`} onClick={() => { setOpenDialog(true); setAssessmentId(data._id) }} aria-label="reset">
                                            <RestartAltIcon sx={{ color: `${i === 0 && data.status === 2 && calculateDateDifference(data?.updatedAt) <= 365 ? '#32CD32' : ''}` }} />
                                        </IconButton></StyledTableCell>
                                </StyledTableRow>
                            ))
                        ) : (
                            <StyledTableRow>
                                <StyledTableCell
                                    component="th"
                                    scope="row"
                                    align="center"
                                    colSpan={tableHead.length + 1}
                                >
                                    <h1>THERE IS NO DATA HERE</h1>
                                </StyledTableCell>
                            </StyledTableRow>
                        )
                    )}
                </TableList>

            </>
            <DialogBox buttonIcon={showDialouge.message === "There is some error please try again later" || showDialouge.message === "Please fill required fields" ? "error" : ""} openDialog={showDialouge.show} handleSubmit={handleCloseDialog} title={showDialouge.message} buttonText="Ok" />
            <DialogBox buttonIcon={"delete"} openDialog={openDialog} handleSubmit={() => handleReset()} handleClose={() => setOpenDialog(false)} title={'Are you sure want to reset the assignment?'} />
        </>
    )
}

import TableList from "../../../../../components/Dashboard/TableList";
import { Stack, TableRow, Tooltip, Typography, Zoom, styled, Pagination, Box } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useEffect, useState } from "react";
import Loader from "../../../../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMyAssignmentDataRequest, fetchMyGradesDataRequest, resetUpdateMyassignmentStatus } from "../../../../../redux/modules/studentView/myAssignments/action";
import { clearDialouge } from "../../../../../redux/modules/patients/daignosis/action";
import DialogBox from "../../../../../components/DialogBox";
import { encrypt } from "../../../../..//utils/encryptDecrypt";
import { getUserId, getRole } from "../../../../../utils/commonUtil";
import { assert } from "console";
import { resetMyassignmentData } from "../../../../../redux/modules/studentView/myAssignments/reducer";

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
    const [pagenumber, setPageNumber] = useState(1);
    const [limit, setLimit] = useState(30)
    let { id } = useParams();
    let studentId: any = id
    let navigate = useNavigate();
    let [showDialouge, setDialouge] = useState({
        show: false,
        message: ""
    });
    const [myAssignmentData, setMyAssignmentData] = useState();
    let tableHead =
        getRole() === 2
            ? ["Assignment Title", "Patient Name", "Module", "Duration(HH:MM)", "Status"]
            : ["Assignment Title", "Assigned Date", "Submitted Date", "Module", "Total Duration(HH:MM)", "Time Taken", "Status"];

    let dispatch = useDispatch();
    let { getMyAssignmentData, diagnosis, getMyGradesData, updateMyAssignmentStatus } = useSelector((state: any) => {
        let { getMyAssignmentData, diagnosis, getMyGradesData, updateMyAssignmentStatus
        } = state;
        return { getMyAssignmentData, diagnosis, getMyGradesData, updateMyAssignmentStatus }
    })

    useEffect(() => {
        if (getRole() === 1 || getRole() === 3) {
            let studentId: any = id
            dispatch(fetchMyAssignmentDataRequest({ studentId: atob(studentId), pagenumber, limit, }))
            dispatch(fetchMyGradesDataRequest({ studentId: atob(studentId), pagenumber, limit, }))
        }
        else if (getRole() === 2) {
            dispatch(resetMyassignmentData())
            let studentId = getUserId()
            if (updateMyAssignmentStatus?.data?.success === true) {
                setTimeout(() => {
                    dispatch(fetchMyAssignmentDataRequest({ studentId: studentId, pagenumber, limit, }))
                }, 3000);
                dispatch(resetUpdateMyassignmentStatus())
            }
            else {
                dispatch(fetchMyAssignmentDataRequest({ studentId: studentId, pagenumber, limit, }))
            }
        }
        if (diagnosis?.message != "") {
            setDialouge({ show: true, message: diagnosis?.message })
        }
    }, [dispatch, pagenumber])

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
    console.log(myAssignmentData, "myasssigndatat")

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
                    <Typography>{getRole() === 2 ? "My Assignment" : "Student Assignment"}</Typography>
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
            {getMyAssignmentData?.data?.totalPages > 1 &&
                <Box textAlign="center" mt="40px">
                    <Pagination count={getMyAssignmentData?.data?.totalPages} color="secondary" shape="rounded" page={pagenumber} sx={{ display: "inline-block" }} onChange={(event: any, page: any) => setPageNumber(page)} />
                </Box>
            }
            <DialogBox buttonIcon={showDialouge.message === "There is some error please try again later" || showDialouge.message === "Please fill required fields" ? "error" : ""} openDialog={showDialouge.show} handleSubmit={handleCloseDialog} title={showDialouge.message} buttonText="Ok" />
        </>
    )
}

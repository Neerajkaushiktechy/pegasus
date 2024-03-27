import TableList from "../../components/Dashboard/TableList";
import { Stack, TableRow, Typography, styled, Box, Pagination } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyGradesDataRequest } from "../../redux/modules/studentView/myAssignments/action";
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { getUserId } from "../../utils/commonUtil";

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

export default function StudentGrades() {
    const [pagenumber, setPageNumber] = useState(1);
    const [limit, setLimit] = useState(30)
    let tableHead = ["Assignment Title", "Assigned Date", "Submitted Date", "Total Duration", "Time Taken", "Grades"]
    let dispatch = useDispatch();
    let { getMyGradesData } = useSelector((state: any) => {
        let { getMyGradesData
        } = state;
        return { getMyGradesData }
    })

    useEffect(() => {
        let studentId = getUserId()
        dispatch(fetchMyGradesDataRequest({ studentId: studentId, pagenumber, limit, }))
    }, [dispatch, pagenumber])

    const getGrade = (item: any) => {
        console.log(item, "item")
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

    if (getMyGradesData.loading) {
        return <Loader />
    }


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
                    <Typography>My Grades</Typography>
                </Stack >
                <TableList tableHead={tableHead} type={true}>
                    {(getMyGradesData?.data && getMyGradesData?.data?.data?.length > 0) ?
                        getMyGradesData?.data?.data.map((item: any, index: number) => (
                            <StyledTableRow key={`${item.createdAt}${index}`}>
                                <StyledTableCell component="th" scope="row" sx={{ color: "#440E66" }}>{item.assessmentId
                                    .assessmentTitle}</StyledTableCell>
                                <StyledTableCell align="center">{item.createdAt.split("T")[0]}</StyledTableCell>
                                {checkSubmittedDate(item.status, item.updatedAt)}
                                <StyledTableCell align="center">{item.assessmentId
                                    .duration}</StyledTableCell>
                                <StyledTableCell align="center">{item.status === 2 ? item.submittedTime : "Not Yet"}</StyledTableCell>
                                <Tooltip
                                    TransitionComponent={Zoom}
                                    TransitionProps={{ timeout: 750 }}
                                    title={
                                        <span
                                            style={{
                                                padding: '4px',
                                                fontSize: '13px',
                                                backgroundColor: '#efe6f4',
                                                width: "auto",
                                                color: "#423a3afa",
                                                display: "block"
                                            }}
                                        >
                                            <Stack direction={"row"}>
                                                <Typography sx={{ color: "#440E66", fontSize: "15px", fontWeight: "500", textDecoration: "underline", paddingBottom: "5px" }} >Assignment Title :</Typography>
                                                <Typography pl={2} sx={{ fontSize: "15px" }}>{item.assessmentId
                                                    .assessmentTitle}</Typography>
                                            </Stack>
                                            <Stack direction={"row"}>
                                                <Typography sx={{ color: "#440E66", fontSize: "15px", fontWeight: "500", textDecoration: "underline", paddingBottom: "5px" }}>Grades : </Typography>
                                                <Typography pl={2} sx={{ fontSize: "15px" }}>{item.grade}%</Typography>
                                            </Stack>
                                            <Stack sx={{ display: "unset" }}>
                                                <Typography sx={{ color: "#440E66", fontSize: "15px", fontWeight: "500", textDecoration: "underline", paddingBottom: "5px", display: "inline" }}>Comment :</Typography>
                                                <Typography pl={1} sx={{ fontSize: "15px", display: "inline" }}> {item.comment} </Typography>
                                            </Stack>
                                        </span>
                                    }
                                    placement="left-start"
                                    arrow >
                                    <span style={{
                                        display: "flex", justifyContent: "center", fontWeight: "400", fontSize: "14px", padding: "16px"
                                    }}>
                                        {item.grade === "" ? "Not Yet" : getGrade(Math.round(item.grade))}
                                    </span>

                                </Tooltip>
                            </StyledTableRow>
                        ))
                        :
                        <StyledTableRow >
                            <StyledTableCell component="th" scope="row" align="center" colSpan={tableHead.length + 1}>
                                <h1>THERE IS NO DATA HERE</h1>
                            </StyledTableCell>
                        </StyledTableRow>}
                </TableList >
                {getMyGradesData?.data?.totalPages > 1 &&
                    <Box textAlign="center" mt="40px">
                        <Pagination count={getMyGradesData?.data?.totalPages} color="secondary" shape="rounded" page={pagenumber} sx={{ display: "inline-block" }} onChange={(event: any, page: any) => setPageNumber(page)} />
                    </Box>
                }
            </>
        </>
    )
}


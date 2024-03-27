import { Box, IconButton, Stack, Paper, Table, TableContainer, TableHead, TableRow, Typography, styled, TableBody, TextField, InputAdornment, Tooltip } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { ResetAssignmentRequest } from '../../../../redux/modules/studentView/myAssignments/types';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useSelector } from "react-redux";
import DialogBox from '../../../../components/DialogBox';
import { resetAssignment } from '../../../../redux/modules/studentView/myAssignments/reducer';
import { resetAssignmentRequest } from '../../../../redux/modules/studentView/myAssignments/action';
import { getDataRequest } from '../../../../redux/modules/assignment/action';

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

type props = {
  setShowList: any,
  setAssignmentData: any
}

export default function CheckAssessmentList({ setShowList, setAssignmentData }: props) {
  let dispatch = useDispatch()
  let tableHead = ["Assignment Title", "Assignment Type", "Created By", "Student name", "Total Time(HH:MM)", "Total Time Taken", "grade", "status", "Action"]
  let { getGrading, resetAssignment } = useSelector((state: any) => {
    let { getGrading, resetAssignment } = state;
    return { getGrading, resetAssignment }
  })
  let [showAlert, setShowAlert] = useState({
    show: false,
    title: "",
    success: true
  });

  useEffect(() => {
    if (resetAssignment?.data?.success === true) {
      delete resetAssignment.data
    }
  }, [])

  const onClickReset = (assId: any, submitAssId: any, stdId: any) => {
    dispatch(resetAssignmentRequest({ assId: assId, submitAssId: submitAssId, stdId: stdId }))
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <StyledTableRow>
              {tableHead.map((item, index) => {
                return (
                  <StyledTableCell key={item} align={index === 0 ? "left" : "center"}>
                    {item}
                  </StyledTableCell>
                );
              })}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {(getGrading?.data?.data && getGrading?.data?.data?.length > 0) ?
              getGrading?.data?.data.map((item: any, index: number) => (
                <StyledTableRow key={`${item.createdAt}${index}`}>
                  <StyledTableCell component="th" scope="row">{item?.assessmentId?.assessmentTitle}</StyledTableCell>
                  <StyledTableCell align="center">{item?.assessmentId?.assesmentType}</StyledTableCell>
                  <StyledTableCell align="center">{item?.assignmentId?.roleId === 1 ? "Pegasus Admin" : "School Admin"}</StyledTableCell>
                  <StyledTableCell align="center">{item?.studentId?.fName} {item?.studentId?.lName}</StyledTableCell>
                  <StyledTableCell align="center">{item?.assessmentId?.duration}</StyledTableCell>
                  <StyledTableCell align="center">{item?.submittedTime}</StyledTableCell>
                  {/* <StyledTableCell align="center">{item?.grade}{item?.grade && "%"}</StyledTableCell> */}
                  <StyledTableCell align="center">{item?.grade && `${Math.round(item.grade)}%`} </StyledTableCell>
                  <StyledTableCell align="center"><Box sx={{
                    ...(item?.status === 0 && { bgcolor: '#fff' }), ...(item?.status === 1 && { bgcolor: 'warning.light' }), ...(item?.status === 2 && { bgcolor: 'success.light' }), ...((item?.status === 0 || item?.status === 1) &&
                      item?.endDate &&
                      new Date(item.endDate).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0) &&
                      { bgcolor: 'error.light' }
                    ), m: "0 auto", width: 15, height: 15, borderRadius: '50%', border: '1px solid #757575'
                  }} /></StyledTableCell>
                  <StyledTableCell align="right">
                    {item?.status === 2 &&
                      <>
                        <Tooltip title="Edit">
                          <IconButton sx={{ color: "#017BAC" }} onClick={() => { setAssignmentData({ id: item?._id, assignmentId: item?.assignmentId?._id, assignmentGrade: item?.grade, assignmentComment: item?.comment, assignmentType: item?.assessmentId?.assesmentType, studentId: item?.studentId?._id, patientDetail: item?.assignmentId?.patient }); setShowList(false) }}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Reset Assignment">
                          <IconButton onClick={() => onClickReset(item?.assignmentId._id, item?._id, item?.studentId?._id)}>
                            <RestartAltIcon />
                          </IconButton>
                        </Tooltip>
                      </>
                    }
                  </StyledTableCell>
                </StyledTableRow>
              ))
              :
              <StyledTableRow >
                <StyledTableCell component="th" scope="row" align="center" colSpan={tableHead.length + 1}>
                  <h1>THERE IS NO DATA HERE</h1>
                </StyledTableCell>
              </StyledTableRow>}
          </TableBody>
        </Table>
      </TableContainer>
      <DialogBox buttonIcon={showAlert.title === "There is some error please try again later" || showAlert.title === "Please fill required fields" ? "error" : ""} openDialog={showAlert.show} handleSubmit={() => { setShowAlert({ show: false, title: "", success: true }) }} title={showAlert.title} buttonText="Ok" />
    </>
  );
}


import TableList from "../../../../components/Dashboard/TableList";
import { IconButton, TableRow, styled, Pagination, Box } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { deletestudentsDataRequest, fetchstudentsDataRequest } from "../../../../redux/modules/students/student/action";
import { useSelector } from "react-redux";
import { ShowTableDataContext, UpdateDataContext, RoleIdContext } from "../../../../utils/showHideTabData";
import DialogBox from "../../../../components/DialogBox";
import TableHeader from "../../../../components/TableHeader";
import Loader from "../../../../components/Loader";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
let tableHead = [
  "First Name",
  "Last Name",
  "Email",
  "Phone",
  // "Address Line 1",
  // "Address Line 2",
  // "City",
  // "State",
  // "Country",
  "Department",
  "Profile",
  "Actions",
  "Check Assignment"
];
const StudentTableList = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const { setEditData } = useContext(UpdateDataContext);
  const { setShowListData } = useContext(ShowTableDataContext);
  const userRoleId = useContext(RoleIdContext);
  let { getStudent, deleteStudent, updateStudent, poststudent, checkEmail } = useSelector((state: any) => {
    let { getStudent, deleteStudent, updateStudent, poststudent, checkEmail } = state;
    return {
      getStudent,
      deleteStudent,
      updateStudent,
      poststudent,
      checkEmail
    }
  })
  const clearErrorMessage = () => {
    if (checkEmail?.data?.message !== "") {
      checkEmail.data = checkEmail.initialState.data;
    }
  }
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setdeleteId] = useState('')
  const [pagenumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(20)

  useEffect(() => {
    dispatch(fetchstudentsDataRequest({ pagenumber, limit }))
  }, [dispatch, deleteStudent?.data?.success, updateStudent?.data?.success, poststudent?.data?.success, pagenumber])

  useEffect(() => {
    dispatch(fetchstudentsDataRequest({ pagenumber, limit, }))
  }, [dispatch, pagenumber])

  const handleSubmit = () => {
    dispatch(deletestudentsDataRequest(deleteId));
    setOpenDialog(false)
  }

  if (getStudent?.loading) {
    return <Loader />
  }
  console.log(getStudent)
  return (
    <>
      <TableHeader tabHeaderName="Students" buttonText=" Add Student" clearErrorMessage={clearErrorMessage} />
      <TableList tableHead={tableHead} type={true}>
        {getStudent?.data?.data.length > 0 ?
          getStudent?.data?.data.map((student: any, index: number) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {student.fName}
              </StyledTableCell>
              <StyledTableCell align="center">{student.lName}</StyledTableCell>
              <StyledTableCell align="center">{student.email}</StyledTableCell>
              <StyledTableCell align="center">{student.phone}</StyledTableCell>
              {/* <StyledTableCell align="center">
                {student?.address1 || "-"}
              </StyledTableCell>
              <StyledTableCell align="center">
                {student?.address2 || "-"}
              </StyledTableCell>
              <StyledTableCell align="center">{student.city}</StyledTableCell>
              <StyledTableCell align="center">{student.state}</StyledTableCell>
              <StyledTableCell align="center">{student.country}</StyledTableCell> */}
              <StyledTableCell align="center">
                {student.departmentId?.departmentName}
              </StyledTableCell>
              <StyledTableCell align="center">{student.courseId?.coursename}</StyledTableCell>
              <StyledTableCell align="center">
                {((userRoleId === 1 || userRoleId === student?.createdById) && student?.createdById !== 2) ?
                  <>
                    <IconButton
                      onClick={() => { setShowListData(false); setEditData(student) }}
                      sx={{ color: "#017BAC" }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton sx={{ color: "#C53E4E" }} onClick={() => {
                      setOpenDialog(true);
                      setdeleteId(student?._id)
                    }}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                  :
                  <IconButton sx={{ color: "#017BAC" }} onClick={() => { setShowListData(true); setEditData({ ...student, onlyView: true }) }}>
                    <VisibilityIcon />
                  </IconButton>
                }

              </StyledTableCell>
              <StyledTableCell align="center" sx={{ cursor: "pointer" }} onClick={() => navigate(`/myAssignment/${btoa(student?._id)}`)}>Click Here</StyledTableCell>
            </StyledTableRow>
          ))
          :
          <StyledTableRow >
            <StyledTableCell component="th" scope="row" align="center" colSpan={tableHead.length + 1}>
              <h1>THERE IS NO DATA HERE</h1>
            </StyledTableCell>
          </StyledTableRow>
        }
      </TableList>
      {getStudent?.data?.totalPages > 1 &&
        <Box textAlign="center" mt="40px">
          <Pagination count={getStudent?.data?.totalPages} color="secondary" shape="rounded" page={pagenumber} sx={{ display: "inline-block" }} onChange={(event: any, page: any) => setPageNumber(page)} />
        </Box>
      }
      <DialogBox buttonIcon={"delete"} openDialog={openDialog} handleSubmit={handleSubmit} handleClose={() => setOpenDialog(false)} title={'Are you sure want to delete?'} />
    </>
  );
};
export default StudentTableList;

import TableList from "../../../../components/Dashboard/TableList";
import { IconButton, TableRow, styled } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ShowTableDataContext, UpdateDataContext } from "../../../../utils/showHideTabData";
import DialogBox from "../../../../components/DialogBox";
import TableHeader from "../../../../components/TableHeader";
import { fetchschoolsDataRequest, deleteschoolDataRequest } from "../../../../redux/modules/school/action";
import Loader from "../../../../components/Loader";

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
  "School Code",
  "School Name",
  "Phone",
  "Email",
  // "Address",
  // "Contact Person Name",
  // "CP Email",
  // "CP Phone",
  // "User Id",
  "Actions",
];
const SchoolTableList = () => {
  let dispatch = useDispatch();
  const { setEditData } = useContext(UpdateDataContext);
  const { setShowListData } = useContext(ShowTableDataContext);
  let { getSchool, updateSchool, deleteSchool, postschool } = useSelector((state: any) => {
    let { getSchool, updateSchool, deleteSchool, postschool } = state;
    return {
      getSchool,
      updateSchool,
      deleteSchool,
      postschool
    }
  })
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setdeleteId] = useState('')
  useEffect(() => {
    dispatch(fetchschoolsDataRequest())
  }, [dispatch, updateSchool?.data?.success, deleteSchool?.data?.success, postschool?.data?.success])

  const handleSubmit = () => {
    dispatch(deleteschoolDataRequest(deleteId));
    setOpenDialog(false)
  }

  if (getSchool?.loading) {
    return <Loader />
  }
  return (
    <>
      <TableHeader tabHeaderName="Schools" buttonText="Add School" />
      <TableList tableHead={tableHead} type={true}>
        {getSchool?.data?.length > 0 ?
          getSchool?.data?.map((school: any, index: number) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {school?.schoolCode}
              </StyledTableCell>
              <StyledTableCell align="center">{school?.schoolName}</StyledTableCell>
              <StyledTableCell align="center">{school?.phone}</StyledTableCell>
              <StyledTableCell align="center">{school?.email}</StyledTableCell>
              {/* <StyledTableCell align="center">
              {school?.address || "-"}
            </StyledTableCell>
            <StyledTableCell align="center">{school?.cp_fName}</StyledTableCell>
            <StyledTableCell align="center">{school?.cp_email}</StyledTableCell>
            <StyledTableCell align="center">{school?.cp_phone}</StyledTableCell>
            <StyledTableCell align="center">
              {school?.user_Id}
            </StyledTableCell> */}
              <StyledTableCell align="center">
                <IconButton
                  onClick={() => { setShowListData(false); setEditData(school) }}
                  sx={{ color: "#017BAC" }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton sx={{ color: "#C53E4E" }} onClick={() => {
                  setOpenDialog(true);
                  setdeleteId(school?._id)
                }}>
                  <DeleteIcon />
                </IconButton>
              </StyledTableCell>
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
      <DialogBox buttonIcon={"delete"} openDialog={openDialog} handleSubmit={handleSubmit} handleClose={() => setOpenDialog(false)} title={'Are you sure want to delete?'} />
    </>
  );
};
export default SchoolTableList;

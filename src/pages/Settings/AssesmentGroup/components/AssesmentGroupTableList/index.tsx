import TableList from "../../../../../components/Dashboard/TableList";
import { Button, IconButton, Stack, TableRow, Typography, styled } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShowTableDataContext, UpdateDataContext } from "../../../../../utils/showHideTabData";
import DialogBox from "../../../../../components/DialogBox";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { getDataRequest, deleteRequest } from "../../../../../redux/modules/setting/assessmentGroup/action";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { decrypt } from "../../../../../utils/encryptDecrypt";
import Loader from "../../../../../components/Loader";

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

export default function AssessmentGroupList() {
  let tableHead = ["Assesment Group Name", "Created By", "Assesment List", "Status", "Action"]
  let dispatch = useDispatch();

  let { getAssessmentGroup, deleteAssessmentGroup } = useSelector((state: any) => {
    let { getAssessmentGroup, deleteAssessmentGroup } = state;
    return { getAssessmentGroup, deleteAssessmentGroup }
  })
  const { showListData, setShowListData } = useContext(ShowTableDataContext);
  const { setEditData } = useContext(UpdateDataContext);
  let [showAlert, setShowAlert] = useState({
    show: false,
    title: "",
    success: true
  });
  const [confirmDelete, setConfirmDelete] = useState({
    show: false,
    id: ""
  });
  const [roleId, setRoleId] = useState()
  useEffect(() => {
    const item = localStorage.getItem("item");
    if (localStorage.getItem("item")) {
      const token = JSON.parse(decrypt(item))
      const parts = token.token.split('.');
      const payload = JSON.parse(window.atob(parts[1]));
      setRoleId(payload.roleId);
    }
  }, [])
  useEffect(() => {
    if (showListData) {
      dispatch(getDataRequest())
    }
  }, [dispatch, showListData])

  useEffect(() => {
    if (deleteAssessmentGroup?.data?.success) {
      setShowAlert({ show: true, title: deleteAssessmentGroup.data?.message, success: true })
      delete deleteAssessmentGroup.data
      dispatch(getDataRequest());
    }

    if (deleteAssessmentGroup?.error) {
      setShowAlert({ show: true, title: deleteAssessmentGroup?.message, success: false })
      delete deleteAssessmentGroup.error
    }
  }, [dispatch, deleteAssessmentGroup]);


  if (getAssessmentGroup?.loading) {
    return <Loader />
  }

  return (
    <> <Stack
      direction="row"
      justifyContent="space-between"
      alignItems={"center"}
      spacing={2}
      sx={{ marginBottom: "20px", display: { xs: "block", md: "flex" } }}
    >
      <Typography sx={{ fontWeight: "600", fontSize: "22px", color: "#271E4A", marginBottom: { xs: "12px", md: "0" } }}>Assesment Group</Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems={"center"}
        spacing={2}
        sx={{ marginLeft: "0 !important" }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => { setShowListData(false); setEditData(null); }}
          startIcon={<AddCircleOutlineIcon sx={{ width: "30px", height: "30px" }} />}
        >
          Create Assesment Group
        </Button>
      </Stack>
    </Stack>
      <TableList tableHead={tableHead} type={true}>
        {(getAssessmentGroup?.data && getAssessmentGroup?.data?.data?.length > 0) ?
          getAssessmentGroup?.data?.data.map((item: any, index: number) => (
            <StyledTableRow key={`${item.createdAt}${index}`}>
              <StyledTableCell component="th" scope="row">{item.assessmentTitle}</StyledTableCell>
              <StyledTableCell align="center">{item.roleId === 1 ? "Pegasus Admin" : "School Admin"}</StyledTableCell>
              <StyledTableCell align="center">{item.assessmentList.length > 0 && item?.assessmentList.map((nestedItem: any, index: number) => { return (<span key={`${nestedItem?.assessmentTitle}${index}`}>{nestedItem?.assessmentTitle}{(item?.assessmentList?.length - 1) !== index && ", "}</span>) })}</StyledTableCell>
              <StyledTableCell align="center">{item.status ? "Active" : "Inactive"}</StyledTableCell>
              <StyledTableCell align="center">
                {item?.roleId === roleId || roleId === 1 ?
                  <>
                    <IconButton sx={{ color: "#017BAC" }} onClick={() => { setShowListData(!showListData); setEditData(item) }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton sx={{ color: "#C53E4E" }} onClick={() => { setConfirmDelete({ show: true, id: item._id }) }}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                  :
                  <IconButton sx={{ color: "#017BAC" }} onClick={() => { setShowListData(!showListData); setEditData({ ...item, onlyView: true }) }}>
                    <VisibilityIcon />
                  </IconButton>
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
      </TableList >
      <DialogBox buttonIcon={showAlert.title === "There is some error please try again later" || showAlert.title === "Please fill required fields" ? "error" : ""} openDialog={showAlert.show} handleSubmit={() => { setShowAlert({ show: false, title: "", success: true }) }} title={showAlert.title} buttonText="Ok" />
      <DialogBox buttonIcon={"delete"} openDialog={confirmDelete.show} handleSubmit={() => { dispatch(deleteRequest(confirmDelete.id)); setConfirmDelete({ show: false, id: "" }) }} handleClose={() => setConfirmDelete({ show: false, id: "" })} title={'Are you sure want to delete?'} />
    </>
  );
}

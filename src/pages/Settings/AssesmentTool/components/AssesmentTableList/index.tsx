import TableList from "../../../../../components/Dashboard/TableList";
import { Button, IconButton, Stack, TableRow, Typography, styled, Pagination, Box } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useContext, useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from "react-redux";
import { ShowTableDataContext, UpdateDataContext } from "../../../../../utils/showHideTabData";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { getDataRequest, deleteRequest, showFormData } from "../../../../../redux/modules/setting/assessmentTool/action";
import DialogBox from "../../../../../components/DialogBox";
import { decrypt } from "../../../../../utils/encryptDecrypt";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Loader from "../../../../../components/Loader";
import { showFirstCustomForm } from "../../../../../redux/modules/customform/action";
import { useLocation, useNavigate, } from "react-router-dom";

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

export default function AssessmentList() {
  let tableHead = ["Assignment Title", "Created By", "Institute Name", "Module", "Duration", "Action"]
  let dispatch = useDispatch();
  const location = useLocation();
  let navigate = useNavigate()
  // Get the current search parameters
  const searchParams = new URLSearchParams(location.search);
  searchParams.set('create', 'assessmentList');
  const newUrl = `${location.pathname}?${searchParams.toString()}`;
  // Use navigate to go to the new URL
  let { getAssessment, deleteAssessment, } = useSelector((state: any) => {
    let { getAssessment, deleteAssessment, } = state;
    return { getAssessment, deleteAssessment, }
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
  const [pagenumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(20)
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
    dispatch(getDataRequest({ pagenumber, limit }))
    dispatch(showFirstCustomForm())
  }, [dispatch, showListData, pagenumber])

  useEffect(() => {
    if (deleteAssessment?.data?.success) {
      setShowAlert({ show: true, title: deleteAssessment.data?.message, success: true })
      delete deleteAssessment.data
      dispatch(getDataRequest({ pagenumber, limit }));
    }
    if (deleteAssessment?.error) {
      setShowAlert({ show: true, title: deleteAssessment?.message, success: false })
      delete deleteAssessment.error
    }
  }, [dispatch, deleteAssessment, pagenumber]);


  if (getAssessment?.loading) {
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
      <Typography sx={{ fontWeight: "600", fontSize: "22px", color: "#271E4A", marginBottom: { xs: "12px", md: "0" } }}>Assesment List</Typography>
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
          onClick={() => { dispatch(showFormData(null, true)); setEditData(null); navigate(newUrl); }}
          startIcon={<AddCircleOutlineIcon sx={{ width: "30px", height: "30px" }} />}
        >
          Create Assesment
        </Button>
      </Stack>
    </Stack>
      <TableList tableHead={tableHead} type={true}>
        {(getAssessment?.data?.data && getAssessment?.data?.data?.length > 0) ?
          getAssessment?.data?.data.map((item: any, index: number) => (
            <StyledTableRow key={`${item.createdAt}${index}`}>
              <StyledTableCell component="th" scope="row">{item?.assessmentTitle}</StyledTableCell>
              <StyledTableCell align="center">{item?.roleId === 1 ? "Pegasus Admin" : "School Admin"}</StyledTableCell>
              <StyledTableCell align="center">{item?.createdBy?.name}{item?.createdBy?.schoolName}</StyledTableCell>
              <StyledTableCell align="center">{item?.module}</StyledTableCell>
              <StyledTableCell align="center">{item?.duration}</StyledTableCell>

              <StyledTableCell align="center">
                {item?.roleId === roleId || roleId === 1 ?
                  <>
                    <IconButton sx={{ color: "#017BAC" }} onClick={() => { dispatch(showFormData(item, true)); setEditData(item); navigate('/studentsAssessment?edit=assessmentList') }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton sx={{ color: "#C53E4E" }} onClick={() => { setConfirmDelete({ show: true, id: item._id }) }}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                  :
                  <IconButton sx={{ color: "#017BAC" }} onClick={() => { dispatch(showFormData(item, true)); setEditData({ ...item, onlyView: true }) }}>
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
      </TableList>

      {getAssessment?.data?.totalPages > 1 &&
        <Box textAlign="center" mt="40px">
          <Pagination count={getAssessment?.data?.totalPages} color="secondary" shape="rounded" page={pagenumber} sx={{ display: "inline-block" }} onChange={(event: any, page: any) => setPageNumber(page)} />
        </Box>
      }
      <DialogBox buttonIcon={showAlert.title === "There is some error please try again later" || showAlert.title === "Please fill required fields" ? "error" : ""} openDialog={showAlert.show} handleSubmit={() => { setShowAlert({ show: false, title: "", success: true }) }} title={showAlert.title} buttonText="Ok" />
      <DialogBox buttonIcon={"delete"} openDialog={confirmDelete.show} handleSubmit={() => { dispatch(deleteRequest(confirmDelete.id)); setConfirmDelete({ show: false, id: "" }) }} handleClose={() => setConfirmDelete({ show: false, id: "" })} title={'Are you sure want to delete?'} />
    </>
  );
}

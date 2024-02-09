import { useEffect, useState, useContext } from "react";
import TableList from "../../../../components/Dashboard/TableList";
import { Button, FormControl, IconButton, Stack, TableRow, Typography, styled, Select, MenuItem, Pagination, Box, InputAdornment, TextField } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useDispatch, useSelector } from "react-redux";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AssignmentList from "../AssignmentList/index";
import { getDataRequest, deleteRequest } from "../../../../redux/modules/assignment/action";
import DeleteIcon from '@mui/icons-material/Delete';
import DialogBox from "../../../../components/DialogBox";
import EditIcon from "@mui/icons-material/Edit";
import { UpdateDataContext } from "../../../../utils/showHideTabData";
import Loader from "../../../../components/Loader";
import SearchIcon from '@mui/icons-material/Search';

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

export default function AssignedAssignments() {
  const [showAssignmentList, setShowAssignmentList] = useState(false);
  const [pagenumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(20)
  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState("student");
  let tableHead = ["Assignment Title", "Assignment Type", "Students", "Assigned Date", 'Action']
  let dispatch = useDispatch();
  let [showAlert, setShowAlert] = useState({
    show: false,
    title: "",
    success: true
  });
  const [confirmDelete, setConfirmDelete] = useState({
    show: false,
    id: ""
  });
  const { setEditData } = useContext(UpdateDataContext);
  let { getAssignment, deleteAssignment, postAssignment, updateAssignment } = useSelector((state: any) => {
    let { getAssignment, deleteAssignment, postAssignment, updateAssignment } = state;
    return { getAssignment, deleteAssignment, postAssignment, updateAssignment }
  })
  useEffect(() => {
    if (!showAssignmentList) {
      let debouncing: string | number | NodeJS.Timeout | undefined;
      if (searchText !== "") {
        debouncing = window.setTimeout(() => {
          dispatch(getDataRequest({ searchType, searchText }))
        }, 500)
      }
      dispatch(getDataRequest({ searchType, searchText, pagenumber, limit }))
    }
  }, [dispatch, showAssignmentList, pagenumber, searchType, searchText])

  useEffect(() => {
    if (deleteAssignment?.data?.success) {
      setShowAlert({ show: true, title: deleteAssignment.data?.message, success: true })
      delete deleteAssignment.data
      dispatch(getDataRequest({ searchType, searchText, pagenumber, limit }));
    }

    if (deleteAssignment?.error) {
      setShowAlert({ show: true, title: deleteAssignment.data?.message, success: false })
      delete deleteAssignment.error
    }

    if (postAssignment?.data?.success || updateAssignment?.data?.success) {
      setShowAssignmentList(false)
    }
  }, [dispatch, deleteAssignment, postAssignment, updateAssignment, pagenumber, searchType, searchText]);


  if (getAssignment?.loading && searchText === "") {
    return <Loader />
  }
  return (
    <>
      {showAssignmentList ? (
        <AssignmentList setShowAssignmentList={setShowAssignmentList} />
      ) : (
        <>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems={"center"}
            spacing={2}
            sx={{ marginBottom: "20px", display: { xs: "block", lg: "flex" } }}
          >
            <Typography sx={{ fontWeight: "600", fontSize: "22px", color: "#271E4A", marginBottom: { xs: "12px", lg: "0" } }}>Assigned Assignments</Typography>
            <Stack direction="row"
              justifyContent="end"
              alignItems={"end"}
              minWidth={250}
              top={-12} position={"relative"} left={259} >

              {/* <FormControl variant="standard" fullWidth>
                <Select
                  fullWidth
                  id="assesmentList"
                  placeholder="Filter"
                  name="assesmentList"
                  disableUnderline
                  value=""
                >
                  <MenuItem value={""} key={""}>
                    <Typography variant="body2"></Typography>
                  </MenuItem>
                </Select>
              </FormControl> */}
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems={"center"}
              spacing={2}
              sx={{ marginLeft: "0 !important" }}
            >
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                startIcon={<AddCircleOutlineIcon sx={{ width: "30px", height: "30px" }} />}
                onClick={() => setShowAssignmentList(true)}
              >
                Assign New Assignments
              </Button>

              <TextField
                fullWidth
                onChange={(e: any) => { setSearchText(e.target.value) }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
                className="patient-search"
              // value={searchText}
              />
              <Select
                name="searchType"
                required
                sx={{ width: "50%" }}
                fullWidth
                disableUnderline
                onChange={(e) => {
                  setSearchType(e.target.value);
                  setSearchText("");
                  console.log("chage")
                }}
                value={searchType}
              >

                <MenuItem value="student"><Typography variant="body2">Student name</Typography></MenuItem>
                <MenuItem value="assesment"><Typography variant="body2">Assesment name</Typography></MenuItem>
              </Select>
            </Stack>
          </Stack >
          <TableList tableHead={tableHead} type={true}>
            {(getAssignment?.data && getAssignment?.data?.data?.length > 0) ?
              getAssignment?.data?.data?.map((item: any, index: number) => (
                <StyledTableRow key={`${item.createdAt}${index}`}>
                  {item.assessmentType === "List"
                    ? <StyledTableCell component="th" scope="row">{item?.assessmentToolList?.map((nestedItem: any, index: number) => { return (<span key={`${nestedItem?.assessmentTitle}${index}`}>{nestedItem?.assessmentTitle}{(item?.assessmentToolList?.length - 1) !== index && ", "}</span>) })}</StyledTableCell>
                    : <StyledTableCell component="th" scope="row">{item?.assessmentGroupList?.map((nestedItem: any, index: number) => { return (<span key={`${nestedItem?.assessmentTitle}${index}`}>{nestedItem?.assessmentTitle}{(item?.assessmentGroupList?.length - 1) !== index && ", "}</span>) })}</StyledTableCell>
                  }
                  <StyledTableCell align="center">{item?.assessmentType}</StyledTableCell>
                  <StyledTableCell align="center">{item?.students.map((nestedItem: any, index: number) => { return (<span key={`${nestedItem?.fname}${index}`}>{nestedItem?.fName} {nestedItem?.lName}{(item?.students?.length - 1) !== index && ", "}</span>) })}</StyledTableCell>
                  <StyledTableCell align="center">{item?.createdAt}</StyledTableCell>
                  <StyledTableCell align="center" sx={{ textAlign: "center" }}>
                    <IconButton sx={{ color: "#017BAC" }} onClick={() => { setShowAssignmentList(true); setEditData(item) }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton sx={{ color: "#C53E4E" }} onClick={() => { setConfirmDelete({ show: true, id: item._id }) }}>
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
              </StyledTableRow>}
          </TableList >
          {getAssignment?.data?.totalPages > 1 &&
            <Box textAlign="center" mt="40px">
              <Pagination count={getAssignment?.data?.totalPages} color="secondary" shape="rounded" page={pagenumber} sx={{ display: "inline-block" }} onChange={(event: any, page: any) => setPageNumber(page)} />
            </Box>
          }
          <DialogBox buttonIcon={showAlert.title === "There is some error please try again later" || showAlert.title === "Please fill required fields" ? "error" : ""} openDialog={showAlert.show} handleSubmit={() => { setShowAlert({ show: false, title: "", success: true }) }} title={showAlert.title} buttonText="Ok" />
          <DialogBox buttonIcon={"delete"} openDialog={confirmDelete.show} handleSubmit={() => { dispatch(deleteRequest(confirmDelete.id)); setConfirmDelete({ show: false, id: "" }) }} handleClose={() => setConfirmDelete({ show: false, id: "" })} title={'Are you sure want to delete?'} />
        </>
      )}
    </>
  )
}


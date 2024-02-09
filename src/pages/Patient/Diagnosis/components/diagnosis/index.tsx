import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  Button,
  TextField,
  IconButton,
  styled,
  TableContainer,
  Paper
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Loader from "../../../../../components/Loader";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import AddDiagnosis from "../add-diagnosis";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchGetDiagnosisRequest, deleteDiagnosisRequest, editPaitentDiagnosis, diagnosisDescriptionRequest, changeEditMode, clearDialouge } from "../../../../../redux/modules/patients/daignosis/action";
import "./style.scss"
import DialogBox from "../../../../../components/DialogBox";
import { fetchPatientInformationRequest } from "../../../../../redux/modules/patients/patientInformation/action";
import moment from "moment";
import { decrypt } from "../../../../../utils/encryptDecrypt";
import { getRole, getRoleId, getUserId } from "../../../../../utils/commonUtil";

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

interface DiagnosisData {
  problem: string;
  description: string;
  icd10Problem: string;
  type: string;
  comment: string;
  status: boolean;
  editDate: string;
}
const columns = [
  { id: "description", label: "Diagnosis Description" },
  { id: "domainClass", label: "Class" },
  { id: "type", label: "Type" },
  { id: "comment", label: "Comments" },
  { id: "status", label: "Status" },
  { id: "editDate", label: "Last Edited" },
];

const Diagnosis = () => {
  const navigate = useNavigate();
  let dispatch = useDispatch();

  let { DemographicRes, postDemographic, getPatientInformationData } = useSelector((state: any) => {
    let { postDemographic: { data: DemographicRes }, postDemographic, getPatientInformationData } = state
    return { DemographicRes, postDemographic, getPatientInformationData }
  })
  let [showAlert, setShowAlert] = useState({
    show: false,
    message: ""
  });
  let [showDialouge, setDialouge] = useState({
    show: false,
    message: ""
  });
  const [showDiagnosisForm, setShowDiagnosisForm] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [userRoleId, setRoleId] = useState()
  const [editData, setEditData] = useState({ onlyView: false })

  useEffect(() => {
    if (!DemographicRes?.pId) {
      setOpenDialog(true);
    }
  }, [DemographicRes, navigate])
  useEffect(() => {
    if (DemographicRes?.pId) {
      dispatch(fetchGetDiagnosisRequest(DemographicRes.pId));
    } else {
      navigate("/patients")
    }
  }, [dispatch, showDiagnosisForm === false]);

  const { message } = useSelector((state: any) => {
    return state.diagnosis;
  });


  let { data } = useSelector((state: any) => {
    return state.diagnosis;
  });

  let { diagnosis } = useSelector((state: any) => {
    let { diagnosis } = state;
    return { diagnosis }
  })
  const [confirmDelete, setConfirmDelete] = useState({
    show: false,
    id: ""
  });
  useEffect(() => {
    if (message) {
      setDialouge({ show: true, message: message })
      dispatch(fetchPatientInformationRequest(DemographicRes?.pId));
    }
  }, [message]);
  const deleteDaignosis = (id: any) => {
    dispatch(deleteDiagnosisRequest({ id: id, pId: DemographicRes.pId }));
  }

  const editDiagnosis = (id: any, classId: any) => {
    setShowDiagnosisForm(true)
    dispatch(editPaitentDiagnosis(id))
    dispatch(diagnosisDescriptionRequest(classId))
    dispatch(changeEditMode(true))

  }
  const getTableCell = (columnId: any, rowData: any) => {
    if (columnId === "domainClass") {
      return rowData.domainClass.name
    }
    return rowData[columnId as keyof DiagnosisData]
  }
  const handleCloseDialog = () => {
    setDialouge({ show: false, message: '' })
    dispatch(clearDialouge())
    if (showDiagnosisForm) {
      setShowDiagnosisForm(false)
    }
  }

  useEffect(() => {
    const item = localStorage.getItem("item");
    if (localStorage.getItem("item")) {
      const token = JSON.parse(decrypt(item))
      const parts = token.token.split('.');
      const payload = JSON.parse(window.atob(parts[1]));
      setRoleId(payload.roleId);
    }
  }, [])

  if (diagnosis.dataLoading) {
    return <Loader />
  }

  return <>{showDiagnosisForm ? (
    <AddDiagnosis setShowDiagnosisForm={setShowDiagnosisForm} {...(editData?.onlyView && { editData: editData })} />
  ) : (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead className="tableHead">
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} className="tableHeadContent">
                  {column.label}
                </TableCell >
              ))}
              {(postDemographic?.data?.success || DemographicRes?.patientRoleId === userRoleId || getRoleId() === 1) ?
                <TableCell key={"headButton"} sx={{ textAlign: "right" }}>
                  <Button
                    variant="contained"
                    className="headButton"
                    onClick={() => setShowDiagnosisForm(true)}
                  >
                    Add
                  </Button>
                </TableCell>
                : <TableCell></TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {(data.length > 0) ?
              data.map((row: any) => (
                <StyledTableRow key={row._id}>
                  {columns.map((column) => (
                    <TableCell key={column.id} className="tableContent" >
                      {getTableCell(column.id, row)}
                    </TableCell>
                  ))}
                  {
                    // DemographicRes?.patientRoleId === userRoleId || getRoleId() === 1 &&
                    <TableCell className="tableContent" sx={{ textAlign: "right" }}>
                      {((userRoleId === 1 || userRoleId === row?.roleId || (row?.roleId === 1 && row?.createdBy === getUserId()) || getPatientInformationData?.data.Demographic.createdBy === getUserId()) && row?.roleId !== 2)
                        ?
                        <>
                          <IconButton sx={{ color: "#017BAC" }} onClick={() => { editDiagnosis(row._id, row.domainClass.classId); setEditData({ onlyView: false }) }}>
                            <EditIcon />
                          </IconButton>
                          {/* <IconButton sx={{ color: "#C53E4E" }} onClick={(e) => deleteDaignosis(row._id)}> */}
                          <IconButton sx={{ color: "#C53E4E" }} onClick={() => { setConfirmDelete({ show: true, id: row._id }) }}>
                            <DeleteIcon />
                          </IconButton>
                        </>
                        :
                        <>
                          <IconButton sx={{ color: "#017BAC" }} onClick={() => { editDiagnosis(row._id, row.domainClass.classId); setEditData({ onlyView: true }) }}>
                            <VisibilityIcon />
                          </IconButton>
                        </>
                      }
                    </TableCell>
                  }
                </StyledTableRow>
              ))
              :
              <StyledTableRow >
                <StyledTableCell component="th" scope="row" align="center" colSpan={columns.length + 1}>
                  <h1>THERE IS NO DATA HERE</h1>
                </StyledTableCell>
              </StyledTableRow>}
          </TableBody>
        </Table>
      </TableContainer>
      <DialogBox buttonIcon={showAlert.message === "There is some error please try again later" || showAlert.message === "Please fill required fields" ? "error" : ""} openDialog={openDialog} handleSubmit={() => { navigate("/patients/demographic") }} handleClose={() => { setOpenDialog(false); navigate("/patients") }} title={showAlert.message} />
    </>
  )}
    <DialogBox openDialog={showDialouge.show} handleSubmit={handleCloseDialog} title={showDialouge.message} buttonText="Ok" />
    <DialogBox buttonIcon={"delete"} openDialog={confirmDelete.show} handleSubmit={() => { deleteDaignosis(confirmDelete.id); setConfirmDelete({ show: false, id: "" }) }} handleClose={() => setConfirmDelete({ show: false, id: "" })} title={'Are you sure want to delete?'} />
  </>
};

export default Diagnosis;

import TableList from "../../../../../components/Dashboard/TableList";
import { IconButton, TableRow, styled } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PatientContext, RoleIdContext, ShowTableDataContext, UpdateDataContext } from "../../../../../utils/showHideTabData";
import DialogBox from "../../../../../components/DialogBox";
import { getDataRequest, deleteRequest } from "../../../../../redux/modules/patients/medication/action";
import moment from "moment";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Loader from "../../../../../components/Loader";
import { getRoleId, getUserId } from "../../../../../utils/commonUtil";

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



export default function MedicationList() {
  let tableHead = ["Generic/Brand", "Medicine", "Pt. Instructions", "Quantity", "Started On", "Status"]
  let dispatch = useDispatch();

  let { getMedication, deleteMedication, postDemographic, getPatientInformationData } = useSelector((state: any) => {
    let { getMedication, deleteMedication, postDemographic, getPatientInformationData } = state;
    return { getMedication, deleteMedication, postDemographic, getPatientInformationData }
  })

  const { setEditData } = useContext(UpdateDataContext);
  const { showListData, setShowListData } = useContext(ShowTableDataContext);
  const DemographicRes = useContext(PatientContext);
  const userRoleId = useContext(RoleIdContext);

  useEffect(() => {
    if (DemographicRes?.pId) {
      dispatch(getDataRequest(DemographicRes.pId));
    }
  }, [dispatch, DemographicRes?.pId]);

  let [showAlert, setShowAlert] = useState({
    show: false,
    title: ""
  });
  const [confirmDelete, setConfirmDelete] = useState({
    show: false,
    id: ""
  });
  useEffect(() => {
    if (deleteMedication.data?.success && DemographicRes?.pId) {
      setShowAlert({ show: true, title: deleteMedication.data?.message })
      deleteMedication.data = deleteMedication.initialState.data;
      dispatch(getDataRequest(DemographicRes.pId));
    }
  }, [DemographicRes?.pId, dispatch, deleteMedication]);

  if (getMedication?.loading) {
    return <Loader />
  }

  return (
    <>
      <TableList tableHead={tableHead} showAction={DemographicRes?.patientRoleId === userRoleId || userRoleId === 1} hideAction={postDemographic?.data?.success ? true : false}>
        {(getMedication?.data?.data && getMedication?.data?.data?.length > 0) ?
          getMedication?.data?.data.map((item: any, index: number) => (
            <StyledTableRow key={`${item._id}${index}`}>
              <StyledTableCell align="left">{item?.medicine?.name}</StyledTableCell>
              <StyledTableCell align="center">{item?.medication}</StyledTableCell>
              <StyledTableCell align="center">{item.ptInstructions}</StyledTableCell>
              <StyledTableCell align="center">{item.quantity}</StyledTableCell>
              <StyledTableCell align="center">{moment(item.startOn).format('LLL')}</StyledTableCell>
              <StyledTableCell align="center">{item.status}</StyledTableCell>
              {(getPatientInformationData?.data.Demographic.createdBy === getUserId() || getRoleId() === 1 || DemographicRes?.patientRoleId === userRoleId || getPatientInformationData?.data.Demographic.roleId === 1) &&
                <StyledTableCell align="center" sx={{ textAlign: "right" }}>
                  {/* {((userRoleId === 1 || userRoleId === item?.roleId) && item?.roleId !== 2) ? <> */}
                  {((userRoleId === 1 || userRoleId === item?.roleId || (item?.roleId === 1 && item?.createdBy === getUserId()) || getPatientInformationData?.data.Demographic.createdBy === getUserId()) && item?.roleId !== 2)
                    ?
                    <>
                      <IconButton sx={{ color: "#017BAC" }} onClick={() => { setShowListData(!showListData); setEditData({ ...item, medicine: item.medicine._id }) }}>
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
              }
            </StyledTableRow>
          ))
          :
          <StyledTableRow >
            <StyledTableCell component="th" scope="row" align="center" colSpan={tableHead.length + 1}>
              <h1>NO KNOWN ALLERGIES</h1>
            </StyledTableCell>
          </StyledTableRow>
        }
      </TableList>
      <DialogBox buttonIcon={showAlert.title === "There is some error please try again later" || showAlert.title === "Please fill required fields" ? "error" : ""} openDialog={showAlert.show} handleSubmit={() => { setShowAlert({ show: false, title: "" }) }} title={showAlert.title} buttonText="Ok" />
      <DialogBox buttonIcon={"delete"} openDialog={confirmDelete.show} handleSubmit={() => { dispatch(deleteRequest(confirmDelete.id)); setConfirmDelete({ show: false, id: "" }) }} handleClose={() => setConfirmDelete({ show: false, id: "" })} title={'Are you sure want to delete?'} />
    </>
  );
}

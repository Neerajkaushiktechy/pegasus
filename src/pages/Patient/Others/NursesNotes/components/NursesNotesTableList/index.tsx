import TableList from "../../../../../../components/Dashboard/TableList";
import { IconButton, TableRow, styled } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNursesNotesRequest, deleteNursesNotesRequest } from "../../../../../../redux/modules/patients/nursesNotes/action";
import { PatientContext, RoleIdContext, ShowTableDataContext, UpdateDataContext } from "../../../../../../utils/showHideTabData";
import DialogBox from "../../../../../../components/DialogBox";
import { fetchPatientInformationRequest } from "../../../../../../redux/modules/patients/patientInformation/action";
import moment from "moment";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Loader from "../../../../../../components/Loader";
import { getRoleId, getUserId } from "../../../../../../utils/commonUtil";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.text.secondary,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    whiteSpace: "normal",  // Add this property to allow text to wrap
  },
}));
const truncateText = (text: any, maxLength: any) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + ".................Read More";
  }
  return text;
};
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function NursesNotesList() {
  let tableHead = ["Nurse Note"]
  let dispatch = useDispatch();

  let { getNursesNotesPlanList, deleteNursesNotesPlan, getNursesNotesPlan, postDemographic, getPatientInformationData } = useSelector((state: any) => {
    let { getNursesNotesPlan: { data: getNursesNotesPlanList }, deleteNursesNotesPlan, getNursesNotesPlan, postDemographic, getPatientInformationData } = state

    return { getNursesNotesPlanList, deleteNursesNotesPlan, getNursesNotesPlan, postDemographic, getPatientInformationData }
  })

  const { setEditData } = useContext(UpdateDataContext);
  const { showListData, setShowListData } = useContext(ShowTableDataContext);
  const DemographicRes = useContext(PatientContext);
  const userRoleId = useContext(RoleIdContext);

  useEffect(() => {
    if (DemographicRes?.pId) {
      dispatch(fetchNursesNotesRequest(DemographicRes.pId));
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
    if (deleteNursesNotesPlan.data?.success && DemographicRes?.pId) {
      setShowAlert({ show: true, title: deleteNursesNotesPlan.data?.message })
      deleteNursesNotesPlan.data = deleteNursesNotesPlan.initialState.data;
      dispatch(fetchNursesNotesRequest(DemographicRes.pId));
      dispatch(fetchPatientInformationRequest(DemographicRes.pId));
    }
  }, [DemographicRes?.pId, dispatch, deleteNursesNotesPlan]);

  if (getNursesNotesPlan?.loading) {
    return <Loader />
  }
  return (
    <>
      <TableList tableHead={tableHead} showAction={DemographicRes?.patientRoleId === userRoleId || getRoleId() === 1} hideAction={postDemographic.data?.success ? true : false}>
        {(getNursesNotesPlanList?.data && getNursesNotesPlanList?.data.length > 0) ?
          getNursesNotesPlanList?.data.map((item: any, index: number) => (
            <StyledTableRow key={`${item.nurseNotes}${index}`} >
              <StyledTableCell align="left" component="th" scope="row">{truncateText(item.nurseNotes, 400)} <span style={{ fontWeight: 800 }}>(Created by: {item.createdByName} at {moment(item.createdAt).format('LLL')})</span>
              </StyledTableCell>
              {(getPatientInformationData?.data.Demographic.createdBy === getUserId() || getRoleId() === 1 || DemographicRes?.patientRoleId === userRoleId || getPatientInformationData?.data.Demographic.roleId === 1) &&
                <StyledTableCell align="center" sx={{ textAlign: "right" }}>
                  {/* {((userRoleId === 1 || userRoleId === item?.roleId) && item?.roleId !== 2) ? <> */}
                  {((userRoleId === 1 || userRoleId === item?.roleId || (item?.roleId === 1 && item?.createdBy === getUserId()) || getPatientInformationData?.data.Demographic.createdBy === getUserId()) && item?.roleId !== 2)
                    ?
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
              }
            </StyledTableRow>
          ))
          :
          <StyledTableRow >
            <StyledTableCell component="th" scope="row" align="center" colSpan={tableHead.length + 1}>
              <h1>NO KNOW NURSES NOTES</h1>
            </StyledTableCell>
          </StyledTableRow>
        }
      </TableList>
      <DialogBox buttonIcon={showAlert.title === "There is some error please try again later" || showAlert.title === "Please fill required fields" ? "error" : ""} openDialog={showAlert.show} handleSubmit={() => { setShowAlert({ show: false, title: "" }) }} title={showAlert.title} buttonText="Ok" />
      <DialogBox buttonIcon={"delete"} openDialog={confirmDelete.show} handleSubmit={() => { dispatch(deleteNursesNotesRequest(confirmDelete.id)); setConfirmDelete({ show: false, id: "" }) }} handleClose={() => setConfirmDelete({ show: false, id: "" })} title={'Are you sure want to delete?'} />
    </>
  );
}

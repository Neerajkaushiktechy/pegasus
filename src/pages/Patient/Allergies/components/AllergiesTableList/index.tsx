import TableList from "../../../../../components/Dashboard/TableList";
import { IconButton, TableRow, styled } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllergyDataRequest, deleteAllergyRequest } from "../../../../../redux/modules/patients/allergies/action";
import { PatientContext, RoleIdContext, ShowTableDataContext, UpdateDataContext } from "../../../../../utils/showHideTabData";
import DialogBox from "../../../../../components/DialogBox";
import { fetchPatientInformationRequest } from "../../../../../redux/modules/patients/patientInformation/action";
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



export default function AllergiesTableList() {
  let tableHead = ["Allergent", "Severity", "Reaction", "Date onset", "Status"]
  let dispatch = useDispatch();

  let { AllergyList, deleteAllergy, getAllergy, postDemographic, getPatientInformationData } = useSelector((state: any) => {
    let { getAllergy: { data: AllergyList }, deleteAllergy, getAllergy, postDemographic, getPatientInformationData } = state

    return { AllergyList, deleteAllergy, getAllergy, postDemographic, getPatientInformationData }
  })

  const { setEditData } = useContext(UpdateDataContext);
  const { showListData, setShowListData } = useContext(ShowTableDataContext);
  const DemographicRes = useContext(PatientContext);
  const userRoleId = useContext(RoleIdContext);

  useEffect(() => {
    if (DemographicRes?.pId) {
      dispatch(fetchAllergyDataRequest(DemographicRes.pId));
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
    if (deleteAllergy.data?.success && DemographicRes?.pId) {
      setShowAlert({ show: true, title: deleteAllergy.data?.message })
      deleteAllergy.data = deleteAllergy.initialState.data;
      dispatch(fetchAllergyDataRequest(DemographicRes.pId));
      dispatch(fetchPatientInformationRequest(DemographicRes.pId));
    }
  }, [DemographicRes?.pId, dispatch, deleteAllergy]);

  if (getAllergy?.loading) {
    return <Loader />
  }
  return (
    <>
      <TableList tableHead={tableHead} showAction={DemographicRes?.patientRoleId === userRoleId || getRoleId() === 1} hideAction={postDemographic.data?.success ? true : false}>
        {(AllergyList?.data && AllergyList?.data.length > 0) ?
          AllergyList?.data.map((item: any, index: number) => (
            <StyledTableRow key={`${item.allergy}${index}`}>
              <StyledTableCell component="th" scope="row">{item.allergy}</StyledTableCell>
              <StyledTableCell align="center">{item.severities}</StyledTableCell>
              <StyledTableCell align="center">{item.reaction}</StyledTableCell>
              <StyledTableCell align="center">{moment(item.dateOnset).format('LLL')}</StyledTableCell>
              <StyledTableCell align="center">{item.status === "true" ? "Active" : item.status === "false" ? "Inactive" : "Unspecified"}</StyledTableCell>

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
              <h1>NO KNOWN ALLERGIES</h1>
            </StyledTableCell>
          </StyledTableRow>
        }
      </TableList>
      <DialogBox buttonIcon={showAlert.title === "There is some error please try again later" || showAlert.title === "Please fill required fields" ? "error" : ""} openDialog={showAlert.show} handleSubmit={() => { setShowAlert({ show: false, title: "" }) }} title={showAlert.title} buttonText="Ok" />
      <DialogBox buttonIcon={"delete"} openDialog={confirmDelete.show} handleSubmit={() => { dispatch(deleteAllergyRequest(confirmDelete.id)); setConfirmDelete({ show: false, id: "" }) }} handleClose={() => setConfirmDelete({ show: false, id: "" })} title={'Are you sure want to delete?'} />
    </>
  );
}

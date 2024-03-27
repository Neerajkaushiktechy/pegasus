import TableList from "../../../../../components/Dashboard/TableList";
import { IconButton, TableRow, styled } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PatientContext, RoleIdContext, ShowTableDataContext, UpdateDataContext } from "../../../../../utils/showHideTabData";
import { fetchFamilyDataRequest, deleteFamilyRequest } from "../../../../../redux/modules/patients/familyHistory/action";
import DialogBox from "../../../../../components/DialogBox";
import moment from "moment";
import Loader from "../../../../../components/Loader";
import VisibilityIcon from '@mui/icons-material/Visibility';
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



export default function FamilyHistoryList() {
  let tableHead = ["First Name", "Last Name", "Gender", "Date of Birth", "Relationship", "Disease", "Disease Status", "Age at Diagnose"]
  let dispatch = useDispatch();


  let { FamilyDataList, deleteFamilyHistory, getFamilyData, postDemographic, getPatientInformationData } = useSelector((state: any) => {
    let { getFamilyData: { data: FamilyDataList }, deleteFamilyHistory, getFamilyData, postDemographic, getPatientInformationData } = state
    return { FamilyDataList, deleteFamilyHistory, getFamilyData, postDemographic, getPatientInformationData }
  })

  const { setEditData } = useContext(UpdateDataContext);
  const { showListData, setShowListData } = useContext(ShowTableDataContext);
  const DemographicRes = useContext(PatientContext);
  const userRoleId = useContext(RoleIdContext);


  useEffect(() => {
    if (DemographicRes?.pId) {
      dispatch(fetchFamilyDataRequest(DemographicRes.pId));
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
    if (deleteFamilyHistory.data?.success) {
      setShowAlert({ show: true, title: deleteFamilyHistory.data?.message })
      deleteFamilyHistory.data = deleteFamilyHistory.initialState.data;
      dispatch(fetchFamilyDataRequest(DemographicRes.pId));
    }
  }, [dispatch, DemographicRes?.pId, deleteFamilyHistory]);

  if (getFamilyData?.loading) {
    return <Loader />
  }
  return (
    <>
      <TableList tableHead={tableHead} showAction={DemographicRes?.patientRoleId === userRoleId || userRoleId === 1} hideAction={postDemographic?.data?.success ? true : false}>
        {(FamilyDataList?.data && FamilyDataList?.data.length > 0) ?
          FamilyDataList?.data.map((item: any, index: number) => (
            <StyledTableRow key={`${item.fName}${index}`}>
              <StyledTableCell component="th" scope="row">{item.fName}</StyledTableCell>
              <StyledTableCell align="center">{item.lName}</StyledTableCell>
              <StyledTableCell align="center">{item.gender}</StyledTableCell>
              <StyledTableCell align="center">{moment(item.dob)?.format('LL')}</StyledTableCell>
              <StyledTableCell align="center">{item.relation}</StyledTableCell>
              <StyledTableCell align="center">{item.diseaseList[0]?.disease}</StyledTableCell>
              <StyledTableCell align="center">{item.diseaseList[0]?.diseaseStatus === "true" ? "Active" : "Inactive"}</StyledTableCell>
              <StyledTableCell align="center">{item.diseaseList[0]?.ageOfDiagnosis}</StyledTableCell>
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
              <h1>THERE IS NO DATA HERE</h1>
            </StyledTableCell>
          </StyledTableRow>
        }

      </TableList>
      <DialogBox buttonIcon={showAlert.title === "There is some error please try again later" || showAlert.title === "Please fill required fields" ? "error" : ""} openDialog={showAlert.show} handleSubmit={() => { setShowAlert({ show: false, title: "" }) }} title={showAlert.title} buttonText="Ok" />
      <DialogBox buttonIcon={"delete"} openDialog={confirmDelete.show} handleSubmit={() => { dispatch(deleteFamilyRequest(confirmDelete.id)); setConfirmDelete({ show: false, id: "" }) }} handleClose={() => setConfirmDelete({ show: false, id: "" })} title={'Are you sure want to delete?'} />
    </>
  );
}

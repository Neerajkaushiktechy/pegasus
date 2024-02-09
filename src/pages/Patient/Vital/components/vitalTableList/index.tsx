import TableList from "../../../../../components/Dashboard/TableList";
import { IconButton, TableRow, styled, Box } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PatientContext, RoleIdContext, ShowTableDataContext, UpdateDataContext } from "../../../../../utils/showHideTabData";
import DialogBox from "../../../../../components/DialogBox";
import { deleteVitalsRequest, fetchVitalsDataRequest } from "../../../../../redux/modules/patients/vitals/action";
import CharComponent from "../../../../../components/Chart";
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


export default function VitaTableList() {
  let tableHead = ["BP", "HR", "RR", "Temperature", "Height", "Weight", "BMI", "SPO2", "Recorded"]
  let dispatch = useDispatch();

  let { getVitalsList, deleteVitals, getVitals, postDemographic, getPatientInformationData } = useSelector((state: any) => {
    let { getVitals: { data: getVitalsList }, deleteVitals, getVitals, postDemographic, getPatientInformationData } = state
    return { getVitalsList, deleteVitals, getVitals, postDemographic, getPatientInformationData }
  })

  const { setEditData } = useContext(UpdateDataContext);
  const { showListData, setShowListData } = useContext(ShowTableDataContext);
  const DemographicRes = useContext(PatientContext);
  const userRoleId = useContext(RoleIdContext);

  useEffect(() => {
    if (DemographicRes?.pId) {
      dispatch(fetchVitalsDataRequest(DemographicRes.pId));
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
    if (deleteVitals.data?.success) {
      setShowAlert({ show: true, title: deleteVitals.data?.message })
      deleteVitals.data = deleteVitals.initialState.data;
      dispatch(fetchVitalsDataRequest(DemographicRes.pId));
    }
  }, [dispatch, deleteVitals, DemographicRes?.pId]);

  if (getVitals?.loading) {
    return <Loader />
  }
  return (
    <>
      <TableList tableHead={tableHead} showAction={DemographicRes?.patientRoleId === userRoleId || userRoleId === 1} hideAction={postDemographic?.data?.success ? true : false}>
        {(getVitalsList?.data && getVitalsList?.data?.length) ?
          getVitalsList?.data?.map((item: any, index: number) => (
            <StyledTableRow key={`${item._id}${index}`}>
              <StyledTableCell component="th" scope="row">{item.bloodPressure.mm}/{item.bloodPressure.hg}</StyledTableCell>
              <StyledTableCell align="center">{item.heartRate}</StyledTableCell>
              <StyledTableCell align="center">{item.respiratoryRate}</StyledTableCell>
              <StyledTableCell align="center">{item.tempature.value}{item.tempature.measureType}</StyledTableCell>
              <StyledTableCell align="center">{item.height.value}{item.height.measureType}</StyledTableCell>
              <StyledTableCell align="center">{item.weight.value}{item.weight.measureType}</StyledTableCell>
              <StyledTableCell align="center">{Number(item.bmi)?.toFixed(2)}</StyledTableCell>
              <StyledTableCell align="center">{item.spo2}</StyledTableCell>
              <StyledTableCell align="center">{moment(item.date)?.format('LLL')}</StyledTableCell>
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
      {
        getVitalsList?.data?.length > 0 &&
        <Box sx={{ background: "#FFFFFF", boxShadow: "0px 1px 60px rgba(190, 190, 190, 0.08)", borderRadius: "10px", padding: "20px", marginTop: "20px", marginBottom: "20px" }}>
          <CharComponent chartData={getVitalsList?.data?.[0]} />
        </Box>

      }
      <DialogBox buttonIcon={showAlert.title === "There is some error please try again later" || showAlert.title === "Please fill required fields" ? "error" : ""} openDialog={showAlert.show} handleSubmit={() => { setShowAlert({ show: false, title: "" }) }} title={showAlert.title} buttonText="Ok" />
      <DialogBox buttonIcon={"delete"} openDialog={confirmDelete.show} handleSubmit={() => { dispatch(deleteVitalsRequest(confirmDelete.id)); setConfirmDelete({ show: false, id: "" }) }} handleClose={() => setConfirmDelete({ show: false, id: "" })} title={'Are you sure want to delete?'} />
    </>
  );
}

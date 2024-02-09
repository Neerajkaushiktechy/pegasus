import { useState, useEffect } from "react";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { postDiagnosisRequest, getDiagnosisClassesRequest, diagnosisDescriptionRequest, changeEditMode, updateDiagnosisRequest, clearDialouge } from "../../../../../redux/modules/patients/daignosis/action";
import CloseIcon from "@mui/icons-material/Close";
import {
  FormControl,
  Typography,
  RadioGroup,
  Box,
  Grid,
  FormControlLabel,
  Radio,
  Button,
  InputLabel,
  Input,
  Select,
  MenuItem,
  Stack,
  IconButton
} from "@mui/material";
import DatePickerComponent from "../../../../../components/DatePicker";
import dayjs from "dayjs";
import { updateMyAssignmentStatusRequest } from "../../../../../redux/modules/studentView/myAssignments/action";
import Diagnosis from "../diagnosis";
import { useNavigate } from "react-router-dom";
import DialogBox from "../../../../../components/DialogBox";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddMasterData from "../../../../../components/AddMasterData";
import { postCustomMedicationRouteRequest, getFormDataRequest } from "../../../../../redux/modules/patients/medication/action";
import ModalPopup from "../../../../../components/Modal";
import { getRoleId } from "../../../../../utils/commonUtil";

type props = {
  setShowDiagnosisForm?: any;
  patientId?: any
  assessmentId?: any
  submittedTime?: any,
  type?: any,
  checkAssignment?: boolean,
  editData?: any
  assignmentId?: any
}

interface DiagnosisFormData {
  status: "",
  description: "",
  icd10Problem: "",
  startDate: "",
  editDate: "",
  type: "",
  comment: "",
  domainClass: { name: '', classId: '' },
  pId: "",
  submittedTime: "",
  assignmentId: ""
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function AddDiagnosis({ patientId, assessmentId, submittedTime, setShowDiagnosisForm, type, assignmentId, checkAssignment = false, editData }: props) {
  const [showDiagnosisData, setShowDiagnosisData] = useState(false);
  let dispatch = useDispatch();
  let navigate = useNavigate()
  let { DemographicRes, diagnosis } = useSelector((state: any) => {
    let { postDemographic: { data: DemographicRes }, diagnosis } = state
    return { DemographicRes, diagnosis }
  })

  const [show, setshow] = useState<boolean>(false);
  const [masterDataFormData, setmasterDataFormData] = useState({
    header: "",
    name: "",
    list: []
  })

  useEffect(() => {
    dispatch(getDiagnosisClassesRequest());
    if (diagnosis?.message != "" && type === "myassingment") {
      navigate('/myAssignment');
    }

  }, [diagnosis?.message])


  const { daignosisClasses, daignosisDescriptionList, daignosisFormData, editMode, editId, message }: any = useSelector((state: any) => {
    return state.diagnosis;
  });
  let { postCustomMedicationRoute, } = useSelector((state: any) => {
    let { postCustomMedicationRoute, } = state;
    return { postCustomMedicationRoute, }
  })

  let [formData, setFormData] = useState<DiagnosisFormData>(daignosisFormData);

  useEffect(() => {
    dispatch(getDiagnosisClassesRequest());
    if (postCustomMedicationRoute?.data?.success) {
      setshow(false);
      setFormData((prev: any) => ({ ...prev, [masterDataFormData['name']]: postCustomMedicationRoute?.data?.data?._id }))
      // if (masterDataFormData?.name === "medicine") {
      //   setTabData((prev: any) => ({ ...prev, name: postCustomMedicationRoute?.data?.data?.name, list: postCustomMedicationRoute?.data?.data?.list }))
      //   // dispatch(getMedicationMedicineRequest(postCustomMedicationRoute?.data?.data?._id));
      // }
      dispatch(diagnosisDescriptionRequest(postCustomMedicationRoute?.data?.data?._id));
      postCustomMedicationRoute.data.success = postCustomMedicationRoute.initialState.data;
    }
  }, [dispatch, postCustomMedicationRoute?.data?.success]);


  const updateData = (e: any) => {
    if (!editData?.onlyView) {
      const name = e?.target?.name;
      const value = e?.target?.value;
      if (name) {
        setFormData((prevValue: any) => {
          if (name === "domainClass") {
            return { ...prevValue, domainClass: { name: value.split('|')[0], classId: value.split('|')[1] } };
          }
          return {
            ...prevValue,
            [name]: value,
          };
        });
      }
    }

  };


  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!editData?.onlyView) {
      const pId = DemographicRes?.pId
      if (editMode) {
        dispatch(updateDiagnosisRequest({ formData, editId, pId }))
        dispatch(changeEditMode(false))
      } else {
        dispatch(postDiagnosisRequest({ formData, pId: patientId ? patientId : pId }))
      };
    }
  }

  useEffect(() => {
    if (message) {
      if (assessmentId) {
        let status = 2
        dispatch(updateMyAssignmentStatusRequest({ status, assessmentId, submittedTime }))
      }
    }
  }, [message]);

  const onCancelClicked = () => {
    dispatch(changeEditMode(false))
    setFormData({
      status: "",
      description: "",
      icd10Problem: "",
      startDate: "",
      editDate: "",
      type: "",
      comment: "",
      domainClass: { name: '', classId: '' },
      pId: DemographicRes?.pId,
      submittedTime: submittedTime ? submittedTime : "",
      assignmentId: assignmentId ? assignmentId : "",
    })
    setShowDiagnosisForm(false)
  }

  // updating submittedTime when changes its value
  useEffect(() => {
    setFormData(prevState => ({ ...prevState, submittedTime, assignmentId }));
  }, [submittedTime, assignmentId]);

  const handleResetForm = () => {
    setFormData({
      status: "",
      description: "",
      icd10Problem: "",
      startDate: "",
      editDate: "",
      type: "",
      comment: "",
      domainClass: { name: '', classId: '' },
      pId: patientId,
      submittedTime: submittedTime ? submittedTime : "",
      assignmentId: assignmentId ? assignmentId : "",
    });
  }
  const handleClassSelect = (e: any) => {
    const id = e.target.value.split('|')[1]
    dispatch(diagnosisDescriptionRequest(id));
    updateData(e)
    formData.description = ""
  }

  useEffect(() => {
    setFormData(prevalue => ({ ...prevalue, ...editData }))
  }, [editData])


  const handleSubmitMaterData = (data: string) => {
    let payload = {
      name: data,
      type: masterDataFormData?.name,
      list: masterDataFormData?.list
    }
    dispatch(postCustomMedicationRouteRequest(payload))
  }


  return (
    <>
      {!checkAssignment &&
        <Stack p={2} direction="row" justifyContent="space-between" alignItems="center" spacing={2} bgcolor="primary.light" sx={{ padding: "6px 20px" }}>
          <Typography>Add Diagnosis</Typography>
          {patientId ? (
            ""
          ) :
            <Button
              onClick={() => { dispatch(changeEditMode(false)); setShowDiagnosisForm(false) }}
            >
              <CloseIcon sx={{ width: "36px", height: "36px" }} />
            </Button>
          }
        </Stack>
      }
      <FormControl sx={{ padding: 5, backgroundColor: "#FFFFFF", width: "100%" }} component="form" onSubmit={(e) => { handleSubmit(e) }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="status" shrink sx={{ position: "relative" }}>
                  Status
                </InputLabel>
                <RadioGroup
                  sx={{ flexDirection: "row" }}
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="status"
                  id="status"
                  onChange={(e) => { updateData(e) }} value={formData?.status}
                >
                  <FormControlLabel
                    value={"Active"}
                    control={<Radio />}
                    label="Active"
                  />
                  <FormControlLabel
                    value={"Inactive"}
                    control={<Radio />}
                    label="Inactive"
                  />
                  <FormControlLabel
                    value={"Unspecified"}
                    control={<Radio />}
                    label="Unspecified"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth variant="standard" >
                <InputLabel shrink  >
                  Daignosis Domain Class
                </InputLabel>
                <Select

                  labelId="demo-simple-select-label"
                  name="domainClass"
                  label="Class"
                  id="domainClass"
                  MenuProps={MenuProps}
                  readOnly={editData?.onlyView}
                  onChange={(e) => { handleClassSelect(e) }} value={formData?.domainClass.name}
                  renderValue={() => formData?.domainClass.name}
                >
                  {daignosisClasses.map((data: any) => <MenuItem key={data._id} itemID={data._id} value={data.name + '|' + data._id} >{data.name}</MenuItem>)}
                  {
                    (getRoleId() === 1 || getRoleId() === 3) &&
                    <MenuItem sx={{ padding: 0 }}>
                      <Button onClick={() => { setmasterDataFormData((prev: any) => ({ ...prev, name: "domainClass", header: "Add Domain Class" })); setshow(true) }} variant="contained" color="secondary" sx={{
                        borderRadius: "0 !important", width: "100%",
                        mr: 0
                      }}>
                        <AddCircleIcon sx={{ color: "#fff" }} />
                        <IconButton sx={{ paddingLeft: "0px", fontSize: "19px" }} /> Add Domain Class
                      </Button>
                    </MenuItem>
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth variant="standard" >
                <InputLabel shrink  >
                  Daignosis List
                </InputLabel>
                <Select
                  disabled={formData.domainClass.classId === "" ? true : false}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  MenuProps={MenuProps}
                  value={formData.description}
                  name='description'
                  label="Class"
                  readOnly={editData?.onlyView}
                  onChange={(e) => updateData(e)}
                >
                  {daignosisDescriptionList
                    .slice()
                    .sort((a: any, b: any) => a.localeCompare(b))
                    .map((item: any) => (
                      <MenuItem value={item} key={item}>
                        {item}
                      </MenuItem>
                    ))}

                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink required >
                  Start Date
                </InputLabel>
              </FormControl>
              <Box mt={2}>
                <DatePickerComponent name="dob" value={formData?.startDate !== "" ? dayjs(formData?.startDate) : null} onChange={(value: string) => { if (!editData?.onlyView) { setFormData((prev: any) => ({ ...prev, startDate: value })) } }} />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="type" required shrink sx={{ position: "relative" }}>
                  Type
                </InputLabel>
                <RadioGroup
                  sx={{ flexDirection: "row" }}
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="type"
                  id="type"
                  onChange={(e) => { updateData(e) }} value={formData?.type}
                >
                  <FormControlLabel
                    value={"Acute"}
                    control={<Radio />}
                    label="Acute"
                  />
                  <FormControlLabel
                    value={"Chronic"}
                    control={<Radio />}
                    label="Chronic"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{
                fontWeight: "500",
                fontSize: "14px"
              }}>Comments (optional)</Typography>
              <FormControl variant="standard" fullWidth>
                <Input sx={{ padding: "14px" }} multiline fullWidth disableUnderline size="medium" rows={5} id="comment" name="comment" onChange={(e) => { updateData(e) }} value={formData?.comment}></Input>
              </FormControl>
            </Grid>
          </Grid>
          {!checkAssignment &&
            <Box mt="50px" textAlign="right">
              {!patientId ? (
                <Button variant="outlined" color="secondary" sx={{ mr: "20px" }} onClick={() => onCancelClicked()}>
                  Cancel
                </Button>
              ) : <Button variant="outlined" color="secondary" sx={{ mr: "20px" }} onClick={() => {
                handleResetForm();
              }}>
                Reset
              </Button>}
              {!editData?.onlyView &&
                <Button variant="contained" color="secondary" type="submit">
                  {editMode === true ? "update" : "Save"}
                </Button>
              }
            </Box>
          }
        </Box>
      </FormControl >
      <ModalPopup show={show} setshow={setshow} childern={<AddMasterData setshow={setshow} handleSubmit={handleSubmitMaterData} masterDataFormData={masterDataFormData} setmasterDataFormData={setmasterDataFormData} />} type="assignment" view={undefined} />
    </>
  );
}

export default AddDiagnosis;

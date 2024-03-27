import { Tab, Input, FormControl, Typography, InputLabel, Grid, FormControlLabel, Radio, Box, RadioGroup, Button, Paper, FormLabel, Select, MenuItem, Stack, IconButton, CardActionArea } from "@mui/material";
// import Tabs, { tabsClasses } from "@mui/material/Tabs";
import { useContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { PatientContext, ShowTableDataContext } from "../../../../../utils/showHideTabData";
import DialogBox from "../../../../../components/DialogBox";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { postDataRequest, updateRequest, getFormDataRequest, postCustomMedicationRouteRequest, getMedicationMedicineRequest } from "../../../../../redux/modules/patients/medication/action";
import { useSelector } from "react-redux";
import { updateMyAssignmentStatusRequest } from "../../../../../redux/modules/studentView/myAssignments/action";
import { useNavigate } from "react-router-dom";
import DatePickerComponent from "../../../../../components/DatePicker";
import dayjs from "dayjs";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ModalPopup from "../../../../../components/Modal";
import AddMasterData from "../../../../../components/AddMasterData";
import { getRoleId } from "../../../../../utils/commonUtil";


type props = {
   editData?: any
   patientId?: any
   checkAssignment?: boolean
   assignmentId?: any
   submittedTime?: any
   assessmentId?: any
}

const ITEM_HEIGHT = 60;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
   PaperProps: {
      style: {
         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
         width: "auto",
      },
   },
};

export default function MedicationFrom({ editData, patientId, submittedTime, assignmentId, assessmentId, checkAssignment = false }: props) {
   let intFormData = {
      pId: "",
      onlyView: false,
      status: "Active",
      quantity: "",
      startOn: dayjs(),
      comment: "",
      medication: "",
      medicine: "",
      refill: "",
      reasonRx: "",
      prescriber: "",
      file: "",
      imageUrl: "",
      dose: "",
      unit: "",
      route: "",
      frequency: "",
      directions: "",
      duration: "",
      ptInstructions: "",
      submittedTime: submittedTime ? submittedTime : "",
      assignmentId: assignmentId ? assignmentId : "",
   }
   let dispatch = useDispatch();
   let navigate = useNavigate();
   let [formData, setFormData] = useState(intFormData);
   let [tabData, setTabData] = useState({
      description: "",
      uses: '',
      list: []
   });
   const [show, setshow] = useState<boolean>(false);
   const [masterDataFormData, setmasterDataFormData] = useState({
      header: "",
      name: "",
      description: "",
      uses: "",
      list: [],
      medicineId: ""
   })
   const [medicationId, setmedicationId] = useState("")
   // const [activeTab, setActiveTab] = useState(0);
   const { showListData, setShowListData } = useContext(ShowTableDataContext) ?? {};
   const DemographicRes = useContext(PatientContext);

   let { postMedication, updateMedication, getMedicationFormData, getProfile, postCustomMedicationRoute, getMedicationMedicine } = useSelector((state: any) => {
      let { postMedication, updateMedication, getMedicationFormData, getProfile: { data: { data: getProfile } }, postCustomMedicationRoute, getMedicationMedicine } = state;
      return { postMedication, updateMedication, getMedicationFormData, getProfile, postCustomMedicationRoute, getMedicationMedicine }
   })

   useEffect(() => {
      dispatch(getFormDataRequest())
      if (postCustomMedicationRoute?.data?.success) {
         setshow(false);
         setFormData((prev: any) => ({ ...prev, [masterDataFormData['name']]: postCustomMedicationRoute?.data?.data?._id }))
         if (masterDataFormData?.name === "medicine") {
            setTabData((prev: any) => ({ ...prev, description: postCustomMedicationRoute?.data?.data?.description, uses: postCustomMedicationRoute?.data?.data?.uses, list: postCustomMedicationRoute?.data?.data?.list }))
            dispatch(getMedicationMedicineRequest(postCustomMedicationRoute?.data?.data?._id));
         }
         if (masterDataFormData?.name === "medication") {
            dispatch(getMedicationMedicineRequest(medicationId));
         }
         postCustomMedicationRoute.data.success = postCustomMedicationRoute.initialState.data;
      }
   }, [dispatch, postCustomMedicationRoute?.data?.success]);

   useEffect(() => {
      setFormData(prevState => ({ ...prevState, submittedTime, assignmentId }));
   }, [submittedTime]);

   useEffect(() => {
      if (editData !== null) {
         dispatch(getMedicationMedicineRequest(editData.medicine));
      }
      if (DemographicRes?.pId) {
         setFormData((prevalue) => {
            if (editData?._id) {
               for (let i in editData) {
                  if (editData[i] === null) {
                     editData[i] = ""
                  }
               }
               return {
                  ...prevalue,
                  ...editData,
                  pId: DemographicRes.pId,
                  ...(editData.startOn && { startOn: editData?.startOn }),
                  ...(editData.file && { imageUrl: editData?.file })
               };
            }
            return {
               ...prevalue,
               pId: DemographicRes.pId,

            };
         });
      }
      if (patientId) {
         setFormData((prevalue) => {
            if (editData?._id) {
               for (let i in editData) {
                  if (editData[i] === null) {
                     editData[i] = ""
                  }
               }
               return {
                  ...prevalue,
                  ...editData,
                  pId: patientId,
                  ...(editData?.startOn && { startOn: editData?.startOn }),
                  ...(editData?.file && { imageUrl: editData?.file })
               };
            }
            return {
               ...prevalue,
               pId: patientId,

            };
         });
      }
      if (editData?.onlyView) {
         setFormData((prevalue) => {
            for (let i in editData) {
               if (editData[i] === null) {
                  editData[i] = ""
               }
            }
            return {
               ...prevalue,
               ...editData,
            };
         });
      }
   }, [editData, DemographicRes, patientId]);

   useEffect(() => {
      setFormData(prevState => ({ ...prevState, prescriber: getProfile?.name || `${getProfile?.cp_fName} ${getProfile?.cp_lName}` || `${getProfile?.fName} ${getProfile?.lName}` || "" }));
   }, [getProfile])

   let [showAlert, setShowAlert] = useState({
      show: false,
      title: "",
      success: true
   });

   useEffect(() => {
      if (postMedication?.data?.success && !editData?._id) {
         setShowAlert({ show: true, title: postMedication.data?.message, success: true })
         delete postMedication?.data
         if (assessmentId) {
            let status = 2
            dispatch(updateMyAssignmentStatusRequest({ status, assessmentId, submittedTime }))
         }
      }
      if (postMedication?.error && !editData?._id) {
         setShowAlert({ show: true, title: postMedication.error?.message, success: false })
         delete postMedication?.error
      }
      if (updateMedication?.data?.success) {
         setShowAlert({ show: true, title: updateMedication.data.message, success: true })
         delete updateMedication?.data
      }
      if (updateMedication?.error) {
         setShowAlert({ show: true, title: updateMedication.error?.message, success: false })
         delete updateMedication?.error
      }
   }, [postMedication, editData?._id, updateMedication]);

   const updateData = (e: any) => {
      if (!formData.onlyView) {
         setFormData((prevalue) => {
            if (e?.target.name === "file") {
               return {
                  ...prevalue,
                  file: e?.target?.files[0],
                  imageUrl: e.target.files[0].name
               };
            }
            return {
               ...prevalue,
               [e?.target.name]: e?.target.value,
            };
         });
      }
   };

   const handleClassSelect = (e: any) => {
      const id = e.target.value
      setmedicationId(id)
      dispatch(getMedicationMedicineRequest(id));
      updateData(e)
      formData.medication = ""
   }


   const handleSubmit = (e: any) => {
      e.preventDefault();
      if (!formData.onlyView) {
         let fileFormData: any = new FormData(e.target);
         fileFormData.append('file', formData.file);
         fileFormData.append('pId', formData.pId);
         fileFormData.append('startOn', formData.startOn);
         if (editData?._id) {
            dispatch(updateRequest({ id: editData?._id, data: fileFormData }));

         } else {
            if (submittedTime && assessmentId) {
               fileFormData.append('submittedTime', submittedTime);
               fileFormData.append('assignmentId', assignmentId);
            }
            dispatch(postDataRequest(fileFormData));
         }
         delete postCustomMedicationRoute?.data
      }
   };

   const handleResetForm = () => {
      setFormData(intFormData);
   }
   // const handleTabChange = (event: any, newValue: any) => {
   //    setActiveTab(newValue);
   // };



   const handleSubmitMaterData = (data: string) => {
      let payload = {
         name: data,
         type: masterDataFormData?.name,
         description: masterDataFormData?.description,
         uses: masterDataFormData?.uses,
         list: masterDataFormData?.list,
         medicineId: masterDataFormData?.medicineId
      }
      dispatch(postCustomMedicationRouteRequest(payload))
   }
   return (
      <>
         <Paper>
            {!checkAssignment &&
               <Stack p={2} direction="row" justifyContent="space-between" alignItems="center" spacing={2} bgcolor="primary.light" sx={{ padding: "6px 20px" }}>
                  <Typography>Add Medication</Typography>
                  {patientId ? (
                     ""
                  ) :
                     <Button onClick={(e) => { e.preventDefault(); setShowListData(!showListData); delete postCustomMedicationRoute?.data }}>
                        <CloseIcon sx={{ width: "36px", height: "36px" }} />
                     </Button>
                  }
               </Stack>
            }
            <Grid container spacing={2} alignItems={"flex-start"}>
               <Grid item lg={8} xs={12} >
                  <Box
                     p={2}
                     component="form"
                     sx={{ pointerEvents: editData?.onlyView ? "none" : "auto" }}
                     onSubmit={(e) => { handleSubmit(e); }}>
                     <Box>
                        <Grid container spacing={2}>
                           <Grid item xs={6}>
                              <FormControl variant="standard" fullWidth sx={{ marginBottom: "30px" }}>
                                 <InputLabel shrink htmlFor="medicine" >
                                    Classification
                                 </InputLabel>
                                 <Select
                                    id="medicine"
                                    name="medicine"

                                    fullWidth
                                    MenuProps={MenuProps}
                                    defaultValue=""
                                    disableUnderline
                                    onChange={(e: any) => {
                                       // updateData(e);
                                       handleClassSelect(e)
                                    }}
                                    value={formData?.medicine}
                                 >
                                    {getMedicationFormData?.data?.medicationList && getMedicationFormData?.data?.medicationList.map((item: any) => {
                                       return (
                                          <MenuItem key={item?._id} value={item?._id} data-description={item?.description} data-uses={item?.uses} onClick={(e: any) => { setTabData((prevalue => ({ ...prevalue, description: e.target.dataset.description, uses: e.target.dataset.uses }))) }}>
                                             <Typography variant="body2" data-description={item?.description} data-uses={item?.uses} onClick={(e: any) => { setTabData((prevalue => ({ ...prevalue, description: e.target.dataset.description, uses: e.target.dataset.uses }))) }}>{item?.name}</Typography>
                                          </MenuItem>
                                       )

                                    })}
                                    {
                                       (getRoleId() === 1 || getRoleId() === 3) &&
                                       <MenuItem sx={{ padding: 0 }}>
                                          <Button onClick={() => { setmasterDataFormData((prev: any) => ({ ...prev, name: "medicine", header: "Add  Medication" })); setshow(true) }} variant="contained" color="secondary" sx={{
                                             borderRadius: "0 !important", width: "100%",
                                             mr: 0
                                          }}>
                                             <AddCircleIcon sx={{ color: "#fff" }} />
                                             <IconButton sx={{ paddingLeft: "0px", fontSize: "19px" }} /> Add Medication
                                          </Button>
                                       </MenuItem>
                                    }
                                 </Select>
                              </FormControl>
                           </Grid>
                           <Grid item xs={4}>
                              <FormControl variant="standard" fullWidth sx={{ marginBottom: "30px" }}>
                                 <InputLabel shrink htmlFor="medication" >
                                    Medicine
                                 </InputLabel>
                                 <Select
                                    disabled={formData.medicine === "" || formData.medicine === undefined ? true : false}
                                    id="medication"
                                    name="medication"

                                    fullWidth
                                    MenuProps={MenuProps}
                                    defaultValue=""
                                    disableUnderline
                                    onChange={(e: any) => {
                                       updateData(e);
                                    }}
                                    value={formData?.medication}
                                 >
                                    {getMedicationMedicine?.data?.data && getMedicationMedicine?.data?.data[0]?.list
                                       .slice()
                                       .sort((a: any, b: any) => a.localeCompare(b))
                                       .map((item: any) => (
                                          <MenuItem value={item} key={item}>
                                             <Typography variant="body2">{item}</Typography>
                                          </MenuItem>
                                       ))}

                                    {
                                       (getRoleId() === 1 || getRoleId() === 3) &&
                                       <MenuItem sx={{ padding: 0 }}>
                                          <Button onClick={() => { setmasterDataFormData((prev: any) => ({ ...prev, name: "medication", header: "Add  Medicine", medicineId: getMedicationMedicine?.data?.data[0]?._id })); setshow(true) }} variant="contained" color="secondary" sx={{
                                             borderRadius: "0 !important", width: "100%",
                                             mr: 0
                                          }}>
                                             <AddCircleIcon sx={{ color: "#fff" }} />
                                             <IconButton sx={{ paddingLeft: "0px", fontSize: "19px" }} /> Add Medicine
                                          </Button>
                                       </MenuItem>
                                    }
                                 </Select>
                              </FormControl>
                           </Grid>
                           <Grid item xs={2}>
                              <FormControl variant="standard" fullWidth sx={{ marginBottom: "30px" }}>
                                 <InputLabel shrink htmlFor="quantity">
                                    Quantity
                                 </InputLabel>
                                 <Input
                                    id="quantity"
                                    name="quantity"
                                    type="number"
                                    fullWidth
                                    disableUnderline
                                    onChange={(e) => {
                                       updateData(e);
                                    }}
                                    value={formData?.quantity}
                                 />
                              </FormControl>
                           </Grid>
                           <Grid item xs={12}>
                              <FormControl variant="standard" fullWidth sx={{ marginBottom: "30px" }}>
                                 <FormLabel htmlFor="status">
                                    Status
                                 </FormLabel>
                                 <RadioGroup
                                    sx={{ flexDirection: "row" }}
                                    name="status"
                                    id="status"
                                    onChange={(e) => {
                                       updateData(e);
                                    }}
                                    value={formData?.status}
                                 >
                                    <FormControlLabel value="Active" control={<Radio />} label="Active" />
                                    <FormControlLabel value="Discontinued" control={<Radio />} label="Inactive" />
                                    <FormControlLabel value="Not Administered" control={<Radio />} label="Not Administered" />
                                    <FormControlLabel value="Unspecified" control={<Radio />} label="Unspecified" />
                                 </RadioGroup>
                              </FormControl>
                           </Grid>
                           <Grid item xs={12}>
                              <Grid container spacing={2} sx={{ background: "#F6F6F6", padding: "20px 20px 40px 10px", borderRadius: "10px", marginLeft: "0", marginBottom: "30px" }}>
                                 <Grid item xs={12}>
                                    <Typography>Build Instructions</Typography>
                                 </Grid>
                                 <Grid item xs={4}>
                                    <FormControl variant="standard" fullWidth>
                                       <InputLabel shrink htmlFor="dose">
                                          Dose
                                       </InputLabel>
                                       <Input
                                          id="dose"
                                          name="dose"
                                          type="number"
                                          fullWidth
                                          disableUnderline
                                          onChange={(e) => { updateData(e); }}
                                          value={formData?.dose}
                                       />
                                    </FormControl>
                                 </Grid>
                                 <Grid item xs={4}>
                                    <FormControl variant="standard" fullWidth>
                                       <InputLabel shrink htmlFor="unit">
                                          Unit
                                       </InputLabel>
                                       <Select
                                          id="unit"
                                          name="unit"
                                          fullWidth
                                          MenuProps={MenuProps}
                                          defaultValue=""
                                          disableUnderline
                                          onChange={(e) => {
                                             updateData(e);
                                          }}
                                          value={formData?.unit}>
                                          {getMedicationFormData?.data?.medicationUnit && getMedicationFormData?.data?.medicationUnit.map((item: any) => {
                                             return (
                                                <MenuItem key={item?._id} value={item?._id}>
                                                   <Typography variant="body2">{item?.unit}</Typography>
                                                </MenuItem>
                                             )
                                          })}
                                          {
                                             (getRoleId() === 1 || getRoleId() === 3) &&
                                             <MenuItem sx={{ padding: 0 }}>
                                                <Button onClick={() => { setmasterDataFormData((prev: any) => ({ ...prev, name: "unit", header: "Add  Unit" })); setshow(true) }} variant="contained" color="secondary" sx={{
                                                   borderRadius: "0 !important", width: "100%",
                                                   mr: 0
                                                }}>
                                                   <AddCircleIcon sx={{ color: "#fff" }} />
                                                   <IconButton sx={{ paddingLeft: "0px", fontSize: "19px" }} />Add  Unit
                                                </Button>
                                             </MenuItem>
                                          }
                                       </Select>
                                    </FormControl>
                                 </Grid>
                                 <Grid item xs={4}>
                                    <FormControl variant="standard" fullWidth>
                                       <InputLabel shrink htmlFor="route">
                                          Route
                                       </InputLabel>
                                       <Select
                                          id="route"
                                          name="route"
                                          fullWidth
                                          disableUnderline
                                          MenuProps={MenuProps}
                                          // MenuProps={{ disableScrollLock: true }}
                                          onChange={(e) => {
                                             updateData(e);
                                          }}
                                          value={formData?.route}>
                                          {getMedicationFormData?.data?.medicationRoute && getMedicationFormData?.data?.medicationRoute.map((item: any) => {
                                             return (
                                                <MenuItem key={item?._id} value={item?._id}>
                                                   <Typography variant="body2">{item?.route}</Typography>
                                                </MenuItem>
                                             )
                                          })}
                                          {
                                             (getRoleId() === 1 || getRoleId() === 3) &&
                                             <MenuItem sx={{ padding: 0 }}>
                                                <Button onClick={() => { setmasterDataFormData((prev: any) => ({ ...prev, name: "route", header: "Add Route" })); setshow(true) }} variant="contained" color="secondary" sx={{
                                                   borderRadius: "0 !important", width: "100%",
                                                   mr: 0
                                                }}>
                                                   <AddCircleIcon sx={{ color: "#fff" }} />
                                                   <IconButton sx={{ paddingLeft: "0px", fontSize: "19px" }} /> Add Route
                                                </Button>
                                             </MenuItem>
                                          }

                                       </Select>
                                    </FormControl>
                                 </Grid>
                                 <Grid item xs={4}>
                                    <FormControl variant="standard" fullWidth>
                                       <InputLabel shrink htmlFor="frequency" >
                                          Frequency
                                       </InputLabel>
                                       <Select
                                          id="frequency"
                                          name="frequency"
                                          fullWidth
                                          MenuProps={MenuProps}
                                          defaultValue=""
                                          disableUnderline
                                          onChange={(e) => {
                                             updateData(e);
                                          }}
                                          value={formData?.frequency}>
                                          {getMedicationFormData?.data?.medicationFrequency && getMedicationFormData?.data?.medicationFrequency.map((item: any) => {
                                             return (
                                                <MenuItem key={item?._id} value={item?._id}>
                                                   <Typography variant="body2">{item?.frequency}</Typography>
                                                </MenuItem>
                                             )
                                          })}
                                          {
                                             (getRoleId() === 1 || getRoleId() === 3) &&
                                             <MenuItem sx={{ padding: 0 }}>
                                                <Button onClick={() => { setmasterDataFormData((prev: any) => ({ ...prev, name: "frequency", header: "Add Frequency" })); setshow(true) }} variant="contained" color="secondary" sx={{
                                                   borderRadius: "0 !important", width: "100%",
                                                   mr: 0
                                                }}>
                                                   <AddCircleIcon sx={{ color: "#fff" }} />
                                                   <IconButton sx={{ paddingLeft: "0px", fontSize: "19px" }} />Add Frequency
                                                </Button>
                                             </MenuItem>
                                          }
                                       </Select>
                                    </FormControl>
                                 </Grid>
                                 <Grid item xs={4}>
                                    <FormControl variant="standard" fullWidth>
                                       <InputLabel shrink htmlFor="directions">
                                          Directions
                                       </InputLabel>
                                       <Select
                                          id="directions"
                                          name="directions"
                                          fullWidth
                                          defaultValue=""
                                          disableUnderline
                                          MenuProps={MenuProps}
                                          onChange={(e) => {
                                             updateData(e);
                                          }}
                                          value={formData?.directions}>
                                          {getMedicationFormData?.data?.medicationDirections && getMedicationFormData?.data?.medicationDirections.map((item: any) => {
                                             return (
                                                <MenuItem key={item?._id} value={item?._id}>
                                                   <Typography variant="body2">{item?.directions}</Typography>
                                                </MenuItem>
                                             )
                                          })}
                                          {
                                             (getRoleId() === 1 || getRoleId() === 3) &&
                                             <MenuItem sx={{ padding: 0 }}>
                                                <Button onClick={() => { setmasterDataFormData((prev: any) => ({ ...prev, name: "directions", header: "Add Directions" })); setshow(true) }} variant="contained" color="secondary" sx={{
                                                   borderRadius: "0 !important", width: "100%",
                                                   mr: 0
                                                }}>
                                                   <AddCircleIcon sx={{ color: "#fff" }} />
                                                   <IconButton sx={{ paddingLeft: "0px", fontSize: "19px" }} />Add Directions

                                                </Button>
                                             </MenuItem>
                                          }
                                       </Select>
                                    </FormControl>
                                 </Grid>
                                 <Grid item xs={4}>
                                    <FormControl variant="standard" fullWidth>
                                       <InputLabel shrink htmlFor="duration">
                                          Duration
                                       </InputLabel>
                                       <Select
                                          id="duration"
                                          name="duration"
                                          fullWidth
                                          defaultValue=""
                                          disableUnderline
                                          MenuProps={MenuProps}
                                          onChange={(e) => {
                                             updateData(e);
                                          }}
                                          value={formData?.duration}>
                                          {getMedicationFormData?.data?.medicationDuration && getMedicationFormData?.data?.medicationDuration.map((item: any) => {
                                             return (
                                                <MenuItem key={item?._id} value={item?._id}>
                                                   <Typography variant="body2">{item?.duration}</Typography>
                                                </MenuItem>
                                             )
                                          })}
                                          {
                                             (getRoleId() === 1 || getRoleId() === 3) &&
                                             <MenuItem sx={{ padding: 0 }}>
                                                <Button onClick={() => { setmasterDataFormData((prev: any) => ({ ...prev, name: "duration", header: "Add Duration" })); setshow(true) }} variant="contained" color="secondary" sx={{
                                                   borderRadius: "0 !important", width: "100%",
                                                   mr: 0
                                                }}>
                                                   <AddCircleIcon sx={{ color: "#fff" }} />
                                                   <IconButton sx={{ paddingLeft: "0px", fontSize: "19px" }} />Add Duration
                                                </Button>
                                             </MenuItem>
                                          }
                                       </Select>
                                    </FormControl>
                                 </Grid>
                                 <Grid item xs={12}>
                                    <FormControl variant="standard" fullWidth>
                                       <InputLabel shrink htmlFor="ptInstructions">
                                          Pt. Instructions
                                       </InputLabel>
                                       <Input
                                          sx={{ padding: "14px" }}
                                          id="ptInstructions"
                                          name="ptInstructions"
                                          fullWidth
                                          disableUnderline
                                          multiline
                                          onChange={(e) => {
                                             updateData(e);
                                          }}
                                          value={formData?.ptInstructions}
                                       />
                                    </FormControl>
                                 </Grid>
                              </Grid>
                           </Grid>

                           <Grid item xs={6}>

                              <FormControl variant="standard" fullWidth sx={{ marginBottom: "30px" }}>
                                 <InputLabel shrink htmlFor="refill">
                                    Refill
                                 </InputLabel>
                                 <Input
                                    id="refill"
                                    name="refill"
                                    type="number"
                                    fullWidth
                                    disableUnderline
                                    onChange={(e) => {
                                       updateData(e);
                                    }}
                                    value={formData?.refill}
                                 />
                              </FormControl>
                           </Grid>
                           <Grid item xs={6}>
                              <FormControl variant="standard" fullWidth sx={{ marginBottom: "30px" }}>
                                 <InputLabel shrink htmlFor="reasonRx">
                                    Reason for Rx
                                 </InputLabel>
                                 <Input
                                    id="reasonRx"
                                    name="reasonRx"
                                    fullWidth
                                    disableUnderline
                                    onChange={(e) => {
                                       updateData(e);
                                    }}
                                    value={formData?.reasonRx}
                                 />
                              </FormControl>
                           </Grid>
                           <Grid item xs={6}>
                              <FormControl variant="standard" fullWidth sx={{ marginBottom: "30px" }}>
                                 <InputLabel shrink htmlFor="prescriber">
                                    Prescriber
                                 </InputLabel>
                                 <Input
                                    id="prescriber"
                                    name="prescriber"
                                    fullWidth
                                    disableUnderline
                                    disabled
                                    value={formData?.prescriber}
                                 />
                              </FormControl>
                           </Grid>
                           <Grid item xs={6}>
                              <FormControl variant="standard" fullWidth sx={{ marginBottom: "30px" }}>
                                 <InputLabel shrink htmlFor="startOn">
                                    Started On
                                 </InputLabel>
                                 <Box sx={{ marginTop: "32px!important" }}>
                                    <DatePickerComponent name="startOn" value={dayjs(formData?.startOn)} onChange={(value: string) => setFormData((prev: any) => ({ ...prev, startOn: value }))} />
                                 </Box>
                              </FormControl>
                           </Grid>
                           <Grid item xs={12}>
                              <FormControl variant="standard" fullWidth className="custom-dropzone" sx={{ marginBottom: "30px" }}>
                                 <InputLabel shrink htmlFor="file">
                                    File
                                 </InputLabel>
                                 <Box className="dropzone">
                                    {
                                       formData?.imageUrl !== ""
                                          ? <> <Button className="close_btn" onClick={() => setFormData((prev: any) => ({ ...prev, imageUrl: "", file: "" }))} sx={{ right: 0 }}> <CloseIcon /></Button> {formData?.imageUrl}</>
                                          : <>
                                             <CloudUploadIcon />
                                             <Box>
                                                <Typography
                                                   variant="body2"
                                                   color="text.secondary"
                                                   paragraph
                                                   marginBottom={"10px"}
                                                >
                                                   Drag And Drop to Upload the file
                                                </Typography>
                                                <Typography
                                                   variant="body2"
                                                   color="text.secondary"
                                                   paragraph
                                                   marginBottom={"16px"}
                                                >
                                                   Or
                                                </Typography>
                                                <Button variant="contained" color="primary">
                                                   Browse File
                                                </Button>
                                                <Box
                                                   sx={{
                                                      position: "absolute",
                                                      top: "0",
                                                      left: "0",
                                                      height: "100%",
                                                      width: "100%",
                                                   }}
                                                >
                                                   <Input
                                                      id="file"
                                                      name="file"
                                                      type="file"
                                                      fullWidth
                                                      disableUnderline
                                                      className="dropzone-input"
                                                      onChange={(e) => { updateData(e); }}
                                                   />
                                                </Box>
                                             </Box>
                                          </>
                                    }
                                 </Box>
                              </FormControl>
                           </Grid>
                           <Grid item xs={12}>
                              <FormControl variant="standard" fullWidth>
                                 <InputLabel shrink htmlFor="comment">
                                    Additional Instructions
                                 </InputLabel>
                                 <Input
                                    sx={{ padding: "14px" }}
                                    id="comment"
                                    name="comment"
                                    fullWidth
                                    disableUnderline
                                    multiline
                                    minRows="5"
                                    onChange={(e) => {
                                       updateData(e);
                                    }}
                                    value={formData?.comment}
                                 />
                              </FormControl>
                           </Grid>
                        </Grid>
                     </Box>
                     {!checkAssignment &&
                        <Box mt="50px" textAlign="right">
                           {!patientId
                              ? (
                                 <Button variant="outlined" color="secondary" sx={{ mr: "20px" }} onClick={() => { setShowListData(!showListData); delete postCustomMedicationRoute?.data }}>
                                    Cancel
                                 </Button>
                              ) :
                              <Button variant="outlined" color="secondary" sx={{ mr: "20px" }} onClick={() => { handleResetForm(); }}>
                                 Reset
                              </Button>}
                           {!formData.onlyView &&
                              <Button variant="contained" color="secondary" type="submit">
                                 {editData?._id ? "update" : "Save"}
                              </Button>
                           }
                        </Box>
                     }
                  </Box>
               </Grid>
               <Grid item lg={4} xs={12}>
                  <Box style={{ margin: "16px 30px", border: "1px solid #CCCCCC", borderRadius: "6px", padding: "16px", height: "100%" }}>
                     <Typography variant="h6">Medicine Description</Typography>
                     <Typography>{tabData?.description}</Typography>
                     {/* <Box sx={{ flexGrow: 1, bgcolor: "background.paper" }} className="custom-tabs">
                        <Tabs
                           value={activeTab}
                           onChange={handleTabChange}
                           variant="scrollable"
                           sx={{
                              mb: "20px",
                              [`& .MuiTabs-hideScrollbar`]: {
                                 "flex": "unset"
                              },
                              [`& .${tabsClasses.scrollButtons}`]: {
                                 "&.Mui-disabled": { opacity: 0.3 },
                              },
                           }}
                        >
                           <Tab label="Description" />
                           <Tab label="Drug Info" />
                        </Tabs>
                        {activeTab === 0 && <Typography>{tabData.description}</Typography>}
                        {activeTab === 1 && <Typography>{tabData.description}</Typography>}
                     </Box> */}
                  </Box>
                  <Box style={{ margin: "16px 30px", border: "1px solid #CCCCCC", borderRadius: "6px", padding: "16px", height: "100%" }}>
                     <Typography variant="h6">Medicine Uses</Typography>
                     <Typography>{tabData?.uses}</Typography>
                  </Box>
               </Grid>

            </Grid>
         </Paper>
         <DialogBox buttonIcon={showAlert.title === "There is some error please try again later" || showAlert.title === "Please fill required fields" ? "error" : ""} openDialog={showAlert.show} handleSubmit={() => { setShowAlert({ show: false, title: "", success: true }); if (showAlert.success) { patientId ? navigate('/myAssignment') : setShowListData(!showListData); } }} title={showAlert.title} buttonText="Ok" />
         <ModalPopup show={show} setshow={setshow} childern={<AddMasterData setshow={setshow} handleSubmit={handleSubmitMaterData} masterDataFormData={masterDataFormData} setmasterDataFormData={setmasterDataFormData} />} type="assignment" view={undefined} />
      </>
   )
}

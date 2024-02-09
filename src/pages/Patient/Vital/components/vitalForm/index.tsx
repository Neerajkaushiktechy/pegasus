import { ChangeEvent } from 'react';
import { FormControl, Typography, InputLabel, Grid, FormControlLabel, Box, Button, Paper, MenuItem, Stack, FormGroup, Checkbox, TextField } from "@mui/material";
import { useContext, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { PatientContext, ShowTableDataContext } from "../../../../../utils/showHideTabData";
import DialogBox from "../../../../../components/DialogBox";
import Select from '@mui/material/Select';
import { fetchOxygenSupplyDataRequest, postVitalsDataRequestAction, updateVitalsRequest } from '../../../../../redux/modules/patients/vitals/action';
import DatePickerComponent from '../../../../../components/DatePicker';
import dayjs from 'dayjs';
import { bmiCalc, getRoleId } from '../../../../../utils/commonUtil';
import { useNavigate } from "react-router";
import { updateMyAssignmentStatusRequest } from '../../../../../redux/modules/studentView/myAssignments/action';
import moment from 'moment';


type props = {
   editData?: any
   patientId?: any
   assessmentId?: any
   submittedTime?: any
   checkAssignment?: boolean
   assignmentId?: any

}

export default function VitaForm({ editData, patientId, assessmentId, submittedTime, assignmentId, checkAssignment = false }: props) {
   let navigate = useNavigate();
   let dispatch = useDispatch();
   // State to keep track of "Unspecified" checkbox status
   const [unspecifiedChecked, setUnspecifiedChecked] = useState(false);

   // Function to handle "Inhaled O2" value change
   const handleInhaledO2Change = (event: ChangeEvent<HTMLInputElement>) => {
      // Clear "Unspecified" checkbox when value is manually changed
      if (unspecifiedChecked) {
         setUnspecifiedChecked(false);
      }
      updateData(event, "")
   };
   let [formData, setFormData] = useState({
      pId: "",
      date: `${dayjs()}`,
      time: `${moment().format('hh:mm')}`,
      bloodPressure: {
         mm: 0,
         hg: 0
      },
      height: {
         value: 0,
         measureType: "m"
      },
      headCirc: {
         value: 0,
         measureType: "cm"
      },
      heartRate: 0,
      weight: {
         value: 0,
         measureType: "kg"
      },
      tempature: {
         value: 0,
         measureType: "C"
      },
      respiratoryRate: 0,
      spo2: 0,
      inhaledO2: "",
      Unspecified: false,
      bmi: 0,
      oxygenSupply: "",
      comment: "",
      submittedTime: submittedTime ? submittedTime : "",
      onlyView: false,
      assignmentId: assignmentId ? assignmentId : "",
   });
   useEffect(() => {
      dispatch(fetchOxygenSupplyDataRequest())
   }, [dispatch])
   //updating submittedTime when changes its value
   useEffect(() => {
      setFormData(prevState => ({ ...prevState, submittedTime }));
   }, [submittedTime]);

   useEffect(() => {
      let bmi = bmiCalc(formData.weight, formData.height)
      setFormData((prevalue: any) => {
         return {
            ...prevalue,
            bmi
         };
      });

   }, [formData.weight, formData.height])
   // Function to handle toggling of "Unspecified" checkbox
   const handleUnspecifiedToggle = (event: ChangeEvent<HTMLInputElement>) => {
      const isChecked = event.target.checked;

      // If "Unspecified" is checked, clear the "Inhaled O2" value
      if (isChecked) {
         setFormData((prev: any) => ({ ...prev, Unspecified: true, inhaledO2: "", }))
      }
      else {
         setFormData((prev: any) => ({ ...prev, Unspecified: false }))
      }
   };

   const updateData = (e: any, nestedObj: any) => {
      if (!formData.onlyView) {
         setFormData((prevalue: any) => {
            if (nestedObj) {
               return {
                  ...prevalue,
                  [nestedObj]: {
                     ...prevalue[nestedObj],
                     [e?.target.name]: e?.target.value
                  }
               };
            }
            return {
               ...prevalue,
               [e?.target.name]: e?.target.value,
            };
         });
      }
   };

   const handleResetForm = () => {
      setFormData({
         pId: patientId,
         date: "",
         time: "",
         bloodPressure: {
            mm: 0,
            hg: 0
         },
         height: {
            value: 0,
            measureType: "m"
         },
         headCirc: {
            value: 0,
            measureType: "cm"
         },
         heartRate: 0,
         weight: {
            value: 0,
            measureType: "kg"
         },
         tempature: {
            value: 0,
            measureType: "C"
         },
         respiratoryRate: 0,
         spo2: 0,
         inhaledO2: "",
         Unspecified: false,
         bmi: 0,
         oxygenSupply: "",
         comment: "",
         submittedTime: submittedTime ? submittedTime : "",
         onlyView: false,
         assignmentId: assignmentId ? assignmentId : "",
      });
   }

   const handleSubmit = (e: any) => {
      e.preventDefault();
      if (!formData.onlyView) {
         if (editData?._id) {
            dispatch(updateVitalsRequest(formData));
         } else {
            dispatch(postVitalsDataRequestAction(formData));
         }
      }
   };
   const { showListData, setShowListData } = useContext(ShowTableDataContext) ?? {};

   let { postVitalsRes, updateVitalsRes, getOxygensupplyMasterData } = useSelector((state: any) => {
      let { postVitals: postVitalsRes, updateVitals: updateVitalsRes, getOxygensupplyMasterData } = state;
      return { postVitalsRes, updateVitalsRes, getOxygensupplyMasterData };
   });

   const DemographicRes = useContext(PatientContext);
   useEffect(() => {
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
               };
            }
            return {
               ...prevalue,
               pId: DemographicRes.pId,
            };
         });
      }
      else {
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
   }, [editData, DemographicRes]);

   let [showAlert, setShowAlert] = useState({
      show: false,
      title: ""
   });
   useEffect(() => {
      if (postVitalsRes.data?.success) {
         setShowAlert({ show: true, title: postVitalsRes.data?.message })
         postVitalsRes.data = postVitalsRes.initialState.data;
         if (assessmentId) {
            let status = 2
            dispatch(updateMyAssignmentStatusRequest({ status, assessmentId, submittedTime }))
         }
      }
      if (updateVitalsRes.data?.success) {
         setShowAlert({ show: true, title: updateVitalsRes.data?.message })
         updateVitalsRes.data = updateVitalsRes.initialState.data;
      }

   }, [postVitalsRes.data?.success, updateVitalsRes.data?.success, showListData, setShowListData]);


   return (
      <>
         <Paper>
            {!checkAssignment &&
               <Stack p={2} direction="row" justifyContent="space-between" alignItems="center" spacing={2} bgcolor="primary.light" sx={{ padding: "6px 20px" }}>
                  <Typography sx={{ color: "#271E4A", fontWeight: "500" }}>New Vital Signs</Typography>
                  {patientId ? (
                     ""
                  ) :
                     <Button
                        onClick={() => {
                           setShowListData(!showListData);
                        }}
                        sx={{
                           padding: "14px 0 !important",
                           justifyContent: "end",
                           [`& .hover`]: { background: "unset" }
                        }}
                     >
                        <CloseIcon sx={{ width: "36px", height: "36px" }} />
                     </Button>
                  }
               </Stack>
            }
            <Box
               p={2}
               component="form"
               onSubmit={(e) => {
                  handleSubmit(e);
               }}
            >
               <Box>

                  <Grid container spacing={2} className='vital-form'>
                     <Grid item xs={12}>
                        <Grid container spacing={2} className='vital-form'>
                           <Grid item xs={6}>

                              <FormControl variant="standard" fullWidth>
                                 <InputLabel shrink htmlFor="date" required>
                                    Recorded
                                 </InputLabel>
                                 <Box sx={{ display: "flex", alignItems: "center" }} className='input-box date-time'>
                                    <DatePickerComponent name="date" value={dayjs(formData?.date)} onChange={(value: string) => setFormData((prev: any) => ({ ...prev, date: value }))} />
                                    {/* <TextField id="date"  type="date" placeholder="date" required name="date" fullWidth sx={{ marginRight: "20px" }} value={formData.date} onChange={(event: ChangeEvent<HTMLInputElement>) => { updateData(event, "") }} defaultValue={"mm"} /> */}
                                    <TextField id="time" type="time" placeholder="time" required name="time" fullWidth value={formData.time} onChange={(event: ChangeEvent<HTMLInputElement>) => { updateData(event, "") }} className='cs-timepicker' />
                                 </Box>
                              </FormControl>
                           </Grid>
                        </Grid>

                     </Grid>
                     <Grid item xs={4}>
                        <FormControl variant="standard" fullWidth>
                           <InputLabel shrink htmlFor="mm"  >
                              Blood Pressure
                           </InputLabel>
                           <Box sx={{ display: "flex" }} className='input-box' >
                              <TextField id="mm" type="number" InputProps={{ inputProps: getRoleId() === 2 ? {} : { min: 0, max: 250 } }} placeholder="mm" name="mm" fullWidth sx={{ borderRadius: "6px 0 0 6px" }} value={formData.bloodPressure.mm} onChange={(event: ChangeEvent<HTMLInputElement>) => { updateData(event, "bloodPressure") }} />
                              <TextField id="hg" type="number" InputProps={{ inputProps: getRoleId() === 2 ? {} : { min: 0, max: 120 } }} placeholder="hg" name="hg" fullWidth sx={{ borderRadius: "0" }} value={formData.bloodPressure.hg} onChange={(event: ChangeEvent<HTMLInputElement>) => { updateData(event, "bloodPressure") }} />
                              <TextField value="(mm/hg)" fullWidth disabled sx={{ borderRadius: "0 6px 6px 0", background: "#eee" }} />
                           </Box>
                        </FormControl>
                     </Grid>
                     <Grid item xs={4}>
                        <FormControl variant="standard" fullWidth>
                           <InputLabel shrink htmlFor="height" >
                              Height
                           </InputLabel>
                           <Box sx={{ display: "flex" }} className='input-box'>
                              <TextField id="height" type="number" placeholder="" name="value" fullWidth sx={{ borderRadius: "6px 0 0 6px", flexBasis: "50%" }} value={formData.height.value} onChange={(event: ChangeEvent<HTMLInputElement>) => { updateData(event, "height") }} />
                              <Select
                                 displayEmpty
                                 inputProps={{ 'aria-label': 'Without label' }}
                                 disableUnderline
                                 style={{ borderRadius: "0 6px 6px 0", flexBasis: "50%", textAlign: "center", marginTop: "0 !important" }}
                                 className='units-select'
                                 name="measureType"
                                 value={formData.height.measureType}
                                 onChange={(event: any) => { updateData(event, "height") }}
                              >
                                 <MenuItem value="m">m</MenuItem>
                                 <MenuItem value="in">in</MenuItem>
                              </Select>
                           </Box>
                        </FormControl>
                     </Grid>
                     <Grid item xs={4}>
                        <FormControl variant="standard" fullWidth>
                           <InputLabel shrink htmlFor="headCirc" >
                              Head Circ
                           </InputLabel>
                           <Box sx={{ display: "flex" }} className='input-box'>
                              <TextField id="headCirc" type="number" name="value" fullWidth sx={{ borderRadius: "6px 0 0 6px", flexBasis: "50%" }}
                                 value={formData.headCirc.value}
                                 onChange={(event: any) => { updateData(event, "headCirc") }}
                              />
                              <Select

                                 displayEmpty
                                 inputProps={{ 'aria-label': 'Without label' }}
                                 disableUnderline
                                 style={{ borderRadius: "0 6px 6px 0", flexBasis: "50%", textAlign: "center" }}
                                 className='units-select'
                                 name="measureType"
                                 value={formData.headCirc.measureType}
                                 onChange={(event: any) => { updateData(event, "headCirc") }}
                              >

                                 <MenuItem value="cm">cm</MenuItem>
                                 <MenuItem value="m">m</MenuItem>
                              </Select>
                           </Box>
                        </FormControl>
                     </Grid>
                     <Grid item xs={4}>
                        <FormControl variant="standard" fullWidth>
                           <InputLabel shrink htmlFor="heartRate" >
                              Heart Rate
                           </InputLabel>
                           <Box sx={{ display: "flex" }} className='input-box'>
                              <TextField id="heartRate" type="number" InputProps={{ inputProps: getRoleId() === 2 ? {} : { min: 60, max: 100 } }} placeholder="Enter Value" name="heartRate" value={formData.heartRate} fullWidth sx={{ borderRadius: "6px 0 0 6px", flexBasis: "50%" }} onChange={(event: ChangeEvent<HTMLInputElement>) => { updateData(event, "") }} />
                              <TextField value="(bmp)" fullWidth disabled sx={{ borderRadius: "0 6px 6px 0", background: "#eee", flexBasis: "50%" }} />
                           </Box>
                        </FormControl>
                     </Grid>
                     <Grid item xs={4}>
                        <FormControl variant="standard" fullWidth>
                           <InputLabel shrink htmlFor="Weight" >
                              Weight
                           </InputLabel>
                           <Box sx={{ display: "flex" }} className='input-box'>
                              <TextField id="Weight" type="number" placeholder="" name="value" fullWidth sx={{ borderRadius: "6px 0 0 6px", flexBasis: "50%" }}
                                 value={formData.weight.value} onChange={(event: ChangeEvent<HTMLInputElement>) => { updateData(event, "weight") }}
                              />
                              <Select

                                 displayEmpty
                                 inputProps={{ 'aria-label': 'Without label' }}
                                 disableUnderline
                                 style={{ borderRadius: "0 6px 6px 0", flexBasis: "50%", textAlign: "center" }}
                                 className='units-select'
                                 name="measureType"
                                 value={formData.weight.measureType}
                                 onChange={(event: any) => { updateData(event, "weight") }}
                              >

                                 <MenuItem value="kg">kg</MenuItem>
                                 <MenuItem value="lbs">lbs</MenuItem>
                              </Select>
                           </Box>
                        </FormControl>
                     </Grid>
                     <Grid item xs={4}>
                        <FormControl variant="standard" fullWidth>
                           <InputLabel shrink htmlFor="tempature" >
                              Temperature
                           </InputLabel>
                           <Box sx={{ display: "flex" }} className='input-box'>
                              <TextField id="tempature" type="number" placeholder="" name="value" fullWidth sx={{ borderRadius: "6px 0 0 6px", flexBasis: "50%" }}
                                 value={formData.tempature.value} onChange={(event: ChangeEvent<HTMLInputElement>) => { updateData(event, "tempature") }}
                              />
                              <Select

                                 displayEmpty
                                 inputProps={{ 'aria-label': 'Without label' }}
                                 disableUnderline
                                 style={{ borderRadius: "0 6px 6px 0", flexBasis: "50%", textAlign: "center" }}
                                 className='units-select'
                                 name="measureType"
                                 value={formData.tempature.measureType}
                                 onChange={(event: any) => { updateData(event, "tempature") }}
                              >

                                 <MenuItem value="C">C</MenuItem>
                                 <MenuItem value="F">F</MenuItem>
                              </Select>
                           </Box>
                        </FormControl>
                     </Grid>
                     <Grid item xs={4}>
                        <FormControl variant="standard" fullWidth>
                           <InputLabel shrink htmlFor="respiratoryRate" >
                              Respiratory Rate
                           </InputLabel>
                           <Box sx={{ display: "flex" }} className='input-box'>
                              <TextField id="respiratoryRate" type="number" InputProps={{ inputProps: getRoleId() === 2 ? {} : { min: 8, max: 20 } }} placeholder="Enter Value" value={formData.respiratoryRate} name="respiratoryRate" fullWidth sx={{ borderRadius: "6px 0 0 6px", flexBasis: "50%" }} onChange={(event: ChangeEvent<HTMLInputElement>) => { updateData(event, "") }} />
                              <TextField value="(rmp)" fullWidth disabled sx={{ borderRadius: "0 6px 6px 0", background: "#eee", flexBasis: "50%" }} />
                           </Box>
                        </FormControl>
                     </Grid>
                     <Grid item xs={4}>
                        <FormControl variant="standard" fullWidth>
                           <InputLabel shrink htmlFor="bmi" >
                              BMI
                           </InputLabel>
                           <Box sx={{ display: "flex" }} className='input-box'>
                              <TextField id="bmi" value={formData.bmi} name="bmi" fullWidth disabled sx={{ borderRadius: "6px", background: "#eee" }} />
                           </Box>
                        </FormControl>
                     </Grid>
                     <Grid item xs={4}>
                        <FormControl variant="standard" fullWidth>
                           <InputLabel shrink htmlFor="spo2" >
                              SPO2
                           </InputLabel>
                           <Box sx={{ display: "flex" }} className='input-box'>
                              <TextField id="spo2" type="number" placeholder="spo2" name="spo2" value={formData.spo2} fullWidth sx={{ borderRadius: "6px 0 0 6px", flexBasis: "50%" }} onChange={(event: ChangeEvent<HTMLInputElement>) => { updateData(event, "") }} />
                              <TextField value="%" fullWidth disabled sx={{ borderRadius: "0 6px 6px 0", background: "#eee", flexBasis: "50%" }} />
                           </Box>
                        </FormControl>
                     </Grid>
                     {/* <Grid item xs={4}>
                        <FormControl variant="standard" fullWidth>
                           <InputLabel shrink htmlFor="fName" >
                              Inhaled O2
                           </InputLabel>
                           <Box sx={{ display: "flex" }} className='input-box'>
                              <TextField id="inhaledO2" type="number" InputProps={{ inputProps: getRoleId() === 2 ? {} : { min: 21, max: 100, } }} placeholder="Enter Value" name="inhaledO2" value={formData.inhaledO2} fullWidth sx={{ borderRadius: "6px 0 0 6px", flexBasis: "50%" }} onChange={(event: ChangeEvent<HTMLInputElement>) => { updateData(event, "") }} />
                              <TextField value="%" fullWidth
                                 disabled sx={{ borderRadius: "0 6px 6px 0", background: "#eee", flexBasis: "50%" }} />
                           </Box>
                        </FormControl>
                     </Grid>
                     <Grid item lg={1} md={2} sm={2}>
                        <FormControl variant="standard" fullWidth>
                           <FormGroup>
                              <FormControlLabel control={
                                 <Checkbox
                                    checked={String(formData.Unspecified) === "true" ? true : false}
                                    value={String(formData.Unspecified) === "true" ? false : true}
                                    name="Unspecified" onChange={(event: ChangeEvent<HTMLInputElement>) => { updateData(event, "") }} />} labelPlacement="bottom"
                                 label={
                                    <Typography variant="body2" style={{ fontSize: "12px" }}>
                                       Unspecified
                                    </Typography>
                                 }
                              />
                           </FormGroup>
                        </FormControl>
                     </Grid> */}
                     <Grid item xs={4}>
                        <FormControl variant="standard" fullWidth>
                           <InputLabel shrink htmlFor="fName">
                              Inhaled O2
                           </InputLabel>
                           <Box sx={{ display: "flex" }} className="input-box">
                              <TextField
                                 id="inhaledO2"
                                 type="number"
                                 InputProps={{
                                    inputProps: getRoleId() === 2 ? {} : { min: 21, max: 100 },
                                    disabled: formData.Unspecified ? true : false,
                                 }}
                                 placeholder="Enter Value"
                                 name="inhaledO2"
                                 value={
                                    unspecifiedChecked ? formData.inhaledO2 = "" : formData.inhaledO2 // Set value to empty when Unspecified is checked
                                 }
                                 fullWidth
                                 sx={{
                                    borderRadius: "6px 0 0 6px",
                                    flexBasis: "50%",
                                 }}
                                 onChange={handleInhaledO2Change} // Use the new handler for "Inhaled O2" change
                              />
                              <TextField
                                 value="%"
                                 fullWidth
                                 disabled // Always disabled for the "%" TextField
                                 sx={{ borderRadius: "0 6px 6px 0", background: "#eee", flexBasis: "50%" }}
                              />
                           </Box>
                        </FormControl>
                     </Grid>
                     <Grid item lg={1} md={2} sm={2}>
                        <FormControl variant="standard" fullWidth>
                           <FormGroup>
                              <FormControlLabel
                                 control={
                                    <Checkbox
                                       // value={formData.Unspecified === true}
                                       value={formData.Unspecified}
                                       checked={formData.Unspecified}
                                       onChange={handleUnspecifiedToggle} // Use the handler for "Unspecified" toggle
                                    />
                                 }
                                 labelPlacement="bottom"
                                 label={
                                    <Typography variant="body2" style={{ fontSize: "12px" }}>
                                       Unspecified
                                    </Typography>
                                 }
                              />
                           </FormGroup>
                        </FormControl>
                     </Grid>
                     <Grid item xs={3} alignSelf={'center'}>
                        {/* <FormControl variant="standard" fullWidth>
                           <FormGroup>
                              <FormControlLabel control={<Checkbox
                                 name="roomAir"
                                 checked={String(formData.roomAir) === "true" ? true : false}
                                 value={String(formData.roomAir) === "true" ? false : true}
                                 onChange={(event: ChangeEvent<HTMLInputElement>) => { updateData(event, "") }}
                              />} label="Room Air" />
                           </FormGroup>
                        </FormControl> */}
                     </Grid>
                     <Grid item xs={4}>
                        <FormControl variant="standard" fullWidth>
                           <InputLabel shrink htmlFor="headCirc" required={getRoleId() === 2 ? false : true}>
                              Oxygen supply
                           </InputLabel>
                           <Select
                              displayEmpty
                              inputProps={{ 'aria-label': 'Without label' }}
                              disableUnderline
                              required={getRoleId() === 2 ? false : true}
                              style={{ borderRadius: "0 6px 6px 0", flexBasis: "50%", textAlign: "center" }}
                              className='units-select'
                              name="oxygenSupply"
                              value={formData.oxygenSupply}
                              onChange={(event: any) => { updateData(event, "") }}
                           >
                              {
                                 getOxygensupplyMasterData?.data?.data?.map((item: any, index: number) => (
                                    <MenuItem value={item?.name}>{item?.name}</MenuItem>
                                 ))
                              }


                           </Select>
                        </FormControl>
                     </Grid>
                     <Grid item xs={12}>
                        <FormControl variant="standard" fullWidth>
                           <InputLabel shrink htmlFor="comment">
                              comment
                           </InputLabel>
                           <TextField
                              id="comment"
                              name="comment"
                              fullWidth
                              multiline
                              minRows="5"
                              value={formData?.comment}
                              onChange={(event: ChangeEvent<HTMLInputElement>) => { updateData(event, "") }}
                           />
                        </FormControl>
                     </Grid>
                  </Grid>
               </Box>
               {!checkAssignment &&
                  <Box mt="50px" textAlign="right">
                     {!patientId ? (
                        <Button variant="outlined" color="secondary" sx={{ mr: "20px" }} onClick={() => {
                           setShowListData(!showListData);
                        }}>
                           Cancel
                        </Button>
                     ) : <Button variant="outlined" color="secondary" sx={{ mr: "20px" }} onClick={() => {
                        handleResetForm();
                     }}>
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
         </Paper >
         <DialogBox buttonIcon={showAlert.title === "There is some error please try again later" || showAlert.title === "Please fill required fields" ? "error" : ""} openDialog={showAlert.show} handleSubmit={() => { setShowAlert({ show: false, title: "" }); patientId ? navigate('/myAssignment') : setShowListData(!showListData) }} title={showAlert.title} buttonText="Ok" />
      </>
   );
}
import { Input, FormControl, Typography, InputLabel, Grid, FormControlLabel, Radio, Box, RadioGroup, Button, Paper, FormLabel, Select, MenuItem, Stack, IconButton } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAllergyDataRequestAction, getAllergyReactionRequest, getAllergyServertiesRequest, updateAllergyRequest } from "../../../../../redux/modules/patients/allergies/action";
import CloseIcon from "@mui/icons-material/Close";
import { PatientContext, ShowTableDataContext } from "../../../../../utils/showHideTabData";
import DialogBox from "../../../../../components/DialogBox";
import DatePickerComponent from "../../../../../components/DatePicker";
import dayjs from "dayjs";
import { fetchPatientInformationRequest } from "../../../../../redux/modules/patients/patientInformation/action";
import { useNavigate } from "react-router";
import { updateMyAssignmentStatusRequest } from "../../../../../redux/modules/studentView/myAssignments/action";
import { getRoleId } from "../../../../../utils/commonUtil";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddMasterData from "../../../../../components/AddMasterData";
import { postCustomMedicationRouteRequest, getFormDataRequest } from "../../../../../redux/modules/patients/medication/action";
import ModalPopup from "../../../../../components/Modal";


export interface AllergiesFormData {
   status: boolean;
   allergy: string;
   dateOnset: string;
   reaction: string;
   severities: string;
   comment: string;
}

type props = {
   editData?: any
   patientId?: any
   assessmentId?: any
   submittedTime?: any
   checkAssignment?: boolean
   assignmentId?: any
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

export default function AllergiesFrom({ editData, patientId, assessmentId, submittedTime, assignmentId, checkAssignment = false }: props) {
   let navigate = useNavigate();
   let dispatch = useDispatch();
   let [formData, setFormData] = useState({
      pId: "",
      status: true,
      allergy: "",
      dateOnset: `${dayjs()}`,
      reaction: "",
      severities: "",
      comment: "",
      formStatus: "",
      submittedTime: submittedTime ? submittedTime : "",
      onlyView: false,
      assignmentId: assignmentId ? assignmentId : "",
   });
   const [show, setshow] = useState<boolean>(false);
   const [masterDataFormData, setmasterDataFormData] = useState({
      header: "",
      name: "",
      description: ""
   })
   //updating submittedTime when changes its value
   useEffect(() => {
      setFormData(prevState => ({ ...prevState, submittedTime }));
   }, [submittedTime]);

   const updateData = (e: any) => {
      if (!formData.onlyView) {
         setFormData((prevalue) => {
            return {
               ...prevalue,
               [e?.target.name]: e?.target.value,
            };
         });
      }
   };

   const handleSubmit = (e: any) => {
      e.preventDefault();
      if (!formData.onlyView) {
         if (editData?._id) {
            dispatch(updateAllergyRequest(formData));
         } else {
            dispatch(postAllergyDataRequestAction(formData));
         }
      }
      delete postCustomMedicationRoute?.data
   };

   const handleResetForm = () => {
      setFormData({
         pId: patientId,
         status: true,
         allergy: "",
         dateOnset: "",
         reaction: "",
         severities: "",
         comment: "",
         formStatus: "",
         submittedTime: submittedTime ? submittedTime : "",
         onlyView: false,
         assignmentId: assignmentId ? assignmentId : "",
      });
   }
   const { showListData, setShowListData } = useContext(ShowTableDataContext) ?? {};

   let { ReactionList, SevertiesList, postAllergy, updateAllergy, postCustomMedicationRoute } = useSelector((state: any) => {
      let { getAllergyReaction: { data: ReactionList }, getAllergySeverties: { data: SevertiesList }, postAllergy, updateAllergy, postCustomMedicationRoute } = state;
      return { ReactionList, SevertiesList, postAllergy, updateAllergy, postCustomMedicationRoute };
   });

   useEffect(() => {
      dispatch(getAllergyReactionRequest());
      dispatch(getAllergyServertiesRequest());
   }, [dispatch]);

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
                  severities: editData.severitiesObjectId,
                  reaction: editData.reactionObjectId
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

   let [showAlert, setShowAlert] = useState({
      show: false,
      title: ""
   });
   useEffect(() => {
      if (postAllergy.data?.success) {
         setShowAlert({ show: true, title: postAllergy.data?.message })
         postAllergy.data = postAllergy.initialState.data;
         if (assessmentId) {
            let status = 2
            dispatch(updateMyAssignmentStatusRequest({ status, assessmentId, submittedTime }))
         }
         dispatch(fetchPatientInformationRequest(DemographicRes?.pId));
      }
      if (updateAllergy.data?.success) {
         setShowAlert({ show: true, title: updateAllergy.data?.message })
         updateAllergy.data = updateAllergy.initialState.data;
         dispatch(fetchPatientInformationRequest(DemographicRes?.pId));
      }

   }, [dispatch, postAllergy.data?.success, updateAllergy.data?.success, showListData, setShowListData, DemographicRes]);

   useEffect(() => {
      dispatch(getAllergyReactionRequest())
      dispatch(getAllergyServertiesRequest())
      if (postCustomMedicationRoute?.data?.success) {
         setshow(false);
         setFormData((prev: any) => ({ ...prev, [masterDataFormData['name']]: postCustomMedicationRoute?.data?.data?._id }))

         postCustomMedicationRoute.data.success = postCustomMedicationRoute.initialState.data;
      }
   }, [dispatch, postCustomMedicationRoute?.data?.success]);

   const handleSubmitMaterData = (data: string) => {
      let payload = {
         name: data,
         type: masterDataFormData?.name,
         description: masterDataFormData?.description
      }
      dispatch(postCustomMedicationRouteRequest(payload))
   }

   console.log(formData, 'formData')

   return (
      <>
         <Paper>
            {!checkAssignment &&
               <Stack p={2} direction="row" justifyContent="space-between" alignItems="center" spacing={2} bgcolor="primary.light" sx={{ padding: "6px 20px" }}>
                  <Typography>Add Allergies</Typography>
                  {patientId ? (
                     ""
                  ) :
                     <Button
                        onClick={(e) => {
                           e.preventDefault();
                           setShowListData(!showListData); delete postCustomMedicationRoute?.data
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
               onSubmit={(e) => { handleSubmit(e); }}>
               <Box>
                  <Grid container spacing={2}>
                     <Grid item xs={12}>
                        <FormControl variant="standard" fullWidth>
                           <FormLabel htmlFor="status" >
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
                              <FormControlLabel value={"true"} control={<Radio />} label="Active" />
                              <FormControlLabel value={"false"} control={<Radio />} label="Inactive" />
                              <FormControlLabel value={"Unspecified"} control={<Radio />} label="Unspecified" />
                           </RadioGroup>
                        </FormControl>
                     </Grid>
                     <Grid item xs={6}>
                        <FormControl variant="standard" fullWidth>
                           <InputLabel shrink htmlFor="allergy" >
                              Allergy
                           </InputLabel>
                           <Input
                              id="allergy"

                              name="allergy"
                              fullWidth
                              disableUnderline
                              onChange={(e) => {
                                 updateData(e);
                              }}
                              value={formData?.allergy}
                           />
                        </FormControl>
                     </Grid>
                     <Grid item xs={6}>
                        <FormControl variant="standard" fullWidth>
                           <InputLabel shrink htmlFor="dateOnset" sx={{ position: "relative" }}>
                              Date of Onset
                           </InputLabel>
                           <DatePickerComponent name="dob" value={formData?.dateOnset !== "" ? dayjs(formData?.dateOnset) : null} onChange={(value: string) => setFormData((prev: any) => ({ ...prev, dateOnset: value }))} />

                        </FormControl>
                     </Grid>
                     <Grid item xs={6}>
                        <FormControl variant="standard" fullWidth>
                           <InputLabel shrink htmlFor="reaction" >
                              Reaction(s)
                           </InputLabel>
                           <Select
                              id="reaction"
                              placeholder="Enter Reaction"
                              name="reaction"

                              fullWidth
                              defaultValue=""
                              disableUnderline
                              MenuProps={MenuProps}
                              onChange={(e) => {
                                 updateData(e);
                              }}
                              value={formData?.reaction}
                           >
                              {ReactionList?.data &&
                                 ReactionList?.data.map((item: any) => {
                                    return (
                                       <MenuItem value={item._id} key={item.reaction}>
                                          <Typography variant="body2">{item.reaction}</Typography>
                                       </MenuItem>
                                    );
                                 })}
                              {
                                 (getRoleId() === 1 || getRoleId() === 3) &&
                                 <MenuItem sx={{ padding: 0 }}>
                                    <Button onClick={() => { setmasterDataFormData((prev: any) => ({ ...prev, name: "reaction", header: "Add Reaction" })); setshow(true) }} variant="contained" color="secondary" sx={{
                                       borderRadius: "0 !important", width: "100%",
                                       mr: 0
                                    }}>
                                       <AddCircleIcon sx={{ color: "#fff" }} />
                                       <IconButton sx={{ paddingLeft: "0px", fontSize: "19px" }} />Add Reaction
                                    </Button>
                                 </MenuItem>
                              }
                           </Select>
                        </FormControl>
                     </Grid>
                     <Grid item xs={6}>
                        <FormControl variant="standard" fullWidth>
                           <InputLabel shrink htmlFor="severities" >
                              Allergy Severities
                           </InputLabel>
                           <Select
                              placeholder="severities"
                              name="severities"

                              fullWidth
                              MenuProps={MenuProps}
                              disableUnderline
                              defaultValue=""
                              onChange={(e) => {
                                 updateData(e);
                              }}
                              value={formData?.severities}
                           >
                              {SevertiesList?.data &&
                                 SevertiesList?.data.map((item: any) => {
                                    return (
                                       <MenuItem value={item._id} key={item.severities}>
                                          <Typography variant="body2">{item.severities}</Typography>
                                       </MenuItem>
                                    );
                                 })}
                              {
                                 (getRoleId() === 1 || getRoleId() === 3) &&
                                 <MenuItem sx={{ padding: 0 }}>
                                    <Button onClick={() => { setmasterDataFormData((prev: any) => ({ ...prev, name: "severities", header: "Add Severity" })); setshow(true) }} variant="contained" color="secondary" sx={{
                                       borderRadius: "0 !important", width: "100%",
                                       mr: 0
                                    }}>
                                       <AddCircleIcon sx={{ color: "#fff" }} />
                                       <IconButton sx={{ paddingLeft: "0px", fontSize: "19px" }} />Add Severity
                                    </Button>
                                 </MenuItem>
                              }
                           </Select>
                        </FormControl>
                     </Grid>
                     <Grid item xs={12}>
                        <FormControl variant="standard" fullWidth>
                           <InputLabel shrink htmlFor="comment">
                              comment
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
                           <Button variant="outlined" color="secondary" sx={{ mr: "20px" }} onClick={() => { setShowListData(!showListData); }}>
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
         </Paper>
         <DialogBox buttonIcon={showAlert.title === "There is some error please try again later" || showAlert.title === "Please fill  fields" ? "error" : ""} openDialog={showAlert.show} handleSubmit={() => { setShowAlert({ show: false, title: "" }); patientId ? navigate('/myAssignment') : setShowListData(!showListData) }} title={showAlert.title} buttonText="Ok" />

         <ModalPopup show={show} setshow={setshow} childern={<AddMasterData setshow={setshow} handleSubmit={handleSubmitMaterData} masterDataFormData={masterDataFormData} setmasterDataFormData={setmasterDataFormData} />} type="assignment" view={undefined} />
      </>
   )
}

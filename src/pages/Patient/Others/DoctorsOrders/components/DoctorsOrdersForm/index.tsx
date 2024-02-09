import { Input, FormControl, Typography, InputLabel, Grid, Box, Button, Paper, Stack } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postDoctorsOrdersRequestAction, updateDoctorsOrdersRequest } from "../../../../../../redux/modules/patients/doctorsOrders/action";
import CloseIcon from "@mui/icons-material/Close";
import { PatientContext, ShowTableDataContext } from "../../../../../../utils/showHideTabData";
import DialogBox from "../../../../../../components/DialogBox";
import { fetchPatientInformationRequest } from "../../../../../../redux/modules/patients/patientInformation/action";
import { useNavigate } from "react-router";
import { updateMyAssignmentStatusRequest } from "../../../../../../redux/modules/studentView/myAssignments/action";
import { getRoleId } from "../../../../../../utils/commonUtil";
export interface DoctorsOrdersFormData {
   doctorOrders: String;
}

type props = {
   editData?: any
   patientId?: any
   assessmentId?: any
   submittedTime?: any
   checkAssignment?: boolean
   assignmentId?: any
}


export default function DoctorsOrdersForm({ editData, patientId, assessmentId, submittedTime, assignmentId, checkAssignment = false }: props) {
   let navigate = useNavigate();
   let dispatch = useDispatch();
   let [formData, setFormData] = useState({
      pId: "",
      doctorOrders: "",
      submittedTime: submittedTime ? submittedTime : "",
      onlyView: false,
      assignmentId: assignmentId ? assignmentId : "",
   });

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
            dispatch(updateDoctorsOrdersRequest(formData));
         } else {
            dispatch(postDoctorsOrdersRequestAction(formData));
         }
      }
   };

   const handleResetForm = () => {
      setFormData({
         pId: patientId,
         doctorOrders: "",
         submittedTime: submittedTime ? submittedTime : "",
         onlyView: false,
         assignmentId: assignmentId ? assignmentId : "",
      });
   }
   const { showListData, setShowListData } = useContext(ShowTableDataContext) ?? {};

   let { getDoctorsOrders, postDoctorsOrders, updateDoctorsOrders } = useSelector((state: any) => {
      let { getDoctorsOrders, postDoctorsOrders, updateDoctorsOrders } = state;
      return { getDoctorsOrders, postDoctorsOrders, updateDoctorsOrders };
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
      if (postDoctorsOrders.data?.success) {
         setShowAlert({ show: true, title: postDoctorsOrders.data?.message })
         postDoctorsOrders.data = postDoctorsOrders.initialState.data;
         if (assessmentId) {
            let status = 2
            dispatch(updateMyAssignmentStatusRequest({ status, assessmentId, submittedTime }))
         }
         dispatch(fetchPatientInformationRequest(DemographicRes?.pId));
      }
      if (updateDoctorsOrders.data?.success) {
         setShowAlert({ show: true, title: updateDoctorsOrders.data?.message })
         updateDoctorsOrders.data = updateDoctorsOrders.initialState.data;
         dispatch(fetchPatientInformationRequest(DemographicRes?.pId));
      }

   }, [dispatch, postDoctorsOrders.data?.success, updateDoctorsOrders.data?.success, showListData, setShowListData, DemographicRes]);


   return (
      <>
         <Paper>
            {!checkAssignment &&
               <Stack p={2} direction="row" justifyContent="space-between" alignItems="center" spacing={2} bgcolor="primary.light" sx={{ padding: "6px 20px" }}>
                  <Typography>Add Doctors Orders</Typography>
                  {patientId ? (
                     ""
                  ) :
                     <Button
                        onClick={(e) => {
                           e.preventDefault();
                           setShowListData(!showListData)
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
                           <InputLabel shrink htmlFor="doctorOrders">
                              Doctors Orders
                           </InputLabel>
                           <Input
                              sx={{ padding: "14px" }}
                              id="doctorOrders"
                              name="doctorOrders"
                              fullWidth
                              disableUnderline
                              multiline
                              minRows="10"
                              onChange={(e) => {
                                 updateData(e);
                              }}
                              value={formData?.doctorOrders}
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
         <DialogBox buttonIcon={showAlert.title === "There is some error please try again later" || showAlert.title === "Please fill required fields" ? "error" : ""} openDialog={showAlert.show} handleSubmit={() => { setShowAlert({ show: false, title: "" }); patientId ? navigate('/myAssignment') : setShowListData(!showListData) }} title={showAlert.title} buttonText="Ok" />
      </>
   )
}

import { Input, FormControl, Typography, InputLabel, Grid, Box, Button, Paper, Select, MenuItem, Stack, FormGroup, FormControlLabel, IconButton } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { PatientContext, ShowTableDataContext } from "../../../../../utils/showHideTabData";
import Checkbox from '@mui/material/Checkbox';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useDispatch } from "react-redux";
import { fetchFamilyDataRequest, fetchfamilyHistoryTypeDataRequest, postFamilyDataRequestAction, updateFamilyRequest } from "../../../../../redux/modules/patients/familyHistory/action";
import { useSelector } from "react-redux";
import DialogBox from "../../../../../components/DialogBox";
import DatePickerComponent from "../../../../../components/DatePicker";
import dayjs from "dayjs";
import { useNavigate } from "react-router";
import { updateMyAssignmentStatusRequest } from "../../../../../redux/modules/studentView/myAssignments/action";
import { getRole, getRoleId } from "../../../../../utils/commonUtil";
import AddMasterData from "../../../../../components/AddMasterData";
import { postCustomMedicationRouteRequest, getFormDataRequest } from "../../../../../redux/modules/patients/medication/action";
import ModalPopup from "../../../../../components/Modal";
import AddCircleIcon from '@mui/icons-material/AddCircle';

export interface familyFormData {
   pId: string,
   fName: string,
   lName: string,
   gender: string,
   dob: string,
   relation: string,
   isAlive: string,
   dod: string,
   causeDeath: string,
   observation: string,
   diseaseList: GridItem[]
}

interface GridItem {
   disease: string;
   diseaseStatus: string;
   ageOfDiagnosis: string;

}
type props = {
   editData?: any
   patientId?: any
   assessmentId?: any
   submittedTime?: any
   checkAssignment?: boolean
   assignmentId?: any

}


export default function FamilyHistoryFrom({ editData, patientId, assessmentId, submittedTime, assignmentId, checkAssignment = false }: props) {
   const dispatch = useDispatch();
   let { getFamilyHistoryType } = useSelector((state: any) => {
      let { getFamilyHistoryType } = state;
      return {
         getFamilyHistoryType
      }

   })
   let navigate = useNavigate();
   let [formData, setFormData] = useState({
      pId: "",
      nameTitle: "Mr.",
      fName: "",
      lName: "",
      gender: "",
      dob: `${dayjs()}`,
      relation: "",
      isAlive: "true",
      dod: "",
      causeDeath: "",
      observation: "",
      diseaseList: [{ disease: "", diseaseStatus: "", ageOfDiagnosis: "" }],
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
      dispatch(fetchfamilyHistoryTypeDataRequest())
   }, [dispatch])
   useEffect(() => {
      setFormData(prevState => ({ ...prevState, submittedTime }));
   }, [submittedTime]);

   const updateData = (e: any) => {
      if (!formData.onlyView) {
         setFormData((prevalue) => {
            if (e?.target.name === "isAlive" && e?.target.value) {
               prevalue.dod = ""
               prevalue.causeDeath = ""
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
         nameTitle: "Mr.",
         fName: "",
         lName: "",
         gender: "",
         dob: "",
         relation: "",
         isAlive: "true",
         dod: "",
         causeDeath: "",
         observation: "",
         diseaseList: [{ disease: "", diseaseStatus: "", ageOfDiagnosis: "" }],
         submittedTime: submittedTime ? submittedTime : "",
         onlyView: false,
         assignmentId: assignmentId ? assignmentId : "",
      });
   }

   const { showListData, setShowListData } = useContext(ShowTableDataContext) ?? {};

   const handleAddGridItem = () => {
      setFormData((prevalue: any) => {
         return {
            ...prevalue,
            diseaseList: [...prevalue.diseaseList, { disease: "", diseaseStatus: "", ageOfDiagnosis: "" }]
         };
      })
   };

   const handleDeleteGridItem = (index: number) => {
      formData.diseaseList.splice(index, 1);
      setFormData((prevalue: any) => {
         return {
            ...prevalue,
            diseaseList: formData.diseaseList
         };
      })
   };
   const handleGridItemChange = (index: number, key: keyof GridItem, value: string) => {
      const updatedGridItems = formData.diseaseList;
      updatedGridItems[index][key] = value;
      setFormData((prevalue: any) => {
         return {
            ...prevalue,
            diseaseList: updatedGridItems
         };
      })
   };
   let { postFamilyHistory, updateFamilyHistory, postCustomMedicationRoute } = useSelector((state: any) => {
      let { postFamilyHistory, updateFamilyHistory, postCustomMedicationRoute } = state;
      return { postFamilyHistory, updateFamilyHistory, postCustomMedicationRoute };
   });

   const handleSubmit = (e: any) => {
      e.preventDefault();
      if (!formData.onlyView) {
         if (editData?._id) {
            dispatch(updateFamilyRequest(formData));
         } else {
            dispatch(postFamilyDataRequestAction(formData));
         }
      }
   };

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
                  relation: editData.relationObjectId
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
      if (postFamilyHistory.data?.success) {
         setShowAlert({ show: true, title: postFamilyHistory.data?.message })
         postFamilyHistory.data = postFamilyHistory.initialState.data;
         if (assessmentId) {
            let status = 2
            dispatch(updateMyAssignmentStatusRequest({ status, assessmentId, submittedTime }))
         }
      }
      if (updateFamilyHistory.data?.success) {
         setShowAlert({ show: true, title: updateFamilyHistory.data?.message })
         updateFamilyHistory.data = updateFamilyHistory.initialState.data;
      }
   }, [postFamilyHistory.data?.success, updateFamilyHistory.data?.success, showListData, setShowListData]);

   useEffect(() => {
      dispatch(fetchFamilyDataRequest(DemographicRes?.pId));
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
   console.log(formData, "formdaat")


   return (
      <>
         <Paper>
            {!checkAssignment &&
               <Stack p={2} direction="row" justifyContent="space-between" alignItems="center" spacing={2} bgcolor="primary.light" sx={{ padding: "6px 20px" }}>
                  <Typography>Add New Family</Typography>
                  {patientId ? (
                     ""
                  ) :
                     <Button
                        onClick={() => { setShowListData(!showListData); }}>
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
                  <Grid container spacing={2}>
                     <Grid item lg={3} md={6} sm={12}>
                        <Box position={"relative"}>

                           <FormControl variant="standard" fullWidth>
                              <InputLabel shrink htmlFor="fName" required>
                                 First Name
                              </InputLabel>
                              <Input
                                 id="fName"
                                 placeholder="First Name"
                                 required
                                 name="fName"
                                 fullWidth
                                 disableUnderline
                                 onChange={(e) => {
                                    updateData(e);
                                 }}
                                 value={formData?.fName}
                                 sx={{ paddingLeft: "80px" }}
                              />

                           </FormControl>
                           <Select
                              name="nameTitle"
                              onChange={(e) => {
                                 updateData(e);
                              }}
                              value={formData?.nameTitle}
                              displayEmpty
                              inputProps={{ 'aria-label': 'Without label' }}
                              style={{ marginTop: "0 !important", position: "absolute", bottom: "2px", left: "2px", background: "#fff", width: "90px" }}
                           >
                              <MenuItem value="Mr.">Mr.</MenuItem>
                              <MenuItem value="Mrs.">Mrs.</MenuItem>
                              <MenuItem value="Miss.">Miss.</MenuItem>
                              <MenuItem value="Young.">Young.</MenuItem>
                           </Select>
                        </Box>
                     </Grid>
                     <Grid item lg={3} md={6} sm={12}>
                        <FormControl variant="standard" fullWidth>
                           <InputLabel shrink htmlFor="lName" required>
                              Last Name
                           </InputLabel>
                           <Input
                              id="lName"
                              placeholder="Last Name"
                              name="lName"
                              fullWidth
                              required
                              disableUnderline
                              onChange={(e) => {
                                 updateData(e);
                              }}
                              value={formData?.lName}
                           />
                        </FormControl>
                     </Grid>

                     <Grid item lg={3} md={6} sm={12}>
                        <FormControl variant="standard" fullWidth>
                           <InputLabel shrink htmlFor="gender" required>
                              Gender
                           </InputLabel>
                           <Select placeholder="gender" name="gender" defaultValue="" required fullWidth disableUnderline
                              onChange={(e) => {
                                 updateData(e);
                              }}
                              value={formData?.gender}>
                              <MenuItem value="Male">
                                 <Typography variant="body2">Male</Typography>
                              </MenuItem>
                              <MenuItem value="Female">
                                 <Typography variant="body2">Female</Typography>
                              </MenuItem>
                              <MenuItem value="Other">
                                 <Typography variant="body2">Other</Typography>
                              </MenuItem>
                           </Select>
                        </FormControl>
                     </Grid>
                     <Grid item lg={3} md={6} sm={12}>
                        <FormControl variant="standard" fullWidth>
                           <InputLabel shrink htmlFor="dob" required sx={{ position: "relative" }}>
                              D.O.B
                           </InputLabel>
                           {/* <Input id="dob" name="dob" placeholder="D.O.B" required type="date" fullWidth disableUnderline
                              onChange={(e) => {
                                 updateData(e);
                              }}
                              value={formData?.dob}
                           /> */}
                           <DatePickerComponent name="dob" maxDate={dayjs()} value={formData?.dob !== "" ? dayjs(formData?.dob) : null} onChange={(value: string) => setFormData((prev: any) => ({ ...prev, dob: value }))} />

                        </FormControl>
                     </Grid>
                     <Grid item lg={5} md={12} sm={12}>
                        <FormControl variant="standard" fullWidth>
                           <InputLabel shrink htmlFor="relation">
                              Relationship
                           </InputLabel>
                           <Select placeholder="relationship" defaultValue="" id="relation" name="relation" fullWidth disableUnderline
                              MenuProps={MenuProps}
                              onChange={(e) => {
                                 updateData(e);
                              }}
                              value={formData?.relation}>

                              {
                                 getFamilyHistoryType?.data?.data?.map((item: any, i: number) => (
                                    <MenuItem value={item?._id} key={i}>
                                       <Typography variant="body2">{item?.name}</Typography>
                                    </MenuItem>
                                 ))
                              }
                              {
                                 (getRoleId() === 1 || getRoleId() === 3) &&
                                 <MenuItem sx={{ padding: 0 }}>
                                    <Button onClick={() => { setmasterDataFormData((prev: any) => ({ ...prev, name: "relation", header: "Add Relation" })); setshow(true) }} variant="contained" color="secondary" sx={{
                                       borderRadius: "0 !important", width: "100%",
                                       mr: 0
                                    }}>
                                       <AddCircleIcon sx={{ color: "#fff" }} />
                                       <IconButton sx={{ paddingLeft: "0px", fontSize: "19px" }} />Add Relation
                                    </Button>
                                 </MenuItem>
                              }
                           </Select>
                        </FormControl>
                     </Grid>
                     <Grid item lg={1} md={2} sm={2}>
                        <FormControl variant="standard" fullWidth>
                           <FormGroup>
                              <FormControlLabel control={
                                 <Checkbox
                                    checked={String(formData.isAlive) === "true" ? true : false}
                                    value={String(formData.isAlive) === "true" ? false : true}
                                    name="isAlive" onChange={(e) => { updateData(e); }} />} labelPlacement="bottom"
                                 label={
                                    <Typography variant="body2" style={{ fontSize: "12px" }}>
                                       Is Alive
                                    </Typography>
                                 }
                              />
                           </FormGroup>
                        </FormControl>
                     </Grid>
                     <Grid item lg={3} md={4} sm={5}>
                        <FormControl variant="standard" fullWidth>
                           <InputLabel shrink htmlFor="dod"  >
                              Date of Death
                           </InputLabel>
                           {/* <Input id="dod" name="dod" placeholder="D.O.D" type="date" fullWidth
                              disableUnderline
                              disabled={String(formData.isAlive) === "true" ? true : false}
                              onChange={(e) => {
                                 updateData(e);
                              }}
                              value={formData?.dod}
                           /> */}
                        </FormControl>
                        <Box mt={2}>
                           <DatePickerComponent disabled={String(formData.isAlive) === "true" ? true : false} name="dod" maxDate={dayjs()} value={formData?.dod !== "" ? dayjs(formData?.dod) : null} onChange={(value: string) => setFormData((prev: any) => ({ ...prev, dod: value }))} />
                        </Box>
                     </Grid>
                     <Grid item lg={3} md={4} sm={5}>
                        <FormControl variant="standard" fullWidth>
                           <InputLabel shrink htmlFor="causeDeath">
                              Cause of Death
                           </InputLabel>
                           <Input
                              id="causeDeath"
                              placeholder=" Cause of Death"
                              name="causeDeath"
                              fullWidth
                              disableUnderline
                              disabled={String(formData.isAlive) === "true" ? true : false}
                              onChange={(e) => {
                                 updateData(e);
                              }}
                              value={formData?.causeDeath}
                           />
                        </FormControl>
                     </Grid>
                     <Grid item xs={12}>
                        <FormControl variant="standard" fullWidth sx={{ mt: 2 }}>
                           <InputLabel shrink htmlFor="observation">
                              Observation
                           </InputLabel>
                           <Input sx={{ padding: "14px" }} id="observation" name="observation" fullWidth disableUnderline multiline minRows="5"
                              onChange={(e) => {
                                 updateData(e);
                              }}
                              value={formData?.observation}
                           />
                        </FormControl>
                     </Grid>
                     {formData.diseaseList.map((gridItem, index) => (
                        <Grid container spacing={2} key={index} item xs={12} alignItems="center">
                           <Grid item xs={3}>
                              <FormControl variant="standard" fullWidth>
                                 <InputLabel shrink htmlFor={`disease-${index}`} >
                                    Disease
                                 </InputLabel>
                                 <Input
                                    id="ageOfDiagnosis"
                                    placeholder="disease"
                                    name={`disease-${index}`}
                                    // required
                                    fullWidth
                                    disableUnderline
                                    value={gridItem.disease}
                                    onChange={(e) => handleGridItemChange(index, "disease", e.target.value)}
                                 />
                              </FormControl>
                           </Grid>
                           <Grid item xs={4}>
                              <FormControl variant="standard" fullWidth>
                                 <InputLabel shrink htmlFor={`diseaseStatus-${index}`} >
                                    Disease Status
                                 </InputLabel>
                                 <Select
                                    placeholder="Disease Status"
                                    name={`diseaseStatus-${index}`}
                                    // required
                                    fullWidth
                                    disableUnderline
                                    value={gridItem.diseaseStatus}
                                    onChange={(e) => handleGridItemChange(index, "diseaseStatus", e.target.value)}
                                 >
                                    <MenuItem value="true">
                                       <Typography variant="body2">Active</Typography>
                                    </MenuItem>
                                    <MenuItem value="false">
                                       <Typography variant="body2">inactive</Typography>
                                    </MenuItem>
                                 </Select>
                              </FormControl>
                           </Grid>
                           <Grid item xs={4}>
                              <FormControl variant="standard" fullWidth>
                                 <InputLabel shrink htmlFor={`ageOfDiagnosis-${index}`} >
                                    Age at Diagnosis
                                 </InputLabel>
                                 <Input
                                    id="ageOfDiagnosis"
                                    placeholder="Age at Diagnosis"
                                    name={`ageOfDiagnosis-${index}`}
                                    // required
                                    fullWidth
                                    disableUnderline
                                    value={gridItem.ageOfDiagnosis}
                                    onChange={(e) => handleGridItemChange(index, "ageOfDiagnosis", e.target.value)}
                                 />
                              </FormControl>
                           </Grid>
                           <Grid item xs={1} sx={{ display: "flex", justifyContent: "end" }}>
                              <IconButton sx={{
                                 color: "#017BAC", background: "#C53E4E",
                                 borderRadius: "6px"
                              }} onClick={() => { handleDeleteGridItem(index) }}>
                                 <DeleteOutlineOutlinedIcon />
                              </IconButton>
                           </Grid>
                        </Grid>
                     ))}

                     <Grid item xs={12} sx={{ display: "flex", justifyContent: "end" }}>
                        <IconButton sx={{
                           color: "#017BAC", background: "rgba(1, 123, 172, 0.5)",
                           borderRadius: "6px"
                        }} onClick={handleAddGridItem}>
                           <AddBoxOutlinedIcon />
                        </IconButton>

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
         </Paper>
         <DialogBox buttonIcon={showAlert.title === "There is some error please try again later" || showAlert.title === "Please fill required fields" ? "error" : ""} openDialog={showAlert.show} handleSubmit={() => { setShowAlert({ show: false, title: "" }); patientId ? navigate('/myAssignment') : setShowListData(!showListData) }} title={showAlert.title} buttonText="Ok" />
         <ModalPopup show={show} setshow={setshow} childern={<AddMasterData setshow={setshow} handleSubmit={handleSubmitMaterData} masterDataFormData={masterDataFormData} setmasterDataFormData={setmasterDataFormData} />} type="assignment" view={undefined} />
      </>
   );
}
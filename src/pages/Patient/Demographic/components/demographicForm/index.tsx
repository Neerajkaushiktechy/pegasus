import { Input, FormControl, InputLabel, Grid, Select, MenuItem, Box, Typography, Button } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import InputMask from 'react-input-mask';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from "react-redux";
import { fetchRefferNameRequest, postDemographicRequest, updateDemographicRequest, checkEmailRequest, getDemographicRequest } from "../../../../../redux/modules/patients/demographic/action";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from "react-router-dom";
import DialogBox from "../../../../../components/DialogBox";
import CloseIcon from "@mui/icons-material/Close";
import { API_BASE_URL } from "../../../../../utils/globalConstants";
import DatePickerComponent from "../../../../../components/DatePicker";
import { PatientContext, RoleIdContext, UpdateDataContext } from "../../../../../utils/showHideTabData";
import Loader from "../../../../../components/Loader";
import { fetchPatientInformationRequest } from "../../../../../redux/modules/patients/patientInformation/action";
import { getUserId } from "../../../../../utils/commonUtil";
type props = {
   editData: any
}

export default function DemographicFrom({ editData }: props) {
   let dispatch = useDispatch();
   const DemographicRes = useContext(PatientContext);
   const { setEditData } = useContext(UpdateDataContext);
   const userRoleId = useContext(RoleIdContext);
   const navigation = useNavigate();

   let [formData, setFormData] = useState({
      nameTitle: "Mr.",
      fName: "",
      lName: "",
      gender: "",
      dob: dayjs(),
      email: "",
      phone: "",
      referredBy: "",
      country: "",
      state: "",
      city: "",
      zipCode: "",
      address1: "",
      address2: "",
      avatar: "",
      imageUrl: "",
      observation: "",
      ...editData,
   });
   let [showAlert, setShowAlert] = useState({
      show: false,
      title: "",
      redirect: false
   });
   const [errorMessage, seterrorMessage] = useState({ zipCode: "" })

   let { refferNames, postDemographic, updateDemographic, checkEmailForDemoGraphic, getDemographic } = useSelector((state: any) => {
      let { refferNames: { refferNames }, postDemographic, updateDemographic, checkEmailForDemoGraphic, getDemographic } = state;
      return { refferNames, postDemographic, updateDemographic, checkEmailForDemoGraphic, getDemographic }
   })

   useEffect(() => {
      dispatch(fetchRefferNameRequest());
      if (DemographicRes?.pId && !editData?._id) {
         dispatch(getDemographicRequest({ id: DemographicRes?.pId }));
      }
   }, [dispatch, DemographicRes?.pId, editData?._id]);


   useEffect(() => {
      if (getDemographic?.data?.data?._id) {
         setEditData(getDemographic?.data?.data)
         delete getDemographic?.data
      }
   }, [getDemographic, setEditData])

   useEffect(() => {
      if (DemographicRes?.pId) {
         setFormData((prevalue: any) => {
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
                  ...(editData.avatar && { imageUrl: editData !== undefined && Object.keys(editData)?.length > 0 && editData?.avatar !== "" && `${API_BASE_URL}patientImage/${editData?.avatar}` })
               };
            }
            return {
               ...prevalue,
            };
         });
      }
   }, [editData, DemographicRes]);

   useEffect(() => {
      if (postDemographic.data?.success && !editData._id && postDemographic.submited) {
         delete postDemographic.submited
         setShowAlert({ show: true, title: postDemographic.data?.message, redirect: true })
      }
      if (postDemographic?.error) {
         setShowAlert({ show: true, title: postDemographic?.error?.message, redirect: false })
         delete postDemographic.error
      }

      if (updateDemographic?.data?.success) {
         setShowAlert({ show: true, title: updateDemographic?.data?.message, redirect: true })
         updateDemographic.data = updateDemographic.initialStateDemographic.data;
         dispatch(fetchPatientInformationRequest(DemographicRes?.pId));
      }
      if (updateDemographic?.error) {
         setShowAlert({ show: true, title: updateDemographic?.error?.message, redirect: false })
         delete updateDemographic.error
      }
   }, [dispatch, postDemographic, updateDemographic, editData._id, DemographicRes?.pId]);



   const handleSubmit = (e: any) => {
      e.preventDefault();
      let fileFormData = new FormData(e.target);
      fileFormData.append('avatar', formData.avatar)
      fileFormData.append('dob', formData.dob)
      if (editData._id) {
         dispatch(updateDemographicRequest({ id: editData._id, data: fileFormData }))
      } else {
         postDemographic.submited = true;
         dispatch(postDemographicRequest(fileFormData))
      }
   }

   function validateEmail(email: string) {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
   }

   const updateData = (e: any) => {
      // (userRoleId === editData.roleId ||  !editData.roleId) &&
      (userRoleId === 1
         ? true // If userRoleId is 1, the condition is considered true
         : formData.createdBy === getUserId() || userRoleId === editData.roleId || !editData.roleId
      ) &&
         setFormData((prevalue: any) => {
            if (e?.target.name === "avatar") {
               return {
                  ...prevalue,
                  avatar: e?.target?.files[0],
                  imageUrl: URL.createObjectURL(e.target.files[0])
               };
            }
            if (e?.target?.name === "email" && !editData._id) {
               if (validateEmail(e?.target.value,)) {
                  dispatch(checkEmailRequest({ email: e?.target.value }))
               }
            }
            if (e.target.name === "zipCode") {
               const regex = /^[0-9]{5}(?:-[0-9]{4})?$/;
               if (regex.test(e.target.value)) {
                  seterrorMessage((prev) => ({ ...prev, zipCode: "" }))
               }
               else if (e.target.value?.length > 5) {
                  seterrorMessage((prev) => ({ ...prev, zipCode: "zipCode cannot be greater than 5 digits" }))
               }
               else {
                  seterrorMessage((prev) => ({ ...prev, zipCode: "Please Enter valid zipCode" }))
               }
            }
            return {
               ...prevalue,
               [e?.target.name]: e?.target.value,
            };
         });

   };

   if (postDemographic.loading || getDemographic.loading) {
      return <Loader />
   }
   console.log(userRoleId, editData.roleId, "role", getUserId(), "userID", formData.createdBy, "createdby")
   return (
      <>
         <Box component="form" onSubmit={(e: any) => { handleSubmit(e) }} {...(userRoleId !== 1 || formData.createdBy === getUserId() && ((userRoleId !== editData?.roleId) && editData?.roleId) && { sx: { pointerEvents: "none" } })}>
            <Grid container spacing={2}>
               <Grid item lg={8} xs={12} >
                  <Grid container spacing={2}>
                     <Grid item xs={4}>
                        <Box position={"relative"}>
                           <FormControl variant="standard" fullWidth>
                              <InputLabel shrink htmlFor="fName" required>
                                 First Name
                              </InputLabel>
                              <Input id="fName" placeholder="First Name" required name="fName" fullWidth disableUnderline sx={{ paddingLeft: "80px" }} onChange={(e) => { updateData(e); }}
                                 value={formData.fName} />
                           </FormControl>
                           <Select

                              onChange={(e) => { updateData(e); }}
                              value={formData.nameTitle}
                              name="nameTitle"
                              displayEmpty
                              inputProps={{ 'aria-label': 'Without label' }}
                              style={{ marginTop: "0 !important", position: "absolute", bottom: "2px", left: "2px", background: "#fff", width: "90px" }}
                              className="input-title"
                           >
                              <MenuItem value="Mr.">Mr.</MenuItem>
                              <MenuItem value="Mrs.">Mrs.</MenuItem>
                              <MenuItem value="Miss.">Miss.</MenuItem>
                              <MenuItem value="Young.">Young.</MenuItem>
                           </Select>
                        </Box>
                     </Grid>
                     <Grid item xs={4}>
                        <FormControl variant="standard" fullWidth>
                           <InputLabel shrink htmlFor="lName" required>
                              Last Name
                           </InputLabel>
                           <Input id="lName" placeholder="First Name" required name="lName" fullWidth disableUnderline
                              onChange={(e) => { updateData(e); }}
                              value={formData.lName} />
                        </FormControl>
                     </Grid>
                     <Grid item xs={4}>
                        <FormControl variant="standard" fullWidth>
                           <InputLabel shrink htmlFor="gender" required >
                              Gender
                           </InputLabel>
                           <Select placeholder="gender" name="gender" defaultValue="" required fullWidth
                              onChange={(e) => { updateData(e); }}
                              value={formData.gender}>
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
                     <Grid item xs={4}>
                        <FormControl variant="standard" fullWidth>
                           <InputLabel shrink htmlFor="dob" required sx={{ position: "relative" }}>
                              D.O.B
                           </InputLabel>
                           <DatePickerComponent name="dob" required={true} maxDate={dayjs()} value={formData?.dob !== "" ? dayjs(formData?.dob) : null} onChange={(value: string) => setFormData((prev: any) => ({ ...prev, dob: value }))} />
                        </FormControl>
                     </Grid>
                     <Grid item xs={4}>
                        <FormControl variant="standard" fullWidth>
                           <InputLabel shrink htmlFor="email">
                              Email Address
                           </InputLabel>
                           <Input disabled={false} id="email" name="email" placeholder="First Name" type="email" fullWidth disableUnderline
                              onChange={(e) => { updateData(e); }}
                              value={formData.email}
                           />
                        </FormControl>
                        {
                           checkEmailForDemoGraphic?.data?.message !== "" && <p className="error">{checkEmailForDemoGraphic?.data?.message}</p>
                        }
                     </Grid>
                     <Grid item xs={4}>
                        <FormControl variant="standard" fullWidth>
                           <InputLabel shrink htmlFor="phone">
                              Phone Number
                           </InputLabel>
                           <InputMask
                              mask="+1 (999) 999-9999"
                              value={formData.phone}
                              disabled={false}
                              maskChar={null}
                              onChange={(e) => { updateData(e); }}
                           >
                              <Input id="phone" name="phone" placeholder="Enter phone" fullWidth disableUnderline
                                 value={formData.phone} />
                           </InputMask>

                        </FormControl>
                     </Grid>
                     <Grid item xs={4}>
                        <FormControl variant="standard" fullWidth>
                           <InputLabel shrink htmlFor="referredBy">
                              Referred By
                           </InputLabel>
                           <Select placeholder="referredBy" name="referredBy" fullWidth disableUnderline value={formData.referredBy} onChange={(e) => { updateData(e); }}>
                              <MenuItem value="">
                                 <Typography variant="body2">none</Typography>
                              </MenuItem>
                              {refferNames?.data &&
                                 refferNames?.data.map((item: any) => {
                                    return (
                                       <MenuItem value={item.name} key={item.name}>
                                          <Typography variant="body2">{item.name}</Typography>
                                       </MenuItem>
                                    )
                                 })}
                           </Select>
                        </FormControl>
                     </Grid>
                     <Grid item xs={4}>
                        <FormControl variant="standard" fullWidth>
                           <InputLabel shrink htmlFor="country">
                              Country
                           </InputLabel>
                           <Input id="country" name="country" placeholder="Enter Country" fullWidth disableUnderline
                              onChange={(e) => { updateData(e); }}
                              value={formData.country} />
                        </FormControl>
                     </Grid>
                     <Grid item xs={4}>
                        <FormControl variant="standard" fullWidth>
                           <InputLabel shrink htmlFor="country">
                              State
                           </InputLabel>
                           <Input id="state" name="state" placeholder="Enter State" fullWidth disableUnderline
                              onChange={(e) => { updateData(e); }}
                              value={formData.state}
                           />
                        </FormControl>
                     </Grid>
                     <Grid item xs={4}>
                        <FormControl variant="standard" fullWidth>
                           <InputLabel shrink htmlFor="city">
                              city
                           </InputLabel>
                           <Input id="city" name="city" placeholder="Enter City" fullWidth disableUnderline
                              onChange={(e) => { updateData(e); }}
                              value={formData.city} />
                        </FormControl>
                     </Grid>
                     <Grid item xs={4} >
                        <FormControl variant="standard" fullWidth>
                           <InputLabel shrink htmlFor="zipCode" >
                              Zip Code
                           </InputLabel>
                           <Input id="zipCode" name="zipCode" placeholder="Zip Code" fullWidth disableUnderline
                              onChange={(e) => { updateData(e); }}
                              value={formData.zipCode}
                           />
                           {
                              errorMessage && errorMessage?.zipCode !== "" && <p className="error">{errorMessage?.zipCode}</p>
                           }
                        </FormControl>
                     </Grid>
                     <Grid item xs={12}>
                        <FormControl variant="standard" fullWidth>
                           <InputLabel shrink htmlFor="address1">
                              Permanent Address1
                           </InputLabel>
                           <Input id="address1" name="address1" placeholder="Address" fullWidth disableUnderline
                              onChange={(e) => { updateData(e); }}
                              value={formData.address1} />
                        </FormControl>
                     </Grid>
                     <Grid item xs={12}>
                        <FormControl variant="standard" fullWidth>
                           <InputLabel shrink htmlFor="address2">
                              Address2
                           </InputLabel>
                           <Input id="address2" name="address2" placeholder="Address" fullWidth disableUnderline
                              onChange={(e) => { updateData(e); }}
                              value={formData.address2} />
                        </FormControl>
                     </Grid>
                  </Grid>
               </Grid>
               <Grid item lg={4} xs={12}>
                  <FormControl variant="standard" fullWidth className="custom-dropzone">
                     <InputLabel shrink htmlFor="avatar">
                        Your Photo
                     </InputLabel>
                     <Box className="dropzone">
                        {
                           formData?.imageUrl !== "" ? <> <Button className="close_btn" onClick={() => setFormData((prev: object) => ({ ...prev, imageUrl: "", avatar: "" }))} sx={{ right: 0 }}> <CloseIcon /></Button> <img src={formData?.imageUrl} alt="Demographic file" style={{ maxHeight: "250px", width: "100%", objectFit: "contain" }} />
                           </> :
                              <>
                                 <CloudUploadIcon />
                                 <Box>
                                    <Typography variant="body2" color="text.secondary" paragraph marginBottom={"10px"}>
                                       Drag And Drop to Upload the file
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" paragraph marginBottom={"16px"}>
                                       Or
                                    </Typography>
                                    <Button variant="contained" color="primary">Browse File</Button>
                                    <Box sx={{ position: "absolute", top: "0", left: "0", height: "100%", width: "100%" }} >
                                       <Input id="avatar" name="avatar" type="file" fullWidth disableUnderline className="dropzone-input" onChange={(e) => { updateData(e); }} />
                                    </Box>
                                 </Box>
                              </>

                        }

                     </Box>
                  </FormControl>
                  <FormControl variant="standard" fullWidth sx={{ mt: 2 }}>
                     <InputLabel shrink htmlFor="observation">
                        Observation
                     </InputLabel>
                     <Input sx={{ padding: "14px" }} id="observation" name="observation" fullWidth disableUnderline multiline minRows="5" onChange={(e) => { updateData(e); }}
                        value={formData.observation}
                     />
                  </FormControl>

               </Grid>
            </Grid>
            {userRoleId === 1 ? (
               // Render something else when userRoleId is equal to 1
               <Box mt="50px" textAlign="right">
                  <Button
                     disabled={(checkEmailForDemoGraphic?.data?.message || errorMessage?.zipCode)}
                     variant="contained"
                     color="secondary"
                     type="submit"
                  >
                     {editData._id ? "update" : "Save"}
                  </Button>
               </Box>
            ) : (
               // The original condition
               (userRoleId === editData.roleId || formData.createdBy === getUserId() || !editData.roleId) && (
                  <Box mt="50px" textAlign="right">
                     <Button
                        disabled={(checkEmailForDemoGraphic?.data?.message || errorMessage?.zipCode)}
                        variant="contained"
                        color="secondary"
                        type="submit"
                     >
                        {editData._id ? "update" : "Save"}
                     </Button>
                  </Box>
               )
            )}
         </Box>
         <DialogBox buttonIcon={showAlert.title === "There is some error please try again later" || showAlert.title === "Please fill required fields" ? "error" : ""} openDialog={showAlert.show} handleSubmit={() => { setShowAlert({ show: false, title: "", redirect: false }); if (showAlert.redirect) { navigation("/patients/diagnosis") } }} title={showAlert.title} buttonText="Ok" />
      </>
   );
}
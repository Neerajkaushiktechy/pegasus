import { FormControl, Typography, InputLabel, Grid, FormControlLabel, Radio, Box, RadioGroup, Button, Paper, FormLabel, Stack, Input, Checkbox } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postDataRequest, updateRequest, getDataRequest } from "../../../../../redux/modules/patients/socialHistory/action";
import { PatientContext, UpdateDataContext } from "../../../../../utils/showHideTabData";
import DialogBox from "../../../../../components/DialogBox";
import SocialHistortCard from "../../../../../components/Dashboard/SocialHistoryCard/socialHistoryCard";
import { updateMyAssignmentStatusRequest } from "../../../../../redux/modules/studentView/myAssignments/action";
import { useNavigate } from "react-router";
import Loader from "../../../../../components/Loader";
import { getRoleId, getUserId } from "../../../../../utils/commonUtil";

type props = {
   editData?: any
   patientId?: any
   assessmentId?: any
   submittedTime?: any,
   checkAssignment?: boolean
   assignmentId?: any
}

export default function SocialHistortForm({ editData, patientId, assessmentId, submittedTime, assignmentId, checkAssignment = false }: props) {
   let dispatch = useDispatch();
   let navigate = useNavigate();
   const DemographicRes = useContext(PatientContext);

   const { setEditData } = useContext(UpdateDataContext) ?? {};
   let [formData, setFormData] = useState({
      pId: "",
      tobaccoUse: {
         value: "",
         effectiveDate: "",
         typeOfTobacco: ""
      },
      alcoholUse: {
         value: "",
         standardDrinks: "",
         occasionDrink: ""
      },
      socialHistory: "",
      financial: "",
      education: "",
      alcoholType: "",
      typeofAlcohol: "",
      physicalActivity: {
         declineQues: false,
         exerciseDays: "",
         exerciseMinutes: "",
         value: "",
      },
      stress: "",
      socialIsolation: {
         declineQues: false,
         marriedStatus: "",
         livingWith: "",
         talkTime: "",
         meetTime: ""
      },
      violence: {
         declineQues: false,
         emotional: false,
         afraid: false,
         hurt: false,
      },
      submittedTime: submittedTime ? submittedTime : "",
      onlyView: false,
      assignmentId: assignmentId ? assignmentId : "",
   });


   let [showAlert, setShowAlert] = useState({
      show: false,
      title: ""
   });

   let { postSocial, getSocial, updateSocial, getPatientInformationData } = useSelector((state: any) => {
      let { postSocial, getSocial, updateSocial, getPatientInformationData } = state;
      return { postSocial, getSocial, updateSocial, getPatientInformationData };
   });

   useEffect(() => {
      setFormData(prevState => ({ ...prevState, submittedTime }));
   }, [submittedTime]);


   useEffect(() => {
      if (DemographicRes?.pId && !editData?._id) {
         dispatch(getDataRequest(DemographicRes.pId));
      }
   }, [dispatch, DemographicRes?.pId, editData?._id])
   useEffect(() => {
      if (getSocial?.data?.data?._id) {
         setEditData(getSocial?.data?.data)
         delete getSocial?.data
      }
   }, [getSocial, setEditData])

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

   useEffect(() => {
      if (postSocial.data?.success) {
         setShowAlert({ show: true, title: postSocial.data?.message })
         postSocial.data = postSocial.initialState.data;
         if (assessmentId) {
            let status = 2
            dispatch(updateMyAssignmentStatusRequest({ status, assessmentId, submittedTime }))
         }
      }
      if (updateSocial.data?.success) {
         setShowAlert({ show: true, title: updateSocial.data?.message })
         updateSocial.data = updateSocial.initialState.data;
      }

   }, [postSocial.data?.success, updateSocial.data?.success]);

   const handleSubmit = (e: any) => {
      e.preventDefault();
      if (!formData.onlyView) {
         if (editData?._id) {
            dispatch(updateRequest(formData));
         } else {
            dispatch(postDataRequest(formData));
         }
      }
   };

   const handleResetForm = () => {
      setFormData({
         pId: patientId,
         tobaccoUse: {
            value: "",
            effectiveDate: "",
            typeOfTobacco: ""
         },
         alcoholUse: {
            value: "",
            standardDrinks: "",
            occasionDrink: ""
         },
         socialHistory: "",
         financial: "",
         education: "",
         alcoholType: "",
         typeofAlcohol: "",
         physicalActivity: {
            declineQues: false,
            exerciseDays: "",
            exerciseMinutes: "",
            value: "",
         },
         stress: "",
         socialIsolation: {
            declineQues: false,
            marriedStatus: "",
            livingWith: "",
            talkTime: "",
            meetTime: ""
         },
         violence: {
            declineQues: false,
            emotional: false,
            afraid: false,
            hurt: false,
         },
         submittedTime: submittedTime ? submittedTime : "",
         onlyView: false,
         assignmentId: assignmentId ? assignmentId : "",
      });
   }

   const updateData = (e: any, nestedObj: any = false) => {
      if (!formData.onlyView) {
         setFormData((prevalue: any) => {
            if (nestedObj) {
               return {
                  ...prevalue,
                  [nestedObj]: {
                     ...prevalue[nestedObj],
                     [e?.target.name]: e?.target.value,
                  }
               };
            }
            return {
               ...prevalue,
               [e?.target.name]: e?.target.value,
            };

         })
      }
   };

   if (getSocial?.loading) {
      return <Loader />
   }

   return (
      <>
         <Paper>
            {!checkAssignment &&
               <Stack p={2} direction="row" justifyContent="space-between" alignItems="center" spacing={2} bgcolor="primary.light">
                  <Typography>Social History</Typography>
               </Stack>
            }
            <Box
               p={2}
               component="form"
               onSubmit={(e) => { handleSubmit(e); }}>
               <Box>
                  <Grid container spacing={2}>
                     <Grid item xs={12}>
                        <SocialHistortCard heading="Tobacco use" >
                           <FormControl>
                              <FormLabel sx={{ fontSize: "20px", marginBottom: "10px", color: "#000", fontWeight: "400" }}>Tobacco use</FormLabel>
                              <RadioGroup name="value" value={formData.tobaccoUse.value} onChange={(e: any) => { updateData(e, "tobaccoUse") }} sx={{ marginBottom: "30px" }} className="custom-radio" >
                                 <FormControlLabel value="Non-smoker" control={<Radio />} label="Non-smoker" />
                                 <FormControlLabel value="Ex-smoker" control={<Radio />} label="Ex-smoker" />
                                 <FormControlLabel value="Non-user of powdered tobacco" control={<Radio />} label="Non-user of powdered tobacco" />
                                 <FormControlLabel value="Light cigarette smoker (1-9 cigs/day)" control={<Radio />} label="Light cigarette smoker (1-9 cigs/day)" />
                                 <FormControlLabel value="Moderate cigarette smoker (10-19 cigs/day)" control={<Radio />} label="Moderate cigarette smoker (10-19 cigs/day)" />
                                 <FormControlLabel value="Heavy cigarette smoker (20-39 cigs/day)" control={<Radio />} label="Heavy cigarette smoker (20-39 cigs/day)" />
                                 <FormControlLabel value="Very heavy cigarette smoker (40+ cigs/day)" control={<Radio />} label="Very heavy cigarette smoker (40+ cigs/day)" />
                                 <FormControlLabel value="Electronic cigarette user" control={<Radio />} label="Electronic cigarette user" />
                                 <FormControlLabel value="Cigar smoker" control={<Radio />} label="Cigar smoker" />
                                 <FormControlLabel value="Pipe smoker" control={<Radio />} label="Pipe smoker" />
                                 <FormControlLabel value="Chews tobacco" control={<Radio />} label="Chews tobacco" />
                                 <FormControlLabel value="Chews products containing tobacco" control={<Radio />} label="Chews products containing tobacco" />
                                 <FormControlLabel value="Snuff user" control={<Radio />} label="Snuff user" />
                                 <FormControlLabel value="Other" control={<Radio />} label="Other" />
                              </RadioGroup>
                           </FormControl>
                           <FormControl fullWidth>
                              <FormLabel sx={{ fontSize: "18px", marginBottom: "10px", color: "#000", fontWeight: "400", marginTop: "10px" }}>Type of tobacco</FormLabel>
                              <Input
                                 id="typeOfTobacco"
                                 name="typeOfTobacco"
                                 disableUnderline
                                 onChange={(e) => { updateData(e, "tobaccoUse") }}
                                 value={formData.tobaccoUse.typeOfTobacco}
                                 sx={{ marginTop: "0 !important" }}
                              />
                           </FormControl>
                           <FormControl variant="standard" fullWidth>
                              <InputLabel shrink htmlFor="dateOnset" sx={{ fontSize: "20px", marginBottom: "10px", color: "#000", fontWeight: "400", marginTop: "10px", paddingBottom: "10px" }}>
                                 Effective Date
                              </InputLabel>
                              <Input
                                 id="dateOnset"
                                 placeholder="MM/DD/YYYY"
                                 type="date"
                                 name="effectiveDate"
                                 disableUnderline
                                 onChange={(e) => {
                                    updateData(e, "tobaccoUse");
                                 }}
                                 value={formData.tobaccoUse.effectiveDate}
                              />
                           </FormControl>
                        </SocialHistortCard>
                     </Grid>
                     <Grid item xs={12}>
                        <SocialHistortCard heading="Alcohol Type">
                           <FormControl>
                              <RadioGroup name="alcoholType" value={formData.alcoholType} onChange={(e: any) => { updateData(e) }} className="custom-radio" >
                                 <FormControlLabel value="Wine" control={<Radio />} label="Wine" />
                                 <FormControlLabel value="Whiskey" control={<Radio />} label="Whiskey" />
                                 <FormControlLabel value="Rum" control={<Radio />} label="Rum" />
                                 <FormControlLabel value="Tequila" control={<Radio />} label="Tequila" />
                                 <FormControlLabel value="Vodka" control={<Radio />} label="Vodka" />
                                 <FormControlLabel value="Brandy" control={<Radio />} label="Brandy" />
                                 <FormControlLabel value="Absinthe" control={<Radio />} label="Absinthe" />
                                 <FormControlLabel value="Everclear" control={<Radio />} label="Everclear" />
                                 <FormControlLabel value="Beer" control={<Radio />} label="Beer" />
                              </RadioGroup>
                           </FormControl>
                           <FormControl fullWidth>
                              <FormLabel sx={{ fontSize: "18px", marginBottom: "10px", color: "#000", fontWeight: "400", marginTop: "10px" }}>Type of alcohol</FormLabel>
                              <Input
                                 id="typeofAlcohol"
                                 name="typeofAlcohol"
                                 disableUnderline
                                 onChange={(e: any) => { updateData(e) }}
                                 value={formData.typeofAlcohol}
                                 sx={{ marginTop: "0 !important" }}
                              />
                           </FormControl>
                        </SocialHistortCard>
                     </Grid>
                     <Grid item xs={12}>
                        <SocialHistortCard heading="Alcohol use">
                           <FormControl sx={{ marginBottom: "20px", width: "100%" }}>
                              <FormLabel sx={{ fontSize: "20px", marginBottom: "10px", color: "#000", fontWeight: "400" }}>How often do you have a drink containing alcohol?</FormLabel>
                              <RadioGroup name="value" value={formData.alcoholUse.value} onChange={(e: any) => { updateData(e, "alcoholUse") }} className="custom-radio" >
                                 <FormControlLabel value="Never" control={<Radio />} label="Never" />
                                 <FormControlLabel value="Monthly or less" control={<Radio />} label="Monthly or less" />
                                 <FormControlLabel value="2-4 times a month" control={<Radio />} label="2-4 times a month" />
                                 <FormControlLabel value="2-3 times a week" control={<Radio />} label="2-3 times a week" />
                                 <FormControlLabel value="4 or more times a week" control={<Radio />} label="4 or more times a week" />
                              </RadioGroup>
                           </FormControl>
                           <FormControl sx={{ marginBottom: "20px", width: "100%" }}>
                              <FormLabel sx={{ fontSize: "20px", marginBottom: "10px", color: "#000", fontWeight: "400" }}>How many standard drinks containing alcohol do you have on a typical day?</FormLabel>
                              <RadioGroup name="standardDrinks" value={formData.alcoholUse.standardDrinks} onChange={(e: any) => { updateData(e, "alcoholUse") }} className="custom-radio" >
                                 <FormControlLabel value="1 or 2" control={<Radio />} label="1 or 2" />
                                 <FormControlLabel value="3 to 4" control={<Radio />} label="3 to 4" />
                                 <FormControlLabel value="5 to 6" control={<Radio />} label="5 to 6" />
                                 <FormControlLabel value="7 to 9" control={<Radio />} label="7 to 9" />
                                 <FormControlLabel value="10 or more" control={<Radio />} label="10 or more" />
                              </RadioGroup>
                           </FormControl>
                           <FormControl sx={{ marginBottom: "20px", width: "100%" }}>
                              <FormLabel sx={{ fontSize: "20px", marginBottom: "10px", color: "#000", fontWeight: "400" }}>How often do you have six or more drinks on one occasion?</FormLabel>
                              <RadioGroup name="occasionDrink" value={formData.alcoholUse.occasionDrink} onChange={(e: any) => { updateData(e, "alcoholUse") }} className="custom-radio" >
                                 <FormControlLabel value="Daily or almost daily" control={<Radio />} label="Daily or almost daily" />
                                 <FormControlLabel value="Weekly" control={<Radio />} label="Weekly" />
                                 <FormControlLabel value="Monthly" control={<Radio />} label="Monthly" />
                                 <FormControlLabel value="Less than monthlyy" control={<Radio />} label="Less than monthly" />
                                 <FormControlLabel value="Never" control={<Radio />} label="Never" />
                              </RadioGroup>
                           </FormControl>

                        </SocialHistortCard>
                     </Grid>
                     <Grid item xs={12}>
                        <SocialHistortCard heading="Financial resources">

                           <FormControl>
                              <FormLabel sx={{ fontSize: "20px", marginBottom: "10px", color: "#000", fontWeight: "400" }}>Describe your difficulity paying for the very basics like food, housing, medical care and heating</FormLabel>
                              <RadioGroup name="financial" value={formData.financial} onChange={(e: any) => { updateData(e) }} className="custom-radio">
                                 <FormControlLabel value="Very Hard" control={<Radio />} label="Very Hard" />
                                 <FormControlLabel value="Hard" control={<Radio />} label="Hard" />
                                 <FormControlLabel value="Somewhat hard" control={<Radio />} label="Somewhat hard" />
                                 <FormControlLabel value="Not very hard" control={<Radio />} label="Not very hard" />
                                 <FormControlLabel value="Patient declined to specify" control={<Radio />} label="Patient declined to specify" />
                              </RadioGroup>
                           </FormControl>

                        </SocialHistortCard>
                     </Grid>
                     <Grid item xs={12}>
                        <SocialHistortCard heading="Social history">
                           <FormControl fullWidth>
                              <Input
                                 id="socialHistory"
                                 name="socialHistory"
                                 disableUnderline
                                 fullWidth
                                 onChange={(e) => { updateData(e) }}
                                 value={formData.socialHistory}
                                 sx={{ marginTop: "0 !important" }}
                              />
                           </FormControl>
                        </SocialHistortCard>
                     </Grid>
                     <Grid item xs={12}>
                        <SocialHistortCard heading="Education resources">
                           <FormControl>
                              <RadioGroup name="education" value={formData.education} onChange={(e: any) => { updateData(e) }} className="custom-radio" >
                                 <FormControlLabel value="10th Grade" control={<Radio />} label="10th Grade" />
                                 <FormControlLabel value="11th Grade" control={<Radio />} label="11th Grade" />
                                 <FormControlLabel value="12th Grade" control={<Radio />} label="12th Grade" />
                                 <FormControlLabel value="Bachelor's degree" control={<Radio />} label="Bachelor's degree" />
                                 <FormControlLabel value="Master's degree" control={<Radio />} label="Master's degree" />
                              </RadioGroup>
                           </FormControl>
                        </SocialHistortCard>
                     </Grid>
                     <Grid item xs={12}>
                        <SocialHistortCard heading="Physical activity">
                           <FormControlLabel control={<Checkbox name="declineQues" checked={String(formData.physicalActivity.declineQues) === "true" ? true : false} value={String(formData.physicalActivity.declineQues) === "true" ? false : true} onChange={(e) => { updateData(e, "physicalActivity") }} />} label="Patient Declined to specify on all questions" sx={{ fontSize: "20px", marginBottom: "10px", color: "#000", fontWeight: "400" }} />
                           <FormControl sx={{ marginBottom: "20px" }} fullWidth>
                              <FormLabel sx={{ fontSize: "20px", marginBottom: "16px", color: "#000", fontWeight: "400" }}>1. How many days of moderate to strenuous exercise, like a brisk walk, did you do in the last 7 days?</FormLabel>
                              <Input
                                 id="exerciseDays"
                                 name="exerciseDays"
                                 disableUnderline
                                 onChange={(e) => { updateData(e, "physicalActivity") }}
                                 value={formData.physicalActivity.exerciseDays}
                                 sx={{ marginTop: "0 !important" }}
                              />
                           </FormControl>
                           <FormControl fullWidth>
                              <FormLabel sx={{ fontSize: "20px", marginBottom: "16px", color: "#000", fontWeight: "400" }}>2. On those days that you engage in moderate to strenuous exercise, how many minutes, on average, do you exercise ?</FormLabel>
                              <Input
                                 id="exerciseMinutes"
                                 name="exerciseMinutes"
                                 disableUnderline
                                 onChange={(e) => { updateData(e, "physicalActivity") }}
                                 value={formData.physicalActivity.exerciseMinutes}
                                 sx={{ marginTop: "0 !important" }}
                              />
                           </FormControl>
                           <FormControl>
                              <RadioGroup name="value" value={formData.physicalActivity.value} onChange={(e: any) => { updateData(e, "physicalActivity") }} className="custom-radio" >
                                 <FormControlLabel value="Mild exercise" control={<Radio />} label="Mild exercise" />
                                 <FormControlLabel value="No exercise" control={<Radio />} label="No exercise" />
                              </RadioGroup>
                           </FormControl>
                        </SocialHistortCard>
                     </Grid>
                     <Grid item xs={12}>
                        <SocialHistortCard heading="Stress">
                           <FormControl>
                              <FormLabel sx={{ fontSize: "20px", marginBottom: "10px", color: "#000", fontWeight: "400" }}>To what
                                 extent do you feel do you feel stressed, tense, restless, nervous, anxious, or unable to sleep at
                                 night because your mind is troubled?</FormLabel>
                              <RadioGroup name="stress" value={formData.stress} onChange={(e: any) => { updateData(e) }} className="custom-radio" >
                                 <FormControlLabel value="Not at all" control={<Radio />} label="Not at all" />
                                 <FormControlLabel value="Only a little" control={<Radio />} label="Only a little" />
                                 <FormControlLabel value="To some extent" control={<Radio />} label="To some extent" />
                                 <FormControlLabel value="Rather much" control={<Radio />} label="Rather much" />
                                 <FormControlLabel value="very much" control={<Radio />} label="very much" />
                                 <FormControlLabel value="Patient declined to specify" control={<Radio />} label="Patient declined to specify" />
                              </RadioGroup>
                           </FormControl>
                        </SocialHistortCard>
                     </Grid>
                     <Grid item xs={12}>
                        <SocialHistortCard heading="Social isolation">
                           <FormControlLabel control={<Checkbox name="declineQues" checked={String(formData.socialIsolation.declineQues) === "true" ? true : false} value={String(formData.socialIsolation.declineQues) === "true" ? false : true} onChange={(e) => { updateData(e, "socialIsolation") }} />} label="Patient Declined to specify on all questions" sx={{ fontSize: "20px", marginBottom: "10px", color: "#000", fontWeight: "400" }} />
                           <FormControl sx={{ marginBottom: "30px" }}>
                              <FormLabel sx={{ fontSize: "18px", marginBottom: "10px", color: "#000", fontWeight: "400" }}>1. Are you now married, widowed, divorced, separated, never married or living with partner ?</FormLabel>
                              <RadioGroup name="marriedStatus" value={formData.socialIsolation.marriedStatus} onChange={(e: any) => { updateData(e, "socialIsolation") }} className="custom-radio" >
                                 <FormControlLabel value="Married" control={<Radio />} label="Married" />
                                 <FormControlLabel value="Widowed" control={<Radio />} label="Widowed" />
                                 <FormControlLabel value="Divorced" control={<Radio />} label="Divorced" />
                                 <FormControlLabel value="Separated" control={<Radio />} label="Separated" />
                                 <FormControlLabel value="Never Married" control={<Radio />} label="Never Married" />
                                 <FormControlLabel value="Living with partner" control={<Radio />} label="Living with partner" />
                                 <FormControlLabel value="Refused" control={<Radio />} label="Refused" />
                                 <FormControlLabel value="Single" control={<Radio />} label="Single" />
                                 <FormControlLabel value="Living Alone" control={<Radio />} label="Living Alone" />
                                 <FormControlLabel value="Don't know" control={<Radio />} label="Don't know" />
                              </RadioGroup>
                           </FormControl>
                           <FormControl sx={{ marginBottom: "20px" }} fullWidth>
                              <FormLabel sx={{ fontSize: "20px", marginBottom: "10px", color: "#000", fontWeight: "400" }}>1. You are living with?</FormLabel>
                              <Input
                                 id="livingWith"
                                 name="livingWith"
                                 disableUnderline
                                 onChange={(e) => { updateData(e, "socialIsolation") }}
                                 value={formData.socialIsolation.livingWith}
                                 sx={{ marginTop: "0 !important" }}
                              />
                           </FormControl>
                           <FormControl sx={{ marginBottom: "20px" }} fullWidth>
                              <FormLabel sx={{ fontSize: "20px", marginBottom: "10px", color: "#000", fontWeight: "400" }}>2. In a typical week, how many times do you talk on the telephone with family, friends, or neighbors?</FormLabel>
                              <Input
                                 id="talkTime"
                                 name="talkTime"
                                 disableUnderline
                                 onChange={(e) => { updateData(e, "socialIsolation") }}
                                 value={formData.socialIsolation.talkTime}
                                 sx={{ marginTop: "0 !important" }}
                              />
                           </FormControl>
                           <FormControl fullWidth>
                              <FormLabel sx={{ fontSize: "20px", marginBottom: "16px", color: "#000", fontWeight: "400" }}>3. In a typical week, how often do you get together with friends, or relatives?</FormLabel>
                              <Input
                                 id="meetTime"
                                 name="meetTime"
                                 disableUnderline
                                 onChange={(e) => { updateData(e, "socialIsolation") }}
                                 value={formData.socialIsolation.meetTime}
                                 sx={{ marginTop: "0 !important" }}
                              />
                           </FormControl>
                        </SocialHistortCard>
                     </Grid>
                     <Grid item xs={12}>
                        <SocialHistortCard heading="Violence">
                           <FormControlLabel
                              control={
                                 <Checkbox
                                    name="declineQues"
                                    checked={String(formData.violence.declineQues) === "true"}
                                    value={String(formData.violence.declineQues) === "true" ? false : true}
                                    onChange={(e) => {
                                       if (e.target.checked) {
                                          // Checkbox is checked, unselect all radio buttons
                                          updateData({ target: { name: "emotional", value: null } }, "violence");
                                          updateData({ target: { name: "afraid", value: null } }, "violence");
                                          updateData({ target: { name: "hurt", value: null } }, "violence");
                                       }
                                       // Toggle the checkbox value if any radio button is selected
                                       else if (
                                          formData.violence.emotional !== null ||
                                          formData.violence.afraid !== null ||
                                          formData.violence.hurt !== null
                                       ) {
                                          updateData({ target: { name: "declineQues", value: true } }, "violence");
                                       }
                                       updateData(e, "violence");
                                    }}
                                 />
                              }
                              label="Declined to specify"
                              sx={{ fontSize: "20px", marginBottom: "10px", color: "#000", fontWeight: "400" }}
                           />

                           <FormControl sx={{ marginBottom: "20px" }}>
                              <FormLabel sx={{ fontSize: "20px", marginBottom: "10px", color: "#000", fontWeight: "400" }}>
                                 1. Within the last year, have you been humiliated or emotionally abused in other ways by your partner or ex-partner?
                              </FormLabel>
                              <RadioGroup
                                 name="emotional"
                                 value={formData.violence.emotional}
                                 onChange={(e: any) => {
                                    // Toggle the checkbox when a radio button is selected
                                    updateData({ target: { name: "declineQues", value: false } }, "violence");
                                    updateData(e, "violence");
                                 }}
                                 className="custom-radio"
                              >
                                 <FormControlLabel value={true} control={<Radio />} label="Yes" />
                                 <FormControlLabel value={false} control={<Radio />} label="No" />
                              </RadioGroup>
                           </FormControl>
                           <FormControl fullWidth>
                              <FormLabel sx={{ fontSize: "20px", marginBottom: "16px", color: "#000", fontWeight: "400" }}>If yes, then add realted information</FormLabel>
                              <Input
                                 id="exerciseMinutes"
                                 name="exerciseMinutes"
                                 minRows={2}
                                 disableUnderline
                                 onChange={(e) => { updateData(e, "physicalActivity") }}
                                 value={formData.physicalActivity.exerciseMinutes}
                                 sx={{ marginTop: "0 !important" }}
                              />
                           </FormControl>

                           <FormControl sx={{ marginBottom: "20px" }}>
                              <FormLabel sx={{ fontSize: "20px", marginBottom: "10px", color: "#000", fontWeight: "400" }}>
                                 2. Within the last year, have you been afraid of your partner or ex-partner?
                              </FormLabel>
                              <RadioGroup
                                 name="afraid"
                                 value={formData.violence.afraid}
                                 onChange={(e: any) => {
                                    // Toggle the checkbox when a radio button is selected
                                    updateData({ target: { name: "declineQues", value: false } }, "violence");
                                    updateData(e, "violence");
                                 }}
                                 className="custom-radio"
                              >
                                 <FormControlLabel value={true} control={<Radio />} label="Yes" />
                                 <FormControlLabel value={false} control={<Radio />} label="No" />
                              </RadioGroup>
                           </FormControl>

                           <FormControl>
                              <FormLabel sx={{ fontSize: "20px", marginBottom: "10px", color: "#000", fontWeight: "400" }}>
                                 3. Within the last year, have you been kicked, hit, slapped, or otherwise physically hurt by your partner or ex-partner?
                              </FormLabel>
                              <RadioGroup
                                 name="hurt"
                                 value={formData.violence.hurt}
                                 onChange={(e: any) => {
                                    // Toggle the checkbox when a radio button is selected
                                    updateData({ target: { name: "declineQues", value: false } }, "violence");
                                    updateData(e, "violence");
                                 }}
                                 className="custom-radio"
                              >
                                 <FormControlLabel value={true} control={<Radio />} label="Yes" />
                                 <FormControlLabel value={false} control={<Radio />} label="No" />
                              </RadioGroup>
                           </FormControl>

                        </SocialHistortCard>
                     </Grid>

                  </Grid>
               </Box>
               {!formData.onlyView &&
                  <Box mt="50px" textAlign="right">
                     {patientId ? (
                        <Button variant="outlined" color="secondary" sx={{ mr: "20px" }} onClick={() => { handleResetForm(); }}>
                           Reset
                        </Button>
                     ) : ""}
                     {(getRoleId() === 1 || getRoleId() === 2) || getPatientInformationData?.data.Demographic.createdBy === getUserId() ? (
                        <Button variant="contained" color="secondary" type="submit">
                           {editData?._id ? "update" : "Save"}
                        </Button>
                     ) : null}


                  </Box>
               }
            </Box>
         </Paper>
         {!formData.onlyView && <DialogBox buttonIcon={showAlert.title === "There is some error please try again later" || showAlert.title === "Please fill required fields" ? "error" : ""} openDialog={showAlert.show} handleSubmit={() => { setShowAlert({ show: false, title: "" }); patientId ? navigate('/myAssignment') : navigate('/patients') }} title={showAlert.title} buttonText="Ok" />}
      </>
   );
}
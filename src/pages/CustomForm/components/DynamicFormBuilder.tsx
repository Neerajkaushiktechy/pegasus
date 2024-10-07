import { ErrorMessage } from "@hookform/error-message";
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from "react-hook-form";
import { DynamicFieldData } from "../dynamic-control-types";
import { DynamicControl } from "./DynamicControl";
import { FormLabel, Grid, FormControl, Box, Button, Typography, Stack, Paper, IconButton } from "@mui/material";
// import closeIcon from "../../../assets/close.png"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DialogBox from "../../../components/DialogBox";
import CloseIcon from "@mui/icons-material/Close";
import { postcustomFormRequest, submitcustomFormRequest } from "../../../redux/modules/customform/action";
import { updateMyAssignmentStatusRequest } from "../../../redux/modules/studentView/myAssignments/action";
import { getAssessmentTypeDataRequest, editCustomName } from "../../../redux/modules/setting/assessmentTool/action";
import { decrypt } from "../../../utils/encryptDecrypt"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
interface FormProps {
  fields: DynamicFieldData[];
  setfieldsArray?: any;
  formName: string;
  setshow?: any;
  show?: any;
  type?: any
  patientId?: any
  assessmentId?: any
  submittedTime?: any
  assignmentId?: any
  checkAssignment?: boolean
  checkFormType?: string,
  customFormId?: string
  seteditOpenCustomForm?: any;
  seteditCustomForm?: any;
  location?: any
  copyTemplatePopup?: any
}

export const DynamicFormComponent = ({ fields, setfieldsArray, type, formName, setshow, show, patientId, assessmentId, submittedTime, assignmentId, checkAssignment = false, checkFormType, customFormId, seteditOpenCustomForm, seteditCustomForm, location, copyTemplatePopup }: FormProps) => {
  const formMethods = useForm();
  let dispatch = useDispatch();
  let { postCustomForm, submitCustomForm } = useSelector((state: any) => {
    let { postCustomForm, submitCustomForm } = state
    return {
      postCustomForm, submitCustomForm
    }
  })
  let navigate = useNavigate();
  let [showAlert, setShowAlert] = useState({
    show: false,
    title: ""
  });
  const [confirmDelete, setConfirmDelete] = useState({
    show: false,
    id: ""
  });
  const [roleId, setRoleId] = useState(undefined)
  const [currentQuestIndex, setQuestIndex] = useState(0)
  const {
    handleSubmit, reset,
    formState: { isSubmitting, errors }
  } = formMethods;


  useEffect(() => {
    if (postCustomForm?.data?.success) {
      if (type === 'studentcustomform') {
        navigate('/studentsAssessment')
        postCustomForm.data = postCustomForm.initialState.data;
      }
      else if (copyTemplatePopup) {
        return;
      }
      else {
        customFormId !== "" && customFormId !== undefined ? navigate('/studentsAssessment?edit=assessmentList') : navigate('/studentsAssessment?create=assessmentList')
        postCustomForm.data = postCustomForm.initialState.data;
      }
    }
  }, [postCustomForm])

  useEffect(() => {
    let status = 2
    if (submitCustomForm?.data?.success === true) {
      dispatch(updateMyAssignmentStatusRequest({ status, assessmentId, submittedTime }))
    }
  }, [submitCustomForm?.data?.success, dispatch])

  useEffect(() => {
    const item = localStorage.getItem("item");
    if (localStorage.getItem("item")) {
      const token = JSON.parse(decrypt(item))
      const parts = token.token.split('.');
      const payload = JSON.parse(window.atob(parts[1]));
      setRoleId(payload.roleId);
    }
  }, [])

  async function onSubmit(data: any, error: any) {
    if (checkAssignment) { return false }
    let formData: any = [...fields];
    for (let [key, value] of Object.entries(data)) {
      for (var i = 0; i < formData.length; i++) {
        if (formData[i].id === key) {
          formData[i]['defaultValue'] = value
        }
      }

    }
    let dataObject: object = {
      formData,
      formName: formName,
      customFormId
    }
    let customFormDataObject: object = {
      formData,
      formName: formName,
      patientId: patientId,
      submittedTime: submittedTime,
      assignmentId: assignmentId,
      studentAssignmentSatusId: assessmentId
    }
    if (type === "studentcustomform") {
      await dispatch(submitcustomFormRequest(customFormDataObject))
      setShowAlert({ show: true, title: "Form Data Saved" })
    }
    else {
      await dispatch(postcustomFormRequest(dataObject))
      if (location?.search !== "") {
        await dispatch(editCustomName(atob(location.search.split("=")[1]) as any))
      }
      else {
        /// dispatch(editCustomName(true))
      }
      await dispatch(getAssessmentTypeDataRequest())
    }

  }
  const handleNavigate = async () => {
    await dispatch(editCustomName(null))
    navigate('/studentsAssessment?edit=assessmentList')
  }
  return (
    <>
      <Paper sx={{ boxShadow: "unset" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormProvider {...formMethods}>
            {!checkAssignment &&
              <div style={{ paddingBottom: "10px" }}>
                <Stack p={2} direction="row" justifyContent="space-between" alignItems="center" spacing={2} bgcolor="primary.light" sx={{ padding: "6px 20px" }}>
                  <Typography>{formName} {fields?.length ? `- Total Questions ${fields.length}`  :  ""}</Typography>
                  {
                    show &&
                    <IconButton
                      onClick={() => setshow(false)}
                    >
                      <CloseIcon sx={{ width: "36px", height: "36px" }} />
                    </IconButton>
                  }
                </Stack>
              </div>
            }
            
            {fields?.length > 0 && 
              <Grid container spacing={2} pr={5} pl={5} pt={5}>
                {checkAssignment ? 
                  fields?.map((ques)=>(
                  <Grid item xs={12} sx={{ ...(checkAssignment && { pointerEvents: "none" }) }}>
                    <FormControl className="right_side_wrapper" variant="standard" fullWidth required={roleId === 2 ? true : false}>
                      <FormLabel sx={{ marginBottom: "16px", fontSize: "20px", color: "#rgba(39,30,74,0.9)", fontWeight: "400", }} component="legend" required={roleId === 2 ? true : false}>
                        Q{currentQuestIndex +  1 } :- {ques.label}
                        {type === "studentcustomform" ? <></> : customFormId !== "" && !show && (
                          <>
                            <IconButton sx={{ color: "#017BAC" }} onClick={(e) => { seteditOpenCustomForm(); seteditCustomForm(ques) }}>
                              <EditIcon />
                            </IconButton>
                            <IconButton sx={{ color: "#C53E4E" }} onClick={() => { setConfirmDelete({ show: true, id: ques.id }) }}>
                              <DeleteIcon />
                            </IconButton>
                          </>
                        )}
                      </FormLabel >
                      <DynamicControl {...ques} show={show} checkFormType={checkFormType} />
                    </FormControl>
                    <ErrorMessage errors={errors} name={ques.fieldName} />
                  </Grid>
                  ))
                : 
                <Grid item xs={12} sx={{ ...(checkAssignment ? { pointerEvents: "none" } :{}) }}>
                  
                  <FormControl className="right_side_wrapper" variant="standard" fullWidth required={roleId === 2 ? true : false}>
                    <FormLabel sx={{ marginBottom: "16px", fontSize: "20px", color: "#rgba(39,30,74,0.9)", fontWeight: "400", }} component="legend" required={roleId === 2 ? true : false}>
                    Q{currentQuestIndex +  1 } :- {fields[currentQuestIndex].label}
                      {type === "studentcustomform" ? <></> : customFormId !== "" && !show && (
                        <>
                          <IconButton sx={{ color: "#017BAC" }} onClick={(e) => { seteditOpenCustomForm(); seteditCustomForm(fields[currentQuestIndex]) }}>
                            <EditIcon />
                          </IconButton>
                          <IconButton sx={{ color: "#C53E4E" }} onClick={() => { setConfirmDelete({ show: true, id: fields[currentQuestIndex].id }) }}>
                            <DeleteIcon />
                          </IconButton>
                        </>
                      )}
                    </FormLabel >
                    <DynamicControl {...fields[currentQuestIndex]} show={show} checkFormType={checkFormType} />
                  </FormControl>
                  <ErrorMessage errors={errors} name={fields[currentQuestIndex].fieldName} />
                  <Box>
                    <Button onClick={() => setQuestIndex(currentQuestIndex + 1)} disabled={currentQuestIndex===fields.length -1 } sx={{ mr: "20px" }} variant="contained" color="primary">
                      Next Ques
                    </Button>
                  </Box>
                </Grid> 
                }
              </Grid>
            }
          </FormProvider>
          {!checkAssignment && fields?.length > 0 && !show &&
            <Box mt="50px" textAlign="right" pb="18px">
              {
                type === "studentcustomform" ? <></>
                  :
                  <>
                    <Button variant="outlined" color="secondary" sx={{ mr: "20px" }} onClick={async () => {

                      customFormId !== "" && customFormId !== undefined
                        ? handleNavigate()
                        : navigate('/studentsAssessment?create=assessmentList')
                    }}>
                      Cancel
                    </Button>
                    <Button variant="outlined" color="secondary" sx={{ mr: "20px" }} onClick={() => setshow(true)}>
                      Preview
                    </Button>
                  </>
              }
              {/* {patientId ?
                <Button onClick={() => {setQuestIndex(0); reset()}} sx={{ mr: "20px" }} variant="contained" color="secondary">
                  Reset
                </Button> : null} */}
              <Button type="submit" sx={{ mr: "20px" }} variant="contained" color="secondary">
                {customFormId !== "" && customFormId !== undefined ? "Update" : "Save"}
              </Button>
            </Box>
          }
        </form>
      </Paper>
      <DialogBox buttonIcon={showAlert.title === "There is some error please try again later" || showAlert.title === "Please fill required fields" ? "error" : ""} openDialog={showAlert.show} handleSubmit={() => { setShowAlert({ show: false, title: "" }); navigate('/myAssignment') }} title={showAlert.title} buttonText="Ok" />
      <DialogBox buttonIcon={"delete"} openDialog={confirmDelete.show} handleSubmit={() => {
        setfieldsArray((prev: any) => {
          let array = { ...prev };
          let findIndex = array?.fields.findIndex((item: any) => item.id === confirmDelete?.id)
          if (findIndex !== -1) {
            array?.fields.splice(findIndex, 1)
          }
          return array;
        })
        setConfirmDelete({ show: false, id: "" })
      }} handleClose={() => setConfirmDelete({ show: false, id: "" })} title={'Do you want delete this custom filled this might affect the assigned assessment ?'} />
    </>
  );
}
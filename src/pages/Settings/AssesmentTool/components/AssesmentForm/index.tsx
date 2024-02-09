import {
  Input,
  FormControl,
  InputLabel,
  Grid,
  Select,
  MenuItem,
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  FormGroup,
  IconButton
} from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { ShowTableDataContext, UpdateDataContext } from "../../../../../utils/showHideTabData";
import DialogBox from "../../../../../components/DialogBox";
import { postDataRequest, updateRequest, getAssessmentTypeDataRequest, showFormData, editCustomName } from "../../../../../redux/modules/setting/assessmentTool/action";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';

type props = {
  editData?: any
}

export default function AddAssessment({ editData }: props) {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let location = useLocation();
  let [showAlert, setShowAlert] = useState({
    show: false,
    title: "",
    success: true
  })
  const [searchParams] = useSearchParams()
  const { showListData, setShowListData } = useContext(ShowTableDataContext);
  const { setEditData } = useContext(UpdateDataContext);
  let { postAssessment, updateAssessment, getAssessmentType, getAssessment, postCustomForm } = useSelector((state: any) => {
    let { postAssessment, updateAssessment, getAssessmentType, getAssessment, postCustomForm } = state;
    return { postAssessment, updateAssessment, getAssessmentType, getAssessment, postCustomForm }
  })
  let [formData, setFormData] = useState(getAssessment?.assementFormData?.formData != null ? getAssessment?.assementFormData?.formData : {
    assessmentTitle: "",
    module: "Clinical Care",
    duration: "",
    createdBy: "",
    assesmentType: "",
    objectives: "",
    description: "",
    file: "",
    imageUrl: "",
    hours: "00",
    minutes: "00",
    onlyView: false,
    isassesmentType: false,
  });
  useEffect(() => {
    dispatch(getAssessmentTypeDataRequest())
    if (editData !== undefined && editData !== null && Object.keys(editData)?.length > 0) {
      setEditData((prev: any) => ({ ...prev, editForm: true }))
    }
  }, [dispatch, setEditData])

  useEffect(() => {
    if (postAssessment?.customFormName != null && postAssessment?.customFormName !== undefined) {
      setFormData((prev: any) => ({ ...prev, assesmentType: getAssessmentType?.data?.data?.find((item: any) => item?.assessmentName === postAssessment?.customFormName)?._id }))
    }
    else if (postCustomForm?.showselectedFirst && getAssessmentType?.data?.success && searchParams.get('create') === "assessmentList") {
      setFormData((prev: any) => ({ ...prev, editForm: false, isassesmentType: true, assesmentType: postCustomForm?.showselectedFirst ? getAssessmentType?.data?.data?.[getAssessmentType?.data?.data?.length - 1]?._id : "" }))
    }
    else {

    }
  }, [getAssessmentType?.data?.data, getAssessmentType?.data?.success, postCustomForm?.showselectedFirst])


  useEffect(() => {
    if (postAssessment?.data?.success && !editData?._id) {
      setShowAlert({ show: true, title: postAssessment.data?.message, success: true })
      delete postAssessment?.data
    }
    if (postAssessment?.error && !editData?._id) {
      setShowAlert({ show: true, title: postAssessment.error?.message, success: false })
      delete postAssessment?.error
    }
    if (updateAssessment?.data?.success) {
      setShowAlert({ show: true, title: updateAssessment.data.message, success: true })
      delete updateAssessment?.data
    }
    if (updateAssessment?.error) {
      setShowAlert({ show: true, title: updateAssessment.error?.message, success: false })
      delete updateAssessment?.error
    }
  }, [postAssessment, editData?._id, updateAssessment]);

  useEffect(() => {
    if (editData?._id) {
      setFormData((prevalue: any) => {
        for (let i in editData) {
          if (editData[i] === null) {
            editData[i] = ""
          }
          if (i === "duration") {
            let duration = editData[i].split(":")
            editData.hours = duration[0]
            editData.minutes = duration[1]
          }
        }
        return {
          ...prevalue,
          ...editData,
          ...(editData.file && { imageUrl: editData?.file })
        };
      });
    }
  }, [editData]);


  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!formData?.onlyView) {
      let fileFormData: any = new FormData(e.target);
      fileFormData.append('isassesmentType', formData?.isassesmentType);
      fileFormData.append('file', formData.file);
      let hour: any = formData.hours;
      let minute: any = formData.minutes;
      if (!hour || hour === "") {
        hour = 0
      }
      if (!minute || minute === "") {
        minute = 0
      }
      fileFormData.append('duration', `${hour}:${minute}`);
      if (editData !== undefined && editData !== null && editData?._id || (formData?.isassesmentType && editData !== undefined && editData !== null && editData?.editForm || searchParams.get('edit'))) {
        dispatch(updateRequest({ id: editData._id || formData?._id, data: fileFormData }))
        dispatch(editCustomName(null))
      } else {
        dispatch(postDataRequest(fileFormData))
        dispatch(editCustomName(null))
      }
    }
  }

  const checkCustomForm = (id: any) => {
    let findAssessMentTypes = getAssessmentType?.data?.data?.find((item: any) => item?._id === id)
    return findAssessMentTypes
  }

  const updateData = (e: any, type: any) => {
    if (!formData.onlyView) {
      if (type === "assesmentType") {
        setFormData((prevalue: any) => {
          return {
            ...prevalue,
            isassesmentType: checkCustomForm(e.target.value).type === "Custom Form" ? true : false,
          }
        })
      }
      setFormData((prevalue: any) => {
        if (e?.target.name === "file") {
          return {
            ...prevalue,
            file: e?.target?.files[0],
            imageUrl: e.target.files[0].name
          };
        }
        if (e?.target.name === "hours" || e?.target.name === "minutes") {
          let value: any = Math.abs(Number(e?.target.value))
          if (value > 0 && value < 10) {
            value = `0${value}`
          }
          if (e?.target.name === "minutes" && value > 60) {
            value = ""
          }
          e.target.value = value
        }

        return {
          ...prevalue,
          [e?.target.name]: type && checkCustomForm(e.target.value).type === "Custom Form" ? checkCustomForm(e.target.value)?._id : type === "assesmentType" && checkCustomForm(e.target.value).type === undefined ? checkCustomForm(e.target.value)?._id : e?.target.value,
        };

      });
      dispatch(showFormData(formData, true))
    }
  };
  return (
    <>
      <Paper>
        <Stack p={2} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Typography fontWeight="600">Assesment Details</Typography>
          <Button
            onClick={() => {
              setShowListData(!showListData);
              dispatch(showFormData(null, false))
              navigate(location.pathname)
              dispatch(editCustomName(null))
            }}
          >
            <CloseIcon />
          </Button>
        </Stack>
        <Box
          component="form"
          onSubmit={(e) => { handleSubmit(e) }}>
          <Grid container spacing={2} p={2}>
            <Grid item sm={6} xs={12}>
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="assesmentTitle" required>
                  Assessment Title
                </InputLabel>
                <Input
                  id="assessmentTitle"
                  placeholder="Enter Title"
                  required
                  name="assessmentTitle"
                  fullWidth
                  disableUnderline
                  value={formData.assessmentTitle}
                  onChange={(e) => updateData(e, "")}
                />
              </FormControl>
            </Grid>
            <Grid item sm={6} xs={12}>
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="module" >
                  Module
                </InputLabel>
                <Select
                  id="module"
                  placeholder="Clinical Care"
                  name="module"
                  fullWidth
                  value={formData.module}
                  onChange={(e) => updateData(e, "")}
                >
                  <MenuItem value={"Clinical Care"} >
                    <Typography variant="body2">Clinical Care</Typography>
                  </MenuItem>
                  <MenuItem value={"Front Care"} >
                    <Typography variant="body2">Front Care</Typography>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={12} xs={12}>
              <FormGroup >
                <InputLabel shrink htmlFor="duration" required >
                  Duration
                </InputLabel>
                <Grid container spacing={2} alignItems={"center"}>
                  <Grid item lg={6} md={12} sm={12} xs={12}>
                    <FormControl variant="standard" sx={{ marginRight: "10px", width: { sm: "49%", xs: "100%" }, marginBottom: { sm: "0", xs: "16px" } }}>
                      <InputLabel shrink htmlFor="duration" required >
                        Hours
                      </InputLabel>
                      <Input
                        id="hours"
                        name="hours"
                        placeholder="00"
                        required
                        type="number"
                        disableUnderline
                        value={formData.hours}
                        onChange={(e) => updateData(e, "")}
                      />
                    </FormControl>
                    <FormControl variant="standard" sx={{ width: { sm: "49%", xs: "100%" } }}>
                      <InputLabel shrink htmlFor="duration" required >
                        Minutes
                      </InputLabel>
                      <Input
                        id="minutes"
                        name="minutes"
                        placeholder="00"
                        required
                        type="number"
                        disableUnderline
                        value={formData.minutes}
                        onChange={(e) => updateData(e, "")}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item lg={6} md={12} sm={12} xs={12}>
                    <Grid container spacing={2} alignItems={"center"}>
                      <Grid item lg={7} md={8} sm={12} xs={12}>
                        <FormControl variant="standard" fullWidth>
                          <InputLabel shrink htmlFor="assesmentType" required >
                            Assesment Type
                          </InputLabel>
                          <Select
                            placeholder="--Select--"
                            id="assesmentType"
                            name="assesmentType"
                            fullWidth
                            required
                            value={formData.assesmentType}
                            onChange={(e) => updateData(e, "assesmentType")}

                          >
                            {
                              getAssessmentType?.data?.data?.map((item: any, i: number) => (
                                <MenuItem value={item?._id} key={i}>
                                  <Typography variant="body2">{item?.assessmentName}</Typography>
                                </MenuItem>
                              ))
                            }

                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item lg={5} md={4} sm={12} xs={12}>
                        <FormControl variant="standard" fullWidth>
                          <Stack
                            sx={{ marginTop: { md: "37px", xs: "0" } }}
                            direction="row"
                            justifyContent="space-between"
                            alignItems={"center"}
                          >
                            {
                              (formData?.isassesmentType && editData !== undefined && editData !== null && editData?.editForm || formData?.isassesmentType && searchParams.get('edit')) ?
                                <IconButton sx={{ color: "#C53E4E" }} onClick={(e) => navigate(`/createForm?edit=${btoa(checkCustomForm(formData?.assesmentType)?.assessmentName)}`)}>
                                  <EditIcon />
                                </IconButton>
                                :
                                (searchParams.get('create') === "assessmentList") ? <Button
                                  variant="contained"
                                  color="secondary"
                                  onClick={() => navigate('/createForm')}
                                  startIcon={<AddCircleOutlineIcon sx={{ width: "30px", height: "30px" }} />}
                                >
                                  Create Form
                                </Button>
                                  : ""
                            }

                          </Stack>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </FormGroup>
            </Grid>



            <Grid item md={6} xs={12}>
              <FormControl variant="standard" fullWidth sx={{ mt: 2 }}>
                <InputLabel shrink htmlFor="objectives" required>
                  Objectives
                </InputLabel>
                <Input
                  sx={{ padding: "14px" }}
                  id="objectives"
                  name="objectives"
                  fullWidth
                  disableUnderline
                  multiline
                  minRows="5"
                  required
                  value={formData.objectives}
                  onChange={(e) => updateData(e, "")}

                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl variant="standard" fullWidth sx={{ mt: 2 }}>
                <InputLabel shrink htmlFor="description" required>
                  Description
                </InputLabel>
                <Input
                  sx={{ padding: "14px" }}
                  id="description"
                  name="description"
                  fullWidth
                  disableUnderline
                  multiline
                  minRows="5"
                  value={formData.description}
                  onChange={(e) => updateData(e, "")}
                  required
                />
              </FormControl>
            </Grid>
            <Grid item md={12} xs={12}>
              <FormControl variant="standard" fullWidth className="custom-dropzone">
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
                              onChange={(e) => updateData(e, "")}
                            />
                          </Box>
                        </Box>
                      </>
                  }
                </Box>
              </FormControl>
            </Grid>
          </Grid>

          <Box mt="50px" textAlign="right" pb="18px">
            <Button variant="outlined" color="secondary" sx={{ mr: "20px" }} onClick={() => {
              dispatch(showFormData(null, false))
              navigate(location.pathname); dispatch(editCustomName(null))
            }}>
              Cancel
            </Button>
            {!formData?.onlyView &&
              <Button sx={{ mr: "20px" }} variant="contained" color="secondary" type="submit">
                {(editData !== undefined && editData !== null && editData?.editForm || searchParams.get('edit')) ? "update" : "Save"}
              </Button>
            }
          </Box>
        </Box>
      </Paper>
      <DialogBox buttonIcon={showAlert.title === "There is some error please try again later" || showAlert.title === "Please fill required fields" ? "error" : ""} openDialog={showAlert.show} handleSubmit={() => { setShowAlert({ show: false, title: "", success: true }); if (showAlert.success) { dispatch(showFormData(null, false)); setShowListData(!showListData); navigate(location.pathname) } }} title={showAlert.title} buttonText="Ok" />
    </>
  );
}

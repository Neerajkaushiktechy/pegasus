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
  InputAdornment,
  IconButton
} from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE_URL } from "../../../../../utils/globalConstants";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import { ShowTableDataContext } from "../../../../../utils/showHideTabData";
import { fetchDocumentTypesRequest, fetchProviderDataRequest, postDocumentRequest, updateDocumentRequest } from "../../../../../redux/modules/patients/documents/action";
import DialogBox from "../../../../../components/DialogBox";
import DatePickerComponent from "../../../../../components/DatePicker";
import dayjs from "dayjs";
import { updateMyAssignmentStatusRequest } from "../../../../../redux/modules/studentView/myAssignments/action";
import { useNavigate } from "react-router";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddMasterData from "../../../../../components/AddMasterData";
import { postCustomMedicationRouteRequest, getFormDataRequest } from "../../../../../redux/modules/patients/medication/action";
import ModalPopup from "../../../../../components/Modal";
import { getRoleId } from "../../../../../utils/commonUtil";

type props = {
  editData?: any
  patientId?: any
  assessmentId?: any
  submittedTime?: any
  checkAssignment?: boolean
  assignmentId?: any
}

export default function AddDocumnets({ editData, patientId, assessmentId, submittedTime, assignmentId, checkAssignment = false }: props) {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let [fileUpload, setFileUpload] = useState("");
  let [file, setFile] = useState(editData !== null && editData !== undefined && Object.keys(editData)?.length > 0 && editData?.file ? editData?.file : "");
  let [showAlert, setShowAlert] = useState({
    show: false,
    title: ""
  });
  const [date, setDate] = useState(editData != null && Object.keys(editData)?.length > 0 ? editData?.date : dayjs())
  const [fileFormData, setFileFormData] = useState<any>(new FormData());

  const [show, setshow] = useState<boolean>(false);
  const [masterDataFormData, setmasterDataFormData] = useState({
    header: "",
    name: "",
    description: ""
  })

  let { getProviderName, postDemographic, getDocumentType, postDocumentData, updateDocument, postCustomMedicationRoute } = useSelector((state: any) => {
    let { getProviderName, postDemographic, getDocumentType, postDocumentData, updateDocument, postCustomMedicationRoute
    } = state;
    return { getProviderName, postDemographic, getDocumentType, postDocumentData, updateDocument, postCustomMedicationRoute }
  })

  const { showListData, setShowListData } = useContext(ShowTableDataContext) ?? {};

  useEffect(() => {
    if (postDocumentData.data?.success) {
      setShowAlert({ show: true, title: postDocumentData.data?.message })
      postDocumentData.data = postDocumentData.initialState.data;
      if (assessmentId) {
        let status = 2
        dispatch(updateMyAssignmentStatusRequest({ status, assessmentId, submittedTime }))
      }
    }
    if (updateDocument.data?.success) {
      setShowAlert({ show: true, title: updateDocument.data?.message })
      updateDocument.data = updateDocument.initialState.data;
    }
  }, [postDocumentData?.data?.success, updateDocument.data?.success, showListData, setShowListData, assessmentId]);
  useEffect(() => {
    dispatch(fetchProviderDataRequest());
    dispatch(fetchDocumentTypesRequest());
  }, [dispatch]);

  let obj = {
    name: "",
    date: "",
    documentType: "",
    notes: "",
    provider: "",
    file: "",
    onlyView: false,
    ...editData
  }

  useEffect(() => {
    fileFormData.set('submittedTime', submittedTime || '');
    fileFormData.set('assignmentId', assignmentId || '');
    setFileFormData(fileFormData);
  }, [submittedTime]);


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!obj?.onlyView) {
      const pId = postDemographic.data?.pId
      let newFormData: any = new FormData(e.target);
      newFormData.append("pId", patientId ? patientId : pId);
      newFormData.append('date', date);
      newFormData.append('docFile', fileUpload);
      if (editData?._id) {
        newFormData.append("id", editData._id);
        dispatch(updateDocumentRequest(newFormData));
      } else {
        newFormData.append('submittedTime', submittedTime || '');
        newFormData.append('assignmentId', assignmentId || '');
        dispatch(postDocumentRequest(newFormData));
      }
    };
  }

  const handleResetForm = () => {
    setDate(null)
    const nameInput = document.getElementById('name') as HTMLInputElement;
    const providerInput = document.getElementById('provider') as HTMLInputElement;
    const docType = document.getElementById('type') as HTMLInputElement;
    const notes = document.getElementById('notes') as HTMLInputElement;
    nameInput.value = '';
    providerInput.value = '';
    docType.value = "";
    notes.value = "";
  };


  const showFilename = (e: any) => {
    if (e?.target?.files[0].name) {
      setFileUpload(e?.target?.files[0])
    }
    setFile((e.target.files[0]?.name))
  }

  useEffect(() => {
    if (editData?.file) {
      setFile(editData.file)
    }
    if (editData?.date) {
      setDate(editData.date)
    }
  }, [editData?.file, editData?.date])

  useEffect(() => {
    dispatch(fetchDocumentTypesRequest());
    if (postCustomMedicationRoute?.data?.success) {
      setshow(false);
      setFileFormData((prev: any) => ({ ...prev, [masterDataFormData['name']]: postCustomMedicationRoute?.data?.data?._id }))

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


  return (
    <>
      <Paper>
        {!checkAssignment &&
          <Stack p={2} direction="row" justifyContent="space-between" alignItems="center" spacing={2} bgcolor="primary.light" sx={{ padding: "6px 20px" }}>
            <Typography>Add Document</Typography>
            {patientId ? (
              ""
            ) :
              <Button
                onClick={() => {
                  setShowListData(!showListData);
                }}
              >
                <CloseIcon sx={{ width: "36px", height: "36px" }} />
              </Button>
            }
          </Stack>
        }
        <Box
          id="my_form"
          component="form"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <Grid container spacing={2} p={2}>
            <Grid item md={12} xs={12}>
              <FormControl variant="standard" fullWidth className="custom-dropzone">
                <Box className="dropzone">
                  {
                    file !== "" ?
                      <>
                        <Button className="close_btn" onClick={() => setFile('')} sx={{ right: 0 }}> <CloseIcon />
                        </Button>
                        {
                          editData != undefined && Object.keys(editData)?.length > 0 && editData?.file != "" ?
                            <a href={`${API_BASE_URL}patientDocument/getDocumentFiles/${file}`} target="_blank">{file}</a>
                            : <p>{file}</p>
                        }

                      </>
                      :
                      <>
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
                              required={getRoleId() === 2 ? false : true}
                              id="docFile"
                              name="docFile"
                              type="file"
                              fullWidth
                              disableUnderline
                              className="dropzone-input"
                              onChange={showFilename}
                            // defaultValue={obj.file}
                            />
                          </Box>
                        </Box>
                      </>
                  }

                </Box>

              </FormControl>
            </Grid>
            <Grid>

            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="fName" required={getRoleId() === 2 ? false : true}>
                  Document Name {obj.name}
                </InputLabel>
                <Input
                  id="name"
                  placeholder="Name"
                  required={getRoleId() === 2 ? false : true}
                  name="name"
                  fullWidth
                  disableUnderline
                  readOnly={obj?.onlyView}
                  {...obj?.onlyView ? { value: obj.name } : { defaultValue: obj.name }}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="date" required={getRoleId() === 2 ? false : true} sx={{ position: "relative" }}>
                  Date
                </InputLabel>
                <DatePickerComponent id="dateInput" name="date" value={date !== "" ? dayjs(date) : null} onChange={(value: string) => { if (!obj?.onlyView) { setDate(value) } }} />

              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="Provider" >
                  Provider (Optional)
                </InputLabel>
                <Select
                  id="provider"
                  placeholder="Provider"
                  name="provider"
                  fullWidth
                  disableUnderline
                  {...obj?.onlyView ? { value: obj.provider } : { defaultValue: obj.provider }}
                  readOnly={obj?.onlyView}
                >
                  {getProviderName?.data && getProviderName.data.data.map((item: any) => {
                    return (
                      <MenuItem value={item.name} key={item.name}>
                        <Typography variant="body2">{item.name}</Typography>
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="type" required={getRoleId() === 2 ? false : true} >
                  Document Type
                </InputLabel>
                <Select
                  required={getRoleId() === 2 ? false : true}
                  id="type"
                  placeholder="type"
                  name="documentType"
                  readOnly={obj?.onlyView}
                  fullWidth
                  disableUnderline
                  {...obj?.onlyView ? { value: obj.documentType } : { defaultValue: obj.documentType }}

                >
                  {getDocumentType?.data && getDocumentType.data.data.map((item: any) => {
                    return (

                      <MenuItem value={item?._id} key={item.documentType}>
                        <Typography variant="body2">{item.documentType}</Typography>
                      </MenuItem>
                    )
                  })}
                  {
                    (getRoleId() === 1 || getRoleId() === 3) &&
                    <MenuItem sx={{ padding: 0 }}>
                      <Button onClick={() => { setmasterDataFormData((prev: any) => ({ ...prev, name: "documenttype", header: "Add Document Type" })); setshow(true) }} variant="contained" color="secondary" sx={{
                        borderRadius: "0 !important", width: "100%",
                        mr: 0
                      }}>
                        <AddCircleIcon sx={{ color: "#fff" }} />
                        <IconButton sx={{ paddingLeft: "0px", fontSize: "19px" }} />Add Document Type
                      </Button>
                    </MenuItem>
                  }
                </Select>
              </FormControl>
            </Grid>

            <Grid item md={12} xs={12}>
              <FormControl variant="standard" fullWidth sx={{ mt: 2 }}>
                <InputLabel shrink htmlFor="observation">
                  Notes (optional)
                </InputLabel>
                <Input
                  sx={{ padding: "14px" }}
                  id="notes"
                  name="notes"
                  fullWidth
                  disableUnderline
                  multiline
                  minRows="5"
                  {...obj?.onlyView ? { value: obj.notes } : { defaultValue: obj.notes }}
                  readOnly={obj?.onlyView}
                />
              </FormControl>
            </Grid>
          </Grid>
          {!checkAssignment &&
            <Box mt="50px" textAlign="right" pb="18px">
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
              {!obj.onlyView &&
                <Button sx={{ mr: "20px" }} variant="contained" color="secondary" type="submit">
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

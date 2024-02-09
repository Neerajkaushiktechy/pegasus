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
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Radio
} from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { ShowTableDataContext } from "../../../../../utils/showHideTabData";
import DialogBox from "../../../../../components/DialogBox";
import { postDataRequest, updateRequest } from "../../../../../redux/modules/setting/assessmentGroup/action";
import { getDataRequest } from "../../../../../redux/modules/setting/assessmentTool/action";


type props = {
  editData?: any
}

export default function AddAssessmentGroup({ editData }: props) {
  let dispatch = useDispatch();
  let [showAlert, setShowAlert] = useState({
    show: false,
    title: "",
    success: true
  });
  let [formData, setFormData] = useState<any>({
    status: true,
    assessmentTitle: "",
    assessmentList: [],
    onlyView: false
  });
  const { showListData, setShowListData } = useContext(ShowTableDataContext);

  let { getAssessment, postAssessmentGroup, updateAssessmentGroup } = useSelector((state: any) => {
    let { getAssessment, postAssessmentGroup, updateAssessmentGroup } = state;
    return { getAssessment, postAssessmentGroup, updateAssessmentGroup }
  })
  useEffect(() => {
    dispatch(getDataRequest({ pagenumber: 0, limit: 0 }))
  }, [dispatch])


  useEffect(() => {
    if (postAssessmentGroup?.data?.success && !editData?._id) {
      setShowAlert({ show: true, title: postAssessmentGroup.data?.message, success: true })
      delete postAssessmentGroup?.data
    }
    if (postAssessmentGroup?.error && !editData?._id) {
      setShowAlert({ show: true, title: postAssessmentGroup.error?.message, success: false })
      delete postAssessmentGroup?.error
    }
    if (updateAssessmentGroup?.data?.success) {
      setShowAlert({ show: true, title: updateAssessmentGroup.data.message, success: true })
      delete updateAssessmentGroup?.data
    }
    if (updateAssessmentGroup?.error) {
      setShowAlert({ show: true, title: updateAssessmentGroup.error?.message, success: false })
      delete updateAssessmentGroup?.error
    }
  }, [postAssessmentGroup, editData?._id, updateAssessmentGroup]);

  useEffect(() => {
    if (editData?._id) {
      let newAssessmentList: any = [];
      setFormData((prevalue: any) => {
        for (let i in editData) {
          if (editData[i] === null) {
            editData[i] = ""
          }
          if (i === "assessmentList" && editData[i][0]?._id) {
            for (let x in editData[i]) {
              if (editData[i][x]._id) {
                newAssessmentList.push(editData[i][x]._id)
              }
            }
          }
        }
        return {
          ...prevalue,
          ...editData,
          assessmentList: newAssessmentList,
        };
      });
    }
  }, [editData]);

  const updateData = (e: any) => {
    if (!formData?.onlyView) {
      setFormData((prevalue: any) => {
        return {
          ...prevalue,
          [e?.target.name]: e?.target.value,
        };
      });
    }
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!formData?.onlyView) {
      if (editData?._id) {
        dispatch(updateRequest({ id: editData._id, data: formData }))
      } else {
        dispatch(postDataRequest(formData))
      }
    }
  }
  return (
    <>
      <Paper>
        <Stack p={2} direction="row" justifyContent="space-between" alignItems="center" spacing={2} bgcolor="primary.light">
          <Typography fontWeight="600">Add Assesment Group</Typography>
          <Button
            onClick={() => {
              setShowListData(!showListData);
            }}
          >
            <CloseIcon />
          </Button>
        </Stack>
        <Box
          component="form"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <Grid container spacing={2} p={2}>
            <Grid item xs={12}>
              <FormControl variant="standard" fullWidth>
                <FormLabel htmlFor="status" required>
                  Status
                </FormLabel>
                <RadioGroup
                  sx={{ flexDirection: "row" }}
                  name="status"
                  id="status"
                  value={formData.status}
                  onChange={updateData}
                >
                  <FormControlLabel value={true} control={<Radio />} label="Active" />
                  <FormControlLabel value={false} control={<Radio />} label="Inactive" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="assessmentTitle" required>
                  Assesment Group Name
                </InputLabel>
                <Input
                  id="assessmentTitle"
                  placeholder=""
                  required
                  name="assessmentTitle"
                  fullWidth
                  disableUnderline
                  value={formData.assessmentTitle}
                  onChange={updateData}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="assessmentList" required>
                  Assesment List
                </InputLabel>
                <Select
                  id="assessmentList"
                  placeholder=""
                  name="assessmentList"
                  fullWidth
                  disableUnderline
                  value={formData.assessmentList}
                  onChange={updateData}
                  multiple>
                  {getAssessment?.data?.data?.length > 0 ?
                    getAssessment?.data?.data?.map((assessment: any) => (
                      <MenuItem value={assessment._id} key={assessment._id}>
                        {assessment?.assessmentTitle}
                      </MenuItem>
                    )) :
                    <MenuItem value={""} >
                      <Typography variant="body2">None</Typography>
                    </MenuItem>
                  }
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box mt="50px" textAlign="right" pb="18px !important">
            <Button variant="outlined" color="secondary" sx={{ mr: "20px" }} onClick={() => {
              setShowListData(!showListData);
            }}>
              Cancel
            </Button>
            {!formData?.onlyView &&
              <Button sx={{ mr: "20px" }} variant="contained" color="secondary" type="submit">
                {editData?._id ? "update" : "Save"}
              </Button>
            }
          </Box>
        </Box>
      </Paper>
      <DialogBox buttonIcon={showAlert.title === "There is some error please try again later" || showAlert.title === "Please fill required fields" ? "error" : ""} openDialog={showAlert.show} handleSubmit={() => { setShowAlert({ show: false, title: "", success: true }); if (showAlert.success) { setShowListData(!showListData) } }} title={showAlert.title} buttonText="Ok" />
    </>
  );
}

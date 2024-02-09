import {
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
  Input,
} from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { ShowTableDataContext, UpdateDataContext } from "../../../../utils/showHideTabData";
import DialogBox from "../../../../components/DialogBox";
import { postDataRequest, updateRequest } from "../../../../redux/modules/assignment/action";
import { fetchstudentsDataRequest } from "../../../../redux/modules/students/student/action";
import { getDemographicRequest } from "../../../../redux/modules/patients/demographic/action";
import DatePickerComponent from "../../../../components/DatePicker";
import { fetchdepartmentsDataRequest } from "../../../../redux/modules/students/department/action";
import dayjs from "dayjs";
import { getRole, getRoleId, getUserId } from "../../../../utils/commonUtil";
type props = {
  editData?: any
}

export default function AssignmentForm({ editData }: props) {
  let dispatch = useDispatch();
  let [showAlert, setShowAlert] = useState({
    show: false,
    title: "",
    success: true
  });
  let [formData, setFormData] = useState({
    assessmentToolList: editData?.assessmentToolList,
    assessmentGroupList: editData?.assessmentGroupList,
    assessmentType: editData?.activeTab === 0 ? "List" : "Group",
    department: "Biochemistry",
    students: [],
    name: [],
    patient: "",
    endDate: dayjs()
  });
  const { setEditData } = useContext(UpdateDataContext);
  let { getStudent, postAssignment, updateAssignment, patientsList, getDepartments } = useSelector((state: any) => {
    let { getStudent, postAssignment, updateAssignment, getDemographic: { data: patientsList }, getDepartments } = state;
    return { getStudent, postAssignment, updateAssignment, patientsList, getDepartments }
  })
  useEffect(() => {
    if (postAssignment?.data?.success && !editData?._id) {
      setShowAlert({ show: true, title: postAssignment.data?.message, success: true })
      delete postAssignment?.data
    }
    if (postAssignment?.error && !editData?._id) {
      setShowAlert({ show: true, title: postAssignment.error?.message, success: false })
      delete postAssignment?.error
    }
    if (updateAssignment?.data?.success) {
      setEditData({})
      setShowAlert({ show: true, title: updateAssignment.data.message, success: true })
      delete updateAssignment?.data
    }
    if (updateAssignment?.error) {
      setShowAlert({ show: true, title: updateAssignment.error?.message, success: false })
      delete updateAssignment?.error
    }
  }, [postAssignment, editData?._id, updateAssignment, setEditData]);

  useEffect(() => {
    if (editData?._id) {
      setFormData((prevalue) => {
        let student = [];
        for (let i in editData) {
          if (editData[i] === null) {
            editData[i] = ""
          }
          if (i === "students") {
            for (let x of editData[i]) {
              student.push(x._id)
            }
          }
          if (i === "assessmentType") {
            if (editData?.activeTab === 0) {
              editData[i] = "List"
            }
            else {
              editData[i] = "Group"
            }
          }

        }
        return {
          ...prevalue,
          ...editData,
          students: student
        };
      });
    }
  }, [editData]);

  useEffect(() => {
    dispatch(fetchdepartmentsDataRequest())
    dispatch(fetchstudentsDataRequest({ pagenumber: 0, limit: 0 }))
    dispatch(getDemographicRequest({ limit: 0, search: "", skip: 0 }));
  }, [dispatch]);

  const { showListData, setShowListData } = useContext(ShowTableDataContext);
  const updateData = (e: any) => {
    setFormData((prevalue) => {
      return {
        ...prevalue,
        [e?.target.name]: e?.target.value,
      };
    });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (editData?._id) {
      dispatch(updateRequest({ id: editData._id, data: formData }))
    } else {
      dispatch(postDataRequest(formData))
    }
  }
  return (
    <>
      <Paper>
        <Stack p={2} direction="row" justifyContent="space-between" alignItems="center" spacing={2} bgcolor="primary.light">
          <Typography fontWeight="600">Assigned To Students (By {editData.activeTab === 0 ? "List" : "Group"})</Typography>
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
            <Grid item md={6} xs={12}>
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="department" >
                  Department
                </InputLabel>
                <Select
                  disabled={editData?._id ? true : false}
                  id="department"
                  placeholder=""
                  name="department"
                  fullWidth
                  value={formData.department}
                  onChange={updateData}
                >
                  {getDepartments?.data?.data?.map((item: any, index: any) => {
                    return (
                      <MenuItem value={item?.departmentName} key={index}>
                        <Typography variant="body2">{item?.departmentName}</Typography>
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="student" required>
                  Students
                </InputLabel>
                <Select
                  disabled={editData?._id ? true : false}
                  id="students"
                  name="students"
                  multiple
                  fullWidth
                  value={formData.students}
                  onChange={updateData}>
                  {
                    getRole() === 1 ? (
                      getStudent?.data?.data?.length > 0 ?
                        getStudent?.data?.data?.map((student: any, index: number) => (
                          <MenuItem value={student._id} key={student._id}>
                            {student.fName} {student.lName}
                          </MenuItem>
                        )) :
                        <MenuItem value={""}>
                          <Typography variant="body2">None</Typography>
                        </MenuItem>
                    ) : (
                      getStudent?.data?.data?.filter((student: { createdBy: any }) => student.createdBy === getUserId())?.length > 0 ?
                        getStudent?.data?.data
                          .filter((student: { createdBy: any }) => student.createdBy === getUserId())
                          .map((student: any, index: number) => (
                            <MenuItem value={student._id} key={student._id}>
                              {student.fName} {student.lName}
                            </MenuItem>
                          )) :
                        <MenuItem value={""}>
                          <Typography variant="body2">None</Typography>
                        </MenuItem>
                    )
                  }

                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="student" required>
                  Patient
                </InputLabel>
                <Select
                  disabled={editData?._id ? true : false}
                  id="patient"
                  placeholder=""
                  name="patient"
                  value={formData.patient}
                  onChange={updateData}>
                  {
                    getRole() === 1 ? (
                      patientsList?.data?.length > 0 ?
                        patientsList?.data?.map((patient: any, index: number) => (
                          <MenuItem value={patient._id} key={patient._id}>
                            <Typography variant="body2">{patient.fName} {patient.lName}</Typography>
                          </MenuItem>
                        )) :
                        <MenuItem value={""}>
                          <Typography variant="body2">None</Typography>
                        </MenuItem>
                    ) : (
                      patientsList?.data?.filter((patient: { createdBy: any }) => patient.createdBy === getUserId())?.length > 0 ?
                        // patientsList?.data
                        //   .filter((patient: { createdBy: any }) => patient.createdBy === getUserId() && patient.roleId===1)
                        //   .map((patient: any, index: number) => (
                        //     <MenuItem value={patient._id} key={patient._id}>
                        //       <Typography variant="body2">{patient.fName} {patient.lName}</Typography>
                        //     </MenuItem>
                        //   ))
                        patientsList?.data
                          .filter((patient: any) => patient.createdBy === getUserId() || patient.roleId === 1)
                          .map((patient: any, index: number) => (
                            <MenuItem value={patient._id} key={patient._id}>
                              <Typography variant="body2">{patient.fName} {patient.lName}</Typography>
                            </MenuItem>
                          ))

                        :
                        <MenuItem value={""}>
                          <Typography variant="body2">None</Typography>
                        </MenuItem>
                    )
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="endDate" required sx={{ position: "relative" }}>
                  End date
                </InputLabel>
                <DatePickerComponent name="dob" value={dayjs(formData?.endDate)} onChange={(value: string) => setFormData((prev: any) => ({ ...prev, endDate: value }))} />
              </FormControl>
            </Grid>
          </Grid>
          <Box mt="50px" textAlign="right" pb="18px">
            <Button variant="outlined" color="secondary" sx={{ mr: "20px", mb: "10px" }} onClick={() => {
              setShowListData(!showListData);
            }}>
              Close
            </Button>
            <Button sx={{ mr: "20px", mb: "10px" }} variant="contained" color="secondary" type="submit">
              {editData?._id ? "update" : "save"}
            </Button>
          </Box>
        </Box>
      </Paper>
      <DialogBox buttonIcon={showAlert.title === "There is some error please try again later" || showAlert.title === "Please fill required fields" ? "error" : ""} openDialog={showAlert.show} handleSubmit={() => { setShowAlert({ show: false, title: "", success: true }); if (showAlert.success) { setShowListData(!showListData) } }} title={showAlert.title} buttonText="Ok" />
    </>
  );
}

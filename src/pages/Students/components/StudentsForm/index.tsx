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
  IconButton
} from "@mui/material";
import { useEffect, useState, useContext } from "react";
import InputMask from 'react-input-mask';
import closeIcon from "../../../../assets/close.png";
import { useDispatch } from "react-redux";
import { fetchdepartmentsDataRequest } from "../../../../redux/modules/students/department/action";
import { fetchcoursesDataRequest } from "../../../../redux/modules/students/course/action";
import { useSelector } from "react-redux";
import { checkEmailRequest, poststudentRequest, updateStudentRequest } from "../../../../redux/modules/students/student/action";
import DialogBox from "../../../../components/DialogBox";
import { ShowTableDataContext, UpdateDataContext } from "../../../../utils/showHideTabData";
import AddMasterData from "../../../../components/AddMasterData";
import { postCustomMedicationRouteRequest, getFormDataRequest } from "../../../../redux/modules/patients/medication/action";
import ModalPopup from "../../../../components/Modal";
import { getRoleId } from "../../../../utils/commonUtil";
import AddCircleIcon from '@mui/icons-material/AddCircle';
type props = {
  show?: any;
  setshow?: any;
  editData?: any
};
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
const Country = ["USA"];
const StudentForm = ({ editData }: props) => {
  const { setShowListData, showListData } = useContext(ShowTableDataContext);
  const { setEditData } = useContext(UpdateDataContext)
  let dispatch = useDispatch();
  let { getDepartments, getCourses, poststudent, checkEmail, updateStudent, postCustomMedicationRoute } = useSelector((state: any) => {
    let { getDepartments, getCourses, poststudent, checkEmail, updateStudent, postCustomMedicationRoute } = state
    return { getDepartments, getCourses, poststudent, checkEmail, updateStudent, postCustomMedicationRoute }
  })
  const [formData, setformData] = useState({
    fName: "",
    lName: "",
    email: "",
    confirmEmail: "",
    phone: "",
    city: "",
    state: "",
    country: "USA",
    departmentId: "",
    address1: "",
    address2: "",
    courseId: "",
    password: "",
  });
  const [errors, setErrors] = useState([])
  let [showAlert, setShowAlert] = useState({
    show: false,
    title: ""
  });
  const [show, setshow] = useState<boolean>(false);
  const [masterDataFormData, setmasterDataFormData] = useState({
    header: "",
    name: "",
    description: ""
  })
  const [email, setEmail] = useState("")
  useEffect(() => {
    dispatch(fetchdepartmentsDataRequest());
    dispatch(fetchcoursesDataRequest());
  }, [])

  useEffect(() => {
    if (poststudent.data?.success) {
      setShowListData(true);
      setShowAlert({ show: true, title: poststudent.data?.message })
      poststudent.data = poststudent?.data.initialState;
    }
    if (updateStudent?.data?.success) {
      setShowListData(true);
      setShowAlert({ show: true, title: updateStudent.data?.message })
      updateStudent.data = updateStudent.initialState.data;
    }
  }, [poststudent, updateStudent, showListData])

  useEffect(() => {
    if (editData?._id) {
      setformData((prevstate) => {
        let dataFormat = {
          fName: editData?.fName,
          lName: editData?.lName,
          email: editData?.email,
          phone: editData?.phone,
          city: editData?.city,
          state: editData?.state,
          country: editData?.country,
          departmentId: editData?.departmentId?._id,
          address1: editData?.address1,
          address2: editData?.address2,
          courseId: editData?.courseId?._id,
          password: editData?.password,
          _id: editData?._id
        }
        return {
          ...prevstate,
          ...dataFormat
        }
      })
    }
  }, [editData])

  function validateEmail(email: string) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  function validatePassword(value: string) {
    let errors: any = [];
    if (value.length < 8) {
      errors.push("Your password must be at least 8 characters");
    }
    if (value.search(/[a-z]/i) < 0) {
      errors.push("Your password must contain at least one letter.");
    }
    if (value.search(/(?=.*\W)/i) < 0) {
      errors.push("Your password must contain at least one special characters.");
    }
    if (value.search(/[0-9]/) < 0) {
      errors.push("Your password must contain at least one digit.");
    }
    setErrors(errors)
    return true;
  }

  function validateConfirmEmail(value: string) {
    let errors: any = [];
    if (value !== email) {
      errors.push("Email does not match");
    }
    setErrors(errors)
    return true;
  }

  const handleChangeForm = (e: any) => {
    const { name, value } = e.target;
    if (name === "email" && !editData?._id) {
      if (validateEmail(value)) {
        setEmail(value)
        dispatch(checkEmailRequest({ email: value }))
      }
    }
    if (name === "password") {
      validatePassword(value)
    }
    if (name === "confirmEmail") {
      validateConfirmEmail(value)
    }
    setformData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (formData?.departmentId === "" || formData?.departmentId === undefined) {
      delete (formData as any).departmentId
    }
    if (editData?._id) {
      dispatch(updateStudentRequest(formData))
      setTimeout(() => {
        setEditData({})
      }, 500)
    }
    else {
      dispatch(poststudentRequest(formData))
    }
  };
  const clearErrorMessage = () => {
    if (checkEmail?.data?.message != "") {
      checkEmail.data = checkEmail.initialState.data;
    }
  }

  useEffect(() => {
    dispatch(fetchdepartmentsDataRequest());
    dispatch(fetchcoursesDataRequest());
    if (postCustomMedicationRoute?.data?.success) {
      setshow(false);
      setformData((prev: any) => ({ ...prev, [masterDataFormData['name']]: postCustomMedicationRoute?.data?.data?._id }))

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

  console.log(formData, "formdata")

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#440E661A",
          padding: "24px 18px",
          borderRadius: "4px 4px 0px 0px",
          marginBottom: "20px",
        }}
      >
        <p>{editData?._id ? "Update Student" : "Add Student"}</p>
        <img
          style={{ cursor: "pointer" }}
          src={closeIcon}
          alt="close"
          onClick={() => { setShowListData(true); setEditData({}) }}
        />
      </div>
      <Box
        component="form"
        sx={{ padding: "30px !important" }}
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="fName" required>
                    First Name
                  </InputLabel>
                  <Input
                    id="fName"
                    placeholder="Enter First Name"
                    required
                    name="fName"
                    fullWidth
                    value={formData?.fName}
                    onChange={handleChangeForm}
                    disableUnderline
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="lName" required>
                    Last Name
                  </InputLabel>
                  <Input
                    id="lName"
                    placeholder="Enter last Name"
                    required
                    name="lName"
                    value={formData?.lName}
                    onChange={handleChangeForm}
                    fullWidth
                    disableUnderline
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="email" required>
                    Email Address
                  </InputLabel>
                  <Input
                    id="email"
                    name="email"
                    placeholder="Enter Email Address"
                    required
                    value={formData?.email}
                    type="email"
                    onChange={handleChangeForm}
                    fullWidth
                    disabled={editData?._id}
                    disableUnderline
                  />
                  {
                    checkEmail?.data?.message != "" && <p className="error">{checkEmail?.data?.message}</p>
                  }
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="email" required>
                    Confrim Email Address
                  </InputLabel>
                  <Input
                    id="confirmEmail"
                    name="confirmEmail"
                    placeholder="Enter Email Address"
                    required
                    value={formData?.confirmEmail}
                    type="email"
                    onChange={handleChangeForm}
                    fullWidth
                    disabled={editData?._id}
                    disableUnderline
                  />
                  {
                    errors != null && <p className="error">{errors[0]}</p>
                  }
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="phone" required>
                    Phone Number
                  </InputLabel>

                  <InputMask
                    mask="+1 (999) 999-9999"
                    value={formData.phone}
                    disabled={false}
                    maskChar=" "
                    onChange={handleChangeForm}
                  >
                    <Input id="phone" name="phone" placeholder="Enter Phone Number" required fullWidth disableUnderline
                      value={formData.phone} />
                  </InputMask>

                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="city">
                    City
                  </InputLabel>
                  <Input
                    id="city"
                    name="city"
                    placeholder="Enter city"
                    value={formData?.city}
                    onChange={handleChangeForm}
                    fullWidth
                    disableUnderline
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="state">
                    State
                  </InputLabel>
                  <Input
                    name="state"
                    onChange={handleChangeForm}
                    placeholder="Enter state"
                    fullWidth
                    value={formData?.state}
                    disableUnderline
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="country">
                    Country
                  </InputLabel>
                  <Select
                    placeholder="referredBy"
                    name="country"
                    defaultValue="USA"
                    value={formData?.country}
                    onChange={handleChangeForm}
                    fullWidth
                    disableUnderline
                  >
                    {/* <MenuItem value="">
                      <Typography variant="body2">none</Typography>
                    </MenuItem> */}
                    {Country.map((item: any, index: any) => {
                      return (
                        <MenuItem value={item} key={index}>
                          <Typography variant="body2">{item}</Typography>
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="departmentId">
                    Department
                  </InputLabel>
                  <Select
                    MenuProps={MenuProps}
                    id="departmentId"
                    placeholder="Select"
                    name="departmentId"
                    value={formData?.departmentId}
                    onChange={handleChangeForm}
                    defaultValue=""
                    fullWidth
                    disableUnderline
                  >
                    {/* <MenuItem value="">
                      <Typography variant="body2">none</Typography>
                    </MenuItem> */}
                    {getDepartments?.data?.data?.map((item: any, index: any) => {
                      return (
                        <MenuItem value={item?._id} key={index}>
                          <Typography variant="body2">{item?.departmentName}</Typography>
                        </MenuItem>
                      );
                    })}
                    {
                      (getRoleId() === 1 || getRoleId() === 3) &&
                      <MenuItem sx={{ padding: 0 }}>
                        <Button onClick={() => { setmasterDataFormData((prev: any) => ({ ...prev, name: "department", header: "Add Department" })); setshow(true) }} variant="contained" color="secondary" sx={{
                          borderRadius: "0 !important", width: "100%",
                          mr: 0
                        }}>
                          <AddCircleIcon sx={{ color: "#fff" }} />
                          <IconButton sx={{ paddingLeft: "0px", fontSize: "19px" }} />Add Department
                        </Button>
                      </MenuItem>
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="addressline1">
                    Address Line 1
                  </InputLabel>
                  <Input
                    id="address1"
                    name="address1"
                    placeholder="Enter Address"
                    onChange={handleChangeForm}
                    value={formData?.address1}
                    fullWidth
                    disableUnderline
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="addressline2">
                    Address Line 2
                  </InputLabel>
                  <Input
                    id="address2"
                    name="address2"
                    placeholder="Enter Address"
                    fullWidth
                    onChange={handleChangeForm}
                    value={formData?.address2}
                    disableUnderline
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="courseId" required>
                    Profile
                  </InputLabel>
                  <Select
                    MenuProps={MenuProps}
                    placeholder="Select"
                    name="courseId"
                    required
                    onChange={handleChangeForm}
                    defaultValue=""
                    value={formData?.courseId}
                    fullWidth
                    disableUnderline
                  >
                    {/* <MenuItem value="">
                      <Typography variant="body2">none</Typography>
                    </MenuItem> */}
                    {getCourses?.data?.data?.map((item: any, index: any) => {
                      return (
                        <MenuItem value={item?._id} key={index}>
                          <Typography variant="body2">{item?.coursename}</Typography>
                        </MenuItem>
                      );
                    })}
                    {
                      (getRoleId() === 1 || getRoleId() === 3) &&
                      <MenuItem sx={{ padding: 0 }}>
                        <Button onClick={() => { setmasterDataFormData((prev: any) => ({ ...prev, name: "course", header: "Add Profile" })); setshow(true) }} variant="contained" color="secondary" sx={{
                          borderRadius: "0 !important", width: "100%",
                          mr: 0
                        }}>
                          <AddCircleIcon sx={{ color: "#fff" }} />
                          <IconButton sx={{ paddingLeft: "0px", fontSize: "19px" }} />Add Profile
                        </Button>
                      </MenuItem>
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="phone">
                    Useremail
                  </InputLabel>
                  <Input
                    id="phone"
                    name="useremail "
                    placeholder=""
                    value={formData?.email}
                    readOnly
                    fullWidth
                    disableUnderline
                  />
                </FormControl>
              </Grid>
              {
                editData?._id ? <></> :
                  <Grid item xs={6}>
                    <FormControl variant="standard" fullWidth>
                      <InputLabel shrink htmlFor="password" required>
                        Password
                      </InputLabel>
                      <Input
                        id="phone"
                        type="password"
                        name="password"
                        value={formData?.password}
                        placeholder=""
                        onChange={handleChangeForm}
                        fullWidth
                        required
                        disabled={editData?._id}
                        disableUnderline
                      />
                      {
                        errors != null && <p className="error">{errors[0]}</p>
                      }
                    </FormControl>
                  </Grid>
              }

            </Grid>
          </Grid>
        </Grid>
        <Box mt="50px" textAlign="right">
          <Button
            onClick={() => { setShowListData(true); setEditData({}); clearErrorMessage() }}
            variant="outlined"
            color="secondary"
            sx={{ mr: "20px" }}
          >
            Cancel
          </Button>
          <Button disabled={(checkEmail?.data?.message || errors.length > 0)} variant="contained" color="secondary" type="submit">
            {editData?._id ? "Update" : "Save"}
          </Button>
        </Box>
      </Box>
      <DialogBox buttonIcon={showAlert.title === "There is some error please try again later" || showAlert.title === "Please fill required fields" ? "error" : ""} openDialog={showAlert.show} handleSubmit={() => setShowAlert({ show: false, title: "" })} title={showAlert.title} buttonText="Ok" />
      <ModalPopup show={show} setshow={setshow} childern={<AddMasterData setshow={setshow} handleSubmit={handleSubmitMaterData} masterDataFormData={masterDataFormData} setmasterDataFormData={setmasterDataFormData} />} type="assignment" view={undefined} />
    </>
  );
};
export default StudentForm;

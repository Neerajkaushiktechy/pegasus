import { Input, FormControl, InputLabel, Grid, Box, Button, Typography, Select, MenuItem, TextField } from "@mui/material";
import ProfileCard from "./ProfileCard";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InputMask from 'react-input-mask';
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from 'react'
import { getRole } from "../../../utils/commonUtil";
import { useDispatch, useSelector } from "react-redux";
import { fetchprofileDataRequest, updateProfileRequest } from "../../../redux/modules/profile/action";
import { fetchdepartmentsDataRequest } from "../../../redux/modules/students/department/action";
import { fetchcoursesDataRequest } from "../../../redux/modules/students/course/action";
import DialogBox from "../../../components/DialogBox";
import { API_BASE_URL } from "../../../utils/globalConstants";
import Loader from "../../../components/Loader";
type props = {
  setshow?: any;
}
const Country = ["USA"];
const Profile = ({ setshow }: props) => {
  let dispatch = useDispatch();
  const roleType: number = getRole();
  let { getProfile, getDepartments, getCourses, updateProfile } = useSelector((state: any) => {
    let { getProfile, getDepartments, getCourses, updateProfile } = state;
    return {
      getProfile,
      getDepartments,
      getCourses,
      updateProfile
    }
  })
  const [formData, setformData] = useState({
    name: "",
    email: "",
    fName: "",
    lName: "",
    phone: "",
    city: "",
    state: "",
    country: "USA",
    departmentId: "",
    address1: "",
    address2: "",
    courseId: "",
    password: "",
    schoolCode: "",
    schoolName: "",
    cp_fName: "",
    cp_lName: "",
    cp_email: "",
    cp_phone: "",
    address: "",
    user_Id: "",
    profilePic: "",
    imageUrl: ""
  });
  let [showAlert, setShowAlert] = useState({
    show: false,
    title: "",
    redirect: false
  });

  useEffect(() => {
    dispatch(fetchprofileDataRequest())
    dispatch(fetchdepartmentsDataRequest());
    dispatch(fetchcoursesDataRequest());
    let message;
    let showMessage = false;
    let redirect = false;
    if (updateProfile?.data?.success) {
      showMessage = true;
      redirect = true;
      message = updateProfile?.data?.message
      delete updateProfile.data?.success
    }
    if (showMessage) {
      setShowAlert({ show: true, title: message, redirect })
    }
  }, [dispatch, updateProfile.data?.message, updateProfile.data?.success])

  useEffect(() => {
    if (getProfile?.data?.success) {
      setformData((prev: any) => {
        return {
          ...prev,
          ...getProfile.data?.data,
          ...(getProfile.data?.data.profilePic && { imageUrl: getProfile.data?.data !== undefined && Object.keys(getProfile.data?.data)?.length > 0 && getProfile.data?.data?.profilePic !== "" && `${API_BASE_URL}profilephoto/${getProfile.data?.data?._id}/${getProfile.data?.data?.profilePic}` })
        }
      }
      )
    }
  }, [getProfile?.data?.success])

  const handleChangeForm = (e: any) => {
    const { name, value } = e.target;
    if (e?.target.name === "avatar") {
      setformData((prevalue: any) => {
        return {
          ...prevalue,
          profilePic: e?.target?.files[0],
          imageUrl: URL.createObjectURL(e.target.files[0])
        };
      })
    }
    else {
      setformData((prev: any) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    let fileFormData = new FormData(e.target);
    if (formData?.departmentId === "" || formData?.departmentId === undefined) {
      fileFormData.delete('departmentId')
    }
    fileFormData.append('profilePic', formData.profilePic)
    dispatch(updateProfileRequest(fileFormData))
  }
  const handleChangeNavigate = () => [
    setShowAlert({ show: false, title: "", redirect: false })
  ]

  if (getProfile.loading) {
    return <Loader />
  }
  return (
    <>
      <ProfileCard formData={formData} setshow={setshow} name={getProfile?.data?.data?.name ? getProfile?.data?.data?.name : getProfile?.data?.data?.cp_fName ? getProfile?.data?.data?.cp_fName + " " + getProfile?.data?.data?.cp_lName : getProfile?.data?.data?.fName + " " + getProfile?.data?.data?.lName} email={getProfile?.data?.data?.email} />
      {
        (() => {
          switch (roleType) {
            case 1:
              return (
                <Box component="form" onSubmit={(e) => { handleSubmit(e) }}>
                  <Grid container spacing={2}>
                    <Grid item lg={8} xs={12} >
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <FormControl variant="standard" fullWidth>
                            <InputLabel shrink htmlFor="name" required>
                              Name
                            </InputLabel>
                            <Input
                              id="name"
                              placeholder="Enter Name"
                              required
                              name="name"
                              fullWidth
                              onChange={handleChangeForm}
                              value={formData.name}
                              type="name"
                              disableUnderline
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                          <FormControl variant="standard" fullWidth>
                            <InputLabel shrink htmlFor="email" required>
                              Email
                            </InputLabel>
                            <Input
                              id="email"
                              placeholder="Enter Enail"
                              required
                              name="email"
                              fullWidth
                              disabled
                              value={formData.email}
                              type="email"
                              disableUnderline
                            />
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
                            formData?.imageUrl !== "" ? <> <Button className="close_btn" onClick={() => setformData((prev: any) => ({ ...prev, imageUrl: "", profilePic: "" }))} sx={{ right: 0 }}> <CloseIcon /></Button> <img src={formData?.imageUrl} alt="Demographic file" style={{ maxHeight: "250px", width: "100%", objectFit: "contain" }} />
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
                                    <Input id="avatar" name="avatar" type="file" fullWidth disableUnderline className="dropzone-input" onChange={handleChangeForm} />
                                  </Box>
                                </Box>
                              </>

                          }

                        </Box>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Box mt="50px" textAlign="right">
                    <Button variant="contained" color="secondary" type="submit" >
                      Update
                    </Button>
                  </Box>
                </Box>
              )
            case 2:
              return (
                <Box component="form" onSubmit={(e) => { handleSubmit(e) }}>
                  <Grid container spacing={2}>
                    <Grid item lg={8} xs={12} >
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
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
                        <Grid item xs={4}>
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
                        <Grid item xs={4}>
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
                              disabled={true}
                              disableUnderline
                            />

                          </FormControl>
                        </Grid>
                        <Grid item xs={4}>
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
                        <Grid item xs={4}>
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
                        <Grid item xs={4}>
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
                        <Grid item xs={4}>
                          <FormControl variant="standard" fullWidth>
                            <InputLabel shrink htmlFor="country">
                              Country
                            </InputLabel>
                            <Select
                              placeholder="referredBy"
                              name="country"
                              disabled
                              defaultValue="USA"
                              value={formData?.country}
                              onChange={handleChangeForm}
                              fullWidth
                              disableUnderline
                            >
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
                        <Grid item xs={4}>
                          <FormControl variant="standard" fullWidth>
                            <InputLabel shrink htmlFor="departmentId">
                              Department
                            </InputLabel>
                            <Select
                              id="departmentId"
                              placeholder="Select"
                              name="departmentId"
                              value={formData?.departmentId}
                              onChange={handleChangeForm}
                              defaultValue=""
                              fullWidth
                              disableUnderline
                            >

                              {getDepartments?.data?.data?.map((item: any, index: any) => {
                                return (
                                  <MenuItem value={item?._id} key={index}>
                                    <Typography variant="body2">{item?.departmentName}</Typography>
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={4}>
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
                        <Grid item xs={4}>
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
                        <Grid item xs={4}>
                          <FormControl variant="standard" fullWidth>
                            <InputLabel shrink htmlFor="courseId" required>
                              Profile
                            </InputLabel>
                            <Select
                              placeholder="Select"
                              name="courseId"
                              required
                              disabled
                              onChange={handleChangeForm}
                              defaultValue=""
                              value={formData?.courseId}
                              fullWidth
                              disableUnderline
                            >

                              {getCourses?.data?.data?.map((item: any, index: any) => {
                                return (
                                  <MenuItem value={item?._id} key={index}>
                                    <Typography variant="body2">{item?.coursename}</Typography>
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={4}>
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
                      </Grid>
                    </Grid>
                    <Grid item lg={4} xs={12}>
                      <FormControl variant="standard" fullWidth className="custom-dropzone">
                        <InputLabel shrink htmlFor="avatar">
                          Your Photo
                        </InputLabel>
                        <Box className="dropzone">

                          {
                            formData?.imageUrl !== "" ? <> <Button className="close_btn" onClick={() => setformData((prev: any) => ({ ...prev, imageUrl: "", profilePic: "" }))} sx={{ right: 0 }}> <CloseIcon /></Button> <img src={formData?.imageUrl} alt="Demographic file" style={{ maxHeight: "250px", width: "100%", objectFit: "contain" }} />
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
                                    <Input id="avatar" name="avatar" type="file" fullWidth disableUnderline className="dropzone-input" onChange={handleChangeForm} />
                                  </Box>
                                </Box>
                              </>

                          }
                        </Box>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Box mt="50px" textAlign="right">
                    <Button variant="contained" color="secondary" type="submit">
                      Update
                    </Button>
                  </Box>
                </Box>

              )
            case 3:
              return (
                <Box component="form" onSubmit={(e) => { handleSubmit(e) }}>
                  <Grid container spacing={2}>
                    <Grid item lg={8} xs={12}>
                      <Grid container spacing={2}>
                        <Grid container spacing={4}>
                          <Grid item xs={4}>
                            <FormControl variant="standard" fullWidth>
                              <InputLabel shrink htmlFor="schoolCode" required>
                                School Code
                              </InputLabel>
                              <Input
                                id="schoolCode"
                                placeholder="Enter School Code"
                                required
                                name="schoolCode"
                                fullWidth
                                onChange={handleChangeForm}
                                value={formData.schoolCode}
                                disableUnderline
                              />
                            </FormControl>
                          </Grid>
                          <Grid item xs={4}>
                            <FormControl variant="standard" fullWidth>
                              <InputLabel shrink htmlFor="schoolName" required>
                                School Name
                              </InputLabel>
                              <Input
                                id="schoolName"
                                placeholder="Enter School Name"
                                required
                                name="schoolName"
                                onChange={handleChangeForm}
                                value={formData.schoolName}
                                fullWidth
                                disableUnderline
                              />
                            </FormControl>
                          </Grid>
                          <Grid item xs={4}>
                            <FormControl variant="standard" fullWidth>
                              <InputLabel shrink htmlFor="phone" required>
                                Phone Number
                              </InputLabel>
                              <InputMask
                                mask="+1 (999) 999-9999"
                                disabled={false}
                                onChange={handleChangeForm}
                                value={formData.phone}
                                maskChar=" "
                              >
                                <Input id="phone" name="phone" placeholder="Enter Phone Number" required fullWidth disableUnderline
                                />
                              </InputMask>

                            </FormControl>
                          </Grid>
                          <Grid item xs={4}>
                            <FormControl variant="standard" fullWidth>
                              <InputLabel shrink htmlFor="email" required>
                                Email Address
                              </InputLabel>
                              <Input
                                id="email"
                                name="email"
                                placeholder="Enter Email Address"
                                required
                                type="email"
                                disabled
                                onChange={handleChangeForm}
                                value={formData.email}
                                fullWidth
                                disableUnderline
                              />

                            </FormControl>
                          </Grid>


                          <Grid item xs={12}>
                            <FormControl variant="standard" fullWidth>
                              <InputLabel sx={{ position: "relative" }} shrink htmlFor="address">
                                Address
                              </InputLabel>
                              <TextField
                                id="address"
                                rows={2}
                                name="address"
                                onChange={handleChangeForm}
                                value={formData.address}
                                placeholder="Enter Address"
                                multiline
                                fullWidth
                              />
                            </FormControl>
                          </Grid>

                        </Grid>
                        <Typography sx={{ fontSize: "18px", margin: "20px 0" }}>Contact Person Details</Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Grid container spacing={4}>
                              <Grid item xs={4}>
                                <FormControl variant="standard" fullWidth>
                                  <InputLabel shrink htmlFor="cp_fName" required>
                                    First Name
                                  </InputLabel>
                                  <Input
                                    id="cp_fName"
                                    placeholder="Enter First Name"
                                    required
                                    onChange={handleChangeForm}
                                    value={formData.cp_fName}
                                    name="cp_fName"
                                    fullWidth
                                    disableUnderline
                                  />
                                </FormControl>
                              </Grid>
                              <Grid item xs={4}>
                                <FormControl variant="standard" fullWidth>
                                  <InputLabel shrink htmlFor="cp_lName" required>
                                    Last Name
                                  </InputLabel>
                                  <Input
                                    id="cp_lName"
                                    placeholder="Enter last Name"
                                    required
                                    onChange={handleChangeForm}
                                    value={formData.cp_lName}
                                    name="cp_lName"
                                    fullWidth
                                    disableUnderline
                                  />
                                </FormControl>
                              </Grid>
                              <Grid item xs={4}>
                                <FormControl variant="standard" fullWidth>
                                  <InputLabel shrink htmlFor="phone" required>
                                    Phone Number
                                  </InputLabel>
                                  <InputMask
                                    mask="+1 (999) 999-9999"
                                    disabled={false}
                                    maskChar=" "
                                    onChange={handleChangeForm}
                                    value={formData.cp_phone}
                                  >
                                    <Input id="cp_phone" name="cp_phone" placeholder="Enter Phone Number" required fullWidth disableUnderline
                                    />
                                  </InputMask>

                                </FormControl>
                              </Grid>
                              <Grid item xs={4}>
                                <FormControl variant="standard" fullWidth>
                                  <InputLabel shrink htmlFor="cp_email" required>
                                    Email Address
                                  </InputLabel>
                                  <Input
                                    id="cp_email"
                                    name="cp_email"
                                    placeholder="Enter Email Address"
                                    required
                                    onChange={handleChangeForm}
                                    value={formData.cp_email}
                                    type="email"
                                    fullWidth
                                    disableUnderline
                                  />

                                </FormControl>
                              </Grid>
                              <Grid item xs={4}>
                                <FormControl variant="standard" fullWidth>
                                  <InputLabel shrink htmlFor="user_Id" required>
                                    User Id
                                  </InputLabel>
                                  <Input
                                    id="user_Id"
                                    disabled={true}
                                    onChange={handleChangeForm}
                                    value={formData.user_Id}
                                    name="user_Id"
                                    fullWidth
                                    disableUnderline
                                  />
                                </FormControl>
                              </Grid>
                            </Grid>
                          </Grid>

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
                            formData?.imageUrl !== "" ? <> <Button className="close_btn" onClick={() => setformData((prev: any) => ({ ...prev, imageUrl: "", profilePic: "" }))} sx={{ right: 0 }}> <CloseIcon /></Button> <img src={formData?.imageUrl} alt="Demographic file" style={{ maxHeight: "250px", width: "100%", objectFit: "contain" }} />
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
                                    <Input id="avatar" name="avatar" type="file" fullWidth disableUnderline className="dropzone-input" onChange={handleChangeForm} />
                                  </Box>
                                </Box>
                              </>

                          }
                        </Box>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Box mt="50px" textAlign="right">
                    <Button variant="contained" color="secondary" type="submit" >
                      Update
                    </Button>
                  </Box>
                </Box>
              )
            default:
              <></>

          }
        })()
      }
      <DialogBox buttonIcon={showAlert.title === "There is some error please try again later" || showAlert.title === "Please fill required fields" ? "error" : ""} openDialog={showAlert.show} handleSubmit={() => handleChangeNavigate()} title={showAlert.title} buttonText="Ok" />
    </>
  )
}

export default Profile
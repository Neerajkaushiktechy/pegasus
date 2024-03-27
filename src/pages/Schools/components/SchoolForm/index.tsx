import {
  Input,
  FormControl,
  InputLabel,
  Grid,
  Box,
  Button,
  TextField,
  Typography
} from "@mui/material";
import { useEffect, useState, useContext } from "react";
import InputMask from 'react-input-mask';
import closeIcon from "../../../../assets/close.png";
import { ShowTableDataContext, UpdateDataContext } from "../../../../utils/showHideTabData";
import { checkEmailRequest, postschoolRequest, updateSchoolRequest, checkUserIdRequest } from "../../../../redux/modules/school/action";
import { useDispatch } from "react-redux";
import { randomUser_Id } from "../../../../utils/randomGenerator";
import { useSelector } from "react-redux";
type props = {
  editData?: any,

};
export const AddSchoolForm = ({ editData }: props) => {
  let dispatch = useDispatch();
  let { postschool, updateSchool, checkSchoolEmail, checkSchoolUserId } = useSelector((state: any) => {
    let { postschool, updateSchool, checkSchoolEmail, checkSchoolUserId } = state;
    return {
      postschool,
      updateSchool,
      checkSchoolEmail,
      checkSchoolUserId
    }
  })
  const { setShowListData, showListData } = useContext(ShowTableDataContext);
  const { setEditData } = useContext(UpdateDataContext)
  const [formData, setformData] = useState({
    schoolCode: "",
    schoolName: "",
    cp_fName: "",
    cp_lName: "",
    email: "",
    confirmEmail: "",
    password: "",
    phone: "",
    cp_email: "",
    cp_phone: "",
    address: "",
    user_Id: ""
  });
  const [errors, setErrors] = useState([])
  const [email, setEmail] = useState("")

  useEffect(() => {
    if (editData?._id) {
      setformData((prevstate) => {
        return {
          ...prevstate,
          ...editData
        }
      })
    }
  }, [editData])

  useEffect(() => {
    if (postschool.data?.success) {
      setShowListData(true);
      postschool.data = postschool?.data.initialState;
    }
    if (updateSchool?.data?.success) {
      setShowListData(true);
      updateSchool.data = updateSchool.initialState.data;
    }
  }, [postschool, updateSchool, showListData])


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

  function validateEmail(email: string) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
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
    if ((name === "email" || name === "cp_email") && !editData?._id) {
      if (validateEmail(value)) {
        setEmail(value)
        dispatch(checkEmailRequest({ [name]: value.trim() }))
      }
    }
    if (name === "password") {
      validatePassword(value)
    }
    if (name === "confirmEmail") {
      validateConfirmEmail(value)
    }

    if (name === "user_Id") {
      dispatch(checkUserIdRequest({ [name]: value.trim() }))
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
    if (editData?._id) {
      let data: any = {
        ...formData,
        _id: editData?._id
      }
      dispatch(updateSchoolRequest(data))
      setTimeout(() => {
        setEditData({})
      }, 1000)
    }
    else {
      dispatch(postschoolRequest(formData))

    }
  }
  const clearErrorMessage = () => {
    if (checkSchoolEmail?.data?.message !== "") {
      checkSchoolEmail.data = checkSchoolEmail.initialState.data;
    }
    if (checkSchoolUserId?.data?.message !== "") {
      checkSchoolUserId.data = checkSchoolUserId.initialState.data;
    }
  }

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
        <p>{editData?._id ? "Update School" : "Add School"}</p>
        <img
          style={{ cursor: "pointer" }}
          src={closeIcon}
          alt="close"
          onClick={() => { setShowListData(true); setEditData({}); clearErrorMessage() }}
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
              <Grid item xs={6}>
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
                    disabled={editData?._id}
                    type="email"
                    onChange={handleChangeForm}
                    value={formData.email}
                    fullWidth
                    disableUnderline
                  />
                  {
                    checkSchoolEmail?.data?.type === "email" && checkSchoolEmail?.data?.message !== "" && <p className="error">{checkSchoolEmail?.data?.message}</p>
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
          </Grid>
        </Grid>
        <Typography sx={{ fontSize: "18px", margin: "20px 0" }}>Contact Person Details</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={4}>
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
                    disabled={editData?._id}
                    fullWidth
                    disableUnderline
                  />
                  {
                    checkSchoolEmail?.data?.type === "cp_email" && checkSchoolEmail?.data?.message !== "" && <p className="error">{checkSchoolEmail?.data?.message}</p>
                  }
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="user_Id" required>
                    User Id
                  </InputLabel>
                  <Input
                    id="user_Id"
                    placeholder="Enter User ID"
                    disabled={editData?._id ? true : false}
                    onChange={handleChangeForm}
                    value={formData.user_Id}
                    name="user_Id"
                    fullWidth
                    disableUnderline
                  />
                  {
                    checkSchoolUserId?.data?.type === "user_Id" && checkSchoolUserId?.data?.message !== "" && <p className="error">{checkSchoolUserId?.data?.message}</p>
                  }
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
                        onChange={handleChangeForm}
                        value={formData.password}
                        name="password"
                        placeholder=""
                        fullWidth
                        required
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
            variant="outlined"
            color="secondary"
            sx={{ mr: "20px" }}
            onClick={() => { setShowListData(true); setEditData({}); clearErrorMessage(); }}
          >
            Cancel
          </Button>
          <Button disabled={(checkSchoolEmail?.data?.message || errors.length > 0)} variant="contained" color="secondary" type="submit">
            {editData?._id ? "Update" : "Save"}
          </Button>
        </Box>
      </Box>
    </>
  )
}

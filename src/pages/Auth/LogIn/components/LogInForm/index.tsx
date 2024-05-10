import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSignINRequest, fetchSchoolSignINRequest, fetcStudentSignINRequest } from "../../../../../redux/modules/auth/actions";
import Loader from "../../../../../components/Loader";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card
} from "@mui/material";
import "../../style.scss";
import plus from "../../../../../assets/plus.png";
import heart from "../../../../../assets/heart.png";
import steth from "../../../../../assets/steth.png";
import ellipse from "../../../../../assets/ellipseVector.png";
import logo from "../../../../../assets/pegasus-logo2.svg"
import { PEGASUS_ADMIN, SCHOOL, STUDENT } from '../../../../../utils/globalConstants'
import DialogBox from "../../../../../components/DialogBox";
import { decrypt } from "../../../../../utils/encryptDecrypt";
import { Link } from "react-router-dom";
import CreateNewPassword from "../../../CreateNewPassword";
import ModalPopup from "../../../../../components/Modal";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
export interface LogInFormData {
  email: string;
  password: string;
  schoolId?: string;
}

const LogInPage: React.FC = () => {
  let navigate = useNavigate();
  let location = useLocation();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [roleId, setRoleId] = useState()
  const [show, setshow] = useState(false);
  let [showAlert, setShowAlert] = useState<any>({
    show: false,
    title: "",
    redirect: false,
    loginfirstTime: null,
    id: null
  });

  const [formData, setFormData] = useState<LogInFormData>({
    email: "",
    password: "",
    schoolId: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, schoolLoginReducer, studentLoginReducer, createPasswordReducer } = useSelector((state: any) => {
    let { schoolLoginReducer, studentLoginReducer, login: signIn, createPasswordReducer } = state
    return {
      schoolLoginReducer,
      studentLoginReducer,
      signIn,
      createPasswordReducer
    }
  });
  console.log(signIn?.signIn?.message, "signin")
  useEffect(() => {
    if (signIn || schoolLoginReducer?.signIn || studentLoginReducer?.signIn || createPasswordReducer?.signIn) {
      let message;
      let showMessage = false;
      let redirect = false;
      let loginfirstTime = null;
      let id = null

      if (signIn?.error?.message && atob(searchParams.get('type') as any) === PEGASUS_ADMIN) {
        showMessage = true
        message = signIn?.error?.message
        console.log(message, "errrrrrrr messssssss")
        delete signIn.error
      } else if (signIn?.signIn?.success) {
        showMessage = true;
        redirect = true;
        message = signIn?.signIn?.message
        console.log(message, "messsssssssssss")
        delete signIn.signIn
      }
      else if (createPasswordReducer?.error?.message && (atob(searchParams.get('type') as any) === STUDENT || atob(searchParams.get('type') as any) === SCHOOL)) {
        showMessage = true
        message = createPasswordReducer?.error?.message
        delete signIn.error
      } else if (createPasswordReducer?.signIn?.success) {
        showMessage = true;
        redirect = true;
        message = createPasswordReducer?.signIn?.message
        setshow(false);
        setFormData((prev: any) => ({ ...prev, email: "", password: "", schoolId: "" }))
        delete createPasswordReducer.signIn
        delete studentLoginReducer.signIn
        delete studentLoginReducer.signIn
      }
      else if (schoolLoginReducer?.error?.message && atob(searchParams.get('type') as any) === SCHOOL) {
        showMessage = true
        message = schoolLoginReducer?.error?.message
        delete schoolLoginReducer.error
      } else if (schoolLoginReducer?.signIn?.success) {
        showMessage = true;
        redirect = true;
        if (schoolLoginReducer?.signIn?.loginfirstTime === 0) {
          message = "Reset password"
          id = schoolLoginReducer?.signIn?.id
          loginfirstTime = schoolLoginReducer?.signIn?.loginfirstTime
          if (schoolLoginReducer?.signIn?.success) {
            schoolLoginReducer.signIn = { loginfirstTime: 1 }
          }
        }
        else {
          message = schoolLoginReducer?.signIn?.message
          delete schoolLoginReducer.signIn
        }
      }
      else if (studentLoginReducer?.error?.message && atob(searchParams.get('type') as any) === STUDENT) {
        showMessage = true
        message = studentLoginReducer?.error?.message
        delete studentLoginReducer.error
      } else if (studentLoginReducer?.signIn?.success) {
        showMessage = true;
        redirect = true;
        if (studentLoginReducer?.signIn?.loginfirstTime === 0) {
          message = "Reset password"
          id = studentLoginReducer?.signIn?.id
          loginfirstTime = studentLoginReducer?.signIn?.loginfirstTime
          if (studentLoginReducer?.signIn?.success) {
            studentLoginReducer.signIn = { loginfirstTime: 1 }
          }
        }
        else {
          message = studentLoginReducer?.signIn?.message

        }
      }
      if (showMessage) {
        setShowAlert({ show: true, title: message, redirect, loginfirstTime: loginfirstTime, id: id })
      }
    }
  }, [navigate, signIn, schoolLoginReducer, studentLoginReducer])

  const handleLogin = () => {
    if (atob(searchParams.get('type') as any) === PEGASUS_ADMIN) {
      dispatch(fetchSignINRequest(formData));
    }
    else if (atob(searchParams.get('type') as any) === SCHOOL) {
      dispatch(fetchSchoolSignINRequest(formData));
    }
    else if (atob(searchParams.get('type') as any) === STUDENT) {
      dispatch(fetcStudentSignINRequest(formData));
    }
  };

  const handleChangeNavigate = () => {
    const item = localStorage.getItem("item");
    let payload
    if (localStorage.getItem("item")) {
      const token = JSON.parse(decrypt(item))
      const parts = token.token.split('.');
      payload = JSON.parse(window.atob(parts[1]));
    }
    if (showAlert.redirect && payload?.roleId === 2) {
      navigate("/myAssignment")
    }
    else if (showAlert.redirect && (payload?.roleId === 1 || payload?.roleId === 3)) {
      navigate("/dashboard");
      setShowAlert({ show: false, title: "", redirect: false, })
    }
    else {
      if (atob(searchParams.get('type') as any) === STUDENT) {
        if (showAlert?.loginfirstTime === 0) {
          setshow(true);
          setShowAlert((prev: any) => ({ ...prev, show: false, title: "", redirect: false }))
        }
        else {
          setShowAlert({ show: false, title: "", redirect: false })
        }
      }
      else if (atob(searchParams.get('type') as any) === SCHOOL) {
        if (showAlert?.loginfirstTime === 0) {
          setshow(true);
          setShowAlert((prev: any) => ({ ...prev, show: false, title: "", redirect: false }))
        }
        else {
          setShowAlert({ show: false, title: "", redirect: false })
        }
      }
      else {
        setShowAlert({ show: false, title: "", redirect: false })
      }
    }
  }


  const handleClearState = () => {
    delete createPasswordReducer.signIn
    delete studentLoginReducer.signIn
    delete schoolLoginReducer.signIn
    setShowAlert({ show: false, title: "", redirect: false })
  }
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  console.log(showAlert.title, "tiltle")
  return (
    <>
      <Box className="loginBox">
        {signIn.loading && <Loader open={signIn.loading} />}
        <Card variant="outlined" className="LoginContainer">
          <img src={heart} alt="Heart" className="plusIcon" />
          <img src={plus} alt="Heart" className="heartIcon" />
          <img src={steth} alt="Heart" className="stethIcon" />
          <img src={ellipse} alt="Heart" className="ellipseIcon" />
          <Box className="LoginHeaderContainer">
            <img src={logo} alt="logo" style={{
              width: "230px",
              height: "90px",
              marginBottom: "30px"
            }} />
            <Typography variant="h4" fontWeight={1000}>
              Login
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Welcome back! Please enter your details to continue.
            </Typography>
          </Box>
          {
            (atob(searchParams.get('type') as any) === PEGASUS_ADMIN || atob(searchParams.get('type') as any) === STUDENT)
              ?
              <Box className="LoginInputContainer">
                <Box className="LoginInputs">
                  <Typography marginBottom={2} fontWeight={800}>
                    Email ID
                  </Typography>
                  <TextField
                    onChange={(newValue) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        email: newValue.target.value,
                      }))}
                    label="Enter Email ID"
                    value={formData.email}
                    fullWidth
                  />
                </Box>
                <Box className="LoginInputs">
                  <Typography marginBottom={2} fontWeight={800}>
                    Password
                  </Typography>
                  <TextField sx={{ backgroundColor: "rgb(232, 240, 254)" }} label="Enter Password" type={showPassword ? 'text' : 'password'} fullWidth value={formData.password}
                    onChange={(newValue) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        password: newValue.target.value,
                      }))}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleTogglePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }} />
                </Box>
              </Box>
              : atob(searchParams.get('type') as any) === SCHOOL ?
                <Box className="LoginInputContainer">
                  <Box className="LoginInputs">
                    <Typography marginBottom={2} fontWeight={800}>
                      User ID
                    </Typography>
                    <TextField
                      onChange={(newValue) =>
                        setFormData((prevState) => ({
                          ...prevState,
                          schoolId: newValue.target.value,
                        }))}
                      label="Enter School User ID"
                      value={formData.schoolId}
                      fullWidth
                    />
                  </Box>
                  <Box className="LoginInputs">
                    <Typography marginBottom={2} fontWeight={800}>
                      Email
                    </Typography>
                    <TextField
                      onChange={(newValue) =>
                        setFormData((prevState) => ({
                          ...prevState,
                          email: newValue.target.value,
                        }))}
                      label="Enter Email"
                      value={formData.email}
                      fullWidth
                    />
                  </Box>
                  <Box className="LoginInputs">
                    <Typography marginBottom={2} fontWeight={800}>
                      Password
                    </Typography>
                    <TextField sx={{ backgroundColor: "rgb(232, 240, 254)" }} label="Enter Password" type={showPassword ? 'text' : 'password'} fullWidth value={formData.password}
                      onChange={(newValue) =>
                        setFormData((prevState) => ({
                          ...prevState,
                          password: newValue.target.value,
                        }))}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleTogglePasswordVisibility}
                              edge="end"
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </Box> : null
          }

          <Box className="LoginActionContainer" marginBottom={2}>
            <Button
              onClick={handleLogin}
              variant="contained"
              className="LoginButton"
            >
              Login
            </Button>
          </Box>
          <Box className="btmRow">
            <Typography>
              Don't have an account?{" "}
              <a href="" className="anchorText">
                Signup
              </a>
            </Typography>
            <Typography>
              <Link to={`/forgot-password?type=${searchParams.get('type')}`} className="anchorText">
                Forgot password
              </Link>
            </Typography>
          </Box>
        </Card>
        <DialogBox buttonIcon={showAlert.title === "There is some error please try again later" || showAlert.title === "Please fill required fields" ? "error" : ""} openDialog={showAlert.show} handleSubmit={() => handleChangeNavigate()} title={showAlert.title} buttonText="Ok" />
      </Box>
      <ModalPopup handleClearState={handleClearState} view="" type="assignment" width="50%" height="auto" show={show} setshow={setshow} childern={<CreateNewPassword handleClearState={handleClearState} setshow={setshow} type={atob(searchParams.get('type') as any)} id={showAlert?.id} />} />
    </>
  );
};

export default LogInPage;
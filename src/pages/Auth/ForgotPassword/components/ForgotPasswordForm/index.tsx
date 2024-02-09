import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    Box,
    TextField,
    Button,
    Typography,
    Card
} from "@mui/material";
// import "../../style.scss";
import plus from "../../../../../assets/plus.png";
import heart from "../../../../../assets/heart.png";
import steth from "../../../../../assets/steth.png";
import ellipse from "../../../../../assets/ellipseVector.png";
import logo from "../../../../../assets/pegasus-logo.svg"
import { Link } from "react-router-dom";
import SuccssReset from "./SuccessResetPage";
import { PEGASUS_ADMIN, SCHOOL, STUDENT, TYPE_ARRAY } from '../../../../../utils/globalConstants'
import { forgotPasswordRequest } from "../../../../../redux/modules/auth/actions";
import DialogBox from "../../../../../components/DialogBox";
export interface ForgotFormData {
    email: string;
    type?: string
}
const ForgotPassword: React.FC = () => {
    let navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch()
    const { forgotPasswordReducer } = useSelector((state: any) => {
        let { forgotPasswordReducer } = state
        return {
            forgotPasswordReducer
        }
    });
    let [showAlert, setShowAlert] = useState({
        show: false,
        title: "",
        redirect: false
    });
    const [email, setEmail] = useState('');
    const [status, setstatus] = useState(1)
    useEffect(() => {
        if (forgotPasswordReducer?.signIn) {
            let message;
            let showMessage = false;
            let redirect = false;
            if (forgotPasswordReducer?.error?.message) {
                showMessage = true
                message = forgotPasswordReducer?.error?.message
                delete forgotPasswordReducer.error
            } else if (forgotPasswordReducer?.signIn?.success) {
                showMessage = true;
                redirect = true;
                message = forgotPasswordReducer?.signIn?.message
            }
            if (showMessage) {
                setShowAlert({ show: true, title: message, redirect })
            }
        }
    }, [forgotPasswordReducer])

    const handleReset = (e: any) => {
        e.preventDefault();
        let data: ForgotFormData = {
            email,
        }
        if (atob(searchParams.get('type') as any) === PEGASUS_ADMIN) {
            data.type = PEGASUS_ADMIN
        }
        else if (atob(searchParams.get('type') as any) === SCHOOL) {
            data.type = SCHOOL
        }
        else if (atob(searchParams.get('type') as any) === STUDENT) {
            data.type = STUDENT
        }
        dispatch(forgotPasswordRequest(data))

    }

    return (
        <>
            {
                !forgotPasswordReducer?.signIn?.success ?
                    <Box className="loginBox">
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
                                    Reset your password
                                </Typography>
                            </Box>
                            <Box className="LoginInputContainer">
                                <Box className="LoginInputs">
                                    <Typography marginBottom={2} fontWeight={800}>
                                        Email ID
                                    </Typography>
                                    <TextField
                                        label="Enter Email ID"
                                        fullWidth
                                        type="email"
                                        required
                                        name="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Box>
                            </Box>
                            <Box className="LoginActionContainer" marginBottom={2}>
                                <Button
                                    variant="contained"
                                    className="LoginButton"
                                    onClick={handleReset}
                                >
                                    Send password reset email
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
                                    <Link to={`/auth/login?type=${btoa('admin')}`} className="anchorText">
                                        Back to login
                                    </Link>
                                </Typography>
                            </Box>
                        </Card>
                    </Box>
                    :
                    <SuccssReset />
            }
            <DialogBox buttonIcon={showAlert.title === "There is some error please try again later" || showAlert.title === "Please fill required fields" ? "error" : ""} openDialog={showAlert.show} handleSubmit={() => { showAlert.redirect && navigate("/"); setShowAlert({ show: false, title: "", redirect: false }) }} title={showAlert.title} buttonText="Ok" />
        </>

    );
};

export default ForgotPassword;
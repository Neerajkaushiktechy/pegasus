
import { Input, FormControl, InputLabel, Grid, Box, Button, Typography, Stack, Paper } from "@mui/material";
import { useState, useEffect } from 'react'
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import DialogBox from "../../../../components/DialogBox";
import { updatePasswordRequest } from "../../../../redux/modules/profile/action";
import { useNavigate } from "react-router-dom";
type props = {
    setshow?: any
}
const ChangePassword = ({ setshow }: props) => {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let { changePassord } = useSelector((state: any) => {
        let { changePassord } = state;
        return {
            changePassord
        }
    })
    const [formData, setformData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    })
    let [showAlert, setShowAlert] = useState({
        show: false,
        title: "",
        redirect: false
    });
    const [errors, setErrors] = useState<any>([{
        newPasswordError: [],
        confirmPasswordError: []
    }])
    useEffect(() => {
        let message;
        let showMessage = false;
        let redirect = false;
        if (changePassord?.data?.success) {
            showMessage = true;
            redirect = true;
            message = changePassord?.data?.message
            delete changePassord.data?.success


        }
        else if (changePassord?.error?.message) {
            showMessage = true
            message = changePassord?.error?.message
            delete changePassord.error
        }
        if (showMessage) {
            setShowAlert({ show: true, title: message, redirect })
        }
    }, [changePassord])

    function validatePassword(value: string, type: string, text: string) {
        let errors: any = [];
        if (value.length <= 0) {
            errors.push(`${text} must be required`);
        }
        if (value.length < 8) {
            errors.push(`${text} must be at least 8 characters`);
        }
        if (value.search(/[a-z]/i) < 0) {
            errors.push(`${text} must contain at least one letter.`);
        }
        if (value.search(/(?=.*\W)/i) < 0) {
            errors.push(`${text} must contain at least one special characters.`);
        }
        if (value.search(/[0-9]/) < 0) {
            errors.push(`${text} must contain at least one digit.`);
        }

        setErrors((prev: any) => ({ ...prev, [type]: errors }))
        return true;
    }
    const handleChangeForm = (e: any) => {
        const { name, value } = e.target;
        if (name === "newPassword") {
            validatePassword(value, "newPasswordError", "NewPassword")
        }
        else if (name === "confirmPassword") {
            validatePassword(value, "confirmPasswordError", "ConfirmPassword")
        }
        setformData((prev: any) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };


    const handleSubmit = (e: any) => {
        e.preventDefault();
        dispatch(updatePasswordRequest(formData))
    }


    return (
        <>
            <Paper>
                <Stack p={2} direction="row" justifyContent="space-between" alignItems="center" spacing={2} bgcolor="primary.light">
                    <Typography fontWeight="600">Change Password</Typography>
                    <Button
                        onClick={() => {
                            setshow(false);
                        }}
                    >
                        <CloseIcon />
                    </Button>
                </Stack>
                <Box
                    component="form"
                    sx={{ padding: "30px !important" }}
                    onSubmit={(e) => {
                        handleSubmit(e);
                    }}
                >
                    <Grid container spacing={2} p={2}>
                        <Grid item md={6} xs={12}>
                            <Grid item xs={12}>
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel shrink htmlFor="oldPassword" required>
                                        Old Password
                                    </InputLabel>
                                    <Input
                                        id="oldPassword"
                                        placeholder="Enter Old Password"
                                        required
                                        name="oldPassword"
                                        type="password"
                                        value={formData.oldPassword}
                                        fullWidth
                                        onChange={handleChangeForm}
                                        disableUnderline
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Grid item xs={12}>
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel shrink htmlFor="newPassword" required>
                                        New Password
                                    </InputLabel>
                                    <Input
                                        id="newPassword"
                                        placeholder="Enter new Password"
                                        required
                                        type="password"
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleChangeForm}
                                        fullWidth
                                        disableUnderline
                                    />
                                    {
                                        errors?.newPasswordError?.length > 0 && <p className="error">{errors?.newPasswordError[0]}</p>
                                    }
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Grid item xs={12}>
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel shrink htmlFor="confirmPassword" required>
                                        Confirm Password
                                    </InputLabel>
                                    <Input
                                        id=""
                                        placeholder="Enter confirm Password"
                                        required
                                        name="confirmPassword"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={handleChangeForm}
                                        fullWidth
                                        disableUnderline
                                    />
                                    {
                                        errors?.confirmPasswordError?.length > 0 && <p className="error">{errors?.confirmPasswordError[0]}</p>
                                    }
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Box mt="50px" textAlign="right">
                        <Button
                            variant="outlined"
                            color="secondary"
                            sx={{ mr: "20px" }}
                            onClick={() => setshow(false)}
                        >
                            Cancel
                        </Button>
                        <Button disabled={(errors?.newPasswordError?.length > 0 || errors?.confirmPasswordError?.length > 0)} variant="contained" color="secondary" type="submit">
                            Save
                        </Button>
                    </Box>
                </Box>
            </Paper>
            <DialogBox buttonIcon={showAlert.title === "There is some error please try again later" || showAlert.title === "Please fill required fields" ? "error" : ""} openDialog={showAlert.show} handleSubmit={() => {
                setShowAlert({ show: false, title: "", redirect: false })
                if (showAlert.redirect) {
                    setshow(false)
                    localStorage.clear();
                    navigate('/')
                }
            }} title={showAlert.title} buttonText="Ok" />
        </>
    )
}

export default ChangePassword
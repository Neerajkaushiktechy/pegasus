
import { Input, FormControl, InputLabel, Grid, Box, Button, Typography, Stack, Paper } from "@mui/material";
import { useState } from 'react'
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { createPasswordRequest } from "../../../redux/modules/auth/actions";
type props = {
    setshow?: any;
    type: any;
    id: any;
    handleClearState : () => void;
}
const CreateNewPassword = ({ setshow  , type , id , handleClearState}: props) => {
    let dispatch = useDispatch();
    const [formData, setformData] = useState({
        newPassword: "",
        confirmPassword: "",
    })
    const [errors, setErrors] = useState<any>([{
        newPasswordError: [],
        confirmPasswordError: []
    }])


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
        let data = {...formData , type : type , id : id};
        dispatch(createPasswordRequest(data))
        
    }

    return (
        <>
            <Paper>
                <Stack  p={2} direction="row"  justifyContent="space-between" alignItems="center" spacing={2} bgcolor="primary.light">
                    <Typography fontWeight="600">Create Password</Typography>
                    <Button
                        onClick={() => {
                            setshow(false);
                            handleClearState();
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
                        <Grid item md={12} xs={12}>
                            <Grid item xs={12}>
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel  shrink htmlFor="newPassword" required>
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
                        <Grid item md={12} xs={12}>
                            <Grid item xs={12}>
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel  shrink htmlFor="confirmPassword" required>
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
                            variant="contained"
                            sx={{ mr: "20px" }}
                            onClick={() => {setshow(false); handleClearState()}}
                        >
                            Cancel
                        </Button>
                        <Button  disabled={(errors?.newPasswordError?.length > 0 || errors?.confirmPasswordError?.length > 0)} variant="contained" type="submit">
                            Save
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </>
    )
}

export default CreateNewPassword
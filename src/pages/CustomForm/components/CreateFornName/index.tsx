
import { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    FormControl,
    InputLabel,
    Input,
    Typography,
    Button,
} from "@mui/material";
import checkCustomFormExistApi from "../../../../utils/api";
import { useNavigate } from 'react-router-dom';
import { postcustomFormRequest } from '../../../../redux/modules/customform/action';
import { useDispatch } from 'react-redux';

type props = {
    fieldsArray?:any;
    setfieldsArray: any;
    handleClose?:any
    copyTemplatePopup?:any
    setcopyfieldsArray?:any
};

const CreateFormName = ({ fieldsArray , setfieldsArray , handleClose , copyTemplatePopup ,setcopyfieldsArray }: props) => {
    const [formData, setformData] = useState("");
    const [formExists, setFormExists] = useState(false);
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        checkCustomFormExistApi({ formData: formData })
            .then( async (res) => {
                if (res.success) {
                    if(copyTemplatePopup) {
                        let dataObject: object = {
                            formData : fieldsArray?.fields                            ,
                            formName: formData,
                            type : "copy_custom_form"
                          }
                        await dispatch(postcustomFormRequest(dataObject))
                        setcopyfieldsArray((prev:any)=>{
                            return {
                                ...prev,
                                formName: formData,
                                ... fieldsArray
                            }; 
                        })
                    }
                    else {
                    setfieldsArray((prev: any) => {
                        return {
                            ...prev,
                            formName: formData,
                        };
                    });
                }
                } else {
                    setFormExists(true);
                }
            })
            .catch((err) => console.log(err));
    };

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
                    color: "#271E4A"
                }}
            >     Create Form
            </div>
            <Box
                component="form"
                // sx={{ padding: "30px !important" }}
                onSubmit={(e) => {
                    handleSubmit(e);
                }}
            ></Box>
            {/* <Typography sx={{ marginTop: "10px", marginLeft: "10px" }}>
                Create Form
            </Typography> */}
            <Box
                component="form"
                sx={{ padding: "30px !important" }}
                onSubmit={(e) => {
                    handleSubmit(e);
                }}
            >
                {formExists && (
                    <Typography color="error">
                        Custom form name already exists.
                    </Typography>
                )}
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel shrink htmlFor="schoolCode" required>
                                Form Name
                            </InputLabel>
                            <Input
                                sx={{ textTransform: "capitalize" }}
                                id="schoolCode"
                                placeholder="Enter Form Name"
                                required
                                name="formName"
                                fullWidth
                                onChange={(e) => setformData(e.target.value)}
                                disableUnderline
                            />
                        </FormControl>
                    </Grid>
                </Grid>
                <Box mt="50px" textAlign="right">
                <Button variant="outlined" color="secondary" sx={{ mr: "20px" }} onClick={() => {
                    if(handleClose!==undefined){
                        handleClose()
                    }
                    else {
                        navigate('/studentsAssessment?create=assessmentList')
                    }
              }}>
                Cancel
              </Button>
                    <Button variant="contained" color="secondary" type="submit">
                        Save
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default CreateFormName;

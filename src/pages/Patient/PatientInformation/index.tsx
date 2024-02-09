import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PatientInformationList from "./components/PatientInformationPage";
import PatientInformationHeader from "./components/PatientInformationHeader";
import { useParams } from 'react-router-dom';
import { fetchPatientInformationRequest } from "../../../redux/modules/patients/patientInformation/action";
import { useSelector } from "react-redux";
import { Box, Typography, Stack, IconButton, Divider, Grid } from "@mui/material";
import { decrypt } from "../../../utils/encryptDecrypt";
import CloseIcon from "@mui/icons-material/Close";
import Loader from "../../../components/Loader";

type QuizParams = {
    cardId: any;
    setshow?: any;
};


export default function Patient(props: any) {
    const [roleId, setRoleId] = useState()
    const { cardId } = useParams<QuizParams>();
    let dispatch = useDispatch();

    useSelector((state: any) => {
        let { postDemographic,getPatientInformationData } = state;
        postDemographic.data = { pId: cardId != undefined && atob(cardId), clicked: "yes", patientRoleId :getPatientInformationData?.data?.Demographic?.roleId || "" }
    })
    let { getPatientInformationData } = useSelector((state: any) => {
        let { getPatientInformationData } = state;
        return { getPatientInformationData };
    });

    useEffect(() => {
        if (cardId != undefined) {
            dispatch(fetchPatientInformationRequest(atob(cardId)));
        }
    }, [dispatch, cardId])

    useEffect(() => {
        const item = localStorage.getItem("item");
        if (localStorage.getItem("item")) {
            const token = JSON.parse(decrypt(item))
            const parts = token.token.split('.');
            const payload = JSON.parse(window.atob(parts[1]));
            setRoleId(payload.roleId);
        }
    }, [])

    if (getPatientInformationData?.loading && roleId !== 2) {
        return <Loader />
    }

    return (
        <>
            {roleId !== 2 ? (
                <Typography pl={2}>Patient Information</Typography>
            ) : <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} bgcolor="primary.light" pl={2}>
                <Typography sx={{ fontWeight: "500", color: "#271E4A" }}>Patient History</Typography>
                <IconButton
                    onClick={() => {
                        props.setshow(false)
                    }}
                >
                    <CloseIcon sx={{ width: "36px", height: "36px" }} />
                </IconButton>
            </Stack >}
            <Box sx={{ padding: "20px" }} className='padding10'>
                <PatientInformationHeader />
                {roleId === 2 ? (
                    <Grid item md={12} xs={12}>
                        <Box>
                            <Box>
                                <Divider />
                            </Box>
                        </Box>
                    </Grid>
                ) : null}
                <PatientInformationList />
            </Box>
        </>
    )
}
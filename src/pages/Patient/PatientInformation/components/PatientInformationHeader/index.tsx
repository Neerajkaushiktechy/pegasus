import { Typography, Box, Stack, Button } from "@mui/material";
import { useSelector } from "react-redux";
import PatientCard from "../../../../../components/Dashboard/PatientCard";

export default function PatientTabHeader(props: any) {
    let { getPatientInformationData }: any = useSelector((state: any) => {
        let { getPatientInformationData } = state;
        return { getPatientInformationData }
    })

    return (
        <Box>
            {getPatientInformationData?.data?.Demographic?._id && (
                <PatientCard cardType="singleCard" avatar={getPatientInformationData?.data.Demographic.avatar} age={getPatientInformationData?.data.Demographic.age} nameTitle={getPatientInformationData?.data.Demographic.nameTitle} name={`${getPatientInformationData?.data.Demographic.fName} ${getPatientInformationData?.data.Demographic.lName}`} gender={getPatientInformationData?.data.Demographic.gender} problem={getPatientInformationData?.data?.Problem} allergies={getPatientInformationData?.data?.Allergies} />
            )}
        </Box >
    )
}
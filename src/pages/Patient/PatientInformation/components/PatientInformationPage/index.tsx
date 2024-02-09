
import { Box, Grid, List, ListItem, ListItemText, Chip } from "@mui/material";
import { useSelector } from "react-redux";
import CardData from "../../../../../components/PatientDetailCard"
import CharComponent from "../../../../../components/Chart";
import CircleIcon from '@mui/icons-material/Circle';
export default function PatientTabHeader(props: any) {


    let { getPatientInformationData }: any = useSelector((state: any) => {
        let { getPatientInformationData, postDemographic } = state;
        return { getPatientInformationData, postDemographic }
    })

    return (
        <>
            <Box sx={{ background: "#FFFFFF", boxShadow: "0px 1px 60px rgba(190, 190, 190, 0.08)", borderRadius: "10px", padding: "20px", marginTop: "20px", marginBottom: "20px" }}>
                <CharComponent chartData={getPatientInformationData?.data?.vitalData} />
            </Box>
            <Grid container spacing={2}>
                <Grid item md={6} xs={12}>
                    {getPatientInformationData?.data?.Problem?.length !== 0 ? ((
                        <CardData heading="Problem" tabUrl={`/patients/diagnosis`}>
                            <Box sx={{ height: "150px", overflowY: "auto", mt: "10px" }} className='list-card'>
                                <List sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', color: "common.black" }}>
                                    {getPatientInformationData?.data?.Problem?.map((item: any, index: number) => (
                                        <ListItem key={index} sx={{ width: '50%', padding: "0px", margin: "0px", display: "flex", alignItems: "baseline" }}>
                                            <CircleIcon sx={{ height: "10px", width: "8px", marginRight: "10px" }} />
                                            <ListItemText primaryTypographyProps={{ component: "span", style: { fontSize: "16px" } }} primary={`${item.description}`} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        </CardData>
                    )
                    ) : null}

                    {getPatientInformationData?.data?.Allergies?.length !== 0 ? ((
                        <CardData heading="Allergies" tabUrl={`/patients/allergies`} >
                            <Box sx={{ height: "150px", overflowY: "auto", mt: "20px" }} className='list-card'>
                                {getPatientInformationData?.data?.Allergies?.map((item: any, index: number) => (
                                    <Chip key={index} label={item.allergy} variant="outlined" sx={{ color: "black", border: "unset", background: "rgba(1, 123, 172, 0.12)", fontSize: "16px", padding: "12px 16px", height: "auto", borderRadius: "30px", marginRight: "10px" }} />
                                ))}
                            </Box>
                        </CardData>
                    )) : null}
                </Grid>
                <Grid item md={6} xs={12}>
                    {getPatientInformationData?.data?.FamilyHistory?.length !== 0 ? ((
                        <CardData heading="Family History" tabUrl={`/patients/family-history`}>
                            <Box sx={{ mt: "10px", color: "common.black", height: "150px", overflowY: "scroll" }} className='list-card'>
                                {getPatientInformationData?.data?.FamilyHistory?.map((item: any, index: number) => (
                                    <List sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                        <ListItem sx={{ width: '50%', padding: "0px", margin: "0px", display: "flex", alignItems: "baseline" }}>
                                            <CircleIcon sx={{ height: "10px", width: "8px", marginRight: "10px" }} />
                                            <ListItemText primaryTypographyProps={{ component: "span", style: { fontSize: "16px" } }} primary={`First Name : ${item.fName}`} />
                                        </ListItem>
                                        <ListItem sx={{ width: '50%', padding: "0px", margin: "0px", display: "flex", alignItems: "baseline" }}>
                                            <CircleIcon sx={{ height: "10px", width: "8px", marginRight: "10px" }} />
                                            <ListItemText primaryTypographyProps={{ component: "span", style: { fontSize: "16px" } }} primary={`Relationship : ${item.relation}`} />
                                        </ListItem>
                                        <ListItem sx={{ width: '50%', padding: "0px", margin: "0px", display: "flex", alignItems: "baseline" }}>
                                            <CircleIcon sx={{ height: "10px", width: "8px", marginRight: "10px" }} />
                                            <ListItemText primaryTypographyProps={{ component: "span", style: { fontSize: "16px" } }} primary={`Last Name : ${item.lName}`} />
                                        </ListItem>
                                        <ListItem sx={{ width: '50%', padding: "0px", margin: "0px", display: "flex", alignItems: "baseline" }}>
                                            <CircleIcon sx={{ height: "10px", width: "8px", marginRight: "10px" }} />
                                            <ListItemText primaryTypographyProps={{ component: "span", style: { fontSize: "16px" } }} primary={`Disease : ${item.diseaseList?.map((e: any) => e.disease)}`} />
                                        </ListItem>
                                        <ListItem sx={{ width: '50%', padding: "0px", margin: "0px", display: "flex", alignItems: "baseline" }}>
                                            <CircleIcon sx={{ height: "10px", width: "8px", marginRight: "10px" }} />
                                            <ListItemText primaryTypographyProps={{ component: "span", style: { fontSize: "16px" } }} primary={`D.O.B : ${item.dob}`} />
                                        </ListItem>
                                        <ListItem sx={{ width: '50%', padding: "0px", margin: "0px", display: "flex", alignItems: "baseline" }}>
                                            <CircleIcon sx={{ height: "10px", width: "8px", marginRight: "10px" }} />
                                            <ListItemText primaryTypographyProps={{ component: "span", style: { fontSize: "16px" } }} primary={`Age of Diagnosis :  ${item.diseaseList?.map((e: any) => e.ageOfDiagnosis)}`} />
                                        </ListItem>
                                    </List>
                                ))}
                            </Box>
                        </CardData>
                    )) : null}

                </Grid>
            </Grid>
        </>

    )
}
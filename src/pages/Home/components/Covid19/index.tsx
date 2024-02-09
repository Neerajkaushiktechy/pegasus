import { CardContent, Card, Box, Typography, Grid, Container } from '@mui/material';
import { useLocation } from "react-router-dom";
import covid19logo from '../../../../assets/covid19.png'
import healthCarelogo from "../../../../assets/healthcare_y9bu63hvc194 1.png"
import pegasuslearning from "../../../../assets/login_f7vd5mv6sd6k 1.png"
import helplogo from "../../../../assets/help_c5hzfk3e227w 1.png"
import covidLeftVector from "../../../../assets/CovidLeftVector1.png"
import covideRightVector from "../../../../assets/CovidLeftVector2.png"

interface locationState {
    pathname: string;
}
export default function Covid19() {
    const location: locationState = useLocation();
    return (
        <Box py={location.pathname === "/covid19" ? { xs: "120px", md: "140px", lg: "180px" } : { xs: "50px", md: "140px" }}
            sx={{ background: "#FCF6FF", position: "relative" }}>
            <Container>
                <img src={covidLeftVector} alt='' style={{ position: "absolute", left: "-0" }} />
                <Grid container spacing={4}>
                    <Grid item lg={11} md={12}>
                        <Card sx={{ background: "rgba(68, 14, 102, 0.9)", borderRadius: "16px", padding: "30px 26px", position: "relative", zIndex: "9" }}>
                            <CardContent sx={{ display: "flex", alignItems: "center" }} className='card-content'>
                                <div>
                                    <Typography sx={{ fontWeight: "500", fontSize: "24px", color: "#fff", marginBottom: "16px" }}>COVID-19</Typography>
                                    <Typography sx={{ fontSize: "18px", color: "#fff", textAlign: "justify" }} className='desc'> The COVID-19 pandemic rocked the world. It led to quarantines, international changes in policies, and disrupted education and enterprises across all sectors. The following link from the Center for Disease Control and Prevention provides information regarding this topic <a className='covid_link' target='_blank' href='https://covid.cdc.gov/covid-data-tracker/#additional-covid-data' rel="noreferrer">https://covid.cdc.gov/covid-data-tracker/#additional-covid-data</a>.</Typography>
                                </div>
                                <img src={covid19logo} alt='' style={{ minWidth: "160px", marginLeft: "30px" }} />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={1} className='display-none'>

                    </Grid>
                    <Grid item xs={1} className='display-none'>

                    </Grid>
                    <Grid item lg={11} md={12}>
                        <Card sx={{ border: "1px solid #440E66", borderRadius: "16px", padding: "30px 26px", position: "relative", zIndex: "9" }}>
                            <CardContent sx={{ display: "flex", alignItems: "center" }} className='card-content'>
                                <img src={healthCarelogo} alt='' style={{ minWidth: "160px", marginRight: "30px" }} />
                                <div>
                                    <Typography sx={{ fontWeight: "500", fontSize: "24px", color: "#440E66", marginBottom: "16px" }}>Impact On Healthcare Education</Typography>
                                    <Typography sx={{ fontSize: "18px", color: "#440E66", textAlign: "justify" }} className='desc'>  The COVID-19 pandemic impacted healthcare and healthcare education in many ways. With student access to clinical sites and practice labs restricted, many schools switched theory and clinical curricula to distant learning and clinical simulations. Students completing their education in the height of the pandemic graduated with little to no hands-on experience or access to an integrated learning platform to provide engaging clinical simulation.</Typography>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item lg={11} md={12}>
                        <Card sx={{ background: "rgba(68, 14, 102, 0.9)", borderRadius: "16px", padding: "30px 26px", position: "relative", zIndex: "9" }}>
                            <CardContent sx={{ display: "flex", alignItems: "center" }} className='card-content'>
                                <div>
                                    <Typography sx={{ fontWeight: "500", fontSize: "24px", color: "#fff", marginBottom: "16px" }}>Pegasus Learning Platform</Typography>
                                    <Typography sx={{ fontSize: "18px", color: "#fff", textAlign: "justify" }} className='desc'>Pegasus Learning Platform provides a solution to restricted clinical access and insufficient lab access: Pegasus can be seamlessly integrated into curricula with all aspects of the clinical simulation occurring either synchronously or asynchronously, whichever suits the need of the educational institution. The platform also provides an instructor-led format for students attending hands-on clinical to complete assignments, practice with electronic health records, and use products to improve their knowledge and skills as they move through courses preparing them for their licensure exam and practice as a healthcare team member</Typography>
                                </div>
                                <img src={pegasuslearning} alt='' style={{ minWidth: "160px", marginLeft: "30px" }} />
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={1} className='display-none'>

                    </Grid>
                    <Grid item xs={1} className='display-none'>

                    </Grid>
                    <Grid item lg={11} md={12}>
                        <Card sx={{ border: "1px solid #440E66", borderRadius: "16px", padding: "30px 26px", position: "relative", zIndex: "9" }}>
                            <CardContent sx={{ display: "flex", alignItems: "center" }} className='card-content'>
                                <img src={helplogo} alt='' style={{ minWidth: "160px", marginRight: "30px" }} />
                                <div>
                                    <Typography sx={{ fontWeight: "500", fontSize: "24px", color: "#440E66", marginBottom: "16px" }}>We Can Help!</Typography>
                                    <Typography sx={{ fontSize: "18px", color: "#440E66", textAlign: "justify" }} className='desc'>The COVID-19 pandemic interrupted education across all sectors and forever changed the
                                        delivery of content for healthcare facilities, educational institutions, instructors, and students.
                                        Pegasus Learning Platform can ensure that instructors and their students have a seamless
                                        progression through their curricula while providing an exciting and engaging learning
                                        experience. The world changes quickly; let Pegasus help you stay prepared for whatever comes
                                        your way!</Typography>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <img src={covideRightVector} alt='' style={{ position: "absolute", right: "0", bottom: "-160px" }} />
            </Container>
        </Box >
    );
}
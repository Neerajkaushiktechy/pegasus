import { Paper, Container, Grid, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import about from "../../../../assets/about.png";
import aboutVector from "../../../../assets/about-vector.svg";
import quiteVectorIcon from "../../../../assets/QuoteVectoricon.png"
const Item = styled(Paper)(({ theme }) => ({
    boxShadow: "none",
}));

export default function AboutUs() {
    return (
        <Box py={{ xs: "120px", md: "140px" }} id="about" position="relative">
            <Container>
                <Grid container spacing={2}>
                    <Grid item lg={12} md={12} xs={12} >
                        <Item>
                            <Typography sx={{ fontSize: "40px", fontWeight: "600" }} component="h1" color="text.secondary" marginBottom={"30px"} textTransform="capitalize">
                                Who <Typography sx={{ fontSize: "40px", fontWeight: "600" }} color="secondary" component="span" > We Are? </Typography>
                            </Typography>
                            <Typography variant="body1" textAlign={"justify"} paragraph marginBottom={"30px"}>
                                We are Pegasus Learning Platform—a US-based independent company dedicated to meeting the needs of students and educators across all sectors of the healthcare field. Founded in Central Florida, Pegasus Learning Platform is the culmination of years of experience by our industry specialists seeking new and exciting ways to engage students while providing easy solutions for educators in a fast-paced, changing environment.
                            </Typography>
                            <Typography variant="body1" textAlign={"justify"} paragraph marginBottom={"30px"}>
                                As healthcare professionals and educators, ourselves, we know firsthand what it takes to meet program objectives and integrate technology in a variety of settings. We understand that when students feel overwhelmed, educators must seek ways to provide an enriching experience and still meet curricula requirements. Our learning solutions meet those needs in an easy-to-learn format blending operability with innovation.
                            </Typography>

                            <Typography variant="body1" textAlign={"justify"} paragraph marginBottom={"30px"} sx={{ fontStyle: "italic", color: "rgb(68 14 102)" }}>
                                <img src={quiteVectorIcon} alt='' style={{ marginBottom: "10px", marginRight: "10px", width: "30px" }} />
                                We are Pegasus Learning Platform— proud of what we do and excited for the future.
                            </Typography>
                        </Item>
                    </Grid>
                    {/* <Grid item lg={6} md={12} xs={12} textAlign="center">
                        <Item>
                            <img src={about} alt="about-Pegasus" />
                        </Item>
                    </Grid> */}
                    {/* <img src={aboutVector} alt="about_vector" style={{ position: "absolute", bottom: "20px", left: "0", zIndex: "-1" }} /> */}
                </Grid>
            </Container>
        </Box>
    );
}
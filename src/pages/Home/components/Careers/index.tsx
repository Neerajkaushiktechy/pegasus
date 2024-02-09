import { Paper, Container, Grid, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import expertise from "../../../../assets/expertise.png";
import maskgroup from "../../../../assets/maskgroup.png"
import about from "../../../../assets/about.png";
const Item = styled(Paper)(({ theme }) => ({
    boxShadow: "none",
}));

export default function Careers() {
    return (

        <Container>
            <Box py={{ xs: "120px", md: "140px", lg: "180px" }}>
                <Grid container spacing={4} alignItems="center">
                    <Grid item lg={6} md={12} xs={12} className='order-change'>
                        <Item>
                            <Typography component="h1" variant="h1" color="text.secondary" textTransform="capitalize" sx={{ fontSize: "24px !important", marginBottom: "40px" }}>
                                Interested in working with Pegasus Learning Platform?
                            </Typography>
                            <Typography component="h1" color="text.secondary" textTransform="capitalize" sx={{ fontSize: "20px !important", marginBottom: "16px", display: "flex", marginRight: "10px", alignItems: "flex-start" }}>

                                <img src={maskgroup} alt="our-expertise" style={{ width: "20px", marginRight: "10px", marginTop: "4px" }} /> At Pegasus, we are always looking for exceptional people ready to apply their expertise to make a difference for students and educators in the healthcare field.
                            </Typography>
                            <Typography component="h1" color="text.secondary" textTransform="capitalize" sx={{ fontSize: "20px !important", marginBottom: "16px", display: "flex", marginRight: "10px", alignItems: "flex-start" }}>
                                <img src={maskgroup} alt="our-expertise" style={{ width: "20px", marginRight: "10px", marginTop: "4px" }} />  We invite you to take a moment to fill out an information request: We would love to hear from you!
                            </Typography>
                        </Item>
                    </Grid>
                    <Grid item lg={6} md={12} xs={12} textAlign="center">
                        <Item>
                            <img src={about} alt="about-Pegasus" />
                        </Item>
                    </Grid>
                </Grid>
            </Box>

        </Container>
    );
}
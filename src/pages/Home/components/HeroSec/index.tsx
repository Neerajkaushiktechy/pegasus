
import { Paper, Container, Grid, Typography, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import logo from "../../../../assets/pegasushomelogo.png"
import rightVectorIcon from "../../../../assets/rightEclipseIcon.png"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import leftVectorIcon from "../../../../assets/leftVectorIcon.png"
const Item = styled(Paper)(({ theme }) => ({
  boxShadow: "none",
}));
export default function HeroSec() {
  return (
    <>
      <Box id="home" sx={{ position: "relative", background: "#FCF6FF", paddingTop: "120px" }} className='first-fold' >
        <Container>
          <img src={leftVectorIcon} alt="" style={{ position: "absolute", top: "-110px", left: "0" }} />
          <Grid container spacing={4} alignItems="center" pt="60px">
            <Grid item lg={6} md={12} xs={12}>
              <Item sx={{ background: "#FCF6FF" }} className='text-md-center'>
                <Box className='heading-font'>
                  <Typography component="h1" variant="h1" color="primary.contrastText" marginBottom={"30px"} textTransform="capitalize">
                    <Typography component="span" variant="h1" color="#000000" sx={{ fontSize: "46px !important" }}>We ensure </Typography> <Typography color="secondary" component="span" variant="h1" sx={{ fontSize: "46px !important" }}> The future </Typography> <Typography component="span" variant="h1" color="#000000" sx={{ fontSize: "46px !important" }}>of </Typography> <Typography color="secondary" component="span" variant="h1" sx={{ fontSize: "46px !important" }}>patient care </Typography> <Typography component="span" variant="h1" color="#000000" sx={{ fontSize: "46px !important" }}>Is In safe hands</Typography>
                  </Typography>
                  <Typography variant="body1" color='#616161' paragraph textAlign={"justify"} marginBottom={"30px"}>
                    With hospitals utilizing electronic health records, educators must look for ways to provide EHR access and practice for students. A simulated EHR system helps educators offer the hands-on experience needed for students to gain confidence and competence navigating electronic patient records.
                  </Typography>
                  {/* <Button aria-label="learn more" sx={{ color: "#32CD32", textTransform: "unset", textDecoration: "unset", border: "1px solid #32CD32", borderRadius: "50px !important", fontWeight: "500" }} endIcon={<ArrowForwardIcon />} className='btn-hover'>
                    Learn more
                  </Button> */}
                </Box>
              </Item>
            </Grid>
            <Grid item lg={6} md={12} xs={12}>
              <Item sx={{ background: "#FCF6FF" }} className='text-md-center'>
                <img src={logo} alt='' />
                <img src={rightVectorIcon} alt='' style={{ position: "absolute", bottom: "-140px", right: "0", zIndex: "1" }} />
              </Item>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>


  );
}
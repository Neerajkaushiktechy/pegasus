import { Paper, Container, Grid, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import about from "../../../../assets/about.png";
import aboutVector from "../../../../assets/about-vector.svg";

const Item = styled(Paper)(({ theme }) => ({
  boxShadow: "none",
}));

export default function ServicesSec() {
  return (
    <Box py={{ xs: "120px", md: "140px" }} id="aboutUs" position="relative">
      <Container>
        <Grid container spacing={2}>
          <Grid item lg={6} md={12} xs={12} >
            <Item>
              <Typography component="h1" variant="h1" color="text.secondary" marginBottom={"30px"} textTransform="capitalize">
                About <Typography color="secondary" component="span" variant="h1"> Pegasus </Typography>
              </Typography>
              <Typography variant="body1" textAlign={"justify"} paragraph marginBottom={"30px"}>
                Pegasus Learning Platform is a solution that offers educators choices for learning integration.
                The Electronic Health Record (EHR) simulation introduces learners to digital charting, and the
                assignment options allow instructors to combine simulation and hands-on clinical into one
                seamless experience. With study guides, student resources, and the ability to use the platform
                across any discipline, Pegasus makes meeting curriculum benchmarks easier than ever! This
                technology, as well as Pegasus for the Medical Office, prepares students to properly document
                and manage patient care in today’s modern clinical environment.
              </Typography>
              <Typography variant="body1" textAlign={"justify"} paragraph marginBottom={"30px"}>
                We help you accomplish this by providing learners with a realistic, yet controlled way to master
                electronic charting, demonstrate clinical judgment in patient care, collaborate with other health
                disciplines, and thrive across different healthcare facilities and institutions.
              </Typography>
            </Item>
          </Grid>
          <Grid item lg={6} md={12} xs={12} textAlign="center">
            <Item>
              <img src={about} alt="about-Pegasus" />
            </Item>
          </Grid>
          <img src={aboutVector} alt="about_vector" style={{ position: "absolute", bottom: "20px", left: "0", zIndex: "-1" }} />
        </Grid>
      </Container>
    </Box>
  );
}
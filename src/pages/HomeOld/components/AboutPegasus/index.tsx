import { Paper, Container, Grid, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import about from "../../../../assets/about.png";
import aboutVector from "../../../../assets/about-vector.svg";

const Item = styled(Paper)(({ theme }) => ({
  boxShadow: "none",
}));

export default function AboutPegasus() {
  return (

    <Box py="100px" position="relative">
      <Container>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12} >
            <Item>
              <Typography component="h1" variant="h1" color="text.secondary" marginBottom={"30px"} textTransform="capitalize">
                About <Typography color="secondary" component="span" variant="h1"> Pegasus </Typography>
              </Typography>
              <Typography variant="body1" paragraph marginBottom={"30px"}>
                Pegasus for Nursing is an educational electronic health record (EHR) that introduces learners to digital charting. This technology, as well as the Pegasus for the Medical Office, prepares them to properly document care in today’s modern clinical environment.
              </Typography>
              <Typography variant="body1" paragraph marginBottom={"30px"}>
                This is accomplished by providing learners with a realistic, yet controlled way to master electronic charting, demonstrate clinical judgment in patient care, and thrive across healthcare facilities and institutions.
              </Typography>
            </Item>
          </Grid>
          <Grid item md={6} xs={12} textAlign="center">
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
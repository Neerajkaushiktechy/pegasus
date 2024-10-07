import { Paper, Container, Grid, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ClinicSimulation from "../../../../assets/clinic_simulation.png";
import IconLearning from "../../../../assets/elearning.png";
import iconNurse from "../../../../assets/nurse_ceu.png";

const Item = styled(Paper)(({ theme }) => ({
  background: "rgba(247, 247, 247, 0.69)",
  borderRadius: "10px",
  boxShadow: "unset",
  padding: "60px 40px",
  textAlign: "center",
  position: "relative",
  transition: theme.transitions.easing.easeIn,
  '&:hover': {
    background: "#32CD32",
  }
}));

export default function HowItWorks() {
  return (

    <Box py={{ xs: "120px", md: "140px" }} id="services" position="relative" className="services">
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h1" marginBottom={"20px"} textTransform="capitalize" color="#000" className='text-md-center'>
              Services <Typography color="secondary" component="span" variant="h1"> We Provide </Typography>
            </Typography>
          </Grid>
          <Grid item md={4} xs={12}>
            <Item>
              <img src={ClinicSimulation} alt="icon" style={{ marginBottom: "30px" }} />
              <Typography sx={{ fontSize: "20px", color: "#000", fontWeight: "500" }}>
                Clinical Simulation
              </Typography>
            </Item>
          </Grid>
          <Grid item md={4} xs={12}>
            <Item>
              <img src={IconLearning} alt="icon" style={{ marginBottom: "30px" }} />
              <Typography component="h3" variant="h3" sx={{ fontSize: "20px", color: "#000", fontWeight: "500" }}>
                Study Resources
              </Typography>
            </Item>
          </Grid>
          <Grid item md={4} xs={12}>
            <Item>
              <img src={iconNurse} alt="icon" style={{ marginBottom: "30px" }} />
              <Typography component="h3" variant="h3" sx={{ fontSize: "20px", color: "#000", fontWeight: "500" }}>
                CEUs for Nurses
              </Typography>
            </Item>
          </Grid>
        </Grid>
      </Container>

    </Box>
  );
}
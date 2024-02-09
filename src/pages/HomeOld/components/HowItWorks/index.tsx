import { Paper, Container, Grid, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import caseStudies from "../../../../assets/case-studies.png";
import iconSimulation from "../../../../assets/icon-simulation.png";
import iconSmily from "../../../../assets/icon-smily.png";
import aboutVector from "../../../../assets/about-vector.svg";

const Item = styled(Paper)(({ theme }) => ({
  background: "#fff",
  boxShadow: "0px 0px 24px rgba(180, 180, 180, 0.25)",
  borderRadius: "6px",
  padding: "40px 20px",
  position: "relative",
  transition: theme.transitions.easing.easeIn,
  '&:hover': {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    img: {
      filter: "invert(1)",
    }
  }
}));

export default function HowItWorks() {
  return (

    <Box py="100px" position="relative">
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} textAlign="center">
            <Typography component="h1" variant="h1" marginBottom={"20px"} textTransform="capitalize">
              How It <Typography color="secondary" component="span" variant="h1"> Works </Typography>
            </Typography>
            <Typography variant="body1" color="text.primary" paragraph marginBottom={"30px"}>
              Using Pegasus, educators can build a consistent, integrated learning experience with three key components:
            </Typography>
          </Grid>
          <Grid item md={4} xs={12}>
            <Item>
              <Typography style={{ "WebkitTextStroke": "1px black", "color": "transparent", "fontSize": "70px", "position": "absolute", "right": "10px", "top": "0", "opacity": "0.1" }}>
                01
              </Typography>
              <img src={caseStudies} alt="icon" style={{ marginBottom: "40px" }} />
              <Typography component="h3" variant="h3" marginBottom={"16px"}>
                Case Studies
              </Typography>
              <Typography variant="body1" paragraph>
                which challenge students to document care and make clinical judgments from one phase to another
              </Typography>
            </Item>
          </Grid>
          <Grid item md={4} xs={12}>
            <Item>
              <Typography style={{ "WebkitTextStroke": "1px black", "color": "transparent", "fontSize": "70px", "position": "absolute", "right": "10px", "top": "0", "opacity": "0.1" }}>
                02
              </Typography>
              <img src={iconSimulation} alt="icon" style={{ marginBottom: "40px" }} />
              <Typography component="h3" variant="h3" marginBottom={"16px"}>
                Simulation
              </Typography>
              <Typography variant="body1" paragraph>
                which helps students build and edit patient records and even integrate those records into simulations and skills lab activities
              </Typography>
            </Item>
          </Grid>
          <Grid item md={4} xs={12}>
            <Item>
              <Typography style={{ "WebkitTextStroke": "1px black", "color": "transparent", "fontSize": "70px", "position": "absolute", "right": "10px", "top": "0", "opacity": "0.1" }}>
                03
              </Typography>
              <img src={iconSmily} alt="icon" style={{ marginBottom: "40px" }} />
              <Typography component="h3" variant="h3" marginBottom={"16px"}>
                My Clinicals
              </Typography>
              <Typography variant="body1" paragraph>
                Which enable nursing students to document the care of patients they see during their clinical rotations.

              </Typography>
            </Item>
          </Grid>
          <img src={aboutVector} alt="about_vector" style={{ position: "absolute", bottom: "110px", left: "0", zIndex: "-1" }} />
        </Grid>
      </Container>

    </Box>
  );
}
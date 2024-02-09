import { Paper, Container, Grid, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import testimonial1 from "../../../../assets/testimonial-1.png";
import StarIcon from '@mui/icons-material/Star';

const Item = styled(Paper)(({ theme }) => ({
  boxShadow: "none",
}));

export default function OurExpertise() {
  return (

    <Container>
      <Box py="100px">
        <Box textAlign="center">
          <Typography component="h1" variant="h1" color="text.secondary" marginBottom={"60px"} textTransform="capitalize">
            Our <Typography color="secondary" component="span" variant="h1"> Testimonials </Typography>
          </Typography>
        </Box>
        <Grid container spacing={0} sx={{ background: "#FFFFFF", boxShadow: "0px 0px 30px rgba(156, 156, 156, 0.25)", borderRadius: "20px", padding: "20px 32px", marginTop: "0" }} className="testimonial-card">
          <Grid item md={3} xs={12} padding="0 !important">
            <Item>
              <img src={testimonial1} alt="testimonial" />
            </Item>
          </Grid>
          <Grid item md={9} xs={12} padding="0 !important">
            <Item sx={{ marginLeft: "30px", display: "flex", flexDirection: "column", height: "100%" }} className="info">
              <Box marginBottom={"30px"} flexGrow={"1"}>
                <Typography variant="body2" color="text.secondary" paragraph marginBottom={"20px"}>
                  " Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                </Typography>
                <Typography variant="body2" paragraph marginBottom={"30px"} className="text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                </Typography>
              </Box>
              <Box>
                <Box>
                  <StarIcon sx={{ color: "#FFCA33", marginRight: "4px" }} />
                  <StarIcon sx={{ color: "#FFCA33", marginRight: "4px" }} />
                  <StarIcon sx={{ color: "#FFCA33", marginRight: "4px" }} />
                  <StarIcon sx={{ color: "#FFCA33", marginRight: "4px" }} />
                  <StarIcon sx={{ color: "#FFCA33", marginRight: "4px" }} />
                </Box>
                <Typography component="h2" variant="h2" color="primary" textTransform="capitalize">
                  Charlis Darwin <Typography color="primary" component="span" variant="body1"> <em>(Regional Manager)</em> </Typography>
                </Typography>
              </Box>
            </Item>
          </Grid>
        </Grid>
      </Box>

    </Container >
  );
}
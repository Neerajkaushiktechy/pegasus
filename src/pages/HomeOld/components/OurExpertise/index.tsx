import { Paper, Container, Grid, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import expertise from "../../../../assets/expertise.png";

const Item = styled(Paper)(({ theme }) => ({
  boxShadow: "none",
}));

export default function OurExpertise() {
  return (

    <Container>
      <Box py="100px">
        <Grid container spacing={4} alignItems="center">
          <Grid item md={6} xs={12} textAlign="center">
            <Item>
              <img src={expertise} alt="our-expertise" />
            </Item>
          </Grid>
          <Grid item md={6} xs={12}>
            <Item>
              <Typography component="h1" variant="h1" color="text.secondary" marginBottom={"30px"} textTransform="capitalize">
                Our <Typography color="secondary" component="span" variant="h1"> Expertise </Typography>
              </Typography>
              <Typography variant="body2" paragraph marginBottom={"30px"}>
                Pegasus simulated electronic health record (EHR) system gives nursing students practice with electronic documentation using cases they are likely to encounter in the real world. It enables educators to incorporate an educational EHR into their curriculum so students can get the experience they need for today’s rapidly changing health-care environment.
              </Typography>
            </Item>
          </Grid>
        </Grid>
      </Box>

    </Container>
  );
}
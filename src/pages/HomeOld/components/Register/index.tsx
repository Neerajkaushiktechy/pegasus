import { Paper, Container, Grid, Box, Typography, TextField, Button, Input, FormControl, InputLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import register from "../../../../assets/register.png";
import plus from "../../../../assets/plus.png";
import heart from "../../../../assets/heart.png";

const Item = styled(Paper)(({ theme }) => ({
  boxShadow: "none",
  background: "#F7F7F7",
  borderRadius: "6px",
  padding: "40px 30px"
}));

export default function AboutPegasus() {
  return (

    <Container>
      <Box py="100px">
        <Grid container spacing={2} alignItems="center">
          <Grid item md={6} xs={12} position="relative">
            <Item className="register-form">
              <img src={heart} alt="Heart" className="heartIcon" style={{ position: "absolute", top: "-24px", right: "-16px", boxShadow: "8.03294px 24.9914px 86.5773px rgba(0, 0, 0, 0.3)", borderRadius: "10px" }} />
              <Typography component="h2" variant="h2" color="text.secondary" marginBottom={"30px"} textTransform="capitalize" textAlign="center">
                Want to <Typography color="secondary" component="span" variant="h2"> Learn more </Typography>
              </Typography>
              <Box marginBottom="30px">
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="fName" required>
                    First Name
                  </InputLabel>
                  <Input id="fName" placeholder="First Name" required name="fName" fullWidth disableUnderline />
                </FormControl>
              </Box>
              <Box marginBottom="30px">
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="lName" required>
                    Last Name
                  </InputLabel>
                  <Input id="lName" placeholder="Last Name" required name="lName" fullWidth disableUnderline />
                </FormControl>
              </Box>
              <Box marginBottom="30px">
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="phone" required>
                    Phone Number
                  </InputLabel>
                  <Input id="phone" placeholder="Phone Number" required name="phone" fullWidth disableUnderline />
                </FormControl>
              </Box>
              <Box marginBottom="30px">
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="email" required>
                    Email
                  </InputLabel>
                  <Input id="email" placeholder="Email" required name="email" fullWidth disableUnderline />
                </FormControl>
              </Box>
              <Box marginBottom="30px">
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="message" required>
                    Message
                  </InputLabel>
                  <Input id="message" placeholder="Type here..." required name="message" fullWidth disableUnderline multiline minRows="5" />
                </FormControl>
              </Box>
              <Box textAlign="center">
                <Button variant="contained" color='primary'>Book Now</Button>
              </Box>
              <img src={plus} alt="Heart" className="plusIcon" style={{ position: "absolute", bottom: "-14px", left: "-16px", boxShadow: "8.03294px 24.9914px 86.5773px rgba(0, 0, 0, 0.3)", borderRadius: "10px" }} />
            </Item>
          </Grid>
          <Grid item md={6} xs={12}>
            <Box textAlign="center">
              <img src={register} alt="register" />
            </Box>
          </Grid>
        </Grid>
      </Box>

    </Container >
  );
}
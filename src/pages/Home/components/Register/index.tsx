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
      <Box py={{xs: "160px", md: "140px" }} id="Contact">
        <Grid container spacing={2} alignItems="center" justifyContent={'center'}>
          <Grid item lg={6} md={8} xs={12} position="relative">
            <Item className="register-form">
              <img src={heart} alt="Heart" className="heartIcon" style={{ position: "absolute", top: "-24px", right: "-16px", left: "0", boxShadow: "8.03294px 24.9914px 86.5773px rgba(0, 0, 0, 0.3)", borderRadius: "10px" }} />
              <Typography component="h1" variant="h1" marginBottom={"20px"} textTransform="capitalize" color="#000" className='text-md-center'>
                Want to <Typography color="secondary" component="span" variant="h1"> Learn more </Typography>
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
                  <Input id="message" placeholder="Type here..." sx={{padding: "10px"}} required name="message" fullWidth disableUnderline multiline minRows="5" />
                </FormControl>
              </Box>
              <Box textAlign="center">
                <Button variant="contained" sx={{ color: "#fff", textTransform: "unset", textDecoration: "unset", borderRadius: "50px !important", fontWeight: "500", padding: "12px 40px !important", }} className='btn-hover'>Book Now</Button>
              </Box>
              <img src={plus} alt="Heart" className="plusIcon" style={{ position: "absolute", bottom: "-14px", right: "-16px", top: "unset", left: "0", boxShadow: "8.03294px 24.9914px 86.5773px rgba(0, 0, 0, 0.3)", borderRadius: "10px" }} />
            </Item>
          </Grid>
          <Grid item lg={6} md={12} xs={12} className='display-none'>
            <Box textAlign="center">
              <img src={register} alt="register" />
            </Box>
          </Grid>
        </Grid>
      </Box>

    </Container >
  );
}
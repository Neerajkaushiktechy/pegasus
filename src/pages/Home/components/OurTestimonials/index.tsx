import { Avatar, Container, Box, Card, CardContent, CardActionArea, Typography, Grid } from '@mui/material';
import testimoniallogo from "../../../../assets/testimonial.png"
import testimonialVector from "../../../../assets/TestimonialEllipse.png"
import quiteVectorIcon from "../../../../assets/QuoteVectoricon.png"
import testimonial2 from "../../../../assets/allex.png"
export default function OurExpertise() {
  return (
    <Box py={{xs: "50px", md: "140px" }} sx={{ position: "relative" }}>
      <Container >
        <img src={testimonialVector} alt='' style={{ position: "absolute", bottom: "0", left: "0", width: "120px", zIndex: "-1" }} />

        <Box >
          <Typography component="h1" variant="h1" color="#000" marginBottom={"60px"} textTransform="capitalize">
            What <Typography color="secondary" component="span" variant="h1">  People Say </Typography>
          </Typography>
        </Box>
        <Grid container spacing={4}>
          <Grid item md={6} xs={12}>
            <Card  sx={{ background: "#F7F7F7", borderRadius: "10px", boxShadow: "unset", overflow: "unset" }}>
              <CardActionArea sx={{padding: "30px 26px"}} className='testimonial_wrap'>
                <CardContent  sx={{ padding: "0"  }}>
                  <img src={quiteVectorIcon} alt='' style={{ position: "absolute", top: "-40px" }} />
                  <Typography sx={{ fontSize: "16px",  textAlign :"justify" , color: "#616161", marginBottom: "30px" }}>
                  The Healthcare Success team has proven to be extremely effective in increasing Urgent Care patient volume. Their expertise in search engine optimization, social media, and online advertising continue to generate a high volume of new patient referrals to our centers.
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>

                    <Avatar src={testimoniallogo} style={{ minWidth: "70px", height: "70px", marginRight: "20px" }} />
                    <Box >
                      <Typography sx={{ fontSize: "16px", color: "#000", marginBottom: "6px", fontWeight: "500" }}>Lee Charlie</Typography>
                      <Typography sx={{ fontSize: "16px", color: "#616161" }}>Managing Director</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item md={6} xs={12}>
            <Card  sx={{ background: "#F7F7F7", borderRadius: "10px", boxShadow: "unset", overflow: "unset" }}>
              <CardActionArea sx={{padding: "30px 26px"}} className='testimonial_wrap'>
                <CardContent  sx={{ padding: "0" }}>
                  <img src={quiteVectorIcon} alt='' style={{ position: "absolute", top: "-40px" }} />
                  <Typography sx={{ fontSize: "16px", color: "#616161",  textAlign :"justify" , marginBottom: "30px" }}>
                  I am sure that you are reading our monthly column “Dental Marketing That Works” by Stewart Gandolf and Lonnie Hirsch. They always amaze me by the new material that they come up with every month. All of their programs are tried and true.
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>

                    <Avatar src={testimonial2} style={{ minWidth: "70px", height: "70px", marginRight: "20px" }} />
                    <Box >
                      <Typography sx={{ fontSize: "16px", color: "#000", marginBottom: "6px", fontWeight: "500" }}>Jennie Paul</Typography>
                      <Typography sx={{ fontSize: "16px", color: "#616161" }}>Assistant Professor</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>


      </Container >

    </Box>
  );
}
import { Paper, Container, Grid, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import expertise from "../../../../assets/expertise.png";
import maskgroup from "../../../../assets/maskgroup.png"
const Item = styled(Paper)(({ theme }) => ({
  boxShadow: "none",
}));

export default function OurExpertise() {
  return (

    <Container>
      <Box py={{ xs: "120px", md: "140px" }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item lg={6} md={12} xs={12} className='order-change'>
            <Item>
              <Typography component="h1" variant="h1" color="text.secondary" textTransform="capitalize" sx={{ fontSize: "24px !important", marginBottom: "16px" }}>
                <img src={maskgroup} alt="our-expertise" style={{ width: "20px", marginRight: "6px" }} /> Our  Expertise
              </Typography>

              <Typography textAlign={"justify"} paragraph marginBottom={"30px"} sx={{ fontSize: "16px", color: "#616161" }} >
                Our integrated platform (based on real-world experiences) is flexible and adaptable for use in
                hands-on environments or simulation. The Platform was designed by industry specialists with
                experience in organizational systems and patient portal development from all ends of the
                spectrum. The user-end experience was guided by current educators, students, and healthcare
                workers who know what they want (and don’t want!) in a platform.

              </Typography>
              <Typography component="h1" variant="h1" color="text.secondary" textTransform="capitalize" sx={{ fontSize: "24px !important", marginBottom: "16px" }}>

                <img src={maskgroup} alt="our-expertise" style={{ width: "20px", marginRight: "6px" }} /> Flexible Integration
              </Typography>
              <Typography textAlign={"justify"} paragraph marginBottom={"30px"} sx={{ fontSize: "16px", color: "#616161" }}>
                Pegasus Learning Platform is more than just a stand-alone resource for simulation; it allows for
                the flexible integration of clinical simulation, study resources, and hands-on clinical experience
                into curriculum and maximizes educational opportunities. Pegasus can be used however you
                choose. Assign case studies and allow your students to chart on the platform, develop unfolding
                scenarios to prepare your students for realistic patient management, use the EHR option after the
                hands-on clinical rotation to integrate real-world experience with digital charting, and use it to
                make and grade assignments.
              </Typography>
              <Typography component="h1" variant="h1" color="text.secondary" textTransform="capitalize" sx={{ fontSize: "24px !important", marginBottom: "16px" }}>

                <img src={maskgroup} alt="our-expertise" style={{ width: "20px", marginRight: "6px" }} /> Use Options
              </Typography>
              <Typography textAlign={"justify"} paragraph marginBottom={"30px"} sx={{ fontSize: "16px", color: "#616161" }}>
                Pegasus Learning Platform offers many options for use. Educators can take advantage of plug-and-play options and ready-made products, or they can tailor the student experience to fit their
                specific needs. Instructors can implement scenarios to prepare their students before clinical
                rotations even begin, or they can use the platform to integrate hands-on clinical documentation,
                care plans, and EHR use in an instructor-led format. Organizations can integrate Pegasus
                Learning Platform into their curricula, or individuals advancing their career have the option to
                use products to focus on weaknesses as they prepare for licensure and the workforce.
              </Typography>
            </Item>
          </Grid>
          <Grid item lg={6} md={12} xs={12} className='text-md-center'>
            <Item sx={{ paddingLeft: "40px" }}>
              <Typography component="h1" variant="h1" marginBottom={"20px"} textTransform="capitalize" color="#000">
                Our <Typography color="secondary" component="span" variant="h1"> Expertise </Typography>
              </Typography>
              <img src={expertise} alt='' />
            </Item>
          </Grid>


        </Grid>
      </Box>

    </Container>
  );
}
import { Box, Grid, Typography, Link as MuiLink, Container, List, ListItem, ListItemButton, Button } from "@mui/material";
import { Link } from "react-router-dom";
import logofooter from "../../assets/pegasus-logo1.png";
const footers = [
   {
      title: "QUICK LINKS",
      navList: [
         {
            navLink: "aboutUs",
            navItem: "About Us",
         },
         // {
         //    navLink: "",
         //    navItem: "Blog",
         // },
         // {
         //    navLink: "",
         //    navItem: "Our Story",
         // },
         {
            navLink: "careers",
            navItem: "Careers",
         },
         // {
         //    navLink: "Login",
         //    navItem: "Login",
         // },
      ],
   },
   {
      title: "MEMBERS",
      navList: [
         // {
         //    navLink: "signin",
         //    navItem: "Sign in",
         // },
         // {
         //    navLink: "signup",
         //    navItem: "Sign up",
         // },
         {
            navLink: "faq",
            navItem: "FAQ",
         },
         {
            navLink: "/covid19",
            navItem: "Covid-19",
         }
      ],
   },
];

const MainFooter = () => {



   const scrollToElement = (link: string) => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
      }, 1000);
   };
   return (
      <>
         <Box component="footer" bgcolor="primary.main" py="60px">
            <Container>
               <Grid container spacing={4} justifyContent="space-between">
                  <Grid item xs={12} md={5} >
                     {/* Logo */}
                     <Box marginBottom={"20px"}>
                        <Link onClick={() => document.querySelector(`#home`)?.scrollIntoView(({ behavior: 'smooth', block: "start", inline: "start" }))} to="/">
                           <img
                              src={logofooter}
                              alt="logo"
                              style={{
                                 width: "210px",
                                 height: "auto",
                              }}
                           />
                        </Link>
                     </Box>
                     <Typography textAlign={"justify"} variant="body2" color="primary.contrastText">
                        With more hospitals adopting electronic health records, a simulated EHR system lets nurse educators give students hands-on experience.
                     </Typography>
                  </Grid>
                  {footers.map((footer) => (
                     <Grid item sm={6} md={2} xs={12} key={footer.title}>
                        <Typography variant="body1" fontWeight="fontWeightMedium" color="primary.contrastText" marginBottom="40px">
                           {footer.title}
                        </Typography>
                        <List disablePadding>
                           {footer.navList.map((item) => (
                              <ListItem disablePadding key={item.navLink} sx={{ mb: "30px" }} onClick={(e: any) => { e.preventDefault(); scrollToElement(item.navLink) }}>
                                 <MuiLink component={Link} to={item.navLink} color="primary.contrastText" variant="subtitle1" underline="none">
                                    {item.navItem}
                                 </MuiLink>
                              </ListItem>
                           ))}
                        </List>
                     </Grid>
                  ))}
               </Grid>
            </Container>
         </Box>
         <Box>
            <Typography variant="subtitle1" color="text.primary" paragraph textAlign={"center"} padding={"20px"} marginBottom={"0"}>
               © Copyright 2023. All Rights Reserved.
            </Typography>
         </Box>
      </>
   );
};
export default MainFooter;
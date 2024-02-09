

import { Drawer as MuiDrawer, Toolbar, List, ListItemButton, ListItem, ListItemIcon, ListItemText, Collapse, Box } from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import GridViewIcon from '@mui/icons-material/GridView';
import SchoolIcon from '@mui/icons-material/School';
import { styled, Theme, CSSObject } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/pegasus-logo2.svg"
import logoIcon from "../../../assets/pegasus-logo-icon.svg"
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrypt } from "../../../utils/encryptDecrypt";
import AssignmentIcon from '@mui/icons-material/Assignment';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import GradingIcon from '@mui/icons-material/Grading';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { showFormData } from "../../../redux/modules/setting/assessmentTool/action";
const drawerWidth = 315;
const closeDrawerWidth = 112;

const openedMixin = (theme: Theme): CSSObject => ({
   width: drawerWidth,
   transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
   }),
   overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
   transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
   }),
   overflowX: "hidden",
   width: closeDrawerWidth,
});

const Drawer = styled(MuiDrawer, {
   shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
   width: drawerWidth,
   flexShrink: 0,
   whiteSpace: "nowrap",
   boxSizing: "border-box",
   ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
   }),
   ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
   }),
}));

type props = {
   open: boolean;
   mobileView?: boolean;
   // tabName?: string
};

interface locationState {
   pathname: string;
}

const navList = [
   {
      navIcon: <GridViewIcon />,
      navLink: "/dashboard",
      navItem: "Dashboard",
   },
   {
      navIcon: <InboxIcon />,
      navLink: "/patients",
      navItem: "Patients",
      navList: [
         {
            navLink: "/patients/demographic",
            navItem: "Demographic",
         },
         {
            navLink: "/patients/diagnosis",
            navItem: "Diagnosis",
         },
         {
            navLink: "/patients/allergies",
            navItem: "Allergies",
         },
         {
            navLink: "/patients/family-history",
            navItem: "Family History",
         },
         {
            navLink: "/patients/vitals",
            navItem: "Vital Signs"
         },
         {
            navLink: "/patients/medication",
            navItem: "Medications"
         },
         {
            navLink: "/patients/documents",
            navItem: "Documents"
         },
         {
            navLink: "/patients/social-history",
            navItem: "Social History"
         },
         {
            navLink: "/patients/nursingCarePlan",
            navItem: "Nursing Care Plan",
         },
         {
            navLink: "/patients/nursesNotes",
            navItem: "Nurse Notes",
         },
         {
            navLink: "/patients/laboratory",
            navItem: "Laboratory",
         },
         {
            navLink: "/patients/therapy",
            navItem: "Therapy",
         },
         {
            navLink: "/patients/doctorsOrders",
            navItem: "Doctor Orders",
         },
         {
            navLink: "/patients/prosthetics_Aids",
            navItem: "Prosthetics/Aids",
         },
      ]
   },
   {
      navIcon: <InboxIcon />,
      navLink: "/students",
      navItem: "Students",
   },
   {
      navIcon: <SchoolIcon />,
      navLink: "/schools",
      navItem: "Schools",
   },
   {
      navIcon: <AssignmentIcon />,
      navLink: "/studentAssignment",
      navItem: "Assignment",
   },
   {
      navIcon: <AssignmentIcon />,
      navLink: "/grading",
      navItem: "Grading",
   },
   {
      navIcon: <SettingsIcon />,
      navItem: "Settings",
      navList: [

         {
            navLink: "/studentsAssessment",
            navItem: "Assessment Tool",
         },
         {
            navLink: "/studentsAssessmentGroup",
            navItem: "Assessment Group",
         },
         {
            navLink: "/quickguide",
            navItem: "Quick Guide",
         },
      ]
   },
   {
      navIcon: <AccountBoxIcon />,
      navLink: "/profile",
      navItem: "Profile",
   },
];

const studentNavList = [
   {
      navIcon: <AssignmentIcon />,
      navLink: "/myAssignment",
      navItem: "My Assignment",
   },
   {
      navIcon: <GradingIcon />,
      navLink: "/studentGrades",
      navItem: "Graded Assignments",
   },
   {
      navIcon: <MenuBookIcon />,
      navLink: "/quickGuide",
      navItem: "Quick Guide",
   },
   {
      navIcon: <AccountBoxIcon />,
      navLink: "/profile",
      navItem: "Profile",
   },
]
const DashboardSideNav = ({ open, mobileView }: props) => {
   const [activeNav, setActiveNav] = useState(0)
   let dispatch = useDispatch();
   const [innerActive, setinnerActive] = useState(0)
   const [roleId, setRoleId] = useState()
   const location: locationState = useLocation();
   let { postDemographic }: any = useSelector((state: any) => {
      let { postDemographic } = state;
      return { postDemographic }
   })
   useEffect(() => {
      if (["/studentsAssessment", "/createForm"].includes(location.pathname)) {
         return;
      }
      else {
         dispatch(showFormData(null, false))
      }
   }, [dispatch, location.pathname])
   const navListToRender = roleId === 2 ? studentNavList : navList;

   useEffect(() => {
      let mainIndex: any = 0
      if (roleId === 1 || roleId === 3) {
         navList.forEach((item, index) => {
            if (location.pathname.includes('/patientInformation/') && item.navLink === "/patients") {
               mainIndex = index
            }
            else if (item.navLink === location.pathname) {
               mainIndex = index
            }
            else {
               if (item.navList) {
                  item.navList.forEach((nestedItem, nestedIndex) => {
                     if (nestedItem.navLink === location.pathname) {
                        mainIndex = Number(`${index}.${nestedIndex + 1}`)
                     }
                  })
               }
            }
         })
      }
      else {
         studentNavList.forEach((item, index) => {
            if (item.navLink === location.pathname) {
               mainIndex = index
            }
         })
      }
      if (!Number.isInteger(mainIndex)) {
         const strindex = mainIndex.toString()
         let valueBeforeDecimal = parseInt(strindex);
         setActiveNav(valueBeforeDecimal)
         setinnerActive(mainIndex)
      }
      else {
         setActiveNav(mainIndex);
         setinnerActive(0)
      }
      if (mainIndex === Math.floor(mainIndex)) {
         if (postDemographic && postDemographic.data) {
            postDemographic.data.clicked = "no";
         }
      }
   }, [location.pathname, roleId]);

   useEffect(() => {
      const item = localStorage.getItem("item");
      if (localStorage.getItem("item")) {
         const token = JSON.parse(decrypt(item))
         const parts = token.token.split('.');
         const payload = JSON.parse(window.atob(parts[1]));
         setRoleId(payload.roleId);
      }
   }, [])
   return (
      <>
         {
            mobileView ?
               <>
                  <Toolbar>
                     <Box textAlign={"center"} width={"100%"}>
                        {open ?
                           <img src={logo} alt="logo" style={{
                              width: "290px",
                              height: "60px",
                           }} />
                           :
                           <img src={logoIcon} alt="logo" />
                        }
                     </Box>
                  </Toolbar>
                  <List sx={{
                     marginTop: "40px",
                     [`& .active`]: {
                        background: "#440e66", borderRadius: "10px", color: "#fff",
                        "& svg": {
                           fill: "#fff"
                        }
                     },
                     [`& .innnerActive`]: {
                        color: "#440e66",
                     }
                  }}>
                     {navListToRender.map((item: any, index: number) => {
                        if (item.navLink === "/schools" && Number(roleId) === 3) {
                           return "";
                        }

                        return (
                           <ListItem key={item.navLink} disablePadding sx={{ display: "block", "margin": "0 20px", "background": "#fff", "width": "unset", "borderRadius": "10px", "color": "#616161", "marginBottom": "20px" }}>
                              <ListItemButton
                                 component={Link}
                                 to={
                                    item?.navItem !== "Settings" ? `${item?.navLink}` : "#"}
                                 className={`${(activeNav === index && !location.pathname.includes('createForm')) ? "active" : ""}`}
                                 style={(activeNav === index && !location.pathname.includes('createForm')) ? { background: "#440e66", borderRadius: "10px", color: "#fff" } : {}}
                                 onClick={() => { item?.navItem !== "Settings" && setActiveNav(index) }}
                                 sx={{
                                    minHeight: 48,
                                    justifyContent: open ? "initial" : "center",
                                    px: 2.5,
                                 }}>
                                 {item.navIcon &&
                                    <ListItemIcon
                                       sx={{
                                          minWidth: 0,
                                          mr: open ? 3 : "auto",
                                          justifyContent: "center"
                                       }}>
                                       {item.navIcon}
                                    </ListItemIcon>
                                 }
                                 <ListItemText primary={item.navItem} sx={{ opacity: open ? 1 : 0 }} />
                              </ListItemButton>

                              {postDemographic.data?.clicked === "yes" && item.navItem !== "Settings" && roleId !== 2 ? ((
                                 item?.navList &&
                                 <Collapse in={open} timeout="auto" unmountOnExit>
                                    <List disablePadding sx={{ marginLeft: "30px" }}>
                                       {item?.navList.map((nestedItem: any, nestedIndex: any) => (
                                          <ListItem key={nestedItem.navLink} disablePadding sx={{ display: "block" }}>
                                             <ListItemButton
                                                className={`${(innerActive === Number(`${index}.${nestedIndex + 1}`)) ? "innnerActive" : ""}`}
                                                style={(innerActive === Number(`${index}.${nestedIndex + 1}`)) ? { color: "#440e66", fontWeight: "bolder" } : {}}
                                                onClick={() => { setinnerActive(Number(`${index}.${nestedIndex + 1}`)) }}
                                                component={Link}
                                                to={`${nestedItem.navLink}`}
                                                sx={{
                                                   minHeight: 48,
                                                   justifyContent: open ? "initial" : "center",
                                                   px: 2.5,
                                                }}>
                                                {nestedItem?.navIcon &&
                                                   <ListItemIcon
                                                      sx={{
                                                         minWidth: 0,
                                                         mr: open ? 3 : "auto",
                                                         justifyContent: "center",
                                                      }}>
                                                      {nestedItem?.navIcon}
                                                   </ListItemIcon>}
                                                <ListItemText primary={nestedItem.navItem} sx={{ opacity: open ? 1 : 0 }} />
                                             </ListItemButton>
                                          </ListItem>
                                       ))}
                                    </List>
                                 </Collapse>
                              )) :
                                 roleId !== 2 && item?.navItem.includes('Settings') ?
                                    <List disablePadding sx={{ marginLeft: "30px" }}>
                                       {item?.navList.map((nestedItem: any, nestedIndex: any) => (
                                          <ListItem key={nestedItem.navLink} disablePadding sx={{ display: "block" }}>
                                             <ListItemButton
                                                className={`${(innerActive === Number(`${index}.${nestedIndex + 1}`)) ? "innnerActive" : ""}`}
                                                style={(innerActive === Number(`${index}.${nestedIndex + 1}`)) ? { color: "#440e66", fontWeight: "bolder" } : {}}
                                                onClick={() => { setinnerActive(Number(`${index}.${nestedIndex + 1}`)) }}
                                                component={Link}
                                                to={`${nestedItem.navLink}`}
                                                sx={{
                                                   minHeight: 48,
                                                   justifyContent: open ? "initial" : "center",
                                                   px: 2.5,
                                                }}>
                                                {nestedItem?.navIcon &&
                                                   <ListItemIcon
                                                      sx={{
                                                         minWidth: 0,
                                                         mr: open ? 3 : "auto",
                                                         justifyContent: "center",
                                                      }}>
                                                      {nestedItem?.navIcon}
                                                   </ListItemIcon>}
                                                <ListItemText primary={nestedItem.navItem} sx={{ opacity: open ? 1 : 0 }} />
                                             </ListItemButton>
                                          </ListItem>
                                       ))}
                                    </List>
                                    : ""
                              }
                           </ListItem>
                        )

                     })}
                  </List>
               </>
               :
               <Drawer variant="permanent" open={open} className="custom-drawer" >
                  <Toolbar>
                     <Box textAlign={"center"} width={"100%"}>
                        {open ?
                           <img src={logo} alt="logo" style={{
                              width: "290px",
                              height: "60px",
                           }} />
                           :
                           <img src={logoIcon} alt="logo" />
                        }
                     </Box>
                  </Toolbar>
                  <List sx={{
                     marginTop: "30px",
                     [`& .active`]: {
                        background: "#440e66", borderRadius: "10px", color: "#fff",
                        "& svg": {
                           fill: "#fff"
                        }
                     },
                     [`& .innnerActive`]: {
                        color: "#440e66",
                     }
                  }}>
                     {navListToRender.map((item: any, index: number) => {
                        if (item.navLink === "/schools" && Number(roleId) === 3) {
                           return "";
                        }

                        return (
                           <ListItem key={item.navLink} disablePadding sx={{ display: "block", "margin": "0 20px", "background": "#fff", "width": "unset", "borderRadius": "10px", "color": "#616161", "marginBottom": "20px" }}>
                              <ListItemButton
                                 component={Link}
                                 to={
                                    item?.navItem !== "Settings" ? `${item?.navLink}` : "#"}
                                 className={`${(activeNav === index && !location.pathname.includes('createForm')) ? "active" : ""}`}
                                 style={(activeNav === index && !location.pathname.includes('createForm')) ? { background: "#440e66", borderRadius: "10px", color: "#fff" } : {}}
                                 onClick={() => { item?.navItem !== "Settings" && setActiveNav(index) }}
                                 sx={{
                                    minHeight: 48,
                                    justifyContent: open ? "initial" : "center",
                                    px: 2.5,
                                 }}>
                                 {item.navIcon &&
                                    <ListItemIcon
                                       sx={{
                                          minWidth: 0,
                                          mr: open ? 3 : "auto",
                                          justifyContent: "center"
                                       }}>
                                       {item.navIcon}
                                    </ListItemIcon>
                                 }
                                 <ListItemText primary={item.navItem} sx={{ opacity: open ? 1 : 0 }} />
                              </ListItemButton>

                              {postDemographic.data?.clicked === "yes" && item.navItem !== "Settings" && roleId !== 2 ? ((
                                 item?.navList &&
                                 <Collapse in={open} timeout="auto" unmountOnExit>
                                    <List disablePadding sx={{ marginLeft: "30px" }}>
                                       {item?.navList.map((nestedItem: any, nestedIndex: any) => (
                                          <ListItem key={nestedItem.navLink} disablePadding sx={{ display: "block" }}>
                                             <ListItemButton
                                                className={`${(innerActive === Number(`${index}.${nestedIndex + 1}`)) ? "innnerActive" : ""}`}
                                                style={(innerActive === Number(`${index}.${nestedIndex + 1}`)) ? { color: "#440e66", fontWeight: "bolder" } : {}}
                                                onClick={() => { setinnerActive(Number(`${index}.${nestedIndex + 1}`)) }}
                                                component={Link}
                                                to={`${nestedItem.navLink}`}
                                                sx={{
                                                   minHeight: 48,
                                                   justifyContent: open ? "initial" : "center",
                                                   px: 2.5,
                                                }}>
                                                {nestedItem?.navIcon &&
                                                   <ListItemIcon
                                                      sx={{
                                                         minWidth: 0,
                                                         mr: open ? 3 : "auto",
                                                         justifyContent: "center",
                                                      }}>
                                                      {nestedItem?.navIcon}
                                                   </ListItemIcon>}
                                                <ListItemText primary={nestedItem.navItem} sx={{ opacity: open ? 1 : 0 }} />
                                             </ListItemButton>
                                          </ListItem>
                                       ))}
                                    </List>
                                 </Collapse>
                              )) :
                                 roleId !== 2 && item?.navItem.includes('Settings') ?
                                    <List disablePadding sx={{ marginLeft: "30px" }}>
                                       {item?.navList.map((nestedItem: any, nestedIndex: any) => (
                                          <ListItem key={nestedItem.navLink} disablePadding sx={{ display: "block" }}>
                                             <ListItemButton
                                                className={`${(innerActive === Number(`${index}.${nestedIndex + 1}`)) ? "innnerActive" : ""}`}
                                                style={(innerActive === Number(`${index}.${nestedIndex + 1}`)) ? { color: "#440e66", fontWeight: "bolder" } : {}}
                                                onClick={() => { setinnerActive(Number(`${index}.${nestedIndex + 1}`)) }}
                                                component={Link}
                                                to={`${nestedItem.navLink}`}
                                                sx={{
                                                   minHeight: 48,
                                                   justifyContent: open ? "initial" : "center",
                                                   px: 2.5,
                                                }}>
                                                {nestedItem?.navIcon &&
                                                   <ListItemIcon
                                                      sx={{
                                                         minWidth: 0,
                                                         mr: open ? 3 : "auto",
                                                         justifyContent: "center",
                                                      }}>
                                                      {nestedItem?.navIcon}
                                                   </ListItemIcon>}
                                                <ListItemText primary={nestedItem.navItem} sx={{ opacity: open ? 1 : 0 }} />
                                             </ListItemButton>
                                          </ListItem>
                                       ))}
                                    </List>
                                    : ""
                              }
                           </ListItem>
                        )

                     })}
                  </List>
               </Drawer >}
      </>
   );
};
export default DashboardSideNav;

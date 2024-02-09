import { useState, useEffect, SyntheticEvent } from "react";
import { Outlet, useLocation } from "react-router-dom";
import MainHeader from "../components/Header/mianHeader";
import MainFooter from "../components/Footer/mainFooter";
import DashboardTopNav from "../components/Dashboard/DashboardTopNav";
import DashboardSideNav from "../components/Dashboard/DashboardSideNav";
import { Box, Toolbar, Drawer } from "@mui/material";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PatientCard from "../components/Dashboard/PatientCard";
import { useMediaQuery } from 'react-responsive'
let tabList = [
  {
    navLink: "demographic",
    navItem: "Demographic"
  },
  {
    navLink: "diagnosis",
    navItem: "Diagnosis"
  },
  {
    navLink: "allergies",
    navItem: "Allergies"
  },
  {
    navLink: "medication",
    navItem: "Medications"
  },
  {
    navLink: "family-history",
    navItem: "Family History"
  },
  {
    navLink: "vitals",
    navItem: "Vitals"
  },
  {
    navLink: "documents",
    navItem: "Documents"
  },
  {
    navLink: "social-history",
    navItem: "Social History"
  },
  {
    navLink: "nursingCarePlan",
    navItem: "Nursing Care Plan",
  },
  {
    navLink: "nursesNotes",
    navItem: "Nurse Notes",
  },
  {
    navLink: "laboratory",
    navItem: "Laboratory",
  },
  {
    navLink: "therapy",
    navItem: "Therapy",
  },
  {
    navLink: "doctorsOrders",
    navItem: "Doctor Orders",
  },
  {
    navLink: "prosthetics_Aids",
    navItem: "Prosthetics/Aids",
  },
]

type layoutName = {
  layoutName?: string;
};
function Layout({ layoutName }: layoutName) {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const { studentLoginReducer, schoolLoginReducer, createPasswordReducer, forgotPasswordReducer } = useSelector((state: any) => {
    let { schoolLoginReducer, studentLoginReducer, login: signIn, forgotPasswordReducer, createPasswordReducer } = state
    return {
      schoolLoginReducer,
      studentLoginReducer,
      forgotPasswordReducer,
      signIn,
      createPasswordReducer
    }
  });
  const [open, setOpen] = useState(true);
  const [mobileOpen, setmobileOpen] = useState(false)
  let location = useLocation();

  const toggleDrawer = () => {
    if (isTabletOrMobile) {
      setmobileOpen(!mobileOpen)
      return;
    }
    setOpen(!open);
  };

  const [value, setValue] = useState(0);
  let { postDemographic }: any = useSelector((state: any) => {
    let { postDemographic } = state;
    return { postDemographic }
  })
  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (location.pathname === "/") {
      delete createPasswordReducer.signIn
      delete studentLoginReducer.signIn
      delete schoolLoginReducer.signIn
      delete forgotPasswordReducer?.signIn
    }
  }, [])
  useEffect(() => {
    tabList.forEach((elem, index) => {
      if (location.pathname.includes(elem.navLink)) {
        setValue(index)
      }
    })
  }, [location]);


  let { DemographicRes } = useSelector((state: any) => {
    let { postDemographic: { data: DemographicRes } } = state;
    return { DemographicRes };
  });
  let { getPatientInformationData } = useSelector((state: any) => {
    let { getDemographic: { data: getDemographicRes }, getPatientInformationData, updateDemographic } = state;
    return { getDemographicRes, getPatientInformationData, updateDemographic };
  });


  if (layoutName === "doctorDashboard") {
    return (
      <>

        <Box sx={{ display: "flex" }}>
          <DashboardTopNav open={isTabletOrMobile ? mobileOpen : open} toggleDrawer={toggleDrawer} />
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
            <DashboardSideNav open={open} />
          </Box>
          <Box component="nav">
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={toggleDrawer}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiDrawer-paper": {

                  boxSizing: "border-box",
                  width: 240,
                },
              }}
            >
              <DashboardSideNav mobileView={true} open={mobileOpen} />
            </Drawer>
          </Box>
          <Box
            component="main"
            sx={{ flexGrow: 1, minHeight: "100vh", width: `${open ? "calc(100% - 315px)" : "calc(100% - 112px)"}` }}
            bgcolor="background.paper1"
          >
            <Toolbar />
            <Box p="30px">
              <Outlet />
            </Box>
          </Box>
        </Box>
      </>
    );
  }
  if (layoutName === "patientTab") {
    return (
      <>
        {postDemographic.data?.clicked !== "yes" ? ((

          <Box sx={{ flexGrow: 1, bgcolor: "background.paper" }} className="custom-tabs">
            <Tabs
              value={value}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons
              sx={{
                mb: "50px",
                [`& .${tabsClasses.scrollButtons}`]: {
                  "&.Mui-disabled": { opacity: 0.3 },
                },
              }}
            >
              {tabList.map((item, index) => {
                if (!DemographicRes?.pId && item.navLink !== "demographic") {
                  return (
                    <Tab label={item.navItem} key={item.navLink} component={Link} to={item.navLink} disabled />
                  )
                }
                return (
                  <Tab label={item.navItem} key={item.navLink} component={Link} to={item.navLink} />
                )
              })}

            </Tabs>
          </Box>
        )) :
          <PatientCard cardType="singleCard" avatar={getPatientInformationData?.data?.Demographic?.avatar} age={getPatientInformationData?.data?.Demographic?.age} nameTitle={getPatientInformationData?.data?.Demographic?.nameTitle} name={`${getPatientInformationData?.data?.Demographic?.fName} ${getPatientInformationData?.data?.Demographic?.lName}`} gender={getPatientInformationData?.data?.Demographic?.gender} problem={getPatientInformationData?.data?.Problem} allergies={getPatientInformationData?.data?.Allergies} />
        }

        <Outlet />
      </>
    )
  }
  else {
    return (
      <>
        <MainHeader />
        <main>
          <Outlet />
        </main>
        <MainFooter />
      </>
    );
  }
}
export default Layout;

import { Toolbar, IconButton, Badge, Box, Avatar, Typography } from "@mui/material";
import io from 'socket.io-client';
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from '@mui/icons-material/Logout';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequest } from "../../../redux/modules/auth/actions";
import DialogBox from "../../DialogBox/index";
import { SOCKET_URL, API_BASE_URL } from "../../../utils/globalConstants";
import { authToken } from "../../../utils/commonUtil";
import { fetchprofileDataRequest } from "../../../redux/modules/profile/action";
import NotificationComponent from "../../Notification";
import { appendnotification, fetchnotificationDataRequest } from "../../../redux/modules/notification/action";

const drawerWidth = 315;
const closeDrawerWidth = 112;

interface AppBarProps extends MuiAppBarProps {
   open?: boolean;
}

const AppBar = styled(MuiAppBar, {
   shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
   width: `calc(100% - ${closeDrawerWidth}px)`,
   zIndex: theme.zIndex.drawer + 1,
   transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
   }),
   ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.enteringScreen,
      }),
   }),
}));

type props = {
   open: boolean,
   toggleDrawer: () => void;
}
const token = authToken();
const DashboardTopNav = ({ open, toggleDrawer }: props) => {
   const dispatch = useDispatch();
   let { getProfile, getNotification, updateNotificationData } = useSelector((state: any) => {
      let { getProfile, getNotification, updateNotificationData } = state;
      return {
         getProfile,
         getNotification,
         updateNotificationData
      }
   })
   const [openDialog, setOpenDialog] = useState<boolean>(false);
   let navigate = useNavigate();
   useEffect(() => {

      dispatch(fetchprofileDataRequest());
      dispatch(fetchnotificationDataRequest());


   }, [dispatch, getProfile?.notificationData?.success])

   useEffect(() => {
      if (updateNotificationData?.data?.success) {
         dispatch(appendnotification(undefined, "update"));
         updateNotificationData.data.success = false
      }

   }, [dispatch, updateNotificationData?.data?.success])

   useEffect(() => {
      const socket = io(`${SOCKET_URL}?token=${authToken()}`, { transports: ['websocket', "polling"], reconnection: true, forceNew: true });
      socket.on('notification', (data) => {
         dispatch(appendnotification(data, "append"))
      });
      return () => {
         socket.disconnect();
      };
   }, [dispatch])
   const handleLogOut = () => {
      setOpenDialog(true);
   }

   const handleSubmit = () => {
      dispatch(logoutRequest());
      localStorage.clear();
      navigate("/");
   }
   const unReadCount = () => {
      let noti;
      noti = getNotification?.notificationData?.filter((item: any) => item.read === 0)
      return noti?.length
   }

   return (
      <>
         <AppBar position="fixed" open={open} sx={{
            backgroundColor: "#fff", boxShadow: "none", py: "6px",
            position: "fixed",
            top: "0",
            zIndex: 999,
         }}
            className="header-mobile">
            <Toolbar>
               <IconButton
                  color="primary"
                  aria-label="open drawer"
                  onClick={toggleDrawer}
                  edge="start"
                  sx={{ background: "#91a2d661", borderRadius: "12px" }}
               >
                  <MenuIcon />
               </IconButton>
               <Box sx={{ flexGrow: 1 }}>

               </Box>
               <Box sx={{ display: "flex" }}>
                <NotificationComponent notificationList={getNotification?.notificationData} unReadCount={unReadCount} />
                  {getProfile?.data?.data !== undefined &&
                   <Box sx={{ display: 'flex', alignItems: "center" }}>
                          {
                     getProfile.data?.data?.profilePic !== ""  ?
                        <Avatar src={`${API_BASE_URL}profilephoto/${getProfile?.data?.data?._id}/${getProfile.data?.data?.profilePic}`} sx={{ marginRight: "16px" }}/>
                           :
                           <Avatar sx={{ marginRight: "16px" }}>{getProfile?.data?.data?.name ? getProfile?.data?.data?.name?.charAt(0) : getProfile?.data?.data?.cp_fName ? getProfile?.data?.data?.cp_fName?.charAt(0) + " " + getProfile?.data?.data?.cp_lName?.charAt(0) : getProfile?.data?.data?.fName?.charAt(0) + getProfile?.data?.data?.lName?.charAt(0)}</Avatar>
                  }
                           <Typography sx={{ fontSize: "16px" }} component="span" color='text.primary'>
                              {getProfile?.data?.data?.name ? getProfile?.data?.data?.name : getProfile?.data?.data?.cp_fName ? getProfile?.data?.data?.cp_fName + " " + getProfile?.data?.data?.cp_lName : getProfile?.data?.data?.fName + " " + getProfile?.data?.data?.lName}
                           </Typography>
                        </Box>
                        }
                     <IconButton onClick={() => handleLogOut()} size="large" color="primary">
                        <LogoutIcon />
                     </IconButton>
                  </Box>
            </Toolbar>
         </AppBar>
         <DialogBox buttonIcon={"logout"} openDialog={openDialog} handleSubmit={handleSubmit} handleClose={() => setOpenDialog(false)} title={'Are you sure want to logout?'} />
      </>
   );
};
export default DashboardTopNav;
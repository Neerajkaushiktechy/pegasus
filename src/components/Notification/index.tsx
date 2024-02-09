import {
    Menu,
    MenuItem,
    ListItemText,
    Divider,
    Typography,
    MenuList,
    IconButton,
    Badge
} from "@mui/material";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PopupState, {
    bindMenu,
    bindTrigger,
} from 'material-ui-popup-state'
import moment from "moment";
import { updateNotificationRequest } from "../../redux/modules/notification/action";
import { useDispatch } from "react-redux";

type props = {
    notificationList: any
    unReadCount: any;
}
const NotificationComponent = ({ notificationList, unReadCount }: props) => {
    let dispatch = useDispatch();
    const handleClose = async (popupState: any) => {
        popupState.close();
    };

    const TypographyText = ({ noti }: any) => (
        <>
            <div style={{ borderBottom: "1px solid #c7c7c7", margin: "10px 20px", paddingBottom: "10px" }}>
                <Typography
                    style={{
                        paddingBottom: "6px",
                        fontSize: "16px"
                    }}
                >
                    {noti?.assessmentId?.assessmentTitle} {noti?.message} {noti?.createdBy?.name}
                </Typography>
                <Typography sx={{ paddingLeft: "0", fontStyle: "italic", color: "#acacac", fontSize: "14px" }}>{moment(noti?.updatedAt)?.format('LLL')}</Typography>
            </div>

        </>

    );

    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
                <>
                    <IconButton
                        size="large"
                        onClick={(e) => { e.preventDefault(); dispatch(updateNotificationRequest()) }}
                        color="primary"
                        sx={{ marginRight: "20px" }}
                    >
                        <Badge
                            badgeContent={unReadCount()}
                            color="primary"
                            max={99}
                        >
                            <NotificationsNoneOutlinedIcon    {...bindTrigger(popupState)} />
                        </Badge>
                    </IconButton>
                    <Menu

                        {...bindMenu(popupState)}
                        PaperProps={{
                            sx: {
                                width: "30%",
                            },
                        }}

                        onClose={(event: any) => handleClose(popupState)}
                    >
                        <MenuList className="notify-list">
                            <>
                                <MenuItem
                                    sx={{ pointerEvents: "none" }}
                                    style={{ whiteSpace: "normal", padding: "0" }}
                                >
                                    <ListItemText sx={{ fontWeight: "600", color: "rgba(39,30,74,0.9)" }} className="notify-title">
                                        Notifications
                                    </ListItemText>
                                </MenuItem>
                                {
                                    notificationList?.length > 0 ? notificationList?.map((noti: object, i: number) => (
                                        <TypographyText noti={noti} key={i} />
                                    ))
                                        :
                                        <Typography sx={{ textAlign: "center", pointerEvents: "none" }}>No Notification found</Typography>
                                }
                                <Divider />
                            </>

                        </MenuList>
                    </Menu>
                </>
            )}
        </PopupState>
    )
}


export default NotificationComponent
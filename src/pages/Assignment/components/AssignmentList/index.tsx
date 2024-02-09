import { useContext, useEffect, useState } from "react";
import { UpdateDataContext, ShowTableDataContext } from "../../../..//utils/showHideTabData";
import AssignmentByGroup from "../AssignmentByGroup"
import AssignmentByList from "../AssignmentByList"
import { Tab, Box, Button } from '@mui/material';
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import { useSelector } from "react-redux";

type props = {
    setShowAssignmentList: any
}

export default function AssignmentList({ setShowAssignmentList }: props) {
    const [activeTab, setActiveTab] = useState(0);
    const { showListData, setShowListData } = useContext(ShowTableDataContext);
    const { setEditData } = useContext(UpdateDataContext);
    useEffect(() => {
        setEditData((prevalue: any) => {
            return {
                ...prevalue,
                activeTab
            }
        })
    }, [setEditData, activeTab])

    const handleTabChange = (event: any, newValue: any) => {
        setActiveTab(newValue);
    };

    return (
        <>
            <Box sx={{ flexGrow: 1, bgcolor: "background.paper" }} className="custom-tabs">
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    variant="scrollable"
                    sx={{
                        mb: "20px",
                        [`& .MuiTabs-hideScrollbar`]: {
                            "flex": "unset"
                        },
                        [`& .${tabsClasses.scrollButtons}`]: {
                            "&.Mui-disabled": { opacity: 0.3 },
                        },
                    }}
                >
                    <Tab label="Assignment By List" />
                    <Tab label="Assignment By Group" />
                </Tabs>
                {activeTab === 0 && <AssignmentByList />}
                {activeTab === 1 && <AssignmentByGroup />}
            </Box>
            <Box mt="50px" textAlign="right" pb="18px">
                <Button sx={{ mr: "20px", mb: "10px" }} variant="contained" color="secondary" type="submit" onClick={() => {
                    setShowAssignmentList(false); setEditData({});
                }}>
                    Cancel
                </Button>
                <Button sx={{ mr: "20px", mb: "10px" }} variant="contained" color="secondary" type="submit" onClick={() => {
                    setShowListData(!showListData)

                }}>
                    Assign To Students
                </Button>
            </Box>
        </>
    );
}

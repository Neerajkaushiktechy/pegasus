import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box, Tabs, Tab, Stack, Typography, TextField, InputAdornment, Select, MenuItem, FormControl, Input } from "@mui/material";
import GradingList from "../GradingList";
import CheckAssessmentList from "../checkAssessmentList";
import { getDataRequest } from "../../../../redux/modules/grading/action";
import SearchIcon from '@mui/icons-material/Search';

type props = {
   setShowList: any,
   setAssignmentData: any
}

export default function CheckAssessment({ setShowList, setAssignmentData }: props) {
   let dispatch = useDispatch();

   const [activeTab, setActiveTab] = useState(0);
   const [searchText, setSearchText] = useState("");
   const [searchType, setSearchType] = useState("student");
   
   useEffect(() => {
      let debouncing: any = window.setTimeout(() => {
         dispatch(getDataRequest({ searchType, searchText }))
      }, 300)

      return () => clearTimeout(debouncing)
   }, [searchText, dispatch]);

   const handleTabChange = (event: any, newValue: any) => {
      setActiveTab(newValue);
   };

   return (
      <>
         <Stack direction="row" justifyContent="space-between" alignItems={"center"} spacing={2} sx={{ marginBottom: "20px" }}>
            <Typography sx={{ fontWeight : "600" , fontSize :"22px" ,color: "#271E4A"}}>Assesments</Typography>
            <Stack
               width="60%"
               direction="row"
               justifyContent="space-between"
               alignItems={"center"}
               spacing={2}
            >
               {(searchType === "student" || searchType === "assesment") ?
                  <TextField
                     fullWidth
                     onChange={(e: any) => { setSearchText(e.target.value) }}
                     InputProps={{
                        startAdornment: (
                           <InputAdornment position="start">
                              <SearchIcon />
                           </InputAdornment>
                        ),
                     }}
                     variant="standard"
                     className="patient-search"
                     value={searchText}
                  />
                  :
                  <FormControl variant="standard" fullWidth hiddenLabel sx={{ ".MuiInputBase-root": { marginTop: "0!important" } }}>
                     <Input
                        id="date"
                        required
                        type="date"
                        name="date"
                        fullWidth
                        disableUnderline
                        onChange={(e) => { setSearchText(e.target.value); }}
                        value={searchText}
                     />
                  </FormControl>
               }
               <Select
                  name="searchType"
                  required
                  sx={{ width: "50%" }}
                  fullWidth
                  disableUnderline
                  onChange={(e) => {
                     setSearchType(e.target.value);
                     setSearchText("");
                     console.log("chage")
                  }}
                  value={searchType}
               >

                  <MenuItem value="student"><Typography variant="body2">Student name</Typography></MenuItem>
                  <MenuItem value="assesment"><Typography variant="body2">Assesment name</Typography></MenuItem>
                  <MenuItem value="endDate"><Typography variant="body2">End Date</Typography></MenuItem>
                  <MenuItem value="startDate"><Typography variant="body2">Start Date</Typography></MenuItem>
               </Select>

            </Stack>
         </Stack>
         {/* <Box sx={{ flexGrow: 1, bgcolor: "background.paper" }} className="custom-tabs">
            <Tabs
               value={activeTab}
               onChange={handleTabChange}
               variant="scrollable"
               sx={{
                  mb: "20px",
                  [`& .MuiTabs-hideScrollbar`]: {
                     "flex": "unset"
                  }
               }}
            >
               <Tab label="Course Assignments" />
               <Tab label="Assign Assignments" />
            </Tabs>
            {activeTab === 0 && <GradingList setShowList={setShowList} setAssignmentData={setAssignmentData} />}
            {activeTab === 1 && <CheckAssessmentList setShowList={setShowList} setAssignmentData={setAssignmentData} />}
         </Box> */}
         <CheckAssessmentList setShowList={setShowList} setAssignmentData={setAssignmentData} />
      </>
   );
}

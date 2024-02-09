import { useEffect, useState } from "react";
import CheckAssessmentForm from "./components/checkAssessmentForm";
import Loader from "../../components/Loader";
import { useSelector } from "react-redux";
import CheckAssessmentList from "./components/checkAssessmentList";
import { Stack, Typography, TextField, InputAdornment, Select, MenuItem, FormControl, Input, Pagination, Box } from "@mui/material";
import { useDispatch } from "react-redux";

import SearchIcon from '@mui/icons-material/Search';
import { getDataRequest } from "../../redux/modules/grading/action";


export default function Grading() {
    let [showList, setShowList] = useState(true)
    let [assignmentData, setAssignmentData] = useState({
        assignmentId: "",
        assignmentGrade: "",
        assignmentComment: "",
        assignmentType: "",
        pId: "",
        studentId: "",
        patientDetail: {}
    });
    let dispatch = useDispatch();

    const [searchText, setSearchText] = useState("");
    const [searchType, setSearchType] = useState("student");
    const [pagenumber, setPageNumber] = useState(1);
    const [limit, setLimit] = useState(20)

    useEffect(() => {
        let debouncing: string | number | NodeJS.Timeout | undefined;
        if (searchText !== "") {
            debouncing = window.setTimeout(() => {
                dispatch(getDataRequest({ searchType, searchText }))
            }, 500)
        }
        else {
            dispatch(getDataRequest({ searchType, searchText, pagenumber, limit }))
        }

        return () => clearTimeout(debouncing)
    }, [searchText, dispatch, showList, searchType, pagenumber]);


    let { getGrading } = useSelector((state: any) => {
        let { getGrading } = state;
        return { getGrading }
    })

    if (getGrading?.loading && searchText === "") {
        return <Loader />
    }


    return (
        <>
            {showList ?
                <>
                    <Stack direction="row" justifyContent="space-between" alignItems={"center"} spacing={2} sx={{ marginBottom: "20px", display: { xs: "block", md: "flex" } }}>
                        <Typography sx={{ fontWeight: "600", fontSize: "22px", color: "#271E4A", marginBottom: { xs: "12px", md: "0" } }}>Assesments</Typography>
                        <Stack
                            width="60%"
                            direction="row"
                            justifyContent="space-between"
                            alignItems={"center"}
                            spacing={2}
                            sx={{ marginLeft: "0 !important" }}
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

                    <CheckAssessmentList setShowList={setShowList} setAssignmentData={setAssignmentData} />

                    {getGrading?.data?.totalPages > 1 && !searchText &&
                        <Box textAlign="center" mt="40px">
                            <Pagination count={getGrading?.data?.totalPages} color="secondary" shape="rounded" page={pagenumber} sx={{ display: "inline-block" }} onChange={(event: any, page: any) => setPageNumber(page)} />
                        </Box>
                    }
                </>
                : <CheckAssessmentForm setShowList={setShowList} assignmentData={assignmentData} />}
        </>
    )
}
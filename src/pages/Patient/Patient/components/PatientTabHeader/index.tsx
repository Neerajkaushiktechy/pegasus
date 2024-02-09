
import { Button, Stack, Typography, TextField, InputAdornment, Select, MenuItem } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ChangeEvent, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchIcon from '@mui/icons-material/Search';

type props = {
    handleSearch: (searchType: string, searchText: string) => void;
}

// Debounce function
const debounce = (callback: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any) => {
        clearTimeout(timer);
        timer = setTimeout(() => callback(...args), delay);
    };
};

export default function PatientTabHeader({ handleSearch }: props) {
    const [searchType, setSearchType] = useState(() => {
        const storedSearchType = localStorage.getItem("searchType");
        return storedSearchType || "patient";
    });

    const [searchText, setSearchText] = useState("");
    const handleSearchDebounced = useRef(debounce(handleSearch, 2000)).current;

    let { postDemographic }: any = useSelector((state: any) => {
        return state
    });

    const setDeafaultValue = () => {
        if (postDemographic?.data) {
            postDemographic.data = postDemographic.initialStateDemographic.data
            postDemographic.data = { clicked: "no" }
        }
    }

    useEffect(() => {
        localStorage.setItem("searchType", searchType);
    }, [searchType]);

    return (
        <Stack direction="row" justifyContent="space-between" alignItems={"center"} spacing={{ xs: 0, lg: 2 }} mb="40px" sx={{ display: { xs: "block!important", lg: "flex!important" } }}>
            <Typography sx={{ fontWeight: "600", fontSize: "22px", color: "#271E4A", marginBottom: { xs: 2, lg: 0 } }} >Patients</Typography>
            <Stack direction="row" justifyContent="space-between" alignItems={"center"} spacing={{ xs: 0, lg: 2 }} sx={{ display: { xs: "block!important", md: "flex!important" } }}>
                <Button variant="contained" color="secondary" component={Link} to="/patients/demographic" sx={{ width: "50%", marginBottom: { xs: 2, lg: 0 } }} startIcon={<AddCircleOutlineIcon sx={{ width: "30px", height: "30px", }} />} onClick={setDeafaultValue} >
                    Add Patient
                </Button>
                <TextField
                    onChange={(e) => {
                        setSearchText(e.target.value);
                        handleSearchDebounced(searchType, e.target.value);
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    variant="standard"
                    className="patient-search"
                />
                <Select
                    name="searchType"
                    required
                    sx={{ width: "50%" }}
                    fullWidth
                    disableUnderline
                    onChange={(e) => {
                        setSearchType(e.target.value);
                        setSearchText("");
                        handleSearchDebounced(e.target.value, "");
                    }}
                    value={searchType}
                >
                    <MenuItem value="patient">Patient name</MenuItem>
                    <MenuItem value="school">School name</MenuItem>
                </Select>
            </Stack>
        </Stack>
    );
}


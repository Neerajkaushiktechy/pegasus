
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import PatientCardList from "./components/PatientCardList";
import PatientTabHeader from "./components/PatientTabHeader";
import PatientListView from "./components/PatientListView";
import { getDemographicRequest } from "../../../redux/modules/patients/demographic/action";
import Loader from "../../../components/Loader";
import { useSelector } from "react-redux";
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function Patient() {
    let dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [searchType, setSearchType] = useState("");
    const [toggleView, setToggleView] = useState(true)
    let { getDemographic } = useSelector((state: any) => {
        let { getDemographic } = state;
        return { getDemographic }
    });
    let cardLimit = toggleView === true ? 20 : 25;

    useEffect(() => {
        dispatch(getDemographicRequest({ limit: cardLimit, search: searchText, searchType: searchType, skip: page * cardLimit - cardLimit }));
    }, [dispatch, page, searchText, toggleView]);

    const handleSearch = (searchType: string, searchText: string) => {
        setSearchType(searchType);
        setSearchText(searchText);
    }
    const handleToggleView = () => {
        setToggleView((prevToggleView) => !prevToggleView);
    }

    if (getDemographic?.loading) {
        return <Loader />
    }

    return (
        <>
            <FormGroup sx={{ alignItems: "end", marginBottom: "10px" }}>
                <FormControlLabel sx={{ color: "#271E4A", fontWeight: 600, fontSize: "22px" }} checked={toggleView} onChange={handleToggleView} value="end" control={<Switch />} label={toggleView === true ? "Card View" : "List View"} labelPlacement="end" />
            </FormGroup>
            <PatientTabHeader handleSearch={handleSearch} />
            {toggleView === true ?
                <PatientCardList cardLimit={cardLimit} page={page} setPage={setPage} />
                : <PatientListView cardLimit={cardLimit} page={page} setPage={setPage} />}

        </>
    )
}

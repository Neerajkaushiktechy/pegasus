
import PatientCard from "../../../../../components/Dashboard/PatientCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, Pagination, Box } from '@mui/material';
import { useEffect, useState } from "react";
import { decrypt } from "../../../../../utils/encryptDecrypt";
import { TableRow, styled } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableList from "../../../../../components/Dashboard/TableList";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.text.secondary,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        whiteSpace: "normal",  // Add this property to allow text to wrap
    },
}));
const truncateText = (text: any, maxLength: any) => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + ".................Read More";
    }
    return text;
};
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


type props = {
    cardLimit: number,
    page: number,
    setPage: (value: number) => void
}

export default function PatientListView({ cardLimit, page, setPage }: props) {
    let tableHead = ["Name", "Gender", "Age", "Daignosis"]
    const navigation = useNavigate();
    const [roleId, setRoleId] = useState()
    let { patientsList } = useSelector((state: any) => {
        let { getDemographic: { data: patientsList } } = state;
        return { patientsList }
    })

    let pageCount = 0;

    if (patientsList?.dataCount && patientsList?.dataCount > cardLimit) {
        pageCount = patientsList.dataCount / cardLimit;
        if (pageCount % 2 !== 0) {
            pageCount = Math.ceil(pageCount)
        }
    }
    useEffect(() => {
        const item = localStorage.getItem("item");
        if (localStorage.getItem("item")) {
            const token = JSON.parse(decrypt(item))
            const parts = token.token.split('.');
            const payload = JSON.parse(window.atob(parts[1]));
            setRoleId(payload.roleId);
        }
    }, [])
    const onClickCardHandler = (cardId: any) => {
        navigation(`/patientInformation/${btoa(cardId)}`)
    }

    const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    console.log(patientsList?.data?.patientdiagnosis, "data")
    return (
        <>
            {(patientsList?.data && patientsList?.data.length > 0) ?
                <>
                    <TableList tableHead={tableHead} type={true}>
                        {patientsList?.data.map((item: any, index: number) => (
                            <StyledTableRow key={`${item._id}${index}`}>
                                <StyledTableCell onClick={() => onClickCardHandler(item._id)} sx={{ width: "20%", cursor: "pointer" }} align="left">{item.fName} {item.lName}</StyledTableCell>
                                <StyledTableCell sx={{ width: "10%" }} align="center">{item.gender}</StyledTableCell>
                                <StyledTableCell sx={{ width: "10%" }} align="center">{item.age}</StyledTableCell>
                                <StyledTableCell align="center">
                                    {item?.patientdiagnosis?.map((elm: any, i: number) => (
                                        <span key={i}>
                                            {i > 0 && ", "}
                                            {elm.description}
                                        </span>
                                    ))}
                                    {/* {item?.patientdiagnosis?.length > 2 && <span style={{ color: "#271E4A", fontWeight: 600, fontSize: "22px" }}>...</span>} */}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableList>
                    {(patientsList?.dataCount && patientsList?.dataCount > cardLimit) &&
                        <Box textAlign="center" mt="40px">
                            <Pagination count={pageCount} color="secondary" shape="rounded" page={page} sx={{ display: "inline-block" }} onChange={handlePagination} />
                        </Box>
                    }
                </>
                :
                <h1>THERE IS NO DATA HERE</h1>
            }
        </>
    )
}

import PatientCard from "../../../../../components/Dashboard/PatientCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, Pagination, Box } from '@mui/material';
import { useEffect, useState } from "react";
import { decrypt } from "../../../../../utils/encryptDecrypt";

type props = {
    cardLimit: number,
    page: number,
    setPage: (value: number) => void
}

export default function PatientCardList({ cardLimit, page, setPage }: props) {
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
        navigation(`/patientInformation/${cardId}`)
    }

    const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <>
            {(patientsList?.data && patientsList?.data.length > 0) ?
                <>
                    <Grid container spacing={4} >
                        {patientsList?.data.map((item: any) => {
                            return (
                                <Grid key={item._id} item xl={3} lg={4} md={4} sm={6} xs={12}>
                                    <PatientCard avatar={item.avatar} nameTitle={item.nameTitle} age={item.age} name={`${item.fName} ${item.lName}`} gender={item.gender} id={btoa(item._id)} onClick={onClickCardHandler} createdBy={item.createdBySchoolName} />
                                </Grid>
                            )
                        })}
                    </Grid>
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
import { Card, CardContent, Typography, Box, Divider, Button } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { ReactNode, useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import { decrypt } from "../../utils/encryptDecrypt";

type props = {
    children: ReactNode
    heading?: string
    tabUrl?: string
}

export default function PatientDetailCard({ children, heading, tabUrl }: props) {
    const [roleId, setRoleId] = useState()

    useEffect(() => {
        const item = localStorage.getItem("item");
        if (localStorage.getItem("item")) {
            const token = JSON.parse(decrypt(item))
            const parts = token.token.split('.');
            const payload = JSON.parse(window.atob(parts[1]));
            setRoleId(payload.roleId);
        }
    }, [])

    return (
        <Card sx={{ marginTop: "20px" }}>
            <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                    <Typography sx={{ fontSize: "22px" }} color="common.black" >
                        {heading}
                    </Typography>
                    {roleId !== 2 ? (
                        <Button component={Link} to={`${tabUrl}`} startIcon={<AddBoxIcon sx={{ width: "40px", height: "40px", color: "#32CD32" }} />
                        } >
                        </Button>
                    ) : null}
                </Box>
                <Divider />
                {children}
            </CardContent>
        </Card>
    )
}



import {
    Box,
    Typography,
    Card,
    CardContent
} from "@mui/material";
import logo from "../../../../../assets/pegasus-logo.svg"
import { Link } from "react-router-dom";

const SuccssReset: React.FC = () => {

    return (
        <>

            <Card sx={{ marginTop: "200px" }} variant="outlined" className="LoginContainer">
                <Box className="LoginHeaderContainer">
                    <img src={logo} alt="logo" style={{
                        width: "230px",
                        height: "90px",
                        marginBottom: "30px"
                    }} />
                    <Typography variant="h4" fontWeight={1000}>
                        Reset your password
                    </Typography>
                </Box>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder
                        </Typography>
                    </CardContent>
                </Card>
            </Card>
            <Box className="btmRow">
                <Typography>
                    Don't have an account?{" "}
                    <a href="" className="anchorText">
                        Signup
                    </a>
                </Typography>
                <Typography>
                    <Link to={`/auth/login?type=${btoa('admin')}`} className="anchorText">
                        Back to login
                    </Link>
                </Typography>
            </Box>

        </>
    );
};

export default SuccssReset;
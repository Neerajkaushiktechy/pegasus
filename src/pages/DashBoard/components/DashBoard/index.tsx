import { Box, Typography, Card, Grid, } from '@mui/material';
import { useEffect, useState } from "react";
import { fetchprofileDataRequest } from '../../../../redux/modules/profile/action';
import { useDispatch, useSelector } from 'react-redux';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import GradingIcon from '@mui/icons-material/Grading';
import medicines from '../../../../assets/medicines.png'
import { getDashboardDataApi } from '../../../../utils/api'
import { getRole } from '../../../../utils/commonUtil';
import Loader from "../../../../components/Loader";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


interface CardData {
  totalPatient?: number;
  totalSchool?: number;
  totalStudent?: number;
  totalAssignment?: number;
  totalCompletedAssignment?: number;
  totalPendingAssignment?: number;
}

export default function Dashboard() {
  const navigation = useNavigate();
  const [cardData, setcardData] = useState<CardData>({})
  let { getProfile } = useSelector((state: any) => {
    let { getProfile } = state;
    return {
      getProfile,
    }
  })
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchprofileDataRequest());

    const fetchData = async () => {
      try {
        const response = await getDashboardDataApi();
        if (response.success) {
          setcardData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (getProfile?.loading) {
    return <Loader />
  }

  return (
    <>
      <div
        className="hero"
      >
        <Grid container spacing={2} p={2}>
          <Grid item xl={8} lg={12} sm={12} xs={12}>
            <Box sx={{ background: "#61C0D9", borderRadius: "10px", position: "relative", padding: "60px 20px", display: "flex", boxShadow: "rgba(17, 17, 26, 0.2) 0px 0px 16px" }} >
              <Box sx={{}}>
                {getProfile?.data?.data && <Typography variant="h2" sx={{ marginBottom: "10px", color: "white", fontSize: "24px", fontWeight: "500" }}>
                  Hi, {getProfile?.data?.data?.name ? getProfile?.data?.data?.name : getProfile?.data?.data?.cp_fName ? getProfile?.data?.data?.cp_fName + " " + getProfile?.data?.data?.cp_lName : getProfile?.data?.data?.fName + " " + getProfile?.data?.data?.lName}
                </Typography>}
                <Typography variant="body1" sx={{ color: "white", maxWidth: "560px" }}>
                  You have been doing your whole work plan for  the last two months, way to go
                </Typography>
              </Box>
              <img className='screen' src={medicines} alt="img" style={{ width: "200px", position: "absolute", top: "30px", right: "30px", }} />
            </Box>
          </Grid>
          <Grid item xl={2} lg={6} sm={6} xs={12}>
            <Link to="/patients">
              <Box sx={{ background: "white", borderRadius: "10px", padding: "40px 20px", boxShadow: "rgba(17, 17, 26, 0.2) 0px 0px 16px", textAlign: "center" }}  >
                <span style={{ marginBottom: "10px", display: "block" }}>
                  <SupervisedUserCircleIcon sx={{ color: "#FF9792", width: "60px", height: "60px" }} />
                </span>
                <Box sx={{}}>
                  <Typography variant="body1" sx={{ marginBottom: "6px", color: "black" }}>
                    Total Patients
                  </Typography>
                  <Typography variant="h2" sx={{ color: "#FF9792", fontSize: "24px", fontWeight: "500" }}>
                    {cardData?.totalPatient}
                  </Typography>
                </Box>
              </Box>
            </Link>
          </Grid>

          {getRole() === 1 && (
            <Grid item xl={2} lg={6} sm={6} xs={12}>
              <Link to="/schools">
                <Box sx={{ background: "white", borderRadius: "10px", padding: "40px 20px", boxShadow: "rgba(17, 17, 26, 0.2) 0px 0px 16px", textAlign: "center" }} >
                  <span style={{ marginBottom: "10px", display: "block" }}>
                    <SchoolIcon sx={{ color: "#FF9792", width: "60px", height: "60px" }} />
                  </span>
                  <Box sx={{}}>
                    <Typography variant="body1" sx={{ marginBottom: "6px", color: "black" }}>
                      Total Schools
                    </Typography>
                    <Typography variant="h2" sx={{ color: "#FF9792", fontSize: "24px", fontWeight: "500" }}>
                      {cardData?.totalSchool}
                    </Typography>
                  </Box>
                </Box>
              </Link>
            </Grid>
          )}
        </Grid>

        <Grid container spacing={2} p={2}>
          <Grid item xl={3} lg={6} md={6} sm={6} xs={12}>
            <Link to="/students">
              <Box sx={{ background: "#FF9285", borderRadius: "10px", padding: "30px 20px", display: "flex", boxShadow: "rgba(17, 17, 26, 0.2) 0px 0px 16px" }} >
                <span style={{
                  background: "#ee7263", width: "60px", height: "60px", borderRadius: "10px", textAlign: "center", lineHeight: "88px", marginRight: "16px"
                }}>
                  <GroupsIcon sx={{ color: "white", width: "40px", height: "40px" }} />
                </span>
                <Box sx={{}}>
                  <Typography variant="body1" sx={{ marginBottom: "6px", color: "white" }}>
                    Total Students
                  </Typography>
                  <Typography variant="h2" sx={{ color: "white", fontSize: "24px", fontWeight: "500" }}>
                    {cardData?.totalStudent}
                  </Typography>
                </Box>
              </Box>
            </Link>
          </Grid>
          <Grid item xl={3} lg={6} md={6} sm={6} xs={12}>
            <Link to="/studentAssignment">
              <Box sx={{ background: "#FFB759", borderRadius: "10px", padding: "30px 20px", display: "flex", boxShadow: "rgba(17, 17, 26, 0.2) 0px 0px 16px" }} >
                <span style={{
                  background: "#F9A034", width: "60px", height: "60px", borderRadius: "10px", textAlign: "center", lineHeight: "88px", marginRight: "16px"
                }}>
                  <AssignmentIcon sx={{ color: "white", width: "40px", height: "40px" }} />
                </span>
                <Box sx={{}}>
                  <Typography variant="body1" sx={{ marginBottom: "6px", color: "white" }}>
                    Total Assignments
                  </Typography>
                  <Typography variant="h2" sx={{ color: "white", fontSize: "24px", fontWeight: "500" }}>
                    {cardData?.totalAssignment}
                  </Typography>
                </Box>
              </Box>
            </Link>
          </Grid>
          <Grid item xl={3} lg={6} md={6} sm={6} xs={12}>
            <Link to="/grading">
              <Box sx={{ background: "#61C0D9", borderRadius: "10px", padding: "30px 20px", display: "flex", boxShadow: "rgba(17, 17, 26, 0.2) 0px 0px 16px" }} >
                <span style={{
                  background: "#51B4CE", width: "60px", height: "60px", borderRadius: "10px", textAlign: "center", lineHeight: "88px", marginRight: "16px"
                }}>
                  <GradingIcon sx={{ color: "white", width: "40px", height: "40px" }} />
                </span>
                <Box sx={{}}>
                  <Typography variant="body1" sx={{ marginBottom: "6px", color: "white" }}>
                    Completed Assignments
                  </Typography>
                  <Typography variant="h2" sx={{ color: "white", fontSize: "24px", fontWeight: "500" }}>
                    {cardData?.totalCompletedAssignment}
                  </Typography>
                </Box>
              </Box>
            </Link>
          </Grid>
          <Grid item xl={3} lg={6} md={6} sm={6} xs={12}>
            <Link to="/studentAssignment">
              <Box sx={{ background: "#67CC57", borderRadius: "10px", padding: "30px 20px", display: "flex", boxShadow: "rgba(17, 17, 26, 0.2) 0px 0px 16px" }} >
                <span style={{
                  background: "#50C03E", width: "60px", height: "60px", borderRadius: "10px", textAlign: "center", lineHeight: "88px", marginRight: "16px"
                }}>
                  <AssignmentIcon sx={{ color: "white", width: "40px", height: "40px" }} />
                </span>
                <Box sx={{}}>
                  <Typography variant="body1" sx={{ marginBottom: "6px", color: "white" }}>
                    Pending Assignments
                  </Typography>
                  <Typography variant="h2" sx={{ color: "white", fontSize: "24px", fontWeight: "500" }}>
                    {cardData?.totalPendingAssignment}
                  </Typography>
                </Box>
              </Box>
            </Link>
          </Grid>
        </Grid>
      </div >
    </>
  );
}

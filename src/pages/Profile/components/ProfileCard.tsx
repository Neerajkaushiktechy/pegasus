import { Box, Typography, Avatar, Button } from "@mui/material";
type props = {
  name: string,
  email: string,
  setshow?: any;
  formData : any;
}
const ProfileCard = ({ name, email, setshow , formData }: props) => {
  return (
    <Box sx={{ background: "#FFFFFF", boxShadow: "0px 1px 60px rgba(190, 190, 190, 0.08)", borderRadius: "10px", padding: "20px", marginTop: "20px", marginBottom: "20px" }}>
      <Box sx={{ display: {sx: "block",md:"flex"} }}>
        <Box sx={{ marginRight: "16px" }}>
          <Avatar src={formData?.imageUrl} variant="rounded" sx={{ width: "120px", height: "100px", marginBottom: "10px", borderRadius: "10px" }} />
        </Box>
        <Box>
          <Typography variant="body1" color="common.black" paragraph marginBottom={"10px"} sx={{ fontWeight: "500" }}>
            {name}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <Typography variant="body2" color="text.secondary" paragraph sx={{ whiteSpace: "nowrap", marginBottom: "0" }}>
              {email}
            </Typography>
          </Box>

        </Box>
        <Box sx={{ margin: "auto 0 auto auto" }}>
          <Typography variant="body1" color="common.black" paragraph marginBottom={"10px"} sx={{ fontWeight: "500" }}>
            <Button onClick={() => setshow(true)} variant="contained" color="secondary" type="submit">
              Change Password
            </Button>
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default ProfileCard
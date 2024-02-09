import { Avatar, Paper, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { API_BASE_URL } from '../../../utils/globalConstants';
import { getRole } from '../../../utils/commonUtil';

const Item = styled(Paper)(({ theme }) => ({
  boxShadow: "none",
  borderRadius: "10px",
  border: "1px solid #CCCCCC",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer"
}));

type props = {
  cardType?: string,
  nameTitle: string,
  avatar?: string,
  name: string,
  gender: string,
  id?: string,
  onClick?: any,
  age: string,
  problem?: any,
  allergies?: any,
  createdBy?: any
}


export default function PatientCard({ cardType, avatar, nameTitle, name, age, gender, id, onClick, problem = false, allergies = false, createdBy }: props) {

  const getproblemDescription = (descriptionArray: any) => {
    const descriptions = descriptionArray.map((problem: any) => problem.description);
    const descriptionString = descriptions.join(' / ');
    return (
      <Box>
        <Typography variant="body2" display="inline" color="text.secondary" paragraph marginBottom={"0"}
          sx={{
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "inline-block", width: "100%"
          }}>
          Diagnosis : {descriptionString}
        </Typography>
      </Box>
    )
  }

  const getreaction = (reactionArray: any) => {
    const reaction = reactionArray.map((problem: any) => problem.allergy);
    const reactionString = reaction.join(' / ');
    return (
      <Box>
        <Typography variant="body2" display="inline" color="text.secondary" paragraph marginBottom={"0"} sx={{
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "inline-block", width: "100%"
        }}>
          Allergies : {reactionString}
        </Typography>
      </Box>
    )
  }

  if (cardType === "singleCard") {
    return (
      <Box sx={{ background: "#FFFFFF", boxShadow: "0px 1px 60px rgba(190, 190, 190, 0.08)", borderRadius: "10px", padding: "20px", marginTop: "20px", marginBottom: "20px" }}>
        <Box sx={{ display: { xs: "block", sm: "flex" } }}>
          <Box sx={{ marginRight: "16px" }} >
            {avatar ?
              <Avatar variant="rounded" alt={name} src={`${API_BASE_URL}patientImage/${avatar}`} sx={{ width: "120px", height: "100px", marginBottom: "10px", borderRadius: "10px" }} />
              :
              <Avatar variant="rounded" sx={{ width: "120px", height: "100px", marginBottom: "10px", borderRadius: "10px" }} />
            }
          </Box>
          <Box sx={{ display: "inline-block", width: { xs: "100%", sm: "calc(100% - 140px)" } }}>
            <Typography variant="body1" color="common.black" paragraph marginBottom={"10px"} sx={{ fontWeight: "500" }}>
              {nameTitle} {name}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <Typography variant="body2" color="text.secondary" paragraph sx={{ whiteSpace: "nowrap", borderRight: "1px solid #017BAC", paddingRight: "14px", marginRight: "14px", marginBottom: "0" }}>
                Age: {age}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph sx={{ whiteSpace: "nowrap", marginBottom: "0" }}>
                Gender : {gender}
              </Typography>
            </Box>
            <Box >
              {problem?.length > 0 && getproblemDescription(problem)}
              {allergies?.length > 0 && getreaction(allergies)}
            </Box>
          </Box>

        </Box>
      </Box>
    )
  }
  return (
    <>
      <Item onClick={() => { onClick(id) }}>
        {avatar ?
          <Avatar variant="rounded" alt={name} src={`${API_BASE_URL}patientImage/${avatar}`} sx={{ width: "100%", height: "230px", marginBottom: "10px" }} />
          :
          <Avatar variant="rounded" sx={{ width: "100%", height: "230px", marginBottom: "10px" }} />
        }
        <Typography variant="body1" color="common.black" paragraph marginBottom={"10px"} sx={{ fontWeight: "500", minHeight: "10px", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical" }}>
          {nameTitle} {name}
        </Typography>
        <Typography variant="body1" color="common.black" paragraph marginBottom={"10px"} sx={{ fontWeight: "500", minHeight: "60px", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical" }}>
          Created By: {createdBy}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography variant="body2" color="text.secondary" paragraph sx={{ whiteSpace: "nowrap", borderRight: "1px solid #017BAC", paddingRight: "14px", marginRight: "14px", marginBottom: "0" }}>
            Age: {age}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph sx={{ whiteSpace: "nowrap", marginBottom: "0" }}>
            Gender : {gender}
          </Typography>
        </Box>
      </Item>

    </>
  )
}
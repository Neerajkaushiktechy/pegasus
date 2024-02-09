import { useContext } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { ShowTableDataContext } from "../../utils/showHideTabData";
type props = {
  clearErrorMessage?: any;
  tabHeaderName?: string,
  buttonText?: string
};
export default function TableHeader({ clearErrorMessage, tabHeaderName, buttonText }: props) {
  const { setShowListData } = useContext(ShowTableDataContext);
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems={"center"}
      spacing={2}
      sx={{ marginBottom: "20px", display: { xs: "block", sm: "flex" } }}
    >
      <Typography sx={{ fontWeight: "600", fontSize: "22px", color: "#271E4A", marginBottom: { xs: "12px", sm: "0" } }}>{tabHeaderName}</Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems={"center"}
        spacing={2}
        sx={{ marginLeft: "0 !important" }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => { setShowListData(false); clearErrorMessage != undefined && clearErrorMessage() }}
          startIcon={<AddCircleOutlineIcon sx={{ width: "30px", height: "30px" }} />}
        >
          {buttonText}
        </Button>
      </Stack>
    </Stack>
  );
}

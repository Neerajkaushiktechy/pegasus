import { useContext } from 'react'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ShowTableDataContext, UpdateDataContext } from "../../utils/showHideTabData";
import { useSelector } from 'react-redux';

type props = {
  childern?: any;
  clearErrorMessage?: any;
  height?: any,
  show?: any,
  setshow?: any,
  type?: any,
  width?: any,
  classField?: any,
  patientInfo?: any,
  view: any
  handleClearState? : any
  seteditCustomForm?:any
};
export default function ModalPopup({ childern, show, setshow, type, clearErrorMessage, height, width, classField, patientInfo, view , handleClearState ,seteditCustomForm }: props) {
  const style = {
    paddingRight: "30px",
    paddingLeft: "30px",
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: width,
    height: height,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    overflow: "auto",
    p: 4,
  };

  const popupStyle = {
    paddingRight: "30px !important",
    paddingLeft: "30px !important",
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "calc(100vh - 60px)",
    bgcolor: "background.paper",
    overflowY: "scroll",
    // p: 4,
  };
  const dataWrapper = useContext(ShowTableDataContext)
  const updateData = useContext(UpdateDataContext)
  const handleClose = () => {
    setshow(false);
    if(handleClearState!==undefined){
    handleClearState();
    }
    if(seteditCustomForm!=undefined){
      seteditCustomForm()
    }
  }

  return (
    <Modal
      open={type === "assignment" ? show : dataWrapper != null && !dataWrapper.ShowListData}
      onClose={() => { type === "assignment" ? handleClose()   : dataWrapper != null && dataWrapper?.setShowListData(true); updateData?.setEditData({}); clearErrorMessage !== undefined && clearErrorMessage() }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={classField !== undefined && classField !== "" ? classField : "modal_poppup"}
    >
      <Box className="popupScroll" sx={patientInfo !== undefined && patientInfo ? popupStyle : style} >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {childern}
        </Typography>
      </Box>
    </Modal>
  );
}

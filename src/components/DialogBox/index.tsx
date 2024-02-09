import { ReactNode } from "react"
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import logoIcon from "../..../../../assets/pegasus-logo-icon.svg"

type props = {
  openDialog: boolean;
  handleClose?: () => void;
  handleSubmit?: () => void;
  title: string;
  buttonText?: any
  buttonIcon?: any
};
const DialogBox = ({ openDialog, handleClose, handleSubmit, title, buttonText, buttonIcon }: props) => {

  const renderIcon = () => {
    switch (buttonIcon) {
      default:
        return <img src={logoIcon} alt="logo" />
    }
  }

  return (
    <Dialog
      PaperProps={{
        sx: {
          minWidth: "30%",
          padding: "30px"
        }
      }}

      open={openDialog} className="dialog-box">
      <DialogContent sx={{ textAlign: "center" }}>
        {renderIcon()}
        <DialogContentText sx={{ fontWeight: "500" }}>{title}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        {buttonText ?
          <Button onClick={handleSubmit} sx={{
            color: "#32CD32", border: "1px solid #32CD32", [`&:hover`]: {
              background: '#32CD32',
              color: '#fff'
            }
          }}>
            {buttonText}
          </Button>
          :
          <>
            <Button onClick={handleSubmit} sx={{
              color: "#32CD32", border: "1px solid #32CD32",
              [`&:hover`]: {
                background: '#32CD32',
                color: '#fff'
              }
            }}>
              Yes
            </Button>
            <Button onClick={handleClose} autoFocus sx={{
              color: "#32CD32", border: "1px solid #32CD32",
              [`&:hover`]: {
                background: '#32CD32',
                color: '#fff'
              }
            }}>
              No
            </Button>
          </>
        }
      </DialogActions>
    </Dialog>
  );
};

export default DialogBox;

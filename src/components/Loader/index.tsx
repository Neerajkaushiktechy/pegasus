import { CircularProgress, Backdrop, Box } from '@mui/material';
type props = {
  handleClose?: () => void;
  open?: boolean
};
const Loader = ({ handleClose, open = true }: props) => {
  return (
    <Backdrop open={open}
      onClick={handleClose} sx={{
        color: (theme) => theme.palette.primary.main,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'transparent',
      }}>
      <Box sx={{
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <CircularProgress
          onClick={handleClose}
          size={"8vh"}
        />
      </Box>
    </Backdrop>
  );
};
export default Loader;
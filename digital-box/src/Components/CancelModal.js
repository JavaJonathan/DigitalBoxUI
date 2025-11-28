import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

const CancelOrdersModal = ({
  open,
  handleClose,
  handleClick,
  cancelledOrderCount
}) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>{"Cancel Orders?"}</DialogTitle>
      <DialogContent>
        <Typography>{`Are you sure you want to cancel ${cancelledOrderCount} order(s)?`}</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={handleClose}>
          No
        </Button>
        <Button variant="text" onClick={handleClick}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CancelOrdersModal;

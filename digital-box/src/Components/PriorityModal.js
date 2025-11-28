import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

const PriorityModal = ({
  open,
  handleClose,
  handleClick,
  priority
}) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>{priority ? "Remove Priority Status?" : "Mark Order As Priority?"}</DialogTitle>
      <DialogContent>
        <Typography>{priority ? "Are you sure you want to remove this order from the priority orders?" : "Are you sure you want to mark this order as a priority order?"}</Typography>
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

export default PriorityModal;

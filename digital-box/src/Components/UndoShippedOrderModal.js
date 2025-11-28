import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

const UndoShippedOrderModal = ({ open, handleClose, handleClick }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>{'Undo Ship? ↩️'}</DialogTitle>
      <DialogContent>
        <Typography>
          {'Are you sure you want to put this order back into the To Be Shipped Folder?'}
        </Typography>
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

export default UndoShippedOrderModal;

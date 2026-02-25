import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';

const UndoCancelledOrderModal = ({ open, handleClose, handleClick, name, handleChange }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>{'Undo Cancel? ↩️'}</DialogTitle>
      <DialogContent>
        <Typography>
          {`Enter your name and press “Confirm” to undo (it may take a few seconds while we generate the undo history).`}
        </Typography>
        <TextField
            label="Please type your name here"
            variant="outlined"
            fullWidth
            inputProps={{ maxLength: 20 }}
            style={{ marginTop: '10px' }}
            value={name}
            onChange={handleChange}
          />
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="text" onClick={handleClick} disabled={!name}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UndoCancelledOrderModal;

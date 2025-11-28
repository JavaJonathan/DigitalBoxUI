import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

const SyncDatabaseModal = ({ open, handleClose, handleClick }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>{'Sync Database? 🔃'}</DialogTitle>
      <DialogContent>
        <Typography>
          {'Are you sure you want to sync the database? This may take a moment.'}
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

export default SyncDatabaseModal;

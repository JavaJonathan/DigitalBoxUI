import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ReportsModal = ({ open, handleClose }) => {
    return (
    <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          {"Shippable Items Report"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Click the link to download your report.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    )
}

export default ReportsModal
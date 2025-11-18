import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { useEffect } from 'react';

const NoteModal = ({ open, handleClose, note, handleAddNote, selectedFileId }) => {
    const [editMode, setEditMode] = useState(false);
    const [localNoteState, setLocalNoteState] = useState(note || '');

    useEffect(() => {
        setLocalNoteState(note)
    }, [note])

    const handleEditClick = () => {
        setEditMode(true)
    }

    const handleEditClose = () => {
        setEditMode(false)
        setLocalNoteState(note || '')
        handleClose()
    }

    const handleSaveClick = () => {
        handleAddNote(selectedFileId, localNoteState)
        handleClose()
        setEditMode(false)
    }

    const handleNoteChange = (event) => {
        setLocalNoteState(event.target.value)
    }

    if(editMode) {
        return (
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
            >
                <DialogTitle>
                    {"Order Notes"}
                </DialogTitle>
                <DialogContent>
                    <TextField 
                        id="outlined-basic" 
                        label="Add/Edit Note" 
                        variant="outlined" 
                        fullWidth 
                        inputProps={{ maxLength: 50 }} 
                        value={localNoteState} 
                        onChange={handleNoteChange}  
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose}>Close</Button>
                    <Button onClick={handleSaveClick} color='primary'>Save</Button>
                </DialogActions>
            </Dialog>
        )
    }

    return (
    <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
      >
        <DialogTitle>
          {"Order Notes"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {note}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleEditClick} color='primary'>{note ? 'Edit' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    )
}

export default NoteModal
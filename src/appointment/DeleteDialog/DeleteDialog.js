import React from 'react';
import { 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle 
} from '@material-ui/core';
import './DeleteDialog.scss';

export default function DeleteDialog({ open, delApp, setOpen }) {

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title" >
          Удалить прием
        </DialogTitle>
        <DialogContent>
          <DialogContentText 
            id="delete-dialog-description"
          >
            Вы действительно хотите удалить прием?
          </DialogContentText>
        </DialogContent>
        <DialogActions className="delete-actions">
          <Button 
            variant="outlined" 
            size="small"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button 
            variant="outlined" 
            color="primary" 
            size="small" 
            autoFocus
            onClick={delApp}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
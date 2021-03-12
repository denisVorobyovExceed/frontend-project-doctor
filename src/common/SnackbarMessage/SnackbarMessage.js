import React from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

export default function SnackbarMessage({ text, type, off }) {

  return (
    <Snackbar 
      open={Boolean(text)} 
      onClose={() => off('')}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert severity={type}>
        {text}
      </Alert>
    </Snackbar>
  ); 
}

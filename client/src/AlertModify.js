import React from 'react'
import { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';

export default function AlertModify() {
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }

    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true)
    }
    return (
        <div>
            <Button className="getData" size="small" variant="outlined" color="secondary" onClick={handleOpen}>Show Popup</Button>
           <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                Values Modified Successfully
                </Alert>
            </Snackbar>
        </div>
    )
}

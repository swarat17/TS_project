import { useState } from 'react';
import './App.css';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

export default function AddData() {

    const [open, setOpen] = useState(false);

    const [para, setPara] = useState('')
    const [val, setVal] = useState('')
    const [insName, setInsName] = useState('SS')
    const [modName, setModName] = useState('SS')

    const [addOpen, setAddOpen] = useState(false);
    
    const addEntry = () => {
        Axios.post("http://localhost:3001/create", {
          para: para, 
          val: val,
          insName: insName,
          modName: modName
        }).then(() => {
          console.log("Success")
          handleAddOpen()
          //alert("Values Inserted")
        })
      };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleAddClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setAddOpen(false);
    };
    
      const handleAddOpen = () => {
        setAddOpen(true);
    }

    return (
        <div>
            <Button size="large" variant="contained" color="primary" onClick={handleClickOpen}>
                Add Data
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Data</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Type the parameter and the respective value to be added to the database
                </DialogContentText>
                <div className="info">
                    <label>Parameter:</label>
                    <input 
                    type="text" 
                    onChange={(event) => {
                        setPara(event.target.value);
                    }}/>
                    <label>Value:</label>
                    <input 
                    type="text"
                    onChange={(event) => {
                        setVal(event.target.value);
                    }}/>
                </div>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => {handleClose(); addEntry(); setInsName('SS'); setModName('SS');}} color="primary">
                    Save
                </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={addOpen} autoHideDuration={4000} onClose={handleAddClose}>
                <Alert onClose={handleAddClose} severity="success">
                Values Added Successfully
                </Alert>
            </Snackbar>
        </div>
    )
}

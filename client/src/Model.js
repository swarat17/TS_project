import React from 'react'
import Axios from 'axios';
import { useState } from 'react';

import './App.css';

import MaterialTable from "material-table";
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function Model() {
    
    const [dataList, setDataList] = useState([])

    const [run, setRun] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const getEntry = () => {
        //console.log("Clicked")
        Axios.get("http://localhost:3001/modeldata").then((response) => {
          setDataList(response.data);
          //console.log(response.data)
        });
        //console.log("Finished")
      }

    const handleChange = (event) => {
    setRun(event.target.value);
    //console.log(run)
    };

    const handleClose = () => {
    setOpen(false);
    };

    const handleOpen = () => {
    setOpen(true);
    };

    return (
        <div>
            <div className="dropdown_menu">
                <Button onClick={handleOpen}>
                    Select the run no.
                </Button>
                <FormControl>
                    <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={run}
                    onChange={handleChange}
                    >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    </Select>
                </FormControl>
            </div>
            {console.log(run)}
            <div className="data">
            <Button className="getData" size="small" variant="outlined" color="secondary" onClick={getEntry}>Get Data</Button>
                <div style={{ height: 700, width: '95%' }}><MaterialTable 
                title="Model Output"
                data={dataList}
                columns={[
                { field: 'SFO_RUN_NO', title: 'Run No.', filtering: false},
                { field: 'SFO_DU_NO', title: 'DU No.'},
                { field: 'SFO_PO_NO', title: 'PO No.'},
                { field: 'SFO_ACT_NO', title: 'ACT No.'},
                { field: 'SFS_SL_NO', title: 'SL No.'},
                { field: 'SFS_WORK_CENTRE', title: 'Work Centre'},
                { field: 'SFS_WORK_LOC', title: 'Work Location'},
                { field: 'SFS_START', title: 'Start Date/Time'},
                { field: 'SFS_FINISH', title: 'End Date/Time'},
                ]}
                options={{
                filtering: true,
                search: false,
                headerStyle: {
                    backgroundColor: '#039be5',
                },
                rowStyle: {
                    backgroundColor: '#EEE',
                }
                }}
                /></div>
            </div>
        </div>
    )
}

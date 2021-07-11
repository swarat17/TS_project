import { useState } from 'react';
//import { useCallback } from 'react';
//import { Route, Link } from 'react-router-dom'
import './App.css';
import Axios from 'axios';
// import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import MaterialTable from "material-table";

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import AddData from './AddData';
//import Model from './Model';
//import AlertModify from './AlertModify';

function App() {

  // const [para, setPara] = useState('')
  // const [val, setVal] = useState('')
  // const [insName, setInsName] = useState('SS')
  // const [modName, setModName] = useState('SS')

  // const [newPara, setNewPara] = useState('')
  // const [newVal, setNewVal] = useState('')
  // const [upId, setUpId] = useState('')

  const [dataList, setDataList] = useState([])

  const [modOpen, setModOpen] = useState(false);

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleModClose = (event, reason) => {
    if (reason === 'clickaway') {
    return;
    }

    setModOpen(false);
  };

  const handleModOpen = () => {
    setModOpen(true);
  }
  
  // const [tag, setTag] = useState('')
  // const [searchDataList, setSearchDataList] = useState([])

  //var row=[]

  // const addEntry = () => {
  //   Axios.post("http://localhost:3001/create", {
  //     para: para, 
  //     val: val,
  //     insName: insName,
  //     modName: modName
  //   }).then(() => {
  //     console.log("Success")
  //     alert("Values Inserted")
  //   })
  // };

  const getEntry = () => {
    //console.log("Clicked")
    Axios.get("http://localhost:3001/parameters").then((response) => {
      setDataList(response.data);
      //console.log(response.data)

    });
    //console.log("Finished")
  }

  // const handleEditCellChangeCommitted = useCallback(
  //   ({ id, field, props }) => {
  //     if (field === 'parameter') {
  //       updateEntryPara(id,props.value)
  //     }
  //     else if (field === 'value') {
  //       updateEntryVal(id,props.value)
  //     }
  //   });

  // const handleCellEditable = (prop,id,field) => {
  //   if (field === 'parameter') {
  //     updateEntryPara(id,prop)
  //   }
  //   else if (field === 'value') {
  //     updateEntryVal(id,prop)
  //   }
  // }
  
  const updateEntryPara = (id,para) => {
    Axios.put("http://localhost:3001/update/para", {
      para: para,
      id: id
    }).then((response) => {
      //setDataList(response.data);
      //alert("Parameter Updated")
      handleModOpen()
    });
  }

  const updateEntryVal = (id,val) => {
    Axios.put("http://localhost:3001/update/val", {
      val: val,
      id: id
    }).then((response) => {
      //setDataList(response.data);
      //alert("Value Updated")
      handleModOpen()
    });
  }

  const deleteEntry = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      alert("Deleted")
    });
  }

  // const searchEntry = (tag) => {
  //   //console.log("Clicked")
  //   Axios.get(`http://localhost:3001/search/${tag}`).then((response) => {
  //     setSearchDataList(response.data);
  //   });
  //   //console.log("Finished")
  // }
  return (
    <div className="App">
      {/* <Route exact path= "/model" component={Model} /> */}
      {/* <div className="info">
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
        <button onClick={ () => {addEntry(); setInsName(); setModName();}}>Save Input</button>
      </div> */}
      <div className="add">
        <AddData />
      </div>
      <div className="modify_popup">
        <Snackbar open={modOpen} autoHideDuration={4000} onClose={handleModClose}>
          <Alert onClose={handleModClose} severity="success">
          Values Modified Successfully
          </Alert>
        </Snackbar>
      </div>
      <div className="data">
      <Button className="getData" size="small" variant="outlined" color="secondary" onClick={getEntry}>Get Data</Button>
        {/* <div style={{ height: 500, width: '75%' }}><DataGrid rows={dataList} 
            columns={[
              { field: 'id', headerName: 'Sr. No.', width: 120 },
              { field: 'parameter', headerName: 'Parameter', width: 350, editable: true },
              { field: 'value', headerName: 'Value', width: 150, editable: true },
            ]}
            components={{
              Toolbar: GridToolbar,
            }}
            onEditCellChangeCommitted={handleEditCellChangeCommitted} 
            /></div> */}
            <div style={{ height: 700, width: '75%' }}><MaterialTable 
            title="Master Data"
            data={dataList}
            columns={[
              { field: 'id', title: 'Sr. No.', filtering: false, editable: 'never' },
              { field: 'parameter', title: 'Parameter', editable: 'always' },
              { field: 'value', title: 'Value', editable: 'always' },
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
            // editable={{
            //   onRowUpdate: (newData, oldData) =>
            //   new Promise((resolve, reject) => {
            //     setTimeout(() => {
            //       //const dataUpdate = [...data];
            //       const index = oldData.tableData.id;
            //       console.log(newData)
            //       //dataUpdate[index] = newData;
            //       //setData([...dataUpdate]);
            //       resolve();
            //     }, 1000)
            //   }),
            // }}

            cellEditable={{
              onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
                return new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataUpdate = [...dataList];
                    const index = rowData.id;
                    if (columnDef.field === 'parameter') {
                      dataUpdate[index-1].parameter = newValue;
                      updateEntryPara(rowData.id,newValue);
                    }
                    else if (columnDef.field === 'value') {
                      dataUpdate[index-1].value = newValue;
                      updateEntryVal(rowData.id,newValue);
                    }
                    setDataList([...dataUpdate]);
                    resolve();
                  }, 1000)
                  //setTimeout(resolve, 1000);
                  //handleCellEditable(newValue,rowData.id,columnDef.field);
                });
              }
            }}

            // editable={{
            //   onBulkUpdate: changes =>
            //   new Promise((resolve, reject) => {
            //     console.log(changes)
            //     setTimeout(() => {
            //       resolve();
            //     }, 1000);
            //   }),
            // }}
            /></div>
          {/* <div className="save">
            <Button className="saveButton" size="small" variant="outlined" color="secondary">
                Save
            </Button>
          </div> */}

        {/* {dataList.map((val,key) => {
          return(
          <div className="view">
            <div>
              <h3> Sr. No.: {val.SCV_CODE} </h3>
              <h3> Parameter: {val.SCV_DESC} </h3>
              <h3> Value: {val.SCV_VALUE} </h3>
            </div>
            <div style={{ height: 350, width: '100%' }}><DataGrid rows={[
              { id: val.SCV_CODE, parameter: val.SCV_DESC , value: val.SCV_VALUE },
            ]} 
            columns={[
              { field: 'id', headerName: 'Sr. No.', width: 150 },
              { field: 'parameter', headerName: 'Parameter', width: 150 },
              { field: 'value', headerName: 'Value', width: 150 },
            ]} /></div>
            <div className="update_delete">
              <input 
              type="text" 
              placeholder="Enter parameter"
              onChange={(event) => {
                setNewPara(event.target.value);
              }}/>
              <input 
              type="text" 
              placeholder="Enter value"
              onChange={(event) => {
                setNewVal(event.target.value);
              }}/>
              <button onClick={() => {updateEntry(val.SCV_CODE)}}>Update</button>
              <button onClick={() => {deleteEntry(val.SCV_CODE)}}>Delete</button>
            </div>
          </div>
        );
        })} */}
      </div>
      {/* <div className="searchData">
        <div className="searchBar">
          <input 
          type="text" 
          placeholder="Search Bar....."
          onChange={(event) => {
          setTag(event.target.value);
          }}/>
          <button onClick={() => {searchEntry(tag)}}>Search</button>
        </div>
        {searchDataList.map((val1,key1) => {
          return(
          <div className="viewSearch">
            <div>
              <h3> Sr. No.: {val1.SCV_CODE} </h3>
              <h3> Parameter: {val1.SCV_DESC} </h3>
              <h3> Value: {val1.SCV_VALUE} </h3>
            </div>
            <div className="update_deleteSearch">
              <input 
              type="text" 
              placeholder="Enter parameter"
              onChange={(event) => {
              setNewPara(event.target.value);
              }}/>
              <input 
              type="text" 
              placeholder="Enter value"
              onChange={(event) => {
              setNewVal(event.target.value);
              }}/>
              <button onClick={() => {updateEntry(val1.SCV_CODE)}}>Update</button>
              <button onClick={() => {deleteEntry(val1.SCV_CODE)}}>Delete</button>
            </div>
          </div>
        );
        })}
      </div> */}
    </div>
  );
}

export default App;

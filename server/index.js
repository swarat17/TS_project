const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'ts_project',
});

app.post('/create', (req,res) => {
    const para = req.body.para
    const val = req.body.val
    const insName = req.body.insName
    const modName = req.body.modName

    db.query('INSERT INTO main (SCV_VALUE,SCV_DESC,SCV_CREATED_BY,SCV_UPDATED_BY) VALUES (?,?,?,?)', [val, para, insName, modName], 
        (err,result) => {
            if(err) {
                console.log(err)
            } else {
                res.send("Values Inserted")
            }
        }
    );
});

app.get('/parameters', (req,res) => {
    //res.send("Hello")
    db.query('SELECT SCV_VALUE AS value, SCV_DESC AS parameter, SCV_CODE AS id FROM main',
        (err,result) => {
            if(err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    );
});

app.put('/update/para', (req,res) => {
    const id = req.body.id
    const para = req.body.para
    db.query('UPDATE main SET SCV_DESC = ? WHERE SCV_CODE = ?', [para,id],
        (err,result) => {
            if(err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    );
});

app.put('/update/val', (req,res) => {
    const id = req.body.id
    const val = req.body.val
    db.query('UPDATE main SET SCV_VALUE = ? WHERE SCV_CODE = ?', [val,id],
        (err,result) => {
            if(err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    );
});

app.delete('/delete/:id', (req,res) => {
    const id = req.params.id
    db.query('DELETE FROM main WHERE SCV_CODE = ?', id,
        (err,result) => {
            if(err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    );
});

app.get('/search/:tag', (req,res) => {
    const tag = '%'+req.params.tag+'%'
    //console.log(tag)
    db.query("SELECT SCV_VALUE, SCV_DESC, SCV_CODE FROM main WHERE SCV_DESC LIKE ? OR SCV_VALUE LIKE ?", [tag,tag],
        (err,result) => {
            if(err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    );
});

app.listen(3001, () => {
    console.log("Server is running")
});










app.get('/modeldata', (req,res) => {
    //res.send("Hello")
    db.query('select SFO_RUN_NO, SFO_DU_NO, SFO_PO_NO, SFO_ACT_NO, SFS_SL_NO, SFS_WORK_CENTRE, SFS_WORK_LOC, SFS_START, SFS_FINISH from t_sfs_out',
        (err,result) => {
            if(err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    );
});
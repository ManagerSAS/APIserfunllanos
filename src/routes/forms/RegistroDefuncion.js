const { Router } = require('express')
const cors = require('cors')
const router = Router()
const mysqlConnection = require('../../config/mysql')
const _ = require('underscore')

router.post('/RegistroDefuncion', cors(), async(req, res)=>{
    const {
        cedula
    }=req.body;
  
    const query = `SELECT CONCAT(nombre1,' ',nombre2,' ',apellido1,' ',apellido2)nombreCompleto, n_documento, n_registro, notaria, fecha_fallecimiento FROM olivos_obituarios   
    WHERE n_documento = '${cedula}' OR CONCAT(nombre1,' ',nombre2,' ',apellido1,' ',apellido2) LIKE '${cedula}';`
        
        mysqlConnection.query(query, (err, results) => { 
            if(!err){
                res.status(200).json({
                    error: false,
                    results: results
                })
            }else{
                throw err;
            }
        })
    
        
    })
    
    module.exports = router
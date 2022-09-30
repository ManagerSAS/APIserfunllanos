const { Router } = require('express')
const router = Router()
const cors = require('cors')
// const autorizarUsuario = require('../../../auth/auth')
const mysqlConnection = require('../../config/mysql')

router.post('/retablos', cors(), async(req, res)=> {
    const {
        nombre_titular,
        ser_querido,
        fecha,
        foto
    }=req.body
    
    const query = `INSERT INTO olivos_retablos(nombre_titular,fecha_fallecimiento, foto, nombre_homenaje) 
    VALUE('${nombre_titular}','${fecha}','${foto}','${ser_querido}')`
    mysqlConnection.query(query, (err, rows, fields) => { 
        if(!err){
            res.status(200).json({
                error: false,
                query: 'Query correctly executed.',
                message: 'Data correctly saved'
            })
        }else{
            throw err;
        }
    })
    })

module.exports = router
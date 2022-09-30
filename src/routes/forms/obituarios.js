const { Router } = require('express')
const router = Router()
const cors = require('cors')
// const autorizarUsuario = require('../../../auth/auth')
const mysqlConnection = require('../../config/mysql')

router.post('/obituarios', cors(), async(req, res)=> {
    const {
        ciudad
    }=req.body
    // console.log(ciudad);
    const query = `SELECT CONCAT(nombre1,' ',nombre2,' ',apellido1,' ',apellido2)nombreCompleto, DATE_FORMAT(hora_exequias, '%h:%i %p')hora_exequias,DATE_FORMAT(fecha_exequias,'%m-%d-%Y')fecha_exequias, DATE_FORMAT(fecha_fallecimiento,'%m-%d-%Y')fecha_fallecimiento, nombre_sala, lugar_exequias, destino_final_cementerio, fecha_registro FROM olivos_obituarios WHERE obituario_visualizar = '${ciudad}' AND fecha_registro >= DATE_ADD(NOW(), INTERVAL -2 DAY) ORDER BY id DESC`
    mysqlConnection.query(query, (err, results) => { 
        if(!err){
            let i=0
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
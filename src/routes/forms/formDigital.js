const { Router } = require('express')
const router = Router()
const cors = require('cors')
// const autorizarUsuario = require('../../../auth/auth')
const mysqlConnection = require('../../config/mysql')

router.post('/formDigital', cors(), async(req, res)=> {
    const query = `SELECT * FROM formularioTransfor`
    mysqlConnection.query(query, (err, results) => { 
        if(!err){
            let i=0;
            res.status(200).json({
                error: false,
                query: 'Query correctly executed.',
                results: results
            })
        }else{
            throw err;
        }
    })
    })

module.exports = router
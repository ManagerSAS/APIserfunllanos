const { Router } = require('express')
const cors = require('cors')
const router = Router()
const mysqlConnection = require('../../config/mysql')
const autorizarUsuario = require('../../auth/auth')
const mailconfig  = require('../../config/mailer')
const _ = require('underscore')

router.post('/formTrasnfor', cors(), async(req, res)=>{
    // const response
    // const data = req.body;
    const {
        nombre,
        area,
        lvlWord,
        lvlExcel,
        lvlPowerP,
        lvlDrive,
        lvlCalendar,
        lvlMeet,
        lvlFotos,
        lvlForms,
        CapOrfeo,
        CapKaring,
        CapSise,
        CapIntr,
        CapCrm,
        CapLG,
        CapSoli,
        CapDisp,
        CapGmail,
        mensajeria,
        adicionales,
    }=req.body;
  
    const query = `INSERT INTO formularioTransfor( nombre, areaLabor, lvlWord, lvlExcel, lvlPowerP, lvlDrive, lvlCalendar, lvlMeet, lvlFotos, lvlForms, CapOrfeo, CapKaring, CapSise, CapCrm, CapLG, CapIntr, CapSoli, CapDisp, CapGmail, mensajeria, adicionales) VALUES('${nombre}', '${area}', '${lvlWord}', '${lvlExcel}', '${lvlPowerP}', '${lvlDrive}', '${lvlCalendar}', '${lvlMeet}', '${lvlFotos}', '${lvlForms}', '${CapOrfeo}', '${CapKaring}', '${CapSise}', '${CapCrm}', '${CapLG}', '${CapIntr}', '${CapSoli}', '${CapDisp}','${CapGmail}', '${mensajeria}', '${adicionales}')`
        
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
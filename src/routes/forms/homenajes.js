const { Router } = require('express')
const cors = require('cors')
const router = Router()
const mysqlConnection = require('../../config/mysql')
const autorizarUsuario = require('../../auth/auth')
const mailconfig  = require('../../config/mailer')
const _ = require('underscore')

router.post('/homenajes', cors(), async(req, res)=>{
    // const response
    // const data = req.body;
    const {
       nombre_titular,
       direccion,
       barrio,
       municipio,
       telefono,
       email,
       nombre_homenaje,
       n_documento,
       afiliado,
       lugar_fallecimiento,
       documentos,
       exequias,
       otro,
       iglesia,
       hora_exequias,
       retablo,
       palabras,
       destino_final,
       parentescos,
       fecha_registro
    }=req.body;
  
    const query = `INSERT INTO homenajes( nombre_titular, direccion, barrio, municipio, telefono, email,nombre_homenaje, n_documento, afiliado, lugar_fallecimiento, documentos, exequias, otro, iglesia, hora_exequias, retablo, palabras, destino_final, parentescos, aprobado, fecha_registro,estado) 
        VALUES('${nombre_titular}', '${direccion}', '${barrio}', '${municipio}', '${telefono}', '${email}', '${nombre_homenaje}', '${n_documento}', '${afiliado}', '${lugar_fallecimiento}','${documentos}', '${exequias}', '${otro}', '${iglesia}','${hora_exequias}', '${retablo}', '${palabras}', '${destino_final}', '${parentescos}', '0', '${fecha_registro}','0')`
    
//     let bodyEmail = `
//     <div style="pading-left:50px; pading-right:50px;">
//     <table width="600px">
//         <tr style="background-color: #bbbbbb14;">
//             <td style="padding: 10px;" colspan="2">
//                 <img src="https://i.postimg.cc/bw0zKrQw/logo.png" alt="" height="50px">
//             </td>
//         </tr>
//         <tr style="background-color: #119064f5;">
//             <td style="padding-top: 15px; text-align: center;" colspan="2">
//             <p style="color: white; font-family: Arial;">
//                 <b>Datos del titular</b>
//             </p>   
//             </td>
//         </tr>
//         <tr style="background-color: #bbbbbb14;">
//             <td style="padding: 5px;">
//                 <p style="font-family: Arial;">
//                     <b>Nombre tirular:</b>
//                 </p>
//             </td>
//             <td style="padding: 5px;">
//                 <p style="font-family: Arial;">
//                     ${nombre_titular}
//                 </p>
//             </td>
//         </tr>
//         <tr>
//             <td style="padding: 5px;">
//                 <p style="font-family: Arial;">
//                     <b>Direccion y barrio:</b>
//                 </p>
//             </td>
//             <td style="padding: 5px;">
//                 <p style="font-family: Arial;">
//                     ${direccion}  ${barrio}
//                 </p>
//             </td>
//         </tr>
//         <tr>
//             <td style="padding: 5px;">
//                 <p style="font-family: Arial;">
//                     <b>Municipio:</b>
//                 </p>
//             </td>
//             <td style="padding: 5px;">
//                 <p style="font-family: Arial;">
//                     ${municipio}
//                 </p>
//             </td>
//         </tr>
//         <tr>
//             <td style="padding: 5px;">
//                 <p style="font-family: Arial;">
//                     <b>Telefono:</b>
//                 </p>
//             </td>
//             <td style="padding: 5px;">
//                 <p style="font-family: Arial;">
//                     ${telefono}
//                 </p>
//             </td>
//         </tr>
//         <tr>
//             <td style="padding: 5px;">
//                 <p style="font-family: Arial;">
//                     <b>Correo electronico:</b>
//                 </p>
//             </td>
//             <td style="padding: 5px;">
//                 <p style="font-family: Arial;">
//                     ${email}
//                 </p>
//             </td>
//         </tr>
//         <tr style="background-color: #119064f5;">
//             <td style="padding-top: 15px; text-align: center;" colspan="2">
//                 <p style="color: white; font-family: Arial;">
//                     <b>Datos del homenaje</b>
//                 </p>
//             </td>
//         </tr>
//         <tr>
//             <td style="padding: 5px;">
//                 <p style="font-family: Arial;">
//                     <b>Nombre completo:</b>
//                 </p>
//             </td>
//             <td style="padding: 5px;">
//                 <p style="font-family: Arial;">
//                     ${nombre_homenaje}
//                 </p>
//             </td>
//         </tr>
//         <tr>
//             <td style="padding: 5px;">
//                 <p style="font-family: Arial;">
//                     <b>Numero documento</b>
//                 </p>
//             </td>
//             <td style="padding: 5px;">
//                 <p style="font-family: Arial;">
//                     ${n_documento}
//                 </p>
//             </td>
//         </tr>
//         <tr>
//             <td style="padding: 5px;">
//                 <p style="font-family: Arial;">
//                     <b>Afiliado: </b>
//                 </p>
//             </td>
//             <td style="padding: 5px;">
//                 <p style="font-family: Arial;">
//                     ${afiliado}
//                 </p>
//             </td>
//         </tr>
//         <tr>
//             <td style="padding: 5px;">
//                 <p style="font-family: Arial;">
//                     <b>Lugar fellecimiento: </b>
//                 </p>
//             </td>
//             <td style="padding: 5px;">
//                 <p style="font-family: Arial;">
//                     ${lugar_fallecimiento}
//                 </p>
//             </td>
//         </tr>
//         <tr>
//             <td style="padding: 5px;">
//             <p style="font-family: Arial;">
//                 <b>documentos: </b>
//             </p>
//             </td>
//             <td style="padding: 5px;">
//                 <p style="font-family: Arial;">
//                     ${documentos} 
//                 </p>
//             </td>
//         </tr>
//         <tr>
//             <td style="padding: 5px;">
//                 <p style="font-family: Arial;">
//                     <b>Exequias: </b>
//                 </p>
//             </td>
//             <td style="padding: 5px;">
//                 <p style="font-family: Arial;">
//                     ${exequias}
//                 </p>
//             </td>
//         </tr>
//         <tr>
//              <td style="padding: 5px;">
//                 <p style="font-family: Arial;">
//                     <b>Otras exequias: </b>
//                 </p>
//             </td>
//             <td style="padding: 5px;">
//                 <p style="font-family: Arial;">
//                     ${otro}
//                 </p>
//             </td>
//         </tr>
//         <tr>
//             <td style="padding: 5px;">
//                 <p style="font-family: Arial;">
//                     <b>Iglesia: </b>
//                 </p>
//             </td>
//             <td style="padding: 5px;">
//                 <p style="font-family: Arial;">
//                     ${iglesia}
//                 </p>
//             </td>
//         </tr>
//         <tr>
//             <td style="padding: 5px;">
//                 <p style="font-family: Arial;">
//                     <b>Hora exequias: </b>
//                 </p>
//             </td>
//             <td style="padding: 5px;">
//                 <p style="font-family: Arial;">
//                     ${hora_exequias}
//                 </p>
//             </td>
//         </tr>
//         <tr>
//             <td style="padding: 5px;">
//                 <p style="font-family: Arial;">
//                     <b>datos Retablo: </b>
//                 </p>
//             </td>
//             <td style="padding: 5px;">
//                 <p style="font-family: Arial;">
//                     ${retablo}
//                 </p>
//             </td>
//         </tr>
//         <tr>
//             <td style="padding: 5px;">
//                 <p style="font-family: Arial;">
//                     <b>Palabras de amor: </b>
//                 </p>
//             </td>
//             <td style="padding: 5px;">
//                 <p style="font-family: Arial;">
//                     ${palabras}
//                 </p>
//             </td>
//         </tr>
//         <tr>
//             <td style="padding: 5px;">
//                 <p style="font-family: Arial;">
//                     <b>Destino final: </b>
//                 </p>
//             </td>
//             <td style="padding: 5px;">
//                 <p style="font-family: Arial;">
//                     ${destino_final}
//                 </p>
//             </td>
//         </tr>
//         <tr>
//             <td style="padding: 5px;">
//                 <p style="font-family: Arial;">
//                     <b>Relacion del ser querido en vida: </b>
//                 </p>
//             </td>
//             <td style="padding: 5px;">
//                 <p style="font-family: Arial;">
//                     ${parentescos}
//                 </p>
//             </td>
//         </tr>
//         <tr>
//             <td style="padding: 5px;">
//                 <p style="font-family: Arial;">
//                     <b>Fecha registro: </b>
//                 </p>
//             </td>
//             <td style="padding: 5px;">
//                 <p style="font-family: Arial;">
//                     ${fecha_registro}
//                 </p>
//             </td>
//         </tr>
//     </table>
// </div>
//     `

//     const response = await mailconfig.sendMail({
//         from: '"Homenajes:" <no-reply@gmail.com>',
//         // to: "homenajesvillavicencio@losolivos.co",
//         to: "sastoquejose1602@gmail.com",
//         subject: "Datos de Homenajes  ✔",
//         html: bodyEmail,
       
//     }).catch(console.error)
//     if(response){
//         res.status(200).send({
//             message: "Mensaje enviado correctamente",
            
//         })
//     }
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

// router.put('/homenajes/:id', cors(), autorizarUsuario, (req, res) => {

//     const { id } = req.params

//     const data = req.body
//     const query = `UPDATE homenajes SET nombre_titular = '${ data.nombre_titular }', direccion = '${ data.direccion }', barrio = '${ data.barrio }' , municipio = '${ data.municipio }', telefono = '${ data.telefono }', email = '${ data.email }', nombre_homenaje = '${ data.nombre_homenaje }', n_documento = '${ data.n_documento }', lugar_fallecimiento = '${ data.lugar_fallecimiento }', hora_exequias = '${ data.hora_exequias }', iglesia = '${ data.iglesia }', aprobado = '1' WHERE id = ${id}`

//     mysqlConnection.query(query, (err, rows, fields) => {
//         if(!err){
//             res.status(200).json({
//                 error: false,
//                 query: 'Query correctly executed.',
//                 message: 'Data correctly updated'
//             })
//         }else{
//             throw err;
//         }
//     })

// })


module.exports = router
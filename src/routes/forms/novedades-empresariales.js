const { Router } = require("express")
var cors = require('cors')
const router = Router()
const mailconfig  = require('../../config/mailer')
const _ = require('underscore')


router.post('/novedades-empresariales', cors(), async(req, res) => {
            
    const { 
        company, 
        email,         
        listNovelty,
        nameFuncionary, 
        workCenter,
        files
    } = req.body
    let bodyEmail = `
        <div style="pading-left:50px; pading-right:50px;">
        <table width="600px">
            <tr style="background-color: #bbbbbb14;">
                <td style="padding: 10px;" colspan="2">
                    <img src="https://i.postimg.cc/bw0zKrQw/logo.png" alt="" height="50px">
                </td>
            </tr>
            <tr style="background-color: #119064f5;">
                <td style="padding-top: 15px; text-align: center;" colspan="2">
                    <p style="color: white; font-family: Arial;">
                        <b>Datos de la novedad</b>
                    </p>
                </td>
            </tr>
            <tr style="background-color: #bbbbbb14;">
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        <b>Correo electrónico:</b>
                    </p>
                </td>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        ${ email }
                    </p>
                </td>
            </tr>
            <tr>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        <b>Nombre empresa:</b>
                    </p>
                </td>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        ${ company }
                    </p>
                </td>
            </tr>
            <tr style="background-color: #bbbbbb14;">
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        <b>Mes a partir de cuando aplica la novedad:</b>
                    </p>
                </td>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        ${ nameFuncionary }
                    </p>
                </td>
            </tr>
            <tr>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        <b>Centro de trabajo (opcional):</b>
                    </p>
                </td>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        ${ workCenter }
                    </p>
                </td>
            </tr>
            <tr style="background-color: #119064f5;">
                <td style="padding-top: 15px; text-align: center;" colspan="2">
                    <p style="color: white; font-family: Arial;">
                        <b>Documento Novedades: </b>
                    </p>
                </td>
            </tr>  
            <tr>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        <b>Archivo: </b>
                    </p>
                </td>
                <td style="padding: 5px;">
                    <a href=" ${ files }" style="font-family: Arial;">
                        ${ files }
                    </a>
                </td>
            </tr>
               
    `
    _.each(listNovelty, (value, key) => {
        bodyEmail += `
        <tr style="background-color: #119064f5;">
                <td style="padding-top: 15px; text-align: center;" colspan="2">
                    <p style="color: white; font-family: Arial;">
                        <b>Listado novedades: </b>
                    </p>
                </td>
            </tr>   
            <tr style="background-color: #119064f5;">
                <td style="padding-top: 15px; text-align: center;" colspan="2">
                    <p style="color: white; font-family: Arial;">
                        <b>Novedad: ${ key+1 } </b>
                    </p>
                </td>
            </tr>  
            <tr>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        <b>Tipo novedad:</b>
                    </p>
                </td>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        ${ value.novelty } : ${value.tipoNovedad}
                    </p>
                </td>
            </tr>
            <tr style="background-color: #bbbbbb14;">
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        <b>Nombre completo: </b>
                    </p>
                </td>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        ${ value.name }
                    </p>
                </td>
            </tr>
            <tr>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        <b>Documento:</b>
                    </p>
                </td>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        ${ value.typeId } - ${ value.id } 
                    </p>
                </td>
            </tr>
            <tr style="background-color: #bbbbbb14;">
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        <b>Fecha nacimiento:</b>
                    </p>
                </td>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        ${ value.date }
                    </p>
                </td>
            </tr>
            <tr>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        <b>Mes a partir cuando aplica: </b>
                    </p>
                </td>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        ${ value.month }
                    </p>
                </td>
            </tr>
        `
    })

    bodyEmail += `</table>`
         const response = await mailconfig.sendMail({
            from: '"Novedad empresarial:" <no-reply@gmail.com>',
            // to: "radicadorvillavicencio@losolivos.co, ccarteravillavicencio@losolivos.co",
            to: "sastoquejose1602@gmail.com",
            subject: "Novedades Empresariales y Afiliaciones ✔",
            html: bodyEmail,
            attachments: [
                {                                       
                    path: files
                    // contentType: 'application/vnd.ms-excel'
                }]
        }).catch(console.error)

        if(response){
            res.status(200).send({
                message: "Mensaje enviado correctamente ",files
              
                
            })
       } 
})


module.exports = router
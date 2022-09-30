const { Router } = require("express")
const cors = require('cors')
const router = Router()
const mailconfig  = require('../../config/mailer')
const _ = require('underscore')

router.post('/auxilios-funerarios', cors(), async(req, res) => {
            
    const { 
        typeRequest,
        date,
        SedeHomenaje,
        LugarHomenaje,
        NombreFallecido,
        NombreAfiliado,
        ApellidosAfiliado,
        CedulaAfiliado,
        CelularAfiliado,
        DireccionAfiliado,
        EmailAfiliado,
        EmpresaAfiliado,
        // archivo
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
                        <b>Auxilios</b>
                    </p>
                </td>
            </tr>
            <tr style="background-color: #bbbbbb14;">
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        <b>Tipo de tramite:</b>
                    </p>
                </td>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        ${ typeRequest }
                    </p>
                </td>
            </tr>
            <tr>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        <b>Fecha prestación del homanje:</b>
                    </p>
                </td>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        ${ date }
                    </p>
                </td>
            </tr>
            <tr style="background-color: #bbbbbb14;">
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        <b>Sede donde se presto el homenaje:</b>
                    </p>
                </td>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        ${ SedeHomenaje }
                    </p>
                </td>
            </tr>
            <tr>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        <b>Lugar de destino final o inhumación:</b>
                    </p>
                </td>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        ${ LugarHomenaje }
                    </p>
                </td>
            </tr>
            <tr>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        <b>Nombre del fallecido:</b>
                    </p>
                </td>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        ${ NombreFallecido }
                    </p>
                </td>
            </tr>
            <tr>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        <b>Nombre afiliado solicitante:</b>
                    </p>
                </td>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        ${ NombreAfiliado }
                    </p>
                </td>
            </tr>
            <tr>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        <b>Apellidos afiliado solicitante:</b>
                    </p>
                </td>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        ${ ApellidosAfiliado }
                    </p>
                </td>
            </tr>
            <tr>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        <b>Cedula del afiliado o solicitante:</b>
                    </p>
                </td>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        ${ CedulaAfiliado }
                    </p>
                </td>
            </tr>
            <tr>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        <b>Celular del afiliado o solicitante:</b>
                    </p>
                </td>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        ${ CelularAfiliado }
                    </p>
                </td>
            </tr>
            <tr>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        <b>Direccion del afiliado o solicitante:</b>
                    </p>
                </td>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        ${ DireccionAfiliado }
                    </p>
                </td>
            </tr>
            <tr>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        <b>Email del afiliado o solicitante:</b>
                    </p>
                </td>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        ${ EmailAfiliado }
                    </p>
                </td>
            </tr>
            <tr>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        <b>Empresa o fondo por el cual esta afiliado:</b>
                    </p>
                </td>
                <td style="padding: 5px;">
                    <p style="font-family: Arial;">
                        ${ EmpresaAfiliado }
                    </p>
                </td>
            </tr>
        </table> 
    `    

    const response = await mailconfig.sendMail({
        from: '"Solicitu de auxilios" <no-reply@gmail.com>',
        to: "agerenciavillavicencio@losolivos.co",
        // to: "juanmanuel273816381@gmail.com",
        subject: "Auxilios funerario✔",
        html: bodyEmail
        // attachments: [
        //     {
        //         filename: 'Archivo adjunto.jpg',
        //         path: 'https://res.cloudinary.com/olivos-villavicencio/image/upload/v1633445241/xipwpaqn8ta3go9ilsui.jpg'
        //     }
        // ]
    }).catch(console.error)

    if(response){
        res.status(200).send({
            message: "Mensaje enviado correctamente"
        })
    }
})


module.exports = router
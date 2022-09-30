require('dotenv').config();
// console.log(process.env.TOKEN)
    
const express = require('express')
var cors = require('cors')
const app = express()

// settings
app.set('port', process.env.PORT || 3000)

// middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// auth
app.use('/api/v1', require('./src/routes/login'))

// routes
app.use('/api/v1/forms', require('./src/routes/forms/novedades-empresariales'))
app.use('/api/v1/forms', require('./src/routes/forms/auxilios-funerarios'))
app.use('/api/v1/forms', require('./src/routes/forms/homenajes'))
app.use('/api/v1/forms', require('./src/routes/forms/envioDocNovedades'))
app.use('/api/v1/forms', require('./src/routes/forms/obituarios'))
app.use('/api/v1/forms', require('./src/routes/forms/retablos'))
app.use('/api/v1/forms', require('./src/routes/forms/formTrasnfor'))
app.use('/api/v1/forms', require('./src/routes/forms/formDigital'))
app.use('/api/v1/forms', require('./src/routes/forms/RegistroDefuncion'))


// routes type get
app.use('/api/v1/get', require('./src/routes/get/homenajes/homenajes'))


app.listen(app.get('port'), () => {
    console.log(`Listening on port: ${app.get('port')}`)
})
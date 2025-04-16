var express = require('express')
var bodyParser = require('body-parser')
const cors = require('cors')
app = express()

// set the view engine to ejs
app.set('view engine', 'ejs')

const config = require('./config/config')
const {
    responseMessage,
    responseMessageKey,
    respMsg,
} = require('./config/responseMessage')
var appRoutes = require('./routes/approutes')
var expressWinston = require('express-winston')
var winston = require('winston')
var forceSsl = require('express-force-ssl')
const https = require('https')
const http = require('http')
const fs = require('fs')
app.use(cors())
app.options('*', cors())
port = config.app.port
console.log('here' + port)
responseMessage.getAllRespMsg()
// console.log(respMsg.get('booking.success'));
var log4js = require('log4js')
app.use(log4js.connectLogger(log4js.getLogger('http'), { level: 'auto' }))
console.log(port)
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
//app.use(forceSsl);

app.use(express.static(__dirname + '/uploads'))

var key = fs.readFileSync('./cert.key')
var cert = fs.readFileSync('./key.crt')
var options = {
    key: key,
    cert: cert,
}
var servers = https.createServer(options, app)
var server = http.createServer(app)

server.listen(port, '0.0.0.0', () => {
    console.log('server starting on port : ' + port)
})

// servers.listen(port, "0.0.0.0", () => {
//   console.log("server starting on port : " + port);
// });
//app.listen(port);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin,X-Requested-With, Content-Type, Accept, Authorization'
    )
    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods',
            'PUT, POST, PATCH, DELETE, GET'
        )
        return res.status(200).json({})
    }
    next()
})

app.use('/', appRoutes)

module.exports = app

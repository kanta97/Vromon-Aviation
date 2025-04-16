/*--------------------node modules--------------------*/
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const upload = require('express-fileupload')
const session = require('express-session')
const cron = require('node-cron')
const http = require('http')
const https = require('https')
const fs = require('fs')
//const viewEngine = require('ejs')
const app = express()
/*--------------------node modules end--------------------*/

/*--------------------using node module--------------------*/
app.use(
    session({
        secret: 'tis',
    })
)
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/client'))
app.use('/public', express.static(__dirname + '/public'))
//app.set("views", __dirname + "/views")
//app.engine('html', viewEngine.renderFile)
//app.set('view engine', 'html')
app.use(upload())
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
})
/*--------------------using node module end--------------------*/

/*--------------------custom modules--------------------*/
require('./routes')(app)
var config = require('./config')
let cronModule = require('./cron')
/*--------------------custom modules end--------------------*/

/*--------------------initial routing--------------------*/
app.get('/', function (request, response) {
    //response.set('Cache-Control', 'public, max-age=300, s-maxage=600')
    response.send('Hello World from Touch IT Solutions')
    //console.log(invalidUrlMessage)
})
/*--------------------initial routing end--------------------*/

/*--------------------server creation--------------------*/
if (config.ENVIRONMENT === 'production') {
    const credentials = {
        key: fs.readFileSync('./cert.key'),
        cert: fs.readFileSync('./key.crt'),
        ca: fs.readFileSync('./int.crt'),
    }
    const httpsServer = https.createServer(credentials, app)
    httpsServer.listen(config.HTTPS_PORT, () => {
        console.log(`Server running on port: ${config.HTTPS_PORT}`)
    })
} else {
    const httpServer = http.createServer(app)
    httpServer.listen(config.PORT, () => {
        console.log(`Server running on port: ${config.PORT}`)
    })
}

// app.listen(config.PORT, () => {
//     console.log('Server is started on port: ' + config.PORT)
// })
/*--------------------server creation end--------------------*/

// cron jobs
// cron.schedule('*/20 * * * * *', () => {
//     cronModule.runSchedule()
// });
// cron jobs end

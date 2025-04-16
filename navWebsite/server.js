const { createServer } = require('https')
const { parse } = require('url')
const next = require('next')
const fs = require('fs')
const http = require('http')
const portHttp = 3001 //3001 HTTP port
const portHttps = 9000 //9000 HTTPS port
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev: false })
const handle = app.getRequestHandler()

const httpsOptions = {
    key: fs.readFileSync('./cert.key'),
    cert: fs.readFileSync('./key.crt'),
    ca: fs.readFileSync('./int.crt'),
}

app.prepare().then(() => {
    // Create HTTP server

    const httpServer = http.createServer((req, res) => {
        const parsedUrl = parse(req.url, true)
        handle(req, res, parsedUrl)
    })

    // Create HTTPS server
    const httpsServer = createServer(httpsOptions, (req, res) => {
        const parsedUrl = parse(req.url, true)
        handle(req, res, parsedUrl)
    })

    httpServer.listen(portHttp, (err) => {
        if (err) throw err
        console.log(
            `HTTP server ready - started server on URL: http://localhost:${portHttp}`
        )
    })

    httpsServer.listen(portHttps, (err) => {
        if (err) throw err
        console.log(
            `HTTPS server ready - started server on URL: https://localhost:${portHttps}`
        )
    })
})

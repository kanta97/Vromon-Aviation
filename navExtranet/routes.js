module.exports = function (app) {
    /*--------------------node modules--------------------*/
    const fileSystem = require('fs')
    const req=require('request')
    /*--------------------node modules end--------------------*/

    /*--------------------custom modules--------------------*/
    var config = require('./config')
    var dbUtils = require('./dbUtils')
    /*--------------------custom modules end--------------------*/

    /*--------------------routing--------------------*/
    /*--------------------web service/api--------------------*/
    app.all('/ws/*', function (request, response) {
        //response.set('Cache-Control', 'public, max-age=300, s-maxage=600')
        var endPoint = request.originalUrl.replace('/ws/', '')
        if (endPoint.includes('?')) {
            endPoint = endPoint.substring(0, endPoint.indexOf('?'))
        }
        dbUtils.getWebServiceData(request, response, endPoint)
    })

    app.get('/getSessionInfo', (request, response) => {
        if (request.session.state) {
            response.send(request.session);
        }
        else {
            response.send({ result: 'not logged in' });
        }
    })

    app.post('/pay', function(request, response){
        let requestBody=request.body
        console.log(requestBody)
        let postData={
            store_id : "navigatortourismlive",
            store_passwd : "5CA6160A0ADA165170",
            total_amount : requestBody.totalAmount,
            currency : "BDT",
            tran_id : requestBody.transactionId, 
            success_url : "https://navigatortourism.com/hotel-two/payment?type=online&status=success&refId="+requestBody.refId,
            fail_url : "https://navigatortourism.com/hotel-two/payment?type=online&status=failed&refId="+requestBody.refId,
            cancel_url : "https://navigatortourism.com/hotel-two/payment?type=online&status=cancelled&refId="+requestBody.refId,
            cus_name : requestBody.name,
            cus_email : requestBody.email 
        };
        console.log(requestBody)
        req.post({
            uri: "https://securepay.sslcommerz.com/gwprocess/v3/api.php",
            headers:{'content-type': 'application/x-www-form-urlencoded'},
            body:require('querystring').stringify(postData)
            },function(error,res,body){
                console.log(body);
                var resp = JSON.parse(body);
                let fiResp={}
                if (!error && res.statusCode == 200) {
                    fiResp.status='+success'
                    fiResp.pmUrl=resp.GatewayPageURL
                    response.send(fiResp)
                    console.log(fiResp)
                }
                else{
                    fiResp.status='-failed'
                    response.send(fiResp)
                    console.log(fiResp)
                }
        });
    })

    app.get('/logout', (request, response) => {
        if (request.session.state) {
            request.session.destroy((err) => {
                if (err) {
                    response.send(err);
                }
                else {
                    response.send({ result: 'log out successfully' });
                }
            })
        }
        else {
            response.send({ result: 'not logged in' });
        }
    })

    /*app.get('/ws/getUrl', function (request, response) {
        dbUtils.dbConnectionExecute('getUser').then(function (result) {
            resultSet = result
            response.send(result)
        })
    })
    
    app.get('/ws/getContent', function (request, response) {
        dbUtils.dbConnectionExecute('getContent').then(function (result) {
            resultSet = result
            response.send(result)
        })
    })*/
    /*--------------------web service/api end--------------------*/

    /*--------------------for reading file--------------------*/
    app.get('/content/*', function (request, response) {
        response.set('Cache-Control', 'public, max-age=300, s-maxage=600')
        var fileName = request.originalUrl.replace('/content/', '')
        if (fileName.toLowerCase().includes('.mp3') || fileName.toLowerCase().includes('.wav') || fileName.toLowerCase().includes('.amr')) {
            var filePath = __dirname + '/public/content/audio/' + fileName
            console.log(filePath)
            fileSystem.exists(filePath, function (exists) {
                if (exists) {
                    var musicStream = fileSystem.createReadStream(filePath)
                    musicStream.pipe(response)
                }
                else {
                    response.send(JSON.parse('[{ "message": "404 file not found" }]'))
                }
            })
        }
        else if (fileName.toLowerCase().includes('.jpg') || fileName.toLowerCase().includes('.jpeg') || fileName.toLowerCase().includes('.png') || fileName.toLowerCase().includes('.gif')) {
            var filePath = __dirname + '/public/content/image/' + fileName
            console.log(filePath)
            fileSystem.exists(filePath, function (exists) {
                if (exists) {
                    var imageStream = fileSystem.createReadStream(filePath)
                    imageStream.pipe(response)
                }
                else {
                    response.send(JSON.parse('[{ "message": "404 file not found" }]'))
                }
            })
        }
        else {
            var filePath = __dirname + '/public/content/file/' + fileName
            console.log(filePath)
            fileSystem.exists(filePath, function (exists) {
                if (exists) {
                    var fileStream = fileSystem.createReadStream(filePath)
                    fileStream.pipe(response)
                }
                else {
                    response.send(JSON.parse('[{ "message": "404 file not found" }]'))
                }
            })
        }
    })

    //temporary comment
    // app.get('/*', function (request, response) {
    //     var fileName = request.originalUrl
    //     console.log(fileName)
    //     var filePath = __dirname + '/public' + fileName
    //     console.log(filePath)
    //     fileSystem.exists(filePath, function (exists) {
    //         if (exists) {
    //             var fileStream = fileSystem.createReadStream(filePath)
    //             fileStream.pipe(response)
    //         }
    //         else {
    //             response.send(JSON.parse('[{ "message": "404 file not found" }]'))
    //         }
    //     })
    // })
    //temporary comment end

    /*app.get('/content/image/*', function (request, response) {
        //response.set('Cache-Control', 'public, max-age=300, s-maxage=600')
        var imageFileName = request.originalUrl.replace('/content/image/', '')
        var filePath = __dirname + '/public/content/image/' + imageFileName
        console.log(filePath)
        fileSystem.exists(filePath, function (exists) {
            if (exists) {
                var musicStream = fileSystem.createReadStream(filePath)
                musicStream.pipe(response)
            }
            else {
                response.send(JSON.parse('[{ "message": "404 file not found" }]'))
            }
        })
    })
    
    get file using url query parameter
    
    app.get('/music', function (request, response) {
        var fileId = request.query.id
        var filePath = __dirname + '/public/content/audio/' + fileId
        console.log(filePath)
        fileSystem.exists(filePath, function (exists) {
            if (exists) {
                var musicStream = fileSystem.createReadStream(filePath)
                musicStream.pipe(response)
            }
            else {
                response.send('404 not found')
            }
        })
    })

    app.get('/content/file/*', function (request, response) {
        //response.set('Cache-Control', 'public, max-age=300, s-maxage=600')
        var fileName = request.originalUrl.replace('/content/file/', '')
        var filePath = __dirname + '/public/content/file/' + fileName
        console.log(filePath)
        fileSystem.exists(filePath, function (exists) {
            if (exists) {
                var musicStream = fileSystem.createReadStream(filePath)
                musicStream.pipe(response)
            }
            else {
                response.send(JSON.parse('[{ "message": "404 file not found" }]'))
            }
        })
    })

    /*--------------------for uploading content separated--------------------*/
    app.post("/content/upload", function (request, response) {
        if (request) {
            console.log(request.files)
            var file = request.files.uploadedFile
            var fileName = file.name.split(' ').join('_')
            if (fileName.toLowerCase().includes('.mp3') || fileName.toLowerCase().includes('.wav') || fileName.toLowerCase().includes('.amr')) {
                file.mv("./public/content/audio/" + fileName, function (error) {
                    if (error) {
                        console.log(error)
                        response.send(JSON.parse('[{ "message": "Error Occured" }]'))
                    }
                    else {
                        response.send(JSON.parse(`[{ "message": "Upload Successful", "fileName": "/${fileName}" }]`))
                    }
                })
            }
            else if (fileName.toLowerCase().includes('.jpg') || fileName.toLowerCase().includes('.jpeg') || fileName.toLowerCase().includes('.png') || fileName.toLowerCase().includes('.gif')) {
                file.mv("./public/content/image/" + fileName, function (error) {
                    if (error) {
                        console.log(error)
                        response.send(JSON.parse('[{ "message": "Error Occured" }]'))
                    }
                    else {
                        response.send(JSON.parse(`[{ "message": "Upload Successful", "fileName": "/${fileName}" }]`))
                    }
                })
            }
            else {
                file.mv("./public/content/file/" + fileName, function (error) {
                    if (error) {
                        console.log(error)
                        response.send(JSON.parse('[{ "message": "Error Occured" }]'))
                    }
                    else {
                        response.send(JSON.parse(`[{ "message": "Upload Successful", "fileName": "/${fileName}" }]`))
                    }
                })
            }
        }
        else {
            response.send(JSON.parse('[{ "message": "Invalid Request" }]'))
        }
    })
    /*--------------------for uploading content separated--------------------*/
    /*--------------------for reading file end--------------------*/
    app.get('/*', function (request, response) {
        response.sendFile(__dirname + '/client/index.html', function (err) {
            if (err) {
                response.status(500).send(err)
            }
        })
    })
    /*--------------------routing end--------------------*/
}
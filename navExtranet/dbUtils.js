/*--------------------node modules--------------------*/
//for mssql
const sqlServer = require("mssql");
//for mysql
const mysql2 = require("mysql2");

const mysql = require("mysql");
const Client = require("ssh2").Client;
const ssh = new Client();
/*--------------------node modules end--------------------*/

/*--------------------custom modules--------------------*/
var config = require("./config");
/*--------------------custom modules end--------------------*/

/*--------------------custom attributes--------------------*/

//for db connection
//mysql with ssh
// let dbConnection = function () {
//     return new Promise(function (resolve, reject) {
//         ssh.on('ready', function () {
//             ssh.forwardOut(
//                 // source address, this can usually be any valid address
//                 config.mySqlDbConfig.dbHost,
//                 // source port, this can be any valid port number
//                 config.PORT,
//                 // destination address (localhost here refers to the SSH server)
//                 config.mySqlDbConfig.dbHost,
//                 // destination port
//                 config.mySqlDbConfig.dbPort,
//                 function (error, stream) {
//                     // SSH error: can also send error in promise ex.
//                     if (error) {
//                         console.log('DB Connection Failed for: ' + error);
//                     }
//                     else {
//                         //reject(err)
//                         // use `sql` connection as usual
//                         connection = mysql2.createConnection({
//                             host: config.mySqlDbConfig.dbHost,
//                             user: config.mySqlDbConfig.dbUserName,
//                             password: config.mySqlDbConfig.dbPassword,
//                             database: config.mySqlDbConfig.database,
//                             stream: stream
//                         });

//                         // send connection back in variable depending on success or not
//                         connection.connect(function (error) {
//                             if (error) {
//                                 console.log('Database connection failed for: ' + error);
//                             }
//                             else {
//                                 //reject(err)
//                                 console.log('MySql database connected');
//                                 resolve(connection);
//                             }
//                         });
//                     }
//                 });
//         }).connect({
//             host: config.mySqlDbConfig.cpanelHost, //IP address where DB is hosted
//             port: config.mySqlDbConfig.cpanelPort,               //Port refering to the IP
//             username: config.mySqlDbConfig.cpanelUserName,       //username to loginto the host
//             password: config.mySqlDbConfig.cpanelPassword  //password to log into host
//         });
//     });
// }
//mysql with ssh end

// mysql
let connectionObject;
let dbConnection = function (purpose, queryString = "") {
  if (purpose === "connection") {
    connectionObject = mysql.createConnection({
      host: config.mysqlConfig.server,
      user: config.mysqlConfig.user,
      password: config.mysqlConfig.password,
      database: config.mysqlConfig.database,
    });

    //send connection back in variable depending on success or not
    connectionObject.connect(function (error) {
      if (error) {
        console.log("Database connection failed for: " + error);
      } else {
        console.log("MySql database connected");
      }
    });
  } else if (purpose === "query") {
    return new Promise(function (resolve, reject) {
      connectionObject.query(queryString, (error, rows, fields) => {
        if (error) {
          resolve(JSON.parse('{"message":"Invalid URL/API"}'));
        } else {
          resolve(rows);
        }
      });
    });
  }
  // return new Promise(function (resolve, reject) {
  //     connection = mysql.createConnection({
  //         host: config.mysqlConfig.server,
  //         user: config.mysqlConfig.user,
  //         password: config.mysqlConfig.password,
  //         database: config.mysqlConfig.database
  //     });

  //     //send connection back in variable depending on success or not
  //     connection.connect(function (error) {
  //         if (error) {
  //             console.log('Database connection failed for: ' + error);
  //         }
  //         else {
  //             //reject(err)
  //             console.log('MySql database connected');
  //             resolve(connection);
  //         }
  //     });
  // });
};
dbConnection("connection");
// mysql end

//for db connection end

//db connection execute
var dbConnectionExecute = function (queryString) {
  //for mssql
  // new sqlServer.ConnectionPool(config.dbConfig).connect().then(pool => {
  //     return pool.query(queryString)
  // }).then(recordset => {
  //     console.log('connected')
  //     result = recordset.recordset
  // }).catch(error => {
  //     console.log('not connected')
  //     console.log(error)
  // })
  // sqlServer.close()
  // return new Promise(function (resolve, reject) {
  //     sqlServer.connect(config.dbConfig, function (error) {
  //         if (error) {
  //             console.log(error)
  //         }
  //         else {
  //             var request = new sqlServer.Request()
  //             request.query(queryString, function (error, recordset) {
  //                 if (error) {
  //                     resolve(JSON.parse('{"message":"Invalid URL/API"}'))
  //                     sqlServer.close()
  //                 }
  //                 else {
  //                     resolve(recordset.recordset)
  //                     sqlServer.close()
  //                 }
  //             })
  //         }
  //     })

  // })
  //for mssql end

  //for mysql with ssh
  return new Promise(function (resolve, reject) {
    dbConnection().then(function (connection) {
      connection.query(queryString, (error, rows, fields) => {
        if (error) {
          resolve(JSON.parse('{"message":"Invalid URL/API"}'));
        } else {
          resolve(rows);
        }
      });
      connection.end();
    });
  });
  //for mysql with ssh end
};
//db connection execute end

/*--------------------custom attributes end--------------------*/

/*--------------------custom functions for database--------------------*/
function getWebServiceData(request, response, endPoint) {
  var requestBody = request.body;
  //console.log('body' + body)

  //file upload using web service according to file exists or not
  if (request.files) {
    console.log(request.files);
    var contentUrl = config.rootUrl + ":" + config.PORT + "/content/";
    var file = request.files.uploadedFile;
    var fileName = file.name.split(" ").join("_");
    if (
      fileName.toLowerCase().includes(".mp3") ||
      fileName.toLowerCase().includes(".wav") ||
      fileName.toLowerCase().includes(".amr")
    ) {
      file.mv("./public/content/audio/" + fileName, function (error) {
        if (error) {
          console.log(error);
          //response.send(JSON.parse('[{ "message": "Error Occured" }]'))
          console.log('[{ "message": "File Uploading Error" }]');
        } else {
          //response.send(JSON.parse('[{ "message": "+Success" }]'))
          console.log('[{ "message": "File Uploaded Successfully" }]');
        }
      });
      contentUrl = contentUrl + fileName;
      requestBody = { ...requestBody, contentUrl: contentUrl };
    } else if (
      fileName.toLowerCase().includes(".jpg") ||
      fileName.toLowerCase().includes(".jpeg") ||
      fileName.toLowerCase().includes(".png") ||
      fileName.toLowerCase().includes(".gif")
    ) {
      file.mv("./public/content/image/" + fileName, function (error) {
        if (error) {
          console.log(error);
          //response.send(JSON.parse('[{ "message": "Error Occured" }]'))
          console.log('[{ "message": "File Uploading Error" }]');
        } else {
          //response.send(JSON.parse('[{ "message": "+Success" }]'))
          console.log('[{ "message": "File Uploaded Successfully" }]');
        }
      });
      contentUrl = contentUrl + fileName;
      requestBody = { ...requestBody, contentUrl: contentUrl };
    } else {
      file.mv("./public/content/file/" + fileName, function (error) {
        if (error) {
          console.log(error);
          //response.send(JSON.parse('[{ "message": "Error Occured" }]'))
          console.log('[{ "message": "File Uploading Error" }]');
        } else {
          //response.send(JSON.parse('[{ "message": "+Success" }]'))
          console.log('[{ "message": "File Uploaded Successfully" }]');
        }
      });
      contentUrl = contentUrl + fileName;
      requestBody = { ...requestBody, contentUrl: contentUrl };
    }
  }
  //file upload using web service according to file exists or not end

  console.log(endPoint);
  console.log(request.body);
  console.log(JSON.stringify(request.headers));
  console.log(request.query);
  //console.log(request.files)

  //query = "EXECUTE getJsonUsingWs N'" + endPoint + "'"

  let tempSessFlag = "";
  if (request.session.state) {
    tempSessFlag = "loggedIn";
  } else {
    tempSessFlag = "notLoggedIn";
  }

  if (config.dbFlag === "dbConfig") {
    //for mssql
    query =
      "EXECUTE getJsonUsingWs N'" +
      endPoint +
      "', N'" +
      JSON.stringify(requestBody) +
      "', N'" +
      JSON.stringify(request.query) +
      "'";
  } else if (config.dbFlag === "mySqlDbConfig") {
    //for mysql
    query =
      "CALL getJsonUsingWs (N'" +
      endPoint +
      "', N'" +
      JSON.stringify(requestBody) +
      "', N'" +
      JSON.stringify(request.query) +
      "', N'" +
      tempSessFlag +
      "')";
  }

  //query = "select * from contentCategory";
  //query = "call getJsonUsingWs";

  console.log(query);

  dbConnection("query", query)
    .then(function (result) {
      //resultSet = result
      //   console.log(result);
      if (endPoint == "login" && result[0][0].result == "+success") {
        var tempSessionInfo = {
          userId: result[0][0].userId,
          name: result[0][0].fullName,
          email: result[0][0].email,
          status: result[0][0].status,
          isVerified: result[0][0].isVerified,
          userType: result[0][0].userType,
          createDate: result[0][0].createDate,
        };
        request.session.sessionInfo = tempSessionInfo;
        request.session.state = "loggedIn";
      } else if (
        (endPoint == "getPropertyDataForWeb" || endPoint == "getProperty_V2") &&
        request.query.platform == "mobileApp"
      ) {
        for (let i = 0; i < result[0].length; i++) {
          try {
            result[0][i].thumbnail = JSON.parse(result[0][i].thumbnail);
            result[0][i].images = JSON.parse(result[0][i].images);
            result[0][i].popularFacilities = JSON.parse(
              result[0][i].popularFacilities
            );
            result[0][i].amenities = JSON.parse(result[0][i].amenities);
            result[0][i].roomAmenities = JSON.parse(result[0][i].roomAmenities);
            result[0][i].mediaTechnology = JSON.parse(
              result[0][i].mediaTechnology
            );
            result[0][i].extraServices = JSON.parse(result[0][i].extraServices);
            result[0][i].outdoorView = JSON.parse(result[0][i].outdoorView);
            result[0][i].accessibility = JSON.parse(result[0][i].accessibility);
            result[0][i].entertainmentAndFamilyServices = JSON.parse(
              result[0][i].entertainmentAndFamilyServices
            );
            result[0][i].otherFacilities = JSON.parse(
              result[0][i].otherFacilities
            );
            result[0][i].topTenTags = JSON.parse(result[0][i].topTenTags);
          } catch (e) {}
        }
      } else if (
        (endPoint == "getProperty" || endPoint == "getRoomData") &&
        request.query.platform == "mobileApp"
      ) {
        for (let i = 0; i < result[0].length; i++) {
          try {
            result[0][i].mealData = JSON.parse(result[0][i].mealData);
            result[0][i].images = JSON.parse(result[0][i].images);
            result[0][i].popularFacilities = JSON.parse(
              result[0][i].popularFacilities
            );
            result[0][i].amenities = JSON.parse(result[0][i].amenities);
            result[0][i].roomAmenities = JSON.parse(result[0][i].roomAmenities);
            result[0][i].mediaTechnology = JSON.parse(
              result[0][i].mediaTechnology
            );
            result[0][i].extraServices = JSON.parse(result[0][i].extraServices);
            result[0][i].outdoorView = JSON.parse(result[0][i].outdoorView);
            result[0][i].accessibility = JSON.parse(result[0][i].accessibility);
            result[0][i].entertainmentAndFamilyServices = JSON.parse(
              result[0][i].entertainmentAndFamilyServices
            );
            result[0][i].otherFacilities = JSON.parse(
              result[0][i].otherFacilities
            );
            result[0][i].onlinePaymentList = JSON.parse(
              result[0][i].onlinePaymentList
            );
            result[0][i].priceOffers = JSON.parse(result[0][i].priceOffers);
            result[0][i].availabilityData = JSON.parse(
              result[0][i].availabilityData
            );
          } catch (e) {}
        }
      }
      response.send(result);
      //console.log(resultSet)
    })
    .catch(function (error) {
      response.send(error);
    });
  //response.send(request.originalUrl)\
  //console.log(request.originalUrl)
}
/*--------------------custom functions for database end--------------------*/

/*--------------------exportion of custom module--------------------*/
module.exports.dbConnection = dbConnection;
module.exports.getWebServiceData = getWebServiceData;
/*--------------------exportion of custom module end--------------------*/

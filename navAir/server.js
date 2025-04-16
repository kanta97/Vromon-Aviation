var express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");

var env = "local"; // local , production
// for local
// var https = require("http");
// for production
var https = env === "production" ? require("https") : require("http");

var fs = require("fs");
app = express();

// set the view engine to ejs
app.set("view engine", "ejs");

const config = require("./config/config");
const {
  responseMessage,
  responseMessageKey,
  respMsg,
} = require("./config/responseMessage");
var appRoutes = require("./routes/approutes");
var expressWinston = require("express-winston");
var winston = require("winston");
app.use(cors());
app.options("*", cors());
port = config.app.port;
responseMessage.getAllRespMsg();
// console.log(respMsg.get('booking.success'));
var log4js = require("log4js");
app.use(log4js.connectLogger(log4js.getLogger("http"), { level: "auto" }));
console.log(port);

//app.listen(port);
// for production
if (env === "production") {
  var cert = fs.readFileSync(
    "/home/navigatortourism/ssl/certs/navigatortourism_com_c9dab_55abd_1657708658_08da9278232d4720734d780d53c9751c.crt"
  );
  var key = fs.readFileSync(
    "/home/navigatortourism/ssl/keys/c9dab_55abd_65da71f4b0f06cd0e989502f7204a5a4.key"
  );
  var options = {
    key: key,
    cert: cert,
  };
  var server = https.createServer(options, app);
  server.listen(port, function () {
    console.log("listening on port " + port + "!");
  });
} else {
  https.createServer(app).listen(port, function () {
    console.log("listening on port " + port + "!!@");
  });
}

app.use(express.json());
app.use(express.static(__dirname + "/uploads"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/", appRoutes);




module.exports = app;

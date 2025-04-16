require("dotenv").config();

var https = require("https");
var http = require("http");
var fs = require("fs");

const app = require("./src/app");
const port = process.env.PORT || 8085;

const server = http.createServer(app);

// const server = https.createServer(
//   {
//     key: fs.readFileSync(
//       "/home/navigatortourism/ssl/keys/c9dab_55abd_65da71f4b0f06cd0e989502f7204a5a4.key"
//     ),
//     cert: fs.readFileSync(
//       "/home/navigatortourism/ssl/certs/navigatortourism_com_c9dab_55abd_1657708658_08da9278232d4720734d780d53c9751c.crt"
//     ),
//     ca: fs.readFileSync(
//       "/home/navigatortourism/ssl/certs/navigatortourism_com_c9dab_55abd_1657708658_08da9278232d4720734d780d53c9751c.crt"
//     ),
//     strictSSL: false,
//   },
//   app
// );

server.on("listening", function () {
  console.log("ok, server is running port=" + port);
});
server.listen(port);

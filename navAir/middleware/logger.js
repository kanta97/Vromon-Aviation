const config = require('../config/config');
var log4js = require('log4js');
log4js.configure("config/log4js.json");
var logger = log4js.getLogger();

exports.log = function (req, res, err) {
    if (err) {
        logger.error('error: '+ err);
    }
    else{
        logger.debug("request params: " +  JSON.stringify(req.params) + " request body: "+  JSON.stringify(req.body) +" response status: 200 response : "+  JSON.stringify(res));
    }
};
// var winston = require('winston');
// let consoleLogger = function(options){
//   return new (winston.createLogger)({
//   transports: [
//     new (winston.transports.Console)(options),
//   ]
// });
// } 

// // the CustomTransport is to prevent error log show multiple times 
// class CustomTransport extends winston.Transport {
//   constructor(options) {
//     super(options);
//     this.options = options;
//     this.levels = options && options.levels || [this.level];
//   }

//   log(level, msg, meta, callback) {
//     if(this.levels.indexOf(level) > -1){
//       consoleLogger(this.options)[level](msg, meta);
//     }
//     callback(null, true);
//   }
// }

// winston.transports.CustomTransport = CustomTransport;

// const tsFormat = () => (new Date()).toLocaleTimeString();
// var logger = new winston.createLogger({
//   transports: [
//     // add name attribute to prevent Transport already attached error
//     // no error log for this transport
//       new (winston.transports.CustomTransport)(
//         {
//           name: 'info-console',
//           level: 'debug',
//           levels : ['debug', 'verbose', 'info', 'warn'],
//           timestamp: tsFormat,
//           handleExceptions: true,
//           colorize: true,
//           json: false
//       }
//       ),
//       // only error log for this transport, modify the configuration as you need
//       new (winston.transports.CustomTransport)(
//         {
//           name: 'error-console',
//           level: 'error',
//           timestamp: tsFormat,
//           handleExceptions: true,
//           colorize: true,
//           json: false
//         }
//       ),
//       new (winston.transports.File)(
//           { 
//               name: 'info-file',
//               filename: 'info.log',
//               timestamp: true,
//               maxsize: 1024000,
//               level: 'info'
//           }),
//     new (winston.transports.File)(
//             { 
//                 name: 'debug-file',
//                 filename: 'debug.log',
//                 timestamp: true,
//                 maxsize: 1024000,
//                 level: 'debug'
//             }),
//       new (winston.transports.File)(
//           { 
//               name: 'error-file',
//               filename: 'error.txt',
//               timestamp: true,
//               maxsize: 1024000,
//               level: 'error'
//           })
//   ]});

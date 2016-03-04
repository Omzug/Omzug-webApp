/**
 * Created by hanwencheng on 1/12/16.
 */

var winston = require('winston');
var config = require('./config');

var addZero = function(x,n) {
  while (x.toString().length < n) {
    x = "0" + x;
  }
  return x;
};

var timestampFn = function() {
  var now = new Date();
  var returnString =  '' +
    now.getFullYear() +
    addZero((now.getMonth() + 1), 2) +
    addZero(now.getDate(), 2) +
    '-' +
    addZero(now.getHours(), 2) +
    addZero(now.getMinutes(), 2) +
    addZero(now.getSeconds(), 2) +
    '.' +
    addZero(now.getMilliseconds(), 3) +
    '[' +
    process.pid +
    ']';
  return returnString;
};

var logOptions = config.logOptions;

var level = process.env.NODE_ENV === "production" ? logOptions.level : logOptions.debugLevel;
var consoleLevel = process.env.NODE_ENV === "production" ? "warn" : "debug"
var filename = logOptions.filename;
var fileSize = logOptions.filesize;
var fileCount = logOptions.filecount;
//var noLogFlag = logOptions.noLogFlag;

var logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level : consoleLevel,
      prettyPrint: true,
      colorize: true,
      timestamp: timestampFn,
      handleExceptions: true
    }),
    //TODO disable file logger at the moment
    new (require('winston-daily-rotate-file'))({
      level: level,
      filename: filename,
      datePattern: '.yyyy-MM-dd.log',
      timestamp: timestampFn,
      maxsize: fileSize,
      maxFiles: fileCount,
      json: false
    })
  ]
});

var loggerStream = {write: function (data) {
  logger.info(data.replace(/\n$/, ''));
}};

var levelMap = {
  'error': 0,
  'warn': 1,
  'verbose': 2,
  'info': 3,
  'debug': 4,
  'trace' : 5,
}

var levelNumber = levelMap[level];

var logTrace = logger.trace;

logger.trace = function() {
  if (levelNumber > 4) {
    logTrace.apply(logger, arguments);
  }
};

var logDebug = logger.debug;

logger.debug = function() {
  if (levelNumber > 3) {
    logDebug.apply(logger, arguments);
  }
};

var logInfo = logger.info;

logger.info = function() {
  if (levelNumber > 2) {
    logInfo.apply(logger, arguments);
  }
};

var logWarn = logger.warn;

logger.warn = function() {
  if (levelNumber > 0) {
    logWarn.apply(logger, arguments);
  }
};

var logError = logger.error;

logger.error = function() {
  logError.apply(logger, arguments);
};

export {logger, loggerStream}

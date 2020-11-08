const winston = require("winston");
const logdnaWinston = require("logdna-winston");

const logger = winston.createLogger({
  // level: "info",
  levels: winston.config.syslog.levels,
  format: winston.format.json(),
  defaultMeta: { service: "main-service" },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "logs/exceptions.log" }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: "logs/rejections.log" }),
  ],
});

const options = {
  key: process.env.LOG_DNA_INGESTION_KEY,
  // hostname: myHostname,
  // ip: ipAddress,
  // mac: macAddress,
  // app: appName,
  // env: envName,
  // level: level, // Default to debug, maximum level of log, doc: https://github.com/winstonjs/winston#logging-levels
  indexMeta: true, // Defaults to false, when true ensures meta object will be searchable
};

// Only add this line in order to track exceptions
options.handleExceptions = true;

logger.add(new logdnaWinston(options));

module.exports = logger;

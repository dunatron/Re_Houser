const winston = require("winston");
const logdnaWinston = require("logdna-winston");

const logger = winston.createLogger({
  // level: "info",
  levels: winston.config.syslog.levels,
  format: winston.format.json(),
  defaultMeta: { service: "app-service" },
  exitOnError: false,
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.Console({ handleExceptions: true }),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" })
  ]
});

const options = {
  key: process.env.LOG_DNA_INGESTION_KEY,
  level: "debug", // Default to debug, maximum level of log, doc: https://github.com/winstonjs/winston#logging-levels
  // hostname: myHostname,
  // ip: ipAddress,
  // mac: macAddress,
  // app: appName,
  // env: envName,
  // level: level,
  indexMeta: true, // Defaults to false, when true ensures meta object will be searchable
  handleExceptions: true
};

process.env.STAGE === "prod" && logger.add(new logdnaWinston(options));
// logger.add(new logdnaWinston(options));

module.exports = logger;

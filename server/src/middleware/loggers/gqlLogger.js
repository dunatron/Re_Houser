const winston = require("winston");
const logdnaWinston = require("logdna-winston");

const gqlLogger = winston.createLogger({
  // level: "info",
  levels: winston.config.syslog.levels,
  format: winston.format.json(),
  defaultMeta: { service: "yoga-service" },
  transports: [
    new winston.transports.File({
      filename: "logs/gql-error.log",
      level: "error",
    }),
    new winston.transports.File({ filename: "logs/gql-combined.log" }),
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

gqlLogger.add(new logdnaWinston(options));

module.exports = gqlLogger;

const winston = require("winston");
const logdnaWinston = require("logdna-winston");
const { combine, timestamp, simple, json, label, prettyPrint } = winston.format;

const defaultFormat = () => combine(simple(), timestamp(), json());

const prettyFormat = () => combine(simple(), timestamp(), prettyPrint());

const consoleTransport = new winston.transports.Console({
  format: process.env.STAGE === "dev" ? prettyFormat() : defaultFormat()
});

const logToFiles = process.env.STAGE !== "prod" ? true : false;
// const logToFiles = false;

const logger = winston.createLogger({
  level: "info",
  levels: winston.config.syslog.levels,
  format: winston.format.json(),
  defaultMeta: { service: "app-service" },
  exitOnError: false, // needs to be false to not crash app and forward errors
  silent: false,
  transports: [consoleTransport],
  exceptionHandlers: [consoleTransport],
  rejectionHandlers: [consoleTransport]
});

if (logToFiles) {
  logger.add(
    new winston.transports.File({
      filename: "logs/combined.log",
      format: defaultFormat()
    }),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      format: defaultFormat()
    }),
    // the below need to be added into exception and rejection handling
    new winston.transports.File({
      filename: "logs/exceptions.log",
      format: defaultFormat(),
      handleExceptions: true
    })
    // new winston.transports.File({
    //   filename: "logs/rejections.log",
    //   format: defaultFormat()
    // })
  );
}

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

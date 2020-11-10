const winston = require("winston");
const logdnaWinston = require("logdna-winston");
const { combine, timestamp, simple, label, prettyPrint } = winston.format;

const defaultFormat = () =>
  combine(
    simple(),
    timestamp()
    // prettyPrint()
  );

const consoleTransport = new winston.transports.Console({
  format: defaultFormat()
});

const logger = winston.createLogger({
  level: "info",
  levels: winston.config.syslog.levels,
  format: winston.format.json(),
  defaultMeta: { service: "app-service" },
  exitOnError: false, // needs to be false to not crash app and forward errors
  silent: false,
  transports: [
    consoleTransport,
    new winston.transports.File({
      filename: "logs/combined.log",
      format: defaultFormat()
    }),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      format: defaultFormat()
    })
  ],
  exceptionHandlers: [
    consoleTransport,
    new winston.transports.File({
      filename: "logs/exceptions.log",
      format: defaultFormat()
    })
  ],
  rejectionHandlers: [
    consoleTransport,
    new winston.transports.File({
      filename: "logs/rejections.log",
      format: defaultFormat()
    })
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

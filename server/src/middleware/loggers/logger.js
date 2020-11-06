const winston = require("winston");

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
    new winston.transports.File({ filename: "logs/combined.log" })
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "logs/exceptions.log" })
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: "logs/rejections.log" })
  ]
});
module.exports = logger;

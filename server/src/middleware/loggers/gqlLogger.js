const winston = require("winston");

const gqlLogger = winston.createLogger({
  // level: "info",
  levels: winston.config.syslog.levels,
  format: winston.format.json(),
  defaultMeta: { service: "yoga-service" },
  transports: [
    new winston.transports.File({
      filename: "logs/gql-error.log",
      level: "error"
    }),
    new winston.transports.File({ filename: "logs/gql-combined.log" })
  ]
});
module.exports = gqlLogger;

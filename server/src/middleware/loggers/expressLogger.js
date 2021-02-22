const logger = require("./logger");

const expressLogger = function(req, res, next) {
  var ip =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);
  var ipAddr = req.headers["x-forwarded-for"];
  if (ipAddr) {
    var list = ipAddr.split(",");
    ipAddr = list[list.length - 1];
  } else {
    ipAddr = req.connection.remoteAddress;
  }
  logger.log("info", `request to express server ${req.body.operationName}`, {
    operationName: req.body.operationName,
    ip: ip,
    ipAddr: ipAddr,
    url: req.url,
    user: {
      id: req.userId,
      permissions: req.userPermissions
    },
    method: req.method,
    variables: req.body.variables,
    headers: req.headers,
    userAgent: req.headers["user-agent"]
    // query: req.body.query
  });

  next();
};

const expressLoggerMiddleware = server => {
  server.use(expressLogger);
};

module.exports = expressLoggerMiddleware;

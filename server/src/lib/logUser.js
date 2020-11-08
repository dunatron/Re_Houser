const logger = require("../middleware/loggers/logger");

function logUser(message, user) {
  return logger.info(`${message}: ${user.email}`, {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
  });
}

module.exports = logUser;

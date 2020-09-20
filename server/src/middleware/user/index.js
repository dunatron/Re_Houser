const addUser = require("./addUser");

const userMiddleware = server => {
  server.express.use(addUser);
};

module.exports = userMiddleware;

const bodyParser = require("body-parser");

const stripeMiddleware = server => {
  server.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  server.use((req, res, next) => {
    if (req.originalUrl === "/stripe/webhook") {
      next();
    } else {
      bodyParser.json()(req, res, next);
    }
  });
};

module.exports = stripeMiddleware;

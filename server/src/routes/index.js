const setupIndexes = require("./setup-indexes");
const bodyParser = require("body-parser");
const postStripeIntent = require("./stripe/intent");
const postStripeWebhook = require("./stripe/webhook");

const routes = server => {
  server.get("/setup-indexes", setupIndexes);
  server.post("/stripe/intent", postStripeIntent);
  server.post(
    "/stripe/webhook",
    bodyParser.raw({ type: "application/json" }),
    postStripeWebhook
  );
};

module.exports = routes;

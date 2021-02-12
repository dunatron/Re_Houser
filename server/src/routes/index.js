const setupIndexes = require("./setup-indexes");
const bodyParser = require("body-parser");
const postStripeIntent = require("./stripe/intent");
const postStripeWebhook = require("./stripe/webhook");

const cloudinary = require("cloudinary").v2;
var fs = require("fs");
const cloudinaryConfObj = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};

cloudinary.config(cloudinaryConfObj);

const routes = (server) => {
  server.get("/setup-indexes", setupIndexes);
  server.post("/stripe/intent", postStripeIntent);
  server.get("/test/file-upload", (req, res) => {
    try {
      console.log("The test file request headers: ", req.headers);
      var upload_stream = cloudinary.uploader.upload_stream(
        { tags: "basic_sample" },
        function(err, image) {
          console.log();
          console.log("** Stream Upload");
          if (err) {
            console.warn(err);
          }
          console.log("* Same image, uploaded via stream");
          console.log("* " + image.public_id);
          console.log("* " + image.url);
        }
      );
      fs.createReadStream("./src/pizza.jpg").pipe(upload_stream);
      res.send("Probably succeded");
    } catch (err) {
      // res.send("an error: ", err.message);
      res.send("FILE ERROR");
    }
  });
  server.post(
    "/stripe/webhook",
    bodyParser.raw({ type: "application/json" }),
    postStripeWebhook
  );
};

module.exports = routes;

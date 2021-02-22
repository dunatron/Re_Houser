const setupIndexes = require("./setup-indexes");
const bodyParser = require("body-parser");
const postStripeIntent = require("./stripe/intent");
const postStripeWebhook = require("./stripe/webhook");

const cloudinary = require("cloudinary").v2;
var fs = require("fs");
const cloudinaryConfObj = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
};

cloudinary.config(cloudinaryConfObj);

const routes = server => {
  server.get("/setup-indexes", setupIndexes);
  server.post("/stripe/intent", postStripeIntent);
  server.get("/test/file-upload", (req, res) => {
    req.headers["Access-Control-Allow-Origin"] = "*";
    req.headers["tron"] = "testing-tron";
    req.headers["host"] = "yoga.rehouser.co.nz";
    req.headers["connection"] = "close";
    req.headers["accept"] = "*/*";
    req.headers["user-agent"] =
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0";
    req.headers["content-type"] =
      "multipart/form-data; boundary=----WebKitFormBoundaryspjPKpXapNePavHP";
    req.headers["origin"] = "https://app.rehouser.co.nz";
    req.headers["sec-fetch-site"] = "same-site";
    req.headers["sec-fetch-mode"] = "cors";
    req.headers["sec-fetch-dest"] = "empty";
    req.headers["referer"] = "https://app.rehouser.co.nz/";
    req.headers["accept-encoding"] = "gzip, deflate, br";
    req.headers["accept-language"] = "en-US,en;q=0.9";
    req.headers["x-request-id"] = "391db761-1050-4966-a6f5-140cbabd8525";
    req.headers["x-forward-for"] = "139.180.76.100";
    req.headers["x-forwarded-proto"] = "https";
    req.headers["x-forwarded-port"] = "443";
    req.headers["via"] = "1.1 vegur";
    req.headers["connect-time"] = "0";
    req.headers["x-request-start"] = "1613261641034";
    req.headers["total-route-time"] = "0";
    req.headers["content-length"] = "37846";
    try {
      console.log("The test file request headers: ", req.headers);
      var upload_stream = cloudinary.uploader.upload_stream(
        { tags: "basic_sample" },
        function(err, image) {
          console.log();
          console.log("** Stream Upload");
          if (err) {
            console.warn(err);
            res.send("FILE ERROR");
          }
          console.log("* Same image, uploaded via stream");
          console.log("* " + image.public_id);
          console.log("* " + image.url);
          console.log("RESULT RES: ", res);
          res.send(
            `Headers sent: <pre>${JSON.stringify(
              req.headers,
              null,
              2
            )}</pre> image: <pre>${JSON.stringify(image, null, 2)}}</pre>
            `
          );
        }
      );
      fs.createReadStream("./src/pizza.jpg").pipe(upload_stream);
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

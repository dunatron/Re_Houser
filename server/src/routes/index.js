const setupIndexes = require("./setup-indexes");
const bodyParser = require("body-parser");
const postStripeIntent = require("./stripe/intent");
const postStripeWebhook = require("./stripe/webhook");

// const logger = require("./middleware/loggers/logger");
// const cloudinary = require("cloudinary").v2;
// var fs = require("fs");
// var uploads = {};
// const cloudinaryConfObj = {
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// };

// cloudinary.config(cloudinaryConfObj);

const routes = (server) => {
  server.get("/setup-indexes", setupIndexes);
  server.post("/stripe/intent", postStripeIntent);
  // server.get("/test/file-upload", (req, res) => {
  //   try {
  //     console.log("The test file request headers: ", req.headers);
  //     logger.log("info", `The test file request headers:`, {
  //       headers: req.headers
  //     });
  //     var upload_stream = cloudinary.uploader.upload_stream(
  //       { tags: "basic_sample" },
  //       function(err, image) {
  //         console.log();
  //         console.log("** Stream Upload");
  //         if (err) {
  //           console.warn(err);
  //         }
  //         console.log("* Same image, uploaded via stream");
  //         console.log("* " + image.public_id);
  //         console.log("* " + image.url);
  //         waitForAllUploads("pizza3", err, image);
  //       }
  //     );
  //     fs.createReadStream("./src/pizza.jpg").pipe(upload_stream);
  //     // res.send("Probably succeded");
  //   } catch (err) {
  //     // res.send("an error: ", err.message);
  //     res.send("FILE ERROR");
  //   }
  //   res.send("FILE FINISHED");
  // });
  server.post(
    "/stripe/webhook",
    bodyParser.raw({ type: "application/json" }),
    postStripeWebhook
  );
};

function waitForAllUploads(id, err, image) {
  uploads[id] = image;
  var ids = Object.keys(uploads);
  if (ids.length === 6) {
    console.log();
    console.log("**  uploaded all files (" + ids.join(",") + ") to cloudinary");
    performTransformations();
  }
}

// function performTransformations() {
//   console.log();
//   console.log();
//   console.log();
//   console.log(
//     ">> >> >> >> >> >> >> >> >> >>  Transformations << << << << << << << << << <<"
//   );
//   console.log();
//   console.log("> Fit into 200x150");
//   console.log(
//     "> " +
//       cloudinary.url(uploads.pizza2.public_id, {
//         width: 200,
//         height: 150,
//         crop: "fit",
//         format: "jpg",
//       })
//   );

//   console.log();
//   console.log("> Eager transformation of scaling to 200x150");
//   console.log("> " + cloudinary.url(uploads.lake.public_id, eager_options));

//   console.log();
//   console.log("> Face detection based 200x150 thumbnail");
//   console.log(
//     "> " +
//       cloudinary.url(uploads.couple.public_id, {
//         width: 200,
//         height: 150,
//         crop: "thumb",
//         gravity: "faces",
//         format: "jpg",
//       })
//   );

//   console.log();
//   console.log("> Fill 200x150, round corners, apply the sepia effect");
//   console.log(
//     "> " +
//       cloudinary.url(uploads.couple2.public_id, {
//         width: 200,
//         height: 150,
//         crop: "fill",
//         gravity: "face",
//         radius: 10,
//         effect: "sepia",
//         format: "jpg",
//       })
//   );

//   console.log();
//   console.log("> That's it. You can now open the URLs above in a browser");
//   console.log("> and check out the generated images.");
// }

module.exports = routes;

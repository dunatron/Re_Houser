const cloudinary = require("cloudinary").v2;
const { extractFileKey } = require("./extractFileKey");
const { _isAdmin } = require("./permissionsCheck");

const logger = require("../middleware/loggers/logger");
var fs = require("fs");

//https://cloudinary.com/documentation/image_upload_api_reference#required_parameters

const cloudinaryConfObj = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
};

exports._isUploader = ({ file, ctx }) => {
  return file.uploaderId === ctx.request.userId;
};

exports._isUploaderOrAdmin = ({ file, ctx }) => {
  if (!ctx.request) return false; // this is for subs...
  if (file.uploaderId === ctx.request.userId || _isAdmin(ctx)) {
    return true;
  }
  return false;
};

exports.processUpload = async ({ upload, ctx, info, data = {} }) => {
  const {
    // stream,
    createReadStream,
    filename,
    mimetype,
    encoding
  } = await upload;

  const stream = createReadStream();

  cloudinary.config(cloudinaryConfObj);
  let resultObj = {};

  console.log("SHOW ME THE FILE CTX headers => ", ctx.request.headers);

  // delete ctx.request.headers["access-control-allow-origin"];

  // delete ctx.request.headers["x-request-id"];
  // delete ctx.request.headers["x-forwarded-for"];
  // delete ctx.request.headers["x-forwarded-proto"];
  // delete ctx.request.headers["x-forwarded-port"];
  // delete ctx.request.headers["via"];
  // delete ctx.request.headers["connect-time"];
  // delete ctx.request.headers["x-request-start"];
  // delete ctx.request.headers["total-route-time"];

  // delete ctx.request.headers["origin"];
  // delete ctx.request.headers["content-type"];

  // ctx.request.headers["connection"] = "keep-alive";

  // console.log("FILE HEADERSS AFTER ALTERATION => ", ctx.request.headers);

  // below is all we need
  // host: 'localhost:4444',
  // connection: 'keep-alive',
  // 'content-length': '99977',
  // accept: '*/*',
  // 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36',
  // 'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary1vunOhAABXY6BaCU',
  // origin: 'http://localhost:7777',
  // 'sec-fetch-site': 'same-site',
  // 'sec-fetch-mode': 'cors',
  // 'sec-fetch-dest': 'empty',
  // referer: 'http://localhost:7777/',
  // 'accept-encoding': 'gzip, deflate, br',
  // 'accept-language': 'en-US,en;q=0.9',
  // cookie: 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJyZWhvdXNlci1jdG8taWQiLCJ1c2VyUGVybWlzc2lvbnMiOlsiQURNSU4iLCJVU0VSIiwiUEVSTUlTU0lPTlVQREFURSIsIldJWkFSRCJdLCJpYXQiOjE2MTM0Nzk3NDR9.PBY4CSCtsBIL5sNdmKhTtiaFp_IMbJk0pkxHvYzxurg; refresh-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJyZWhvdXNlci1jdG8taWQiLCJpYXQiOjE2MTM0Nzk3NDR9.kxnlJMv-hytbc_GYAkwq8PnEIsvwKtjpOnBLzcfvWyo'

  // PERHAPS TRY ADD THESE TO THE RESPONSE HEADER
  // Access-Control-Allow-Credentials: true
  // Access-Control-Allow-Origin: https://app.rehouser.co.nz
  // Connection: keep-alive
  // Content-Length: 893
  // Content-Type: application/json
  // Date: Mon, 22 Feb 2021 04:14:02 GMT
  // Server: Cowboy
  // Vary: Origin
  // Via: 1.1 vegur
  // X-Powered-By: Express

  ctx.request.headers["Access-Control-Allow-Credentials"] = true;
  ctx.request.headers["Access-Control-Allow-Origin"] =
    "https://app.rehouser.co.nz";
  ctx.request.headers["Server"] = "TronsServer";

  logger.log("info", `file API HEADERS`, {
    headers: ctx.request.headers
  });

  const cloudinaryUpload = async ({ stream }) => {
    try {
      await new Promise((resolve, reject) => {
        // const streamLoad = cloudinary.uploader.upload_stream(
        //   {
        //     type: data.type ? data.type : "upload"
        //     // access_mode: data.access_mode ? data.access_mode : "authenticated",
        //     // ...data,
        //     // folder: `${process.env.STAGE}/${data.folder}`,
        //   },
        //   function(error, result) {
        //     if (result) {
        //       logger.log("info", `FILE UPLOAD SUCCESS`, {
        //         result: result
        //       });
        //       resultObj = {
        //         ...result
        //       };
        //       resolve();
        //     } else {
        //       // logger.log("error", `file APi reject err: `, {
        //       //   message: error
        //       // });
        //       logger.log("info", `Debug: fileApi`, {
        //         tron: "error in the resolve for file",
        //         error: error
        //       });
        //       reject(error);
        //       throw new Error(`cloudinary.uploader.upload_stream error`);
        //     }
        //   }
        // );
        // stream.pipe(streamLoad);
        var upload_stream = cloudinary.uploader.upload_stream(
          { tags: "basic_sample" },
          function(err, image) {
            if (err) {
              reject(err);
            }
            resultObj = {
              ...image
            };
            resolve();
          }
        );
        // fs.createReadStream("./src/pizza.jpg").pipe(upload_stream);
        stream.pipe(upload_stream);
      });
    } catch (err) {
      logger.log("info", `File Upload Error`, {
        message: err.message
      });
      throw new Error(`caught error uploading to cloudinry`);
    }
  };

  await cloudinaryUpload({ stream });

  // Sync with Prisma
  const combinedFileData = {
    filename,
    mimetype,
    encoding,
    ...resultObj
  };

  // return file;
  const file = await ctx.db.mutation.createFile(
    {
      data: {
        ...combinedFileData,
        uploaderId: ctx.request.userId
      }
    },
    info
  );

  // const file = await ctx.db.mutation.createFile(
  //   {
  //     data: {
  //       filename,
  //       mimetype,
  //       encoding
  //     }
  //   },
  //   info
  // );

  return file;
};

exports.deleteFile = async ({ url, id, ctx }) => {
  try {
    cloudinary.config(cloudinaryConfObj);
    const cloudinaryFileKey = extractFileKey(url);
    await cloudinary.uploader.destroy(
      cloudinaryFileKey,
      { invalidate: true },
      async function(error, result) {
        if (result.result === "ok") {
          const where = { id: id };
          // return await ctx.db.mutation.deleteFile({ where }, `{ id }`);
        }
      }
    );
  } catch (err) {}
};

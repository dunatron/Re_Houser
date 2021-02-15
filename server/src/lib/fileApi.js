const cloudinary = require("cloudinary").v2;
const { extractFileKey } = require("./extractFileKey");
const { _isAdmin } = require("./permissionsCheck");

const logger = require("../middleware/loggers/logger");

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
    stream,
    createReadStream,
    filename,
    mimetype,
    encoding
  } = await upload;

  cloudinary.config(cloudinaryConfObj);
  let resultObj = {};

  console.log("SHOW ME THE FILE CTX headers => ", ctx.request.headers);
  // ctx.request.mode = "no-cors";
  // ctx.req.set("Content-Type", "text/html");
  // console.log("headers after mutation => ", ctx.request.headers);

  logger.log("info", `file API HEADERS`, {
    headers: ctx.request.headers
  });

  const cloudinaryUpload = async ({ stream }) => {
    try {
      await new Promise((resolve, reject) => {
        const streamLoad = cloudinary.uploader.upload_stream(
          {
            type: data.type ? data.type : "upload",
            access_mode: data.access_mode ? data.access_mode : "authenticated",
            ...data,
            folder: `${process.env.STAGE}/${data.folder}`
          },
          function(error, result) {
            if (result) {
              resultObj = {
                ...result
              };
              resolve();
            } else {
              // logger.log("error", `file APi reject err: `, {
              //   message: error
              // });
              // logger.log("info", `Debug: fileApi`, {
              //   tron: "error in the resolve for file"
              // });
              reject(error);
            }
          }
        );
        stream.pipe(streamLoad);
      });
    } catch (err) {
      logger.log("info", `File Upload Error`, {
        message: err.message
      });
      throw new Error(
        `Failed to upload item image ! Err:${
          err.message
        } headerson server: ${JSON.stringify(ctx.request.headers, null, 2)}`
      );
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

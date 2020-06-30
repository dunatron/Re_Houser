const cloudinary = require("cloudinary").v2;
const { extractFileKey } = require("./extractFileKey");

const cloudinaryConfObj = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};

exports.processUpload = async (upload, ctx, info) => {
  const {
    stream,
    createReadStream,
    filename,
    mimetype,
    encoding,
  } = await upload;

  cloudinary.config(cloudinaryConfObj);

  // I NEED TO KNOW MORE ABOUT THESE FILES TBH =>  {
  //   asset_id: '4ded126e36f3f2e1ab35b0d2449990af',
  //   public_id: 'yoccndmv76ah3grxfrfh',
  //   version: 1593524050,
  //   version_id: '8bbb46feb888a3bf16784c8c559fb2f5',
  //   signature: '960fc64ab34f795c72aa92db7ef7044050f22f96',
  //   width: 595,
  //   height: 842,
  //   format: 'pdf',
  //   resource_type: 'image',
  //   created_at: '2020-06-30T13:34:10Z',
  //   tags: [],
  //   pages: 1,
  //   bytes: 13264,
  //   type: 'upload',
  //   etag: '2942bfabb3d05332b66eb128e0842cff',
  //   placeholder: false,
  //   url: 'http://res.cloudinary.com/dkhe0hx1r/image/upload/v1593524050/yoccndmv76ah3grxfr
  //   secure_url: 'https://res.cloudinary.com/dkhe0hx1r/image/upload/v1593524050/yoccndmv76f',
  //   access_mode: 'public',
  //   original_filename: 'file'
  // }

  let resultUrl = "";
  let resultSecureUrl = "";
  let resultObj = {};
  const cloudinaryUpload = async ({ stream }) => {
    try {
      await new Promise((resolve, reject) => {
        const streamLoad = cloudinary.uploader.upload_stream(function(
          error,
          result
        ) {
          if (result) {
            console.log(
              "I NEED TO KNOW MORE ABOUT THESE FILES TBH => ",
              result
            );
            resultObj = {
              ...result,
            };
            resultUrl = result.secure_url;
            resultSecureUrl = result.secure_url;
            resolve(resultUrl);
          } else {
            reject(error);
          }
        });

        stream.pipe(streamLoad);
      });
    } catch (err) {
      throw new Error(`Failed to upload item image ! Err:${err.message}`);
    }
  };

  await cloudinaryUpload({ stream });

  const url = resultUrl;

  // Sync with Prisma
  const data = {
    filename,
    mimetype,
    encoding,
    url,
    ...resultObj,
  };

  // const { id } = await ctx.db.mutation.createFile({ data }, info);

  // const file = {
  //   id,
  //   filename,
  //   mimetype,
  //   encoding,
  //   url
  // };

  // return file;
  const file = await ctx.db.mutation.createFile({ data }, info);

  return file;
};

exports.deleteFile = async ({ url, id, ctx }) => {
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
};

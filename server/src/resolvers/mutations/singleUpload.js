const { processUpload, deleteFile } = require("../../lib/fileApi");
const logger = require("../../middleware/loggers/logger");

async function singleUpload(parent, { file, data }, ctx, info) {
  logger.log("info", `SINGLE UPLOAD HEADERS`, {
    headers: ctx.request.headers,
  });
  const uploadedFile = await processUpload({
    upload: file,
    ctx: ctx,
    info: info,
    data: data,
  });

  return uploadedFile;
}

module.exports = singleUpload;

const { processUpload, deleteFile } = require("../../lib/fileApi");

async function singleUpload(parent, { file }, ctx, info) {
  return await processUpload(await file, ctx);
}

module.exports = singleUpload;

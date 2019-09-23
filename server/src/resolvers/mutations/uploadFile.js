const { processUpload } = require("../../lib/fileApi");

async function uploadFile(parent, { file }, ctx, info) {
  return await processUpload(await file, ctx);
}

module.exports = uploadFile;
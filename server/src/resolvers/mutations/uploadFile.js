const { processUpload } = require("../../lib/fileApi");

async function uploadFile(parent, { file }, ctx, info) {
  return await processUpload({ upload: file, file, ctx, info });
}

module.exports = uploadFile;

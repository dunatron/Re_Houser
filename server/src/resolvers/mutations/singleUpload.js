const { processUpload, deleteFile } = require("../../lib/fileApi");

async function singleUpload(parent, { file, data }, ctx, info) {
  return await processUpload({
    upload: file,
    ctx,
    info,
    data,
  });
}

module.exports = singleUpload;

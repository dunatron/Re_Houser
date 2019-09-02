const { processUpload } = require("../../lib/fileApi");

async function uploadFiles(parent, { files }, ctx, info) {
  return Promise.all(files.map(file => processUpload(file, ctx)));
}

module.exports = uploadFiles;

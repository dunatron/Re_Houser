const { processUpload } = require("../../lib/fileApi");

async function uploadFiles(parent, { files }, ctx, info) {
  return Promise.all(
    files.map((file) => processUpload({ upload: file, ctx, info }))
  );
}

module.exports = uploadFiles;

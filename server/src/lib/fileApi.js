const cloudinary = require("cloudinary").v2
const { extractFileKey } = require("./extractFileKey")

const cloudinaryConfObj = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
}

exports.processUpload = async (upload, ctx) => {
  const {
    stream,
    createReadStream,
    filename,
    mimetype,
    encoding,
  } = await upload

  cloudinary.config(cloudinaryConfObj)

  let resultUrl = ""
  let resultSecureUrl = ""
  const cloudinaryUpload = async ({ stream }) => {
    try {
      await new Promise((resolve, reject) => {
        const streamLoad = cloudinary.uploader.upload_stream(function(
          error,
          result
        ) {
          if (result) {
            resultUrl = result.secure_url
            resultSecureUrl = result.secure_url
            resolve(resultUrl)
          } else {
            reject(error)
          }
        })

        stream.pipe(streamLoad)
      })
    } catch (err) {
      throw new Error(`Failed to upload item image ! Err:${err.message}`)
    }
  }

  await cloudinaryUpload({ stream })

  const url = resultUrl

  // Sync with Prisma
  const data = {
    filename,
    mimetype,
    encoding,
    url,
  }

  const { id } = await ctx.db.mutation.createFile({ data }, ` { id } `)

  const file = {
    id,
    filename,
    mimetype,
    encoding,
    url,
  }

  return file
}

exports.deleteFile = async ({ url, id, ctx }) => {
  cloudinary.config(cloudinaryConfObj)
  const cloudinaryFileKey = extractFileKey(url)
  cloudinary.uploader.destroy(
    cloudinaryFileKey,
    { invalidate: true },
    async function(error, result) {
      if (result.result === "ok") {
        const where = { id: id }
        return ctx.db.mutation.deleteFile({ where }, `{ id }`)
      }
    }
  )
}

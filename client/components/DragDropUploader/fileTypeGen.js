// https://www.freeformatter.com/mime-types-list.html
const textFiles = [
  {
    extension: ".rtf",
    mime: "text/rtf",
    documentKind: "rich text file",
    __type: "text",
  },
]

const imageFiles = [
  {
    extension: ".bmp",
    mime: "image/bmp",
    documentKind: "Bitmap Image File",
    __type: "image",
  },
  {
    extension: ".gif",
    mime: "image/gif",
    documentKind: "GIF images (lossless compression, superseded by PNG)",
    __type: "image",
  },

  {
    extension: ".jpg",
    mime: "image/jpeg",
    documentKind: "JPEG images",
    __type: "image",
  },
  {
    extension: ".png",
    mime: "image/png",
    documentKind: "Portable Network Graphics (PNG)",
    __type: "image",
  },
  {
    extension: ".png",
    mime: "image/x-citrix-png",
    documentKind: "Portable Network Graphics (PNG) (Citrix client)",
    __type: "image",
  },
  {
    extension: ".png",
    mime: "image/x-png",
    documentKind: "Portable Network Graphics (PNG) (x-token)",
    __type: "image",
  },
  {
    extension: ".svg",
    mime: "image/svg+xml",
    documentKind: "SVG images (vector images)",
    __type: "image",
  },
  {
    extension: ".ico",
    mime: "image/x-icon",
    documentKind: "Windows icon",
    __type: "image",
  },
  {
    extension: ".ico",
    mime: "image/vnd.microsoft.icon",
    documentKind: "Windows icon",
    __type: "image",
  },
]

const audioFiles = []

const videoFiles = [
  {
    extension: ".flv",
    mime: "video/x-flv",
    documentKind: "Flash",
    __type: "video",
  },
  {
    extension: ".mp4",
    mime: "video/mp4",
    documentKind: "MPEG-4",
    __type: "video",
  },
  {
    extension: ".m3u8",
    mime: "application/x-mpegURL",
    documentKind: "iPhone Index",
    __type: "video",
  },
  {
    extension: ".ts",
    mime: "video/MP2T",
    documentKind: "iPhone Segment",
    __type: "video",
  },
  {
    extension: ".3gp",
    mime: "video/3gpp",
    documentKind: "3GP Mobile",
    __type: "video",
  },
  {
    extension: ".mov",
    mime: "video/quicktime",
    documentKind: "QuickTime",
    __type: "video",
  },
  {
    extension: ".avi",
    mime: "video/x-msvideo",
    documentKind: "A/V Interleave",
    __type: "video",
  },
  {
    extension: ".wmv",
    mime: "video/x-ms-wmv",
    documentKind: "Windows Media",
    __type: "video",
  },
]

const applicationFiles = []

const FileTypesGenerator = (types, extensions) => {
  const allTypes = [
    ...textFiles,
    ...imageFiles,
    ...audioFiles,
    ...videoFiles,
    ...applicationFiles,
  ]
  // if types are provided filter by them
  const filteredTypes = types
    ? allTypes.filter(t => types.includes(t.__type))
    : allTypes
  // if extensions are provided filter by them
  const filteredExtensions = extensions
    ? filteredTypes.filter(ext => extensions.includes(ext.extension))
    : filteredTypes

  // Just return a list of allowed mimes
  const allowedMimeTypes = filteredExtensions.map(i => i.mime)

  return allowedMimeTypes
}

export default FileTypesGenerator

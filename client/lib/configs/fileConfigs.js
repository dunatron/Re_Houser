export const FILE_GENERAL_TYPE_IMAGE = 'image';
export const FILE_GENERAL_TYPE_DOCUMENT = 'document';

const FILE_TYPE_AAC_AUDIO = {
  extensions: ['aac'],
  kind: 'AAC audio',
  mimetype: 'audio/aac',
};

const FILE_TYPE_ABI_WORD_DOCUMENT = {
  extensions: ['abw'],
  kind: 'AbiWord document',
  mimetype: 'application/x-abiword',
};

const FILE_TYPE_ARCHIVE_DOCUMENT = {
  extensions: ['arc'],
  kind: 'Archive document (multiple files embedded)',
  mimetype: 'application/x-freearc',
};

const FILE_TYPE_AVI = {
  extensions: ['avi'],
  kind: 'AVI: Audio Video Interleave',
  mimetype: 'video/x-msvideo',
};

const FILE_TYPE_KINDLE_EBOOK = {
  extensions: ['azw'],
  kind: 'Amazon Kindle eBook format',
  mimetype: 'application/vnd.amazon.ebook',
};

const FILE_TYPE_BINARY_DATA = {
  extensions: ['bin'],
  kind: 'Any kind of binary data',
  mimetype: 'application/octet-stream',
};

const FILE_TYPE_WINDOWS_BITMAP = {
  extensions: ['bmp'],
  kind: 'Windows OS/2 Bitmap Graphics',
  mimetype: 'image/bmp',
};

const FILE_TYPE_BZIP_ARCHIVE = {
  extensions: ['bz'],
  kind: 'BZip archive',
  mimetype: 'application/x-bzip',
};

const FILE_TYPE_BZIP2_ARCHIVE = {
  extensions: ['bz2'],
  kind: 'BZip2 archive',
  mimetype: 'application/x-bzip2',
};

const FILE_TYPE_SHEEL_SCRIPT = {
  extensions: ['csh'],
  kind: 'C-Shell script',
  mimetype: 'application/x-csh',
};

const FILE_TYPE_CSS = {
  extensions: ['css'],
  kind: 'Cascading Style Sheets (CSS)',
  mimetype: 'text/css',
};

const FILE_TYPE_CSV = {
  extensions: ['csv'],
  kind: 'Comma-separated values (CSV)',
  mimetype: 'text/csv',
};

const FILE_TYPE_MICROSOFT_WORD = {
  extensions: ['doc'],
  kind: 'Microsoft Word',
  mimetype: 'application/msword',
};

const FILE_TYPE_MICROSOFT_WORD_X = {
  extensions: ['docx'],
  kind: 'Microsoft Word (OpenXML)',
  mimetype:
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

const FILE_TYPE_MS_EMBEDDED_OPEN_TYPE = {
  extensions: ['eot'],
  kind: 'MS Embedded OpenType fonts',
  mimetype: 'application/vnd.ms-fontobject',
};

const FILE_TYPE_ELECTRONIC_PUBLICATION = {
  extensions: ['epub'],
  kind: 'Electronic publication (EPUB)',
  mimetype: 'application/epub+zip',
};

const FILE_TYPE_COMPRESSED_ARCHIVE = {
  extensions: ['gz'],
  kind: 'GZip Compressed Archive',
  mimetype: 'application/gzip',
};

const FILE_TYPE_GIF = {
  extensions: ['gif'],
  kind: 'Graphics Interchange Format (GIF)',
  mimetype: 'image/gif',
};

const FILE_TYPE_HTML = {
  extensions: ['htm', 'html'],
  kind: 'HyperText Markup Language (HTML)',
  mimetype: 'text/html',
};

const FILE_TYPE_ICON = {
  extensions: ['ico'],
  kind: 'Icon format',
  mimetype: 'image/vnd.microsoft.icon',
};

const FILE_TYPE_I_CALENDAR = {
  extensions: ['ics'],
  kind: 'iCalendar format',
  mimetype: 'text/calendar',
};

const FILE_TYPE_JAVA_ARCHIVE = {
  extensions: ['jar'],
  kind: 'Java Archive (JAR)',
  mimetype: 'application/java-archive',
};

const FILE_TYPE_JPEG = {
  extensions: ['jpeg', 'jpg'],
  kind: 'JPEG images',
  mimetype: 'image/jpeg',
};

const FILE_TYPE_JAVASCRIPT = {
  extensions: ['js'],
  kind: 'JavaScript',
  mimetype: 'text/javascript',
};

const FILE_TYPE_JSON = {
  extensions: ['json'],
  kind: 'JSON format',
  mimetype: 'application/json',
};

const FILE_TYPE_JSON_LD = {
  extensions: ['jsonld'],
  kind: 'JSON-LD format',
  mimetype: 'application/ld+json',
};

const FILE_TYPE_MUSICAL_INSTRUMENT_DIGITAL_INTERFACE = {
  extensions: ['mid', 'midi'],
  kind: 'Musical Instrument Digital Interface (MIDI)',
  mimetype: 'audio/midi',
};

const FILE_TYPE_JS_MODULE = {
  extensions: ['mjs'],
  kind: 'JavaScript module',
  mimetype: 'text/javascript',
};

const FILE_TYPE_MP3 = {
  extensions: ['mp3'],
  kind: 'MP3 audio',
  mimetype: 'audio/mpeg',
};

const FILE_TYPE_MPEG_VIDEO = {
  extensions: ['mpeg'],
  kind: 'MPEG Video',
  mimetype: 'video/mpeg',
};

const FILE_TYPE_APPLE_INSTALLER_PKG = {
  extensions: ['mpkg'],
  kind: 'Apple Installer Package',
  mimetype: 'application/vnd.apple.installer+xml',
};

const FILE_TYPE_OPEN_DOC_PRESENTATION = {
  extensions: ['odp'],
  kind: 'OpenDocument presentation document',
  mimetype: 'application/vnd.oasis.opendocument.presentation',
};

const FILE_TYPE_OPEN_DOC_SPREADSHEET = {
  extensions: ['ods'],
  kind: 'OpenDocument spreadsheet document',
  mimetype: 'application/vnd.oasis.opendocument.spreadsheet',
};

const FILE_TYPE_OPEN_DOC_TEXT = {
  extensions: ['odt'],
  kind: 'OpenDocument text document',
  mimetype: 'application/vnd.oasis.opendocument.text',
};

const FILE_TYPE_OGG_AUDIO = {
  extensions: ['oga'],
  kind: 'OGG audio',
  mimetype: 'audio/ogg',
};

const FILE_TYPE_OGG_VIDEO = {
  extensions: ['ogv'],
  kind: 'OGG video',
  mimetype: 'video/ogg',
};

const FILE_TYPE_OGG_APPLICATION = {
  extensions: ['ogx'],
  kind: 'OGG',
  mimetype: 'application/ogg',
};

const FILE_TYPE_OPUS_AUDIO = {
  extensions: ['opus'],
  kind: 'Opus audio',
  mimetype: 'audio/opus',
};

const FILE_TYPE_OPENTYPE_FONT = {
  extensions: ['otf'],
  kind: 'OpenType font',
  mimetype: 'font/otf',
};

const FILE_TYPE_PNG = {
  extensions: ['png'],
  kind: 'Portable Network Graphics',
  mimetype: 'image/png',
};

const FILE_TYPE_PDF = {
  extensions: ['pdf'],
  kind: 'Adobe Portable Document Format (PDF)',
  mimetype: 'application/pdf',
};

const FILE_TYPE_PHP = {
  extensions: ['php'],
  kind: 'Hypertext Preprocessor (Personal Home Page)',
  mimetype: 'application/x-httpd-php',
};

const FILE_TYPE_MS_POWERPOINT = {
  extensions: ['ppt'],
  kind: 'Microsoft PowerPoint',
  mimetype: 'application/vnd.ms-powerpoint',
};

const FILE_TYPE_MS_POWERPOINT_XML = {
  extensions: ['pptx'],
  kind: 'Microsoft PowerPoint (OpenXML)',
  mimetype:
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
};

const FILE_TYPE_RAR_ARCHIVE = {
  extensions: ['rar'],
  kind: 'RAR archive',
  mimetype: 'application/vnd.rar',
};

const FILE_TYPE_RICH_TEXT_FORMAT = {
  extensions: ['rtf'],
  kind: 'Rich Text Format (RTF)',
  mimetype: 'application/rtf',
};

const FILE_TYPE_SHELL_SCRIPT = {
  extensions: ['sh'],
  kind: 'Bourne shell script',
  mimetype: 'application/x-sh',
};

const FILE_TYPE_SVG = {
  extensions: ['svg'],
  kind: 'Scalable Vector Graphics (SVG)',
  mimetype: 'image/svg+xml',
};

const FILE_TYPE_ADOBE_FLASH_DOCUMENT = {
  extensions: ['swf'],
  kind: 'Small web format (SWF) or Adobe Flash document',
  mimetype: 'application/x-shockwave-flash',
};

const FILE_TYPE_TAPE_ARCHIVE = {
  extensions: ['tar'],
  kind: 'Tape Archive (TAR)',
  mimetype: 'application/x-tar',
};

const FILE_TYPE_TAGGED_IMAGE_FILE = {
  extensions: ['tif', 'tiff'],
  kind: 'Tagged Image File Format (TIFF)',
  mimetype: 'image/tiff',
};

const FILE_TYPE_MPEG_TRANSPORT_STREAM = {
  extensions: ['ts'],
  kind: 'MPEG transport stream',
  mimetype: 'video/mp2t',
};

const FILE_TYPE_TRUE_TYPE_FONT = {
  extensions: ['ttf'],
  kind: 'TrueType Font',
  mimetype: 'font/ttf',
};

const FILE_TYPE_TEXT = {
  extensions: ['txt'],
  kind: 'Text, (generally ASCII or ISO 8859-n)',
  mimetype: 'text/plain',
};

const FILE_TYPE_MS_VISIO = {
  extensions: ['vsd'],
  kind: 'Microsoft Visio',
  mimetype: 'application/vnd.visio',
};

const FILE_TYPE_WAV_AUDIO = {
  extensions: ['wav'],
  kind: 'Waveform Audio Format',
  mimetype: 'audio/wav',
};

const FILE_TYPE_WEBM_AUDIO = {
  extensions: ['weba'],
  kind: 'WEBM audio',
  mimetype: 'audio/webm',
};

const FILE_TYPE_WEBM_VIDEO = {
  extensions: ['webm'],
  kind: 'WEBM video',
  mimetype: 'video/webm',
};

const FILE_TYPE_WEBP_IMAGE = {
  extensions: ['webp'],
  kind: 'WEBP image',
  mimetype: 'image/webp',
};

const FILE_TYPE_WEB_OPEN_FONT_FORMAT = {
  extensions: ['woff'],
  kind: 'Web Open Font Format (WOFF)',
  mimetype: 'font/woff',
};

const FILE_TYPE_WEB_OPEN_FONT_FORMAT_2 = {
  extensions: ['woff2'],
  kind: 'Web Open Font Format (WOFF)',
  mimetype: 'font/woff2',
};

const FILE_TYPE_XHTML = {
  extensions: ['xhtml'],
  kind: 'XHTML',
  mimetype: 'application/xhtml+xml',
};

const FILE_TYPE_MS_EXCEL = {
  extensions: ['xls'],
  kind: 'Microsoft Excel',
  mimetype: 'application/vnd.ms-excel',
};

const FILE_TYPE_MS_EXCEL_XML = {
  extensions: ['xlsx'],
  kind: 'Microsoft Excel (OpenXML)',
  mimetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
};

const FILE_TYPE_XML = {
  extensions: ['xml'],
  kind: 'XML',
  mimetype: 'application/xml',
};

const FILE_TYPE_XUL = {
  extensions: ['xul'],
  kind: 'XUL',
  mimetype: 'application/vnd.mozilla.xul+xml',
};

const FILE_TYPE_ZIP_ARCHIVE = {
  extensions: ['zip'],
  kind: 'ZIP archive',
  mimetype: 'application/zip',
};

const FILE_TYPE_3GPP_AUDIO_VIDEO = {
  extensions: ['3gp'],
  kind: '3GPP audio/video container',
  mimetype: 'video/3gpp',
};

const FILE_TYPE_3GPP_AUDIO = {
  extensions: ['3gp'],
  kind: '3GPP audio/video container',
  mimetype: 'audio/3gpp',
};

const FILE_TYPE_3GPP2_AUDIO_VIDEO = {
  extensions: ['3g2'],
  kind: '3GPP2 audio/video container',
  mimetype: 'video/3gpp2',
};

const FILE_TYPE_3GPP2_AUDIO = {
  extensions: ['3g2'],
  kind: '3GPP2 audio/video container',
  mimetype: 'audio/3gpp2',
};

const FILE_TYPE_7_ARCHIVE = {
  extensions: ['7z'],
  kind: '7-zip archive',
  mimetype: 'application/x-7z-compressed',
};

export const DEFAULT_IMAGE_FILES = [
  FILE_TYPE_GIF,
  FILE_TYPE_ICON,
  FILE_TYPE_JPEG,
  FILE_TYPE_PNG,
  FILE_TYPE_SVG,
  FILE_TYPE_TAGGED_IMAGE_FILE,
  FILE_TYPE_WEBP_IMAGE,
];

export const DEFAULT_DOCUMENT_FILES = [
  FILE_TYPE_ABI_WORD_DOCUMENT,
  FILE_TYPE_MICROSOFT_WORD,
  FILE_TYPE_MICROSOFT_WORD_X,
  FILE_TYPE_OPEN_DOC_PRESENTATION,
  FILE_TYPE_OPEN_DOC_SPREADSHEET,
  FILE_TYPE_OPEN_DOC_TEXT,
  FILE_TYPE_PDF,
  FILE_TYPE_RICH_TEXT_FORMAT,
  FILE_TYPE_TEXT,
  FILE_TYPE_XHTML,
  FILE_TYPE_MS_EXCEL,
  FILE_TYPE_XML,
];

export const ALL_FILE_TYPES = [
  FILE_TYPE_AAC_AUDIO,
  FILE_TYPE_ABI_WORD_DOCUMENT,
  FILE_TYPE_ARCHIVE_DOCUMENT,
  FILE_TYPE_AVI,
  FILE_TYPE_KINDLE_EBOOK,
  FILE_TYPE_BINARY_DATA,
  FILE_TYPE_WINDOWS_BITMAP,
  FILE_TYPE_BZIP_ARCHIVE,
  FILE_TYPE_BZIP2_ARCHIVE,
  FILE_TYPE_SHEEL_SCRIPT,
  FILE_TYPE_CSS,
  FILE_TYPE_CSV,
  FILE_TYPE_MICROSOFT_WORD,
  FILE_TYPE_MICROSOFT_WORD_X,
  FILE_TYPE_MS_EMBEDDED_OPEN_TYPE,
  FILE_TYPE_ELECTRONIC_PUBLICATION,
  FILE_TYPE_COMPRESSED_ARCHIVE,
  FILE_TYPE_GIF,
  FILE_TYPE_HTML,
  FILE_TYPE_ICON,
  FILE_TYPE_I_CALENDAR,
  FILE_TYPE_JAVA_ARCHIVE,
  FILE_TYPE_JPEG,
  FILE_TYPE_JAVASCRIPT,
  FILE_TYPE_JSON,
  FILE_TYPE_JSON_LD,
  FILE_TYPE_MUSICAL_INSTRUMENT_DIGITAL_INTERFACE,
  FILE_TYPE_JS_MODULE,
  FILE_TYPE_MP3,
  FILE_TYPE_MPEG_VIDEO,
  FILE_TYPE_APPLE_INSTALLER_PKG,
  FILE_TYPE_OPEN_DOC_PRESENTATION,
  FILE_TYPE_OPEN_DOC_SPREADSHEET,
  FILE_TYPE_OPEN_DOC_TEXT,
  FILE_TYPE_OGG_AUDIO,
  FILE_TYPE_OGG_VIDEO,
  FILE_TYPE_OGG_APPLICATION,
  FILE_TYPE_OPUS_AUDIO,
  FILE_TYPE_OPENTYPE_FONT,
  FILE_TYPE_PNG,
  FILE_TYPE_PDF,
  FILE_TYPE_PHP,
  FILE_TYPE_MS_POWERPOINT,
  FILE_TYPE_MS_POWERPOINT_XML,
  FILE_TYPE_RAR_ARCHIVE,
  FILE_TYPE_RICH_TEXT_FORMAT,
  FILE_TYPE_SHELL_SCRIPT,
  FILE_TYPE_SVG,
  FILE_TYPE_ADOBE_FLASH_DOCUMENT,
  FILE_TYPE_TAPE_ARCHIVE,
  FILE_TYPE_TAGGED_IMAGE_FILE,
  FILE_TYPE_MPEG_TRANSPORT_STREAM,
  FILE_TYPE_TRUE_TYPE_FONT,
  FILE_TYPE_TEXT,
  FILE_TYPE_MS_VISIO,
  FILE_TYPE_WAV_AUDIO,
  FILE_TYPE_WEBM_AUDIO,
  FILE_TYPE_WEBM_VIDEO,
  FILE_TYPE_WEBP_IMAGE,
  FILE_TYPE_WEB_OPEN_FONT_FORMAT,
  FILE_TYPE_WEB_OPEN_FONT_FORMAT_2,
  FILE_TYPE_XHTML,
  FILE_TYPE_MS_EXCEL,
  FILE_TYPE_MS_EXCEL_XML,
  FILE_TYPE_XML,
  FILE_TYPE_XUL,
  FILE_TYPE_ZIP_ARCHIVE,
  FILE_TYPE_3GPP_AUDIO_VIDEO,
  FILE_TYPE_3GPP_AUDIO,
  FILE_TYPE_3GPP2_AUDIO_VIDEO,
  FILE_TYPE_3GPP2_AUDIO,
  FILE_TYPE_7_ARCHIVE,
];

export const findGenericFileType = file => {
  if (!file) return FILE_GENERAL_TYPE_DOCUMENT;
  if (DEFAULT_IMAGE_FILES.map(t => t.mimetype).includes(file.mimetype))
    return FILE_GENERAL_TYPE_IMAGE;
  if (DEFAULT_DOCUMENT_FILES.map(t => t.mimetype).includes(file.mimetype))
    return FILE_GENERAL_TYPE_DOCUMENT;
};

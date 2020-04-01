const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-components-alert-mdx": hot(preferDefault(require("C:\\Users\\heath\\Projects\\rehouser\\docz\\src\\components\\Alert.mdx"))),
  "component---readme-md": hot(preferDefault(require("C:\\Users\\heath\\Projects\\rehouser\\docz\\README.md"))),
  "component---src-index-mdx": hot(preferDefault(require("C:\\Users\\heath\\Projects\\rehouser\\docz\\src\\index.mdx"))),
  "component---src-components-button-mdx": hot(preferDefault(require("C:\\Users\\heath\\Projects\\rehouser\\docz\\src\\components\\Button.mdx"))),
  "component---src-pages-404-js": hot(preferDefault(require("C:\\Users\\heath\\Projects\\rehouser\\docz\\.docz\\src\\pages\\404.js")))
}


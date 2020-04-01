// prefer default export if available
const preferDefault = m => m && m.default || m

exports.components = {
  "component---src-components-alert-mdx": () => import("./../../src/components/Alert.mdx" /* webpackChunkName: "component---src-components-alert-mdx" */),
  "component---readme-md": () => import("./../../README.md" /* webpackChunkName: "component---readme-md" */),
  "component---src-index-mdx": () => import("./../../src/index.mdx" /* webpackChunkName: "component---src-index-mdx" */),
  "component---src-components-button-mdx": () => import("./../../src/components/Button.mdx" /* webpackChunkName: "component---src-components-button-mdx" */),
  "component---src-pages-404-js": () => import("./../src/pages/404.js" /* webpackChunkName: "component---src-pages-404-js" */)
}


// prefer default export if available
const preferDefault = m => m && m.default || m

exports.components = {
  "component---cache-dev-404-page-js": () => import("./dev-404-page.js" /* webpackChunkName: "component---cache-dev-404-page-js" */),
  "component---components-forms-forms-md": () => import("./../../components/Forms/Forms.md" /* webpackChunkName: "component---components-forms-forms-md" */),
  "component---components-super-table-super-table-md": () => import("./../../components/SuperTable/SuperTable.md" /* webpackChunkName: "component---components-super-table-super-table-md" */),
  "component---src-pages-404-js": () => import("./../src/pages/404.js" /* webpackChunkName: "component---src-pages-404-js" */)
}


const { mergeWith } = require('lodash/fp')
const fs = require('fs-extra')

let custom = {}
const hasGatsbyConfig = fs.existsSync('./gatsby-config.custom.js')

if (hasGatsbyConfig) {
  try {
    custom = require('./gatsby-config.custom')
  } catch (err) {
    console.error(
      `Failed to load your gatsby-config.js file : `,
      JSON.stringify(err),
    )
  }
}

const config = {
  pathPrefix: '/',

  siteMetadata: {
    title: 'Rehouser Client',
    description: 'a tenancy solution via software',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-docz',
      options: {
        themeConfig: {},
        themesDir: 'src',
        mdxExtensions: ['.md', '.mdx'],
        docgenConfig: {},
        menu: [],
        mdPlugins: [],
        hastPlugins: [],
        ignore: [],
        typescript: false,
        ts: false,
        propsParser: true,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: false,
        o: false,
        open: false,
        'open-browser': false,
        root: 'C:\\Users\\heath\\Projects\\rehouser\\client\\.docz',
        base: '/',
        source: './',
        src: './',
        files: '**/*.{md,markdown,mdx}',
        public: '/public',
        dest: '.docz/dist',
        d: '.docz/dist',
        editBranch: 'master',
        eb: 'master',
        'edit-branch': 'master',
        config: '',
        title: 'Rehouser Client',
        description: 'a tenancy solution via software',
        host: 'localhost',
        port: 3000,
        p: 3000,
        separator: '-',
        paths: {
          root: 'C:\\Users\\heath\\Projects\\rehouser\\client',
          templates:
            'C:\\Users\\heath\\Projects\\rehouser\\client\\node_modules\\docz-core\\dist\\templates',
          docz: 'C:\\Users\\heath\\Projects\\rehouser\\client\\.docz',
          cache: 'C:\\Users\\heath\\Projects\\rehouser\\client\\.docz\\.cache',
          app: 'C:\\Users\\heath\\Projects\\rehouser\\client\\.docz\\app',
          appPackageJson:
            'C:\\Users\\heath\\Projects\\rehouser\\client\\package.json',
          gatsbyConfig:
            'C:\\Users\\heath\\Projects\\rehouser\\client\\gatsby-config.js',
          gatsbyBrowser:
            'C:\\Users\\heath\\Projects\\rehouser\\client\\gatsby-browser.js',
          gatsbyNode:
            'C:\\Users\\heath\\Projects\\rehouser\\client\\gatsby-node.js',
          gatsbySSR:
            'C:\\Users\\heath\\Projects\\rehouser\\client\\gatsby-ssr.js',
          importsJs:
            'C:\\Users\\heath\\Projects\\rehouser\\client\\.docz\\app\\imports.js',
          rootJs:
            'C:\\Users\\heath\\Projects\\rehouser\\client\\.docz\\app\\root.jsx',
          indexJs:
            'C:\\Users\\heath\\Projects\\rehouser\\client\\.docz\\app\\index.jsx',
          indexHtml:
            'C:\\Users\\heath\\Projects\\rehouser\\client\\.docz\\app\\index.html',
          db:
            'C:\\Users\\heath\\Projects\\rehouser\\client\\.docz\\app\\db.json',
        },
      },
    },
  ],
}

const merge = mergeWith((objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
})

module.exports = merge(config, custom)

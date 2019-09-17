const { parsed: localEnv } = require("dotenv").config()

module.exports = {
  // https://nextjs.org/docs#customizing-webpack-config
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config

    // read .env environment variables
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv))
    return config
  },
  webpackDevMiddleware: config => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config
  },
}

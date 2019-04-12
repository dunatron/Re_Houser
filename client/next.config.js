// https://github.com/webpack-contrib/style-loader
module.exports = {
  target: "serverless",
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config

    // Example using webpack option
    // config.plugins.push(new webpack.IgnorePlugin(//__tests__//));
    // config.module.rules.push({
    //   test: /.mdx/,
    //   use: [
    //     options.defaultLoaders.babel,
    //     {
    //       loader: "@mdx-js/loader",
    //       options: pluginOptions.options,
    //     },
    //   ],
    // })
    config.module.rules.push({
      test: /\.css$/,
      use: [{ loader: "style-loader" }, { loader: "css-loader" }],
    })
    return config
  },
  webpackDevMiddleware: config => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config
  },
}

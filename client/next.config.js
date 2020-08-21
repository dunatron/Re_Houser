const { parsed: localEnv } = require('dotenv').config();
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
/**
 * NOTES
 * - For testing use this for recaptcha site key 6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
 */
// module.exports = {
//   // https://nextjs.org/docs#customizing-webpack-config
//   webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
//     // Note: we provide webpack above so you should not `require` it
//     // Perform customizations to webpack config
//     // Important: return the modified config

//     config.resolve.alias = {
//       ...(config.resolve.alias || {}),
//       // Transform all direct `react-native` imports to `react-native-web`
//       'react-native$': 'react-native-web',
//       // 'react-native-gifted-chat': 'react-native-web',
//     };
//     config.resolve.extensions = [
//       '.web.js',
//       '.web.ts',
//       '.web.tsx',
//       ...config.resolve.extensions,
//     ];
//     // read .env environment variables
//     config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
//     return config;
//   },
//   webpackDevMiddleware: config => {
//     // Perform customizations to webpack dev middleware config
//     // Important: return the modified config
//     return config;
//   },
//   env: {
//     STRIPE_KEY: process.env.STRIPE_KEY,
//     GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
//     GOOGLE_RECAPTCHA_SITE_KEY: process.env.GOOGLE_RECAPTCHA_SITE_KEY,
//     FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
//     FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET,
//     ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
//     ALGOLIA_API_KEY: process.env.ALGOLIA_API_KEY,
//   },
// };

// uncomment to see bundle and run yarn package commande or figure out how to make it work proper
// module.exports = withBundleAnalyzer({});

const withTM = require('next-transpile-modules')([
  'react-native-gifted-chat',
  'react-native-lightbox',
  'react-native-parsed-text',
  'react-native-typing-animation',
  'react-native-communications',
  'react-native-iphone-x-helper',
  '@expo/react-native-action-sheet',
  'react-native',
]);

module.exports = withTM({
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Transform all direct `react-native` imports to `react-native-web`
      'react-native$': 'react-native-web',
      // 'react-native-gifted-chat': 'react-native-web',
    };
    config.resolve.extensions = [
      '.web.js',
      '.web.ts',
      '.web.tsx',
      ...config.resolve.extensions,
    ];
    // read .env environment variables
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
    return config;
  },
  webpackDevMiddleware: config => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  },
  env: {
    STRIPE_KEY: process.env.STRIPE_KEY,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    GOOGLE_RECAPTCHA_SITE_KEY: process.env.GOOGLE_RECAPTCHA_SITE_KEY,
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
    FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET,
    ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
    ALGOLIA_API_KEY: process.env.ALGOLIA_API_KEY,
  },
});

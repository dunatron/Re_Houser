const { parsed: localEnv } = require('dotenv').config();
const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
/**
 * NOTES
 * - For testing use this for recaptcha site key 6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
 */
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
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
    console.log('Webpack environment => ', dev);
    const absolutePaths = dev
      ? {}
      : {
          '@/Components': path.resolve(__dirname, 'components/'),
          '@/AdminComponents': path.resolve(__dirname, 'admin-components/'),
          '@/Containers': path.resolve(__dirname, 'containers/'),
          '@/Styles': path.resolve(__dirname, 'admin-components/'),
          '@/Lib': path.resolve(__dirname, 'lib/'),
          '@/Gql': path.resolve(__dirname, 'graphql/'),
          '@/Store': path.resolve(__dirname, 'store/'),
          '@/Recoil': path.resolve(__dirname, 'recoil/'),
          '@/Themes': path.resolve(__dirname, 'themes/'),
        };

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      ...absolutePaths,
      'react-native$': 'react-native-web',
    };
    config.resolve.extensions = [
      '.web.js',
      '.web.ts',
      '.web.tsx',
      ...config.resolve.extensions,
    ];
    // read .env environment variables
    // config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
    return config;
  },
  webpackDevMiddleware: config => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  },
  env: {
    STAGE: process.env.STAGE,
    ENDPOINT: process.env.ENDPOINT,
    WS_ENDPOINT: process.env.WS_ENDPOINT,
    STRIPE_KEY: process.env.STRIPE_KEY,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    GOOGLE_RECAPTCHA_SITE_KEY: process.env.GOOGLE_RECAPTCHA_SITE_KEY,
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
    FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET,
    ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
    ALGOLIA_API_KEY: process.env.ALGOLIA_API_KEY,
  },
});

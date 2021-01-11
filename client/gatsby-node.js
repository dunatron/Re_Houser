// gatsby-node.js
const path = require('path');

// flags: {
//   PRESERVE_WEBPACK_CACHE: true,
// }
exports.onCreateWebpackConfig = args => {
  args.actions.setWebpackConfig({
    resolve: {
      // ⚠ Note the '..' in the path because the docz gatsby project lives in the `.docz` directory
      modules: [path.resolve(__dirname, '../src'), 'node_modules'],
      alias: {
        '@/Components': path.resolve(__dirname, '../components/'),
        '@/AdminComponents': path.resolve(__dirname, '../admin-components/'),
        '@/Containers': path.resolve(__dirname, '../containers/'),
        '@/Styles': path.resolve(__dirname, '../styles/'),
        '@/Lib': path.resolve(__dirname, '../lib/'),
        '@/Gql': path.resolve(__dirname, '../graphql/'),
        '@/Store': path.resolve(__dirname, '../store/'),
        '@/Recoil': path.resolve(__dirname, '../recoil/'),
        '@/Themes': path.resolve(__dirname, '../themes/'),
      },
    },
  });
};

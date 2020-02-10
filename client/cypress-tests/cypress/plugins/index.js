const fs = require('fs');
const path = require('path');

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
};

module.exports = (on, config) => {
  on('task', {
    getSchema() {
      // return fs.readFileSync(
      //   path.resolve(__dirname, '../../../../server/src/schema.graphql'),
      //   'utf8'
      // );
      return fs.readFileSync(
        path.resolve(
          __dirname,
          '../../../../server/src/generated/prisma.graphql'
        ),
        'utf8'
      );
    },
  });
};

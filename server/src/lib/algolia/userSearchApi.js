require("dotenv").config({ path: "./variables.env" });
const algoliasearch = require("algoliasearch");
const moment = require("moment");

const client = algoliasearch(
  process.env.ALGOLIA_APPLICATION_ID,
  process.env.ALGOLIA_API_KEY,
  {
    timeout: 4000
  }
);

const index = client.initIndex(`${process.env.SEARCH_STAGE}_UserSearch`);

const addUserSearchNode = async function({ userId, db }) {
  const user = await db.query.user(
    {
      where: {
        id: userId
      }
    },
    `{id, email, firstName, lastName, profilePhoto{url} permissions }`
  );
  const usersObjectArr = [];

  const userObject = {
    objectID: user.id,
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    profilePhoto: user.profilePhoto ? { url: user.profilePhoto.url } : null,
    permissions: user.permissions
  };

  usersObjectArr.push(userObject);
  index.addObjects(usersObjectArr).catch(e => {
    console.log("Error adding property to algolia: ", e);
  });

  return "ALL DONE HERE BRO";
};

const updateUserSearchNode = async function({ updates, userId, ctx }) {
  var profilePhotoUpdate = false;

  const user = await ctx.db.query.user(
    {
      where: {
        id: userId
      }
    },
    `{ id profilePhoto {id url}}`
  );

  // This is just for files changes. If any file gets updated. get all the files and update them
  if (updates.data.profilePhoto) {
    profilePhotoUpdate = true;
    delete updates.data.profilePhoto;
  }

  const objects = [
    {
      ...updates.data,
      objectID: userId,
      ...(profilePhotoUpdate && {
        profilePhoto: {
          url: user.profilePhoto.url
        }
      })
    }
  ];

  index.partialUpdateObjects(objects, (err, content) => {
    if (err) throw err;
  });
  return "All done with search node updates";
};

module.exports = {
  addUserSearchNode,
  updateUserSearchNode
};

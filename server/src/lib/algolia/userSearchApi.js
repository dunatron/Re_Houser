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

const index = client.initIndex(`${process.env.STAGE}_UserSearch`);

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

const updateUserSearchNode = async function({ updates, propertyId, ctx }) {
  var imageUrls;
  // var imagesAltered = updates.data.images ? true : false;
  var imagesAltered = false;
  if (updates.data.images) {
    if (updates.data.images.disconnect) {
      imagesAltered = true;
    }
    if (updates.data.images.connect) {
      imagesAltered = true;
    }
    if (updates.data.images.connect) {
      imagesAltered = true;
    }
  }

  // db update runs before this so we just get the images and update the urls for algolia
  if (imagesAltered) {
    delete updates.data.images;
    const propertyImages = await ctx.db.query.property(
      {
        where: {
          id: propertyId
        }
      },
      `{ id images {id url}}`
    );
    imageUrls = propertyImages.images.map(img => img.url);
  }

  const objects = [
    {
      ...updates.data,
      objectID: propertyId,
      ...(imagesAltered && { imageUrls: imageUrls })
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

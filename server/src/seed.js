//seed.js
const db = require("./db");
const seeds = require("./seeds/index");
const { addPropertySearchNode } = require("./lib/algolia/propertySearchApi");
const bcrypt = require("bcryptjs");

// const { userList, propertiesList } = require("./seedData");
const { imagesList, userList, propertiesList } = seeds;

async function main() {
  // createImages
  imagesList.forEach(async img => {
    await db.mutation.createFile({
      data: { ...img }
    });
  });

  // create users
  userList.forEach(async user => {
    const password = await bcrypt.hash(user.password, 10);
    await db.mutation.createUser({
      data: { ...user, password: password }
    });
  });

  // createProperties
  propertiesList.forEach(async property => {
    const res = await db.mutation.createProperty({
      data: { ...property }
    });
    //updates, propertyId
    await addPropertySearchNode({
      propertyId: res.id,
      db: db
    });
  });
}

// await db.mutation.createCountry({
//   data: {
//     name: "Spain",
//     image: "https://res.cloudinary.com/...",
//     cities: {
//       create: spainCities
//     }
//   }
// });

// main().catch(e => console.error(e));
main().catch(e => console.log(e));

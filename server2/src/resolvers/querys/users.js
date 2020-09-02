// async function users(parent, args, ctx, info) {
//   console.log("parent => ", parent);
//   console.log("args => ", args);
//   console.log("ctx => ", ctx);
//   console.log("info => ", info);

//   const users = await ctx.db.query.users(
//     {
//       ...args
//     },
//     info
//   );

//   console.log("users => ", users);

//   return [];
//   // return ctx.db.query.users(
//   //   {
//   //     ...args
//   //   },
//   //   info
//   // );
// }

// module.exports = users;

async function users(info, args, ctx) {
  // console.log("parent => ", parent);
  console.log("args => ", args);
  console.log("ctx => ", ctx);
  console.log("info => ", info);

  const users = await ctx.db.query.users(
    {
      ...args
    },
    info
  );

  console.log("users => ", users);

  return [];
  // return ctx.db.query.users(
  //   {
  //     ...args
  //   },
  //   info
  // );
}

module.exports = users;

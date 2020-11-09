const testMe = async user => {
  return user.firstname.test;
  return;
};

async function asyncCrashMe(parent, args, ctx, info) {
  // const user = await ctx.db.query.user({
  //   where: {
  //     // id: "690000"
  //   }
  // });
  // return user;
  testMe();
  return {
    __typename: "User",
    id: 1,
    firstName: "TEst CRash"
  };
}

module.exports = asyncCrashMe;

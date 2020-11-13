const { updateUserSearchNode } = require("../../lib/algolia/userSearchApi");
const { createActivity } = require("../../lib/createActivity");

async function updateUser(parent, { data, where }, ctx, info) {
  const requestUserId = ctx.request.userId;

  const userData = {
    ...data,
  };
  const updatedUser = await ctx.db.mutation.updateUser(
    { data: userData, where: { ...where } },
    info
  );

  const userSearchNode = await updateUserSearchNode({
    updates: {
      data: userData,
    },
    userId: where.id,
    ctx,
  });

  console.log("userSearchNode => ", userSearchNode);

  return updatedUser;
}

module.exports = updateUser;

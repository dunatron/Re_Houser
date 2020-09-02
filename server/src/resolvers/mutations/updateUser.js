async function updateUser(parent, { data, photoFile }, ctx, info) {
  const userData = {
    ...data,
  };
  const updatedUser = await ctx.db.mutation.updateUser(
    { data: userData, where: { id: ctx.request.userId } },
    info
  );
  return updatedUser;
}

module.exports = updateUser;

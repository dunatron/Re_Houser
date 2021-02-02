async function updateContactSubmission(parent, args, ctx, info) {
  const updatedContactSubmission = await ctx.db.mutation.updateContactSubmission(
    {
      ...args,
    },
    info
  );

  return updatedContactSubmission;
}

module.exports = updateContactSubmission;

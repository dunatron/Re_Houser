exports.createActivity = async ({ data, ctx }) => {
  const activity = ctx.db.mutation.createActivity({ data }, `{ id }`);
  return activity;
};

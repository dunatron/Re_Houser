async function deleteViewing(parent, args, ctx, info) {
  return await ctx.db.mutation.deleteViewing({ ...args });
}

module.exports = deleteViewing;

async function completeInspection(parent, args, ctx, info) {
  console.log("Complete inspection args => ", args);
  // throw new Error(
  //   "Complete Inspection hasnt been impleneted on the server yet. Just wired it all up"
  // );
  const inspection = await ctx.db.mutation.updateInspection(
    {
      data: {
        ...args.data,
        completed: true
      },
      where: {
        ...args.where
      }
    },
    info
  );

  return inspection;
}

module.exports = completeInspection;

exports.createActivity = async ({ data, ctx }) => {
  console.log("++CREATING ACTIVITY==");
  // await ctx.db.mutation.createActivity(data, `{ id }`);
  // await ctx.db.mutation.createActivity({
  //   data: {
  //     title: "Updated Property",
  //     content: "Property fields updated",
  //     type: "UPDATED_PROPERTY",
  //     user: {
  //       connect: {
  //         id: "ck7k2vjt2ex1h0984se8ztlwd"
  //       }
  //     }
  //   }
  // });
  // return ctx.db.mutation.createActivity(data, `{ id }`);
  const activity = ctx.db.mutation.createActivity({ data }, `{ id }`);
  return activity;
};

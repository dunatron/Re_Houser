async function myLease(parent, args, ctx, info) {
  console.log("args => ", args)
  const myLease = await ctx.db.query.propertyLease(
    {
      // where: {
      //   id: "cjwq02fcwbmc40b12qbhn4okm",
      // },
      where: {
        ...args.where,
      },
    },
    info
  )
  return myLease
}

module.exports = myLease

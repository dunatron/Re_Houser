async function myLeases(parent, args, ctx, info) {
  const userId = ctx.request.userId;
  const where = {
    ...args.where,
    OR: [
      {
        lessors_some: {
          user: {
            id: userId
          }
        }
      },
      {
        lessees_some: {
          user: {
            id: userId
          }
        }
      }
    ]
  };
  return ctx.db.query.propertyLeases(
    {
      where: where
    },
    info
  );
}

module.exports = myLeases;

async function viewings(parent, { where }, ctx, info) {
  return ctx.db.query.viewings(
    {
      where: where
    },
    info
  );
}

module.exports = viewings;

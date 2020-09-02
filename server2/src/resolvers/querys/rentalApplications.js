async function rentalApplications(parent, { where }, ctx, info) {
  return ctx.db.query.rentalApplications(
    {
      where: where
    },
    info
  );
}

module.exports = rentalApplications;

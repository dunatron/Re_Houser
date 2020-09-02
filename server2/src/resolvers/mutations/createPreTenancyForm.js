async function createPreTenancyForm(parent, { data }, ctx, info) {
  const preTenancyForm = await ctx.db.mutation.createPreTenancyForm(
    {
      data
    },
    info
  );
  return preTenancyForm;
}

module.exports = createPreTenancyForm;

async function updateWallet(parent, { data, where }, ctx, info) {
  const wallet = await ctx.db.mutation.updateWallet(
    {
      data,
      where
    },
    info
  );
  return wallet;
}

module.exports = updateWallet;

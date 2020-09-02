async function messagesConnection(parent, args, ctx, info) {
  const messagesRes = await ctx.db.query.messagesConnection(
    {
      ...args,
    },
    info
  )
  return messagesRes
}

module.exports = messagesConnection

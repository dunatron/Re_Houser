async function messages(parent, args, ctx, info) {
  const messagesRes = await ctx.db.query.messages(
    {
      ...args,
    },
    info
  )
  return messagesRes
}

module.exports = messages

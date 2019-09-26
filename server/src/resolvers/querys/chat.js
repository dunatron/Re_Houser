async function chat(parent, args, ctx, info) {
  const requestedChat = await ctx.db.query.chat(
    {
      ...args,
    },
    info
  )
  return requestedChat
}

module.exports = chat

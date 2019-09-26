async function chats(parent, args, ctx, info) {
  const allChats = await ctx.db.query.chats(
    {
      ...args,
    },
    info
  )
  return allChats
}

module.exports = chats

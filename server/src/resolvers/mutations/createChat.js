async function createChat(parent, args, ctx, info) {
  const { data } = args
  // creates a new chat room
  const chat = await ctx.db.mutation.createChat(
    {
      data: {
        ...data,
      },
    },
    info
  )

  return chat
}

module.exports = createChat

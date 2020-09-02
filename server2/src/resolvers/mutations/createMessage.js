// MessageCreateInput

async function createMessage(parent, args, ctx, info) {
  const { data } = args
  // creates a new message
  const message = await ctx.db.mutation.createMessage(
    {
      data: {
        ...data,
      },
    },
    info
  )

  return message
}

module.exports = createMessage

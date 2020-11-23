

async function createChat(parent, args, ctx, info) {
  const { data } = args;
  // creates a new chat room
  if (data.type) {
    if (data.type === "PEER") {
      const oldChat = await ctx.db.query.chats(
        {
          where: {
            participants_every: {
              id_in: [
                data.participants.connect[0].id,
                data.participants.connect[1].id
              ]
            },
            type: "PEER"
          }
        },
        info
      );
      if (oldChat.length > 0) {
        return oldChat[0];
      }
    }
    if (data.type === "GROUP") {
      // throw new Error("No way to handle group chats as of yet!");
      return await ctx.db.mutation.createChat(
        {
          data: {
            ...data
          }
        },
        info
      );
    }
  }
  const chat = await ctx.db.mutation.createChat(
    {
      data: {
        ...data
      }
    },
    info
  );

  return chat;
}

module.exports = createChat;

async function createChat(parent, args, ctx, info) {
  const { data } = args;
  // creates a new chat room
  if (data.type) {
    if (data.type === "PEER") {
      console.log("data => ", data);

      // created by trying to message someone
      // see if we can find that chat already between the 2
      // this will not work. it will get every peer chat for both people then just return the first chat...
      // yes it will as the chat needs to be PEER and have both users
      // however as it currently stands
      const oldChat = await ctx.db.query.chats(
        {
          where: {
            participants_some: {
              // ...data.participants.connect.map(participant => ({
              //   id: participant.id
              // }))
              // ...data.participants.connect.reduce(participant => participant.id)
              // hmm assume there are 2
              id: data.participants.connect[0].id,
              id: data.participants.connect[1].id
              // id: "ck2brsqxk6ij20b0963manq3x",
              // id: "ck2brtfha6ijy0b09b298cl1g"
            },
            type: "PEER"
          }
        },
        info
      );
      console.log("oldChat => ", oldChat);
      // return the first of these chats
      // if calling from client on a message that we have. call query chat where
      if (oldChat.length > 0) {
        return oldChat[0];
      }
    }
    if (data.type === "GROUP") {
      throw new Error("No way to handle group chats as of yet!");
    }
  }
  //ck2brsqxk6ij20b0963manq3x
  //ck2brtfha6ijy0b09b298cl1g
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

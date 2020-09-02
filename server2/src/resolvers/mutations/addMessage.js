async function addMessage(parent, { chatId, content }, ctx, info) {
  const chatIndex = chats.findIndex(c => c.id === chatId);

  const allChats = await ctx.db.query.chat(
    {
      id: chatId,
    },
    info
  )

  if (chatIndex === -1) return null;

  const chat = chats[chatIndex];
  
  const messagesIds = messages.map(currentMessage => Number(currentMessage.id));
  const messageId = String(Math.max(...messagesIds) + 1);
  const message = {
    id: messageId,
    createdAt: new Date(),
    content,
  };

  messages.push(message);
  chat.messages.push(messageId);
  // The chat will appear at the top of the ChatsList component
  chats.splice(chatIndex, 1);
  chats.unshift(chat);

  return message;
}

module.exports = addMessage;
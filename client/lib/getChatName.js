const getChatName = (chat, me) => {
  if (!chat) return null;
  if (!me) return null;
  if (chat.type === 'PEER') {
    return chat.participants.reduce((acc, p) => {
      if (p.id === me.id) return acc;
      return acc + p.firstName + p.lastName;
    }, '');
  }
  return chat.name;
};

export { getChatName };
export default getChatName;

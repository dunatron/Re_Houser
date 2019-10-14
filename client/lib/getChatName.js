const getChatName = (chat) => {
    if(!chat) return null
    if(chat.type ==="PEER") {
        return "Get other guys name"
    }
    return "I am function to get Chat Name"
}

export {getChatName}
export default getChatName
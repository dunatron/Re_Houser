import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '../styles/icons/PersonIcon';
const getChatImage = (chat, me) => {
  if (!chat) return null;
  if (!me) return null;
  if (chat.type === 'PEER') {
    return chat.participants.reduce((acc, p) => {
      if (p.id === me.id) return acc;
      if (p.profilePhoto) {
        return (
          <Avatar
            alt={`${p.firstName} ${p.lastName}`}
            src={p.profilePhoto.url}
          />
        );
      }
      return <Avatar alt={`${p.firstName} ${p.lastName}`} />;
    }, '');
  }
  return 'How to name a group chat';
};

const getChatImageUrl = (chat, me) => {
  if (!chat) return null;
  if (!me) return null;
  if (chat.type === 'PEER') {
    return chat.participants.reduce((acc, p) => {
      if (p.id === me.id) return acc;
      if (p.profilePhoto) {
        return p.profilePhoto.url;
      }
      return '';
    }, '');
  }
  return 'How to name a group chat';
};

export { getChatImage, getChatImageUrl };
export default getChatImage;

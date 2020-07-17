import { Like, MessageUs } from 'react-facebook';
import { Paper } from '@material-ui/core';

const ItemWrapper = ({ children }) => (
  <div style={{ padding: '16px' }}>{children}</div>
);

// will need to take into account the layout when snapped
const Footer = () => {
  // return <div></div>;
  return (
    <Paper
      square
      style={{
        height: '150px',
        width: '100%',
        maxWidth: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        // justifyContent: 'center',
      }}>
      <ItemWrapper>
        <MessageUs
          href="http://www.facebook.com/rehousernz"
          pageId="115899600192696"
          messengerAppId="115899600192696"
          // messengerAppId="1188617168164715"
          // pageId="1188617168164715"
          // href="http://www.facebook.com/rehousernz"
        />
      </ItemWrapper>
      <ItemWrapper>
        <Like
          href="http://www.facebook.com/rehousernz"
          colorScheme="light"
          showFaces
          share
        />
      </ItemWrapper>
    </Paper>
  );
};

export default Footer;
import PropTypes from 'prop-types';
import { Like, MessageUs } from 'react-facebook';
import { Paper } from '@material-ui/core';
import InstallPWAButton from '@/Components/InstallPWAButton';

const ItemWrapper = ({ children }) => (
  <div style={{ padding: '16px' }}>{children}</div>
);

ItemWrapper.propTypes = {
  children: PropTypes.any,
};

// will need to take into account the layout when snapped
const Footer = () => {
  // return <div></div>;
  return (
    <Paper
      square={false}
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
        <InstallPWAButton />
      </ItemWrapper>
      <ItemWrapper>
        <MessageUs
          href="http://www.facebook.com/rehousernz"
          pageId="115899600192696"
          messengerAppId="115899600192696"
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

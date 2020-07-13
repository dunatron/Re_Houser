import { Like } from 'react-facebook';
import { Paper } from '@material-ui/core';

// will need to take into account the layout when snapped
const Footer = () => {
  return (
    <footer style={{ height: '100px' }}>
      <Paper
        square
        style={{
          height: '100%',
        }}>
        <Like
          href="http://www.facebook.com/rehousernz"
          colorScheme="dark"
          showFaces
          share
        />
      </Paper>
    </footer>
  );
};

export default Footer;

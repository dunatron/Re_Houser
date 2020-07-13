import { Share } from 'react-facebook';

// display,
//       hashtag,
//       redirectUri,
//       quote,
//       mobileIframe,
//       ...rest
const ShareProperty = () => {
  return (
    <div>
      I am the share property component
      <Share
        href="http://www.facebook.com/rehouser/nz"
        description="Road Lizard, Road, Lizard, Road Lizard, rraaaahhhrg"
        actions={['https://app.rehouser.nz']}>
        {props => {
          console.log('Share props => ', props);
          const { handleClick, loading, data, error } = props;
          return (
            <button type="button" disabled={loading} onClick={handleClick}>
              Share Property to Facebook
            </button>
          );
        }}
      </Share>
    </div>
  );
};

export default ShareProperty;

import {
  Share,
  ShareButton,
  Initialize,
  Comments,
  Page,
  CustomChat,
  SendToMessenger,
  Subscribe,
  Status,
  CommentsCount,
} from 'react-facebook';
import moment from 'moment';

// display,
//       hashtag,
//       redirectUri,
//       quote,
//       mobileIframe,
//       ...rest

// children: Function,
//   handleProcess: Function,
//   loading: boolean,
//   data: any,
//   error: Error,
//   href?: string,
//   hashtag?: string,
//   quote?: string,
//   mobileIframe?: boolean,
//   display?: string,
//   appId?: string,
//   redirectURI?: string,
const ShareProperty = ({ property }) => {
  const handleStatusChange = res => {};

  return (
    <>
      <Initialize>
        {({ isReady, api }) => {
          // our custom async/await api
          // original FB api is available via window.FB
          if (!isReady) return <div>Loading Facebook API</div>;

          return (
            <div>
              <Status>
                {({ loading, status }) => {
                  if (loading) return 'Loading status';

                  return (
                    <div>
                      {JSON.stringify(status)}

                      {status === 'connected' ? (
                        <LoggedInComponents api={api} property={property} />
                      ) : (
                        <button
                          onClick={() => {
                            console.log('The api => ', api);
                            // api('/me', 'GET', { fields: 'id,name' }, function(response) {
                            //   // Insert your code here
                            //   console.log('Did we get a me response => ', response);
                            // });
                            api.login(function(response) {
                              if (response.authResponse) {
                                console.log(
                                  'Welcome!  Fetching your information.... '
                                );
                                // api.api('/me', function(response) {
                                //   console.log('Good to see you, ' + response.name + '.');
                                // });
                              } else {
                                console.log(
                                  'User cancelled login or did not fully authorize.'
                                );
                              }
                            });
                          }}>
                          LOGIN VIA FB
                        </button>
                      )}
                    </div>
                  );
                }}
              </Status>
            </div>
          );

          return <div>Hiii</div>;
        }}
      </Initialize>
    </>
  );
  return (
    <>
      <SendToMessenger messengerAppId="123456789" pageId="123456789" />
    </>
  );

  return (
    <div>
      I am the share property component
      <CustomChat pageId="123456789" minimized={false} />
      <Page href="https://www.facebook.com/rehousernz" tabs="timeline" />
      {/* <Page href="https://www.facebook.com/rehousernz" tabs="posts" /> */}
      <Initialize>
        {({ isReady, api }) => {
          console.log('api => ', api.ui);
          // our custom async/await api
          // original FB api is available via window.FB
          if (!isReady) return <div>Loading Facebook API</div>;
          return <div>Hiii</div>;
        }}
      </Initialize>
      <Comments
        href={`http://www.facebook.com/rehousernz/${property.placeId}`}
      />
      {/* <Comments href="http://www.facebook.com/rehousernz" /> */}
      {/* <Share
        href="http://www.facebook.com/rehouser/nz"
        // redirectUri="https://app.rehouser.nz"
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
      </Share> */}
    </div>
  );
};

const LoggedInComponents = ({ api, property }) => {
  return (
    <div>
      <div>PLACEID ={property.placeId}</div>
      <CommentsCount href={`http://www.facebook.com/rehousernz/`} />
      <Comments
        href={`http://www.facebook.com/rehousernz/${property.placeId}`}
      />
      <button
        onClick={() => {
          api.logout(function(response) {
            if (response.authResponse) {
              console.log('Welcome!  Fetching your information.... ');
              // api.api('/me', function(response) {
              //   console.log('Good to see you, ' + response.name + '.');
              // });
            } else {
              console.log('User cancelled login or did not fully authorize.');
            }
          });
        }}>
        Logout VIA FB
      </button>
      <Share
        // href="http://www.facebook.com/rehousernz"
        // href="http://www.facebook.com/rehousernz/share.php?u=http://www.voteleavetakecontrol.org/our_affiliates&title=Farmers+for+Britain+have+made+the+sensible+decision+to+Vote+Leave.+Be+part+of+a+better+future+for+us+all.+Please+share!"
        href={`http://www.facebook.com/rehousernz/share.php?u=https://app.rehouser.co.nz&title="test+title"`}
        quote={`${property.location} \n
            available: ${moment(property.moveInDate).format(
              'dddd, MMMM Do YYYY'
            )}`}
        from="http://www.facebook.com/rehousernz"
        hashtag="the hashtag"
        data={
          {
            //   quote: 'Road Lizard, Road, Lizard, Road Lizard, rraaaahhhrg',
            //   caption: 'asdasdad',
          }
        }
        pageId="123456789"
        actions={['https://app.rehouser.nz']}>
        {({ handleClick, loading }) => (
          <button type="button" disabled={loading} onClick={handleClick}>
            Share {property.location}
          </button>
        )}
      </Share>
    </div>
  );
};

export default ShareProperty;

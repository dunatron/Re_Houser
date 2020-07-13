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
  Group,
} from 'react-facebook';

import { Button } from '@material-ui/core';
import LeasesList from '../../components/LeasesList';
import PleaseSignIn from '../../components/PleaseSignIn';
import Dashboard from '../../components/Dashboard';
import SOCIAL_DASHBOARD_CONFIG from '../../lib/configs/socialDashboard';

const SocialPage = props => {
  const {
    appData: { currentUser },
  } = props;
  return (
    <div>
      <PleaseSignIn
        currentUser={currentUser}
        message="You cannot view the social without being signed in">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}>
          <Page href="https://www.facebook.com/rehousernz"></Page>
          <Share href="http://www.facebook.com/rehousernz">
            {({ handleClick, loading }) => (
              <Button
                type="button"
                disabled={loading}
                onClick={handleClick}
                variant="outlined">
                Share Rehouser
              </Button>
            )}
          </Share>
        </div>
        <Dashboard
          config={SOCIAL_DASHBOARD_CONFIG}
          elevation={10}
          heading="Social Dashboard"
          intro="You can do all things social here"
        />
      </PleaseSignIn>
    </div>
  );
};

export default SocialPage;

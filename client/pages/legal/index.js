import PropTypes from 'prop-types';
import OwnerProperties from '@/Components/OwnerProperties/index';
import PleaseSignIn from '@/Components/PleaseSignIn';
import ConfirmEmail from '@/Components/ConfirmEmail';
import PageHeader from '@/Components/PageHeader';
import { Box, Typography } from '@material-ui/core';
import Dashboard from '@/Components/Dashboard';
import LEGAL_STATMENTS_DASHBOARD_CONFIG from '@/Lib/configs/dashboards/legalStatementsDashConf';

const LegalPage = ({ appData: { currentUser } }) => {
  const me = currentUser.data ? currentUser.data.me : null;
  return (
    <>
      <PageHeader
        title="Legal Statements"
        intro="Here you will find our legal statements such as our Privacy Policy."
        metaData={{
          title: 'Legal Statements',
          content:
            'Here you will find our legal statements such as our Privacy Policy.',
        }}
      />
      <Dashboard
        config={LEGAL_STATMENTS_DASHBOARD_CONFIG}
        me={me}
        elevation={0}
        // heading="Legal Statements"
        // intro="Rehouser Legal statements dashboard"
      />
    </>
  );
};

LegalPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object,
  }),
};

export default LegalPage;

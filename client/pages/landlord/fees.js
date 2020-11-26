import { Paper, Typography } from '@material-ui/core';
import Fees from '@/Components/Fees';
import PageHeader from '@/Components/PageHeader';

// server side props
import { initializeApollo, addApolloState } from '@/Lib/apolloClient';
import { CURRENT_USER_QUERY } from '@/Gql/queries';

const LandlordFeesPage = () => {
  return (
    <>
      <PageHeader
        title="Fees"
        intro="With Rehouser you know what you're getting."
        metaData={{
          title: 'rehouser fees',
          content:
            'Fees for the rehouser platform to know exactly what you are getting. No hidden costs',
        }}
      />
      <Paper>
        <Typography variant="h6"></Typography>
      </Paper>
      <Fees />
    </>
  );
};

LandlordFeesPage.propTypes = {};

export default LandlordFeesPage;

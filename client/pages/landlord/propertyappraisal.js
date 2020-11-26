import { Paper, Typography } from '@material-ui/core';
import Fees from '@/Components/Fees';
import PageHeader from '@/Components/PageHeader';

// server side props
import { initializeApollo, addApolloState } from '@/Lib/apolloClient';
import { CURRENT_USER_QUERY } from '@/Gql/queries';

const LandlordAppraisalPage = () => {
  return (
    <>
      <PageHeader
        title="LandlordAppraisalPage"
        intro="LandlordAppraisalPage"
        metaData={{
          title: 'LandlordAppraisalPage',
          content: 'LandlordAppraisalPage',
        }}
      />
      <Paper>
        <Typography variant="h6">LandlordAppraisalPage</Typography>
      </Paper>
      <Fees />
    </>
  );
};

LandlordAppraisalPage.propTypes = {};

export default LandlordAppraisalPage;

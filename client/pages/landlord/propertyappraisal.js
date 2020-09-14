import { Paper, Typography } from '@material-ui/core';
import Fees from '../../components/Fees';
import PageHeader from '../../components/PageHeader';

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

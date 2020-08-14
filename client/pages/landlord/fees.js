import ComingSoon from '../../components/ComingSoon';
import { Paper, Typography } from '@material-ui/core';
import Fees from '../../components/Fees';
import PageHeader from '../../components/PageHeader';

const FeesInfoPage = () => {
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

export default FeesInfoPage;

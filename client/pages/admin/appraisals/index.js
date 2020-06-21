import AppraisalManager from '../../../components/AppraisalManager';
import PageHeader from '../../../components/PageHeader';
import { Typography } from '@material-ui/core';

const AppraisalsPage = props => {
  const {
    appData: { currentUser },
  } = props;
  return (
    <>
      <PageHeader
        title="Admin Appraisals"
        intro="This is where our admins will view appraisals that need to be appraised then fill in the details"
        children={[
          <Typography gutterBottom>
            Perhaps some instructions on how to use it. FUck i guess thats my
            job for bits like this
          </Typography>,
        ]}
        metaData={{
          title: 'Admin portal',
          content:
            'Admin portal to manage rehouser clients and day to day activities',
        }}
      />
      <AppraisalManager />
    </>
  );
};

export default AppraisalsPage;

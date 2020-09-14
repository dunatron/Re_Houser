import PropTypes from 'prop-types';
import AppraisalManager from '@/AdminComponents/AppraisalManager';
import PageHeader from '@/Components/PageHeader';
import { Typography } from '@material-ui/core';
import AdminOnly from '@/Components/AdminOnly';

const AdminAppraisalsPage = ({ appData: { currentUser } }) => {
  const me = currentUser.data ? currentUser.data.me : null;
  return (
    <>
      <PageHeader
        title="Admin Appraisals"
        intro="This is where our admins will view appraisals that need to be appraised then fill in the details"
        children={[
          <Typography key={1} gutterBottom>
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
      <AdminOnly me={me}>
        <AppraisalManager />
      </AdminOnly>
    </>
  );
};

AdminAppraisalsPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
};

export default AdminAppraisalsPage;

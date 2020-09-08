import RentalApplicationsManager from '../../../admin-components/RentalApplicationsManager';
import PageHeader from '../../../components/PageHeader';
import { Typography } from '@material-ui/core';
import AdminOnly from '../../../components/AdminOnly';

const AdminApplicationsPage = props => {
  const {
    appData: { currentUser },
  } = props;

  console.log('admin APplications Current user => ', currentUser);
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
      <AdminOnly me={currentUser.data ? currentUser.data.me : {}}>
        <RentalApplicationsManager
          me={currentUser.data ? currentUser.data.me : {}}
        />
      </AdminOnly>
    </>
  );
};

export default AdminApplicationsPage;

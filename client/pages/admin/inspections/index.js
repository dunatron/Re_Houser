import AppraisalManager from '../../../admin-components/AppraisalManager';
import PageHeader from '../../../components/PageHeader';
import { Typography } from '@material-ui/core';
import InspectionsTable from '../../../components/Tables/InspectionsTable';

import { isAdmin } from '../../../lib/isAdmin';
import AdminOnly from '../../../components/AdminOnly';

const AppraisalsPage = props => {
  const {
    appData: { currentUser },
  } = props;
  return (
    <>
      <PageHeader
        title="Admin Inspections"
        intro="View all system inspections so we never miss an inspection or fail to inform people of incoming inspections"
        metaData={{
          title: 'Admin Inspections',
          content:
            'View all system inspections so we never miss an inspection or fail to inform people of incoming inspections',
        }}
      />
      <AdminOnly me={currentUser.data ? currentUser.data.me : {}}>
        <InspectionsTable
          me={currentUser.data ? currentUser.data.me : {}}
          where={
            {
              // completed: false,
            }
          }
        />
      </AdminOnly>
    </>
  );
};

export default AppraisalsPage;

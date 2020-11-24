// gql
import { useQuery } from '@apollo/client';
import { SINGLE_INSPECTION_QUERY } from '@/Gql/queries';

import Loader from '@/Components/Loader';
import Error from '@/Components/ErrorMessage';
import DisplayJson from '@/Components/DisplayJson';
import InspectionForm from './InspectionForm';
import UpdateInspectionForm from './UpdateInspectionForm';

import { Box, Typography } from '@material-ui/core';
import RehouserCard from '@/Styles/Card';
import moment from 'moment';
import WidgetWithSaveToDb from '@/Components/UploadWidget/WidgetWithSaveToDb';

const ManageInspection = ({ id }) => {
  const { data, loading, error } = useQuery(SINGLE_INSPECTION_QUERY, {
    variables: {
      where: {
        id: id,
      },
    },
  });

  if (error) return <Error error={error} />;
  if (loading) return <Loader loading={loading} text="Loading inspection" />;

  const inspection = data.inspection;

  if (!inspection)
    return <Typography gutterBottom>No inspection to be found here</Typography>;

  return (
    <div>
      <InspectionDetails inspection={inspection} />
      <WidgetWithSaveToDb
        title="Inspection Files"
        defaultExpand={true}
        files={inspection.files}
        onCompleted={(client, newFile) => {
          const cache = client.cache;
          cache.modify({
            id: cache.identify(inspection),
            fields: {
              files(existingFileRefs = [], { readField }) {
                // can we identify the new file
                const newFileRefId = cache.identify(newFile);

                const newFileRef = {
                  __ref: newFileRefId,
                };

                if (
                  existingFileRefs.some(
                    ref => readField('id', ref) === newFile.id
                  )
                ) {
                  return existingFileRefs;
                }

                return [...existingFileRefs, newFileRef];
              },
            },
          });
        }}
        withConnections={{
          inspectionFiles: {
            connect: {
              id: id,
            },
          },
        }}
      />
      {inspection.completed ? (
        <CompletedView inspection={inspection} />
      ) : (
        <div>
          <DisplayJson title="Inspection Data" json={data} />
          <InspectionForm inspection={inspection} />
        </div>
      )}
    </div>
  );
};

const InspectionDetails = ({ inspection }) => {
  const completedAt = inspection.completedTime
    ? moment(inspection.completedTime).format('hh:mm a Do MMM YYYY ')
    : null;

  const formUpdatedAt = inspection.inspectionForm
    ? moment(inspection.inspectionForm.updatedAt).format('hh:mm a Do MMM YYYY ')
    : null;

  return (
    <RehouserCard>
      <Typography gutterBottom>
        Inspector: {inspection.inspector && inspection.inspector.firstName}
      </Typography>
      <Typography gutterBottom>
        Completed: {inspection.completed ? 'Yes' : 'No'}
      </Typography>
      <Typography gutterBottom>CompletedAt: {completedAt}</Typography>
      <Typography gutterBottom>UpdatedAt: {formUpdatedAt}</Typography>

      <Typography gutterBottom>Notes: {inspection.notes}</Typography>
    </RehouserCard>
  );
};

const CompletedView = ({ inspection }) => {
  return (
    <Box>
      <DisplayJson title="Full Inspection" json={inspection} />
      <DisplayJson
        title="Inspection Form Structure"
        json={inspection.inspectionForm.json}
      />
      <DisplayJson
        title="Inspection form values"
        json={inspection.inspectionForm.vals}
      />

      <UpdateInspectionForm inspection={inspection} />
    </Box>
  );
};

export default ManageInspection;

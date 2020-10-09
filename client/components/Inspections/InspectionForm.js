import { useMutation } from '@apollo/client';
import FormCreator from '@/Components/Forms/FormCreator';
import { COMPLETE_INSPECTION_MUTATION } from '@/Gql/mutations';
import moment from 'moment';
import { toast } from 'react-toastify';
import { Typography } from '@material-ui/core';

const InspectionForm = ({ isAmend, inspection: { id, inspectionForm } }) => {
  const handleCompleted = data => {
    toast.info(
      <Typography>Inspection has been successfully completed</Typography>
    );
  };

  const [completeInspection, { loading, error, data }] = useMutation(
    COMPLETE_INSPECTION_MUTATION,
    {
      onCompleted: handleCompleted,
    }
  );

  const handleCompleteInspection = data => {
    const completedTimeIso = moment().format();
    completeInspection({
      variables: {
        data: {
          ...(!isAmend && { completedTime: completedTimeIso }),
          inspectionForm: {
            update: {
              vals: data,
              ...(!isAmend && { completedAt: completedTimeIso }),
            },
          },
        },
        where: {
          id: id,
        },
      },
    });
  };

  return (
    <FormCreator
      data={inspectionForm.vals}
      error={error}
      posting={loading}
      title="inspection"
      isNew={!isAmend}
      updateText={isAmend ? 'Amend Inspection' : 'Complete Inspection'}
      config={inspectionForm.json}
      onSubmit={handleCompleteInspection}
    />
  );
};

export default InspectionForm;

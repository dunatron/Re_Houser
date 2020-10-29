import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';
import Error from '@/Components/ErrorMessage/index';
import { COMPLETE_RENTAL_APPLICATION } from '@/Gql/mutations/index';

const FinaliseApplicationStep = ({
  rentalApplication,
  property,
  me,
  applicationInfo,
  applicantData,
  completed,
  steps,
}) => {
  // ToDo: Mutation Props
  const [completeApplication, completeApplicationProps] = useMutation(
    COMPLETE_RENTAL_APPLICATION,
    {
      variables: { applicationId: rentalApplication.id },
      update: (proxy, mutationResult) => {
        /* your custom update logic */
        toast.info(
          <div>
            <p>
              Application has now been completed, the landlord will review your
              application. We will send you a further email about this process.
              Or you can checkout our info section about this process.
            </p>
            <p>
              <strong>you will receive an email about any updates</strong>
            </p>
          </div>,
          { autoClose: 15000 }
        );
      },
      // optimisticResponse: {},
    }
  );

  return (
    <div>
      <Error error={completeApplicationProps.error} />
      {steps
        .filter(step => step.key !== 'finaliseDetails')
        .map((step, idx) => {
          return (
            <div key={idx}>
              <h2>
                {step.label} {completed[idx] ? 'YES' : 'NO'}
              </h2>
            </div>
          );
        })}

      <Button
        variant="contained"
        disabled={completeApplicationProps.loading}
        onClick={() => {
          completeApplication();
        }}>
        Complete Application
        {completeApplicationProps.loading && 'Loading'}
      </Button>
    </div>
  );
};

FinaliseApplicationStep.propTypes = {
  applicantData: PropTypes.any,
  applicationInfo: PropTypes.any,
  completed: PropTypes.any,
  me: PropTypes.any,
  property: PropTypes.any,
  rentalApplication: PropTypes.shape({
    id: PropTypes.any,
  }).isRequired,
  steps: PropTypes.array.isRequired,
};

export default FinaliseApplicationStep;

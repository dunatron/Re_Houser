import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';
import Error from '../../ErrorMessage/index';
import { COMPLETE_RENTAL_APPLICATION } from '../../../mutation/index';

const FinaliseApplicationStep = ({
  rentalApplication,
  property,
  me,
  applicationInfo,
  applicantData,
}) => {
  // ToDo: Mutation Props
  const [completeApplication, completeApplicationProps] = useMutation(
    COMPLETE_RENTAL_APPLICATION,
    {
      variables: { applicationId: rentalApplication.id },
      update: (proxy, mutationResult) => {
        console.log('mutationResult => ', mutationResult);
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
  // completeApplicationProps.loading
  // completeApplicationProps.data
  // completeApplicationProps.error

  // hack to just bypass for dev
  return (
    <div>
      <Error error={completeApplicationProps.error} />
      <Button
        variant="contained"
        disabled={completeApplicationProps.loading}
        onClick={() => {
          completeApplication();
        }}>
        HACK TO BYPASS => Complete Application{' '}
        {completeApplicationProps.loading && 'Loading'}
      </Button>
    </div>
  );
};

export default FinaliseApplicationStep;

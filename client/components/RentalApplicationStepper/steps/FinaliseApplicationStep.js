import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import Button from "@material-ui/core/Button";
import { toast } from "react-toastify";
import Error from "../../ErrorMessage/index";

const COMPLETE_RENTAL_APPLICATION = gql`
  mutation COMPLETE_RENTAL_APPLICATION($applicationId: ID!) {
    completeRentalApplication(applicationId: $applicationId) {
      id
      stage
    }
  }
`;

const FinaliseApplicationStep = ({ rentalApplication }) => {
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
              Application has now been accepted, the landlord will review your
              application
            </p>
            <p>
              <strong>you will receive an email about any updates</strong>
            </p>
          </div>,
          { autoClose: 15000 }
        );
      }
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
          // .then(res => {
          //   toast.info("GOOD SHIT")
          // })
          // // .catch(e => alert.error(e.message))
          // .catch(e => toast.error(e.message))
        }}
      >
        HACK TO BYPASS => Complete Application{" "}
        {completeApplicationProps.loading && "Loading"}
      </Button>
    </div>
  );
};

export default FinaliseApplicationStep;

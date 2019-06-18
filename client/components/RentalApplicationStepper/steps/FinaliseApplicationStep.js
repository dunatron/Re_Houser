import gql from "graphql-tag"
import { useMutation } from "react-apollo-hooks"
import { useAlert } from "react-alert"
import Button from "@material-ui/core/Button"
import { toast } from "react-toastify"
import Error from "../../ErrorMessage/index"

const COMPLETE_RENTAL_APPLICATION = gql`
  mutation COMPLETE_RENTAL_APPLICATION($applicationId: ID!) {
    completeRentalApplication(applicationId: $applicationId) {
      id
      stage
    }
  }
`

const FinaliseApplicationStep = ({ application }) => {
  const alert = useAlert()
  // ToDo: Mutation Props
  const [completeApplication, completeApplicationProps] = useMutation(
    COMPLETE_RENTAL_APPLICATION,
    {
      variables: { applicationId: application.id },
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
        )
      },
      // optimisticResponse: {},
    }
  )
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
          completeApplication()
          // .then(res => {
          //   toast.info("GOOD SHIT")
          // })
          // // .catch(e => alert.error(e.message))
          // .catch(e => toast.error(e.message))
        }}>
        HACK TO BYPASS => Complete Application{" "}
        {completeApplicationProps.loading && "Loading"}
      </Button>
    </div>
  )

  return (
    <div>
      <h1>
        I am the final step to finalise your application before sending to the
        landlord for approval
      </h1>
      {application.stage === "PENDING" && (
        <div>Your application is awaiting for approval from the land</div>
      )}
      {application.stage === "INITIALIZING" && (
        <Button
          variant="contained"
          onClick={() => {
            completeApplication()
              .then(res => {
                // just to display message? or just let ui change when we update
                alert.show(
                  "Congrats the application is now in PENDING mode awaiting the landlords approval!"
                )
              })
              .catch(e => alert.error(e.message))
          }}>
          Complete Application
        </Button>
      )}
    </div>
  )
}

export default FinaliseApplicationStep

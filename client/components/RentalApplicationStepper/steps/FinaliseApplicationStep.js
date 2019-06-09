import gql from "graphql-tag"
import { useMutation } from "react-apollo-hooks"
import { useAlert } from "react-alert"
import Button from "@material-ui/core/Button"

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
  const [completeApplication, completeApplicationProps] = useMutation(
    COMPLETE_RENTAL_APPLICATION,
    {
      variables: { applicationId: application.id },
      update: (proxy, mutationResult) => {
        /* your custom update logic */
        console.group("completeApplication update")
        console.log("proxy ", proxy)
        console.log("mutationResult ", mutationResult)
        console.groupEnd()
      },
    }
  )
  // completeApplicationProps.loading
  // completeApplicationProps.data
  // completeApplicationProps.error

  // hack to just bypass for dev
  return (
    <Button
      variant="contained"
      onClick={() => {
        completeApplication()
          .then(res => {
            // just to display message? or just let ui change when we update
            console.log(
              "We have oput the application into pending mode => ",
              res
            )
            alert.show(
              "Congrats the application is now in PENDING mode awaiting the landlords approval!"
            )
          })
          .catch(e => alert.error(e.message))
      }}>
      HACK TO BYPASS => Complete Application
    </Button>
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
                console.log(
                  "We have oput the application into pending mode => ",
                  res
                )
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

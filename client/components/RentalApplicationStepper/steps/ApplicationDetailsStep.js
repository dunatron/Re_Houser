import React, { useState } from "react"
import PropTypes from "prop-types"
import { useMutation } from "react-apollo-hooks"
import { UPDATE_RENTAL_GROUP_APPLICANT_MUTATION } from "../../../mutation/index"
import Switch from "@material-ui/core/Switch"
import SwitchInput from "../../Inputs/SwitchInput"
import ApplicantDetails from "../../ApplicantDetails/index"
import {
  RENTAL_APPLICATIONS_QUERY,
  SINGLE_RENTAL_APPLICATION_QUERY,
} from "../../../query/index"
import Error from "../../ErrorMessage"

const ConfirmApplicant = props => {
  const { applicant, property } = props
  // const [approved, setApproved] = useState(applicant.approved)

  const rentalGroupApplicantData = {
    approved: !applicant.approved,
    email: applicant.email,
    firstName: applicant.firstName,
  }
  // ToDo: Mutation Props
  const [updateApplicant, updateApplicantProps] = useMutation(
    UPDATE_RENTAL_GROUP_APPLICANT_MUTATION,
    {
      variables: {
        data: rentalGroupApplicantData,
        // data: {
        //   approved: true,
        // },
        where: {
          id: applicant.id,
          // id: "userRentalApplicantData.id",
        },
      },
      update: (proxy, payload) => {
        /**
         * Note: we still are storing the application data in state in the index of the application stepper.
         * making it hard for updates to fall through
         */
        // const userData = proxy.readQuery({ query: CURRENT_USER_QUERY })
        // const testData = userData.me
        // proxy.writeQuery({ query: CURRENT_USER_QUERY, testData })
      },
      refetchQueries: [
        {
          query: SINGLE_RENTAL_APPLICATION_QUERY,
          variables: {
            where: {
              id: props.application.id,
            },
          },
        },
      ],
      // refetchQueries: [
      //   {
      //     query: RENTAL_APPLICATIONS_QUERY,
      //     variables: {
      //       where: {
      //         property: {
      //           id: property.id,
      //         },
      //       },
      //     },
      //   },
      // ],
      // optimisticResponse: {},
    }
  )
  return (
    <>
      <Error error={updateApplicantProps.error} />
      <SwitchInput
        checked={applicant.approved}
        onChange={() => {
          updateApplicant(applicant)
          // setApproved(!approved)
        }}
        label="Approve Applicant"
        checkedLabel="Approved"
      />
    </>
  )
}

const RenderOwnerView = props => {
  const { application } = props
  return (
    <div>
      <h1>I am the application Details step </h1>
      {application.applicants.map((applicant, i) => {
        return (
          <div key={i}>
            {applicant.user ? (
              <ApplicantDetails applicant={applicant} />
            ) : (
              "NO USER DETAILS"
            )}

            <ConfirmApplicant applicant={applicant} {...props} />
          </div>
        )
      })}
    </div>
  )
}

const RenderPlebView = ({ applicationInfo }) => (
  <div>
    Only the owner can edit this section. Here is the information
    <h4>visibility: {applicationInfo.visibility}</h4>
    <h4>Stage: {applicationInfo.stage}</h4>
    <h4>finalised: {applicationInfo.finalised ? "YES " : "NO"}</h4>
  </div>
)

const ApplicationDetailsStep = props => {
  const { me, application } = props
  if (me.id !== application.owner.id) {
    return <RenderPlebView {...props} />
  }
  return <RenderOwnerView {...props} />
}

ApplicationDetailsStep.propTypes = {
  me: PropTypes.object,
  property: PropTypes.object,
}

export default ApplicationDetailsStep

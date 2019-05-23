import React, { Component } from "react"
import PropTypes from "prop-types"
import { useMutation } from "react-apollo-hooks"
import { UPDATE_RENTAL_GROUP_APPLICANT_MUTATION } from "../../../mutation/index"
import Switch from "@material-ui/core/Switch"
import SwitchInput from "../../Inputs/SwitchInput"
import ApplicantDetails from "../../ApplicantDetails/index"

const RenderPlebView = ({ applicationInfo }) => (
  <div>
    Only the owner can edit this section. Here is the information
    <h4>visibility: {applicationInfo.visibility}</h4>
    <h4>Stage: {applicationInfo.stage}</h4>
    <h4>finalised: {applicationInfo.finalised ? "YES " : "NO"}</h4>
  </div>
)

const ConfirmApplicant = ({ applicant }) => {
  const rentalGroupApplicantData = {
    approved: !applicant.approved,
    email: applicant.email,
    firstName: applicant.firstName,
  }
  const updateApplicant = useMutation(UPDATE_RENTAL_GROUP_APPLICANT_MUTATION, {
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
      // openSnackbar({
      //   message: `uploadeed new photo id please prceed`,
      //   duration: 6000,
      // })
    },
    // optimisticResponse: {},
  })
  return (
    <SwitchInput
      checked={applicant.approved}
      onChange={() => {
        updateApplicant(applicant)
        alert("ToDO: Implement stepper cache ")
      }}
      label="Approve Applicant"
      checkedLabel="Approved"
    />
  )
}

// const ApplicantDetails = ({ applicant }) => (
//   <div>
//     <h4>
//       {applicant.user.firstName} {applicant.user.lastName}
//     </h4>
//     <ul>
//       <li>{applicant.id}</li>
//       <li>{applicant.approved}</li>
//       <li>{applicant.user.firstName}</li>
//       <li>{applicant.user.lastName}</li>
//       <li>{applicant.user.email}</li>
//       <li>{applicant.user.phone}</li>
//       <button
//         onClick={() =>
//           alert("ToDo: create Modal that fetches user data and renders it")
//         }>
//         View More Details
//       </button>
//     </ul>
//   </div>
// )

const RenderOwnerView = ({ applicationInfo }) => {
  console.log("applicationInfo => ", applicationInfo)
  return (
    <div>
      <h1>I am the application Details step </h1>
      {applicationInfo.applicants.map((applicant, i) => {
        return (
          <div>
            {applicant.user ? (
              <ApplicantDetails applicant={applicant} />
            ) : (
              "NO USER DETAILS"
            )}

            <ConfirmApplicant applicant={applicant} />
          </div>
        )
      })}
    </div>
  )
}

const ApplicationDetailsStep = props => {
  const { me, applicationInfo } = props
  if (me.id !== applicationInfo.owner.id) {
    return <RenderPlebView applicationInfo={applicationInfo} />
  }
  return <RenderOwnerView applicationInfo={applicationInfo} />
}

ApplicationDetailsStep.propTypes = {
  me: PropTypes.object,
  property: PropTypes.object,
}

export default ApplicationDetailsStep

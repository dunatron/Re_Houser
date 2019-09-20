import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_RENTAL_GROUP_APPLICANT_MUTATION } from "../../../mutation/index";
import Switch from "@material-ui/core/Switch";
import SwitchInput from "../../Inputs/SwitchInput";
import ApplicantDetails from "../../ApplicantDetails/index";
import {
  RENTAL_APPLICATIONS_QUERY,
  SINGLE_RENTAL_APPLICATION_QUERY
} from "../../../query/index";
import Error from "../../ErrorMessage";
import ChangeApplicationVisibilityBtn from "../../MutationButtons/ChangeApplicationVisibilityButton";

const ConfirmApplicant = props => {
  const { applicant, property, rentalApplication } = props;

  // check if can confirm, proprty.vacancies cannot be less than rentalApplication.applicants
  // alert that they will have to remove someone

  // ToDo: Mutation Props
  const [updateApplicant, updateApplicantProps] = useMutation(
    UPDATE_RENTAL_GROUP_APPLICANT_MUTATION,
    {
      variables: {
        data: {
          approved: !applicant.approved,
          email: applicant.email,
          firstName: applicant.firstName
        },
        where: {
          id: applicant.id
        }
      },
      optimisticResponse: {
        __typename: "Mutation",
        updateRentalGroupApplicant: {
          __typename: "RentalGroupApplicant",
          id: applicant.id,
          approved: !applicant.approved,
          ...applicant
        }
      },
      update: (proxy, payload) => {
        const applicationData = proxy.readQuery({
          query: SINGLE_RENTAL_APPLICATION_QUERY,
          variables: {
            where: { id: rentalApplication.id }
          }
        });

        const applicantIndex = applicationData.rentalApplication.applicants.findIndex(
          user => user.id === payload.data.updateRentalGroupApplicant.id
        );

        const updatedApplicants = [
          ...applicationData.rentalApplication.applicants
        ];
        updatedApplicants[applicantIndex] = {
          ...applicationData.rentalApplication.applicants[applicantIndex],
          ...payload.data.updateRentalGroupApplicant
        };

        const newApplicationData = {
          ...applicationData,
          rentalApplication: {
            ...applicationData.rentalApplication,
            applicants: [...applicationData.rentalApplication.applicants]
          }
        };
        proxy.writeQuery({
          query: SINGLE_RENTAL_APPLICATION_QUERY,
          variables: {
            where: { id: rentalApplication.id }
          },
          data: {
            rentalApplication: newApplicationData
          }
        });
      }
    }
  );

  return (
    <>
      <Error error={updateApplicantProps.error} />
      <SwitchInput
        checked={applicant.approved}
        onChange={updateApplicant}
        label="Approve Applicant"
        checkedLabel="Approved"
      />
    </>
  );
};

const RenderOwnerView = props => {
  const { rentalApplication } = props;
  console.log("owner view application => ", rentalApplication);
  return (
    <div>
      <h1>I am the application Details step </h1>
      <ChangeApplicationVisibilityBtn
        applicationId={rentalApplication.id}
        visibility={rentalApplication.visibility}
      />
      {rentalApplication.applicants.map((applicant, i) => {
        return (
          <div key={i}>
            {applicant.user ? (
              <ApplicantDetails applicant={applicant} />
            ) : (
              "NO USER DETAILS"
            )}

            <ConfirmApplicant applicant={applicant} {...props} />
          </div>
        );
      })}
    </div>
  );
};

const RenderPlebView = ({ applicationInfo }) => (
  <div>
    Only the owner can edit this section. Here is the information
    <h4>visibility: {applicationInfo.visibility}</h4>
    <h4>Stage: {applicationInfo.stage}</h4>
    <h4>finalised: {applicationInfo.finalised ? "YES " : "NO"}</h4>
  </div>
);

const ApplicationDetailsStep = props => {
  const { me, rentalApplication } = props;
  if (me.id !== rentalApplication.owner.id) {
    return <RenderPlebView {...props} />;
  }
  return <RenderOwnerView {...props} />;
};

ApplicationDetailsStep.propTypes = {
  me: PropTypes.object,
  property: PropTypes.object
};

export default ApplicationDetailsStep;

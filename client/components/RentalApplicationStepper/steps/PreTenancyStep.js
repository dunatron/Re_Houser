import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Typography } from '@material-ui/core';
import { toast } from 'react-toastify';
import CloseIcon from '@material-ui/icons/CloseOutlined';
import EditIcon from '@material-ui/icons/EditOutlined';
import FormCreator from '../../Forms/FormCreator';
import PRE_TENENACY_FORM_CONF from '../../../lib/configs/preTenancyFormConf';

import { UPDATE_RENTAL_GROUP_APPLICANT_MUTATION } from '../../../graphql/mutations/index';
import { SINGLE_RENTAL_APPLICATION_QUERY } from '../../../graphql/queries/index';

/**
 *
 * The best thing to do, would be to get the the form individually.
 * then we can create/update, also so it refetches the correct info and not all of it etc
 */
const PreTenancyStep = ({
  me,
  rentalApplication,
  property,
  update,
  completed,
}) => {
  const [isEditing, setIsEditing] = useState();

  const handleOnCompleted = data => {
    // setIsEditing(false);
    toast.success(
      <Typography>
        Your PreTenancy form has been updated and attached to your application
      </Typography>
    );
  };

  const [updateRentalGroupApplicant, { loading, error }] = useMutation(
    UPDATE_RENTAL_GROUP_APPLICANT_MUTATION,
    {
      onCompleted: handleOnCompleted,
    }
  );

  const currentApplicant = rentalApplication.applicants.find(
    applicant => applicant.user.id === me.id
  );

  const { preTenancyApplicationForm } = currentApplicant;

  const hasForm = preTenancyApplicationForm ? true : false;

  const formData = {
    fullName: me.firstName + ' ' + me.lastName,
    phone: me.phone,
    email: me.email,
    dob: me.dob,
  };

  const TheForm = () => (
    <FormCreator
      data={hasForm ? preTenancyApplicationForm : formData}
      config={PRE_TENENACY_FORM_CONF}
      // posting={loading}
      error={error}
      updateCacheOnRemovedFile={(cache, result) => {
        updateRentalGroupApplicant({
          variables: {
            data: {
              preTenancyApplicationForm: {
                update: {
                  proofOfAddress: {
                    disconnect: true,
                  },
                },
              },
            },
            where: {
              id: currentApplicant.id,
            },
          },
        });
      }}
      // https://github.com/apollographql/apollo-feature-requests/issues/4
      onSubmit={data => {
        updateRentalGroupApplicant({
          variables: {
            data: {
              preTenancyApplicationForm: hasForm
                ? {
                    update: {
                      ...data,
                    },
                  }
                : {
                    create: {
                      ...data,
                    },
                  },
            },
            where: {
              id: currentApplicant.id,
            },
          },
        });
      }}
      isNew={!hasForm}
      title="Pre Tenancy Form"
    />
  );

  if (completed) return <Typography>Step is complete</Typography>;
  return (
    <div>
      {!preTenancyApplicationForm && <TheForm />}
      {preTenancyApplicationForm && (
        <div>
          <h2>We have your pre tenancy form</h2>
          <Button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? <CloseIcon /> : <EditIcon />}
            {isEditing && 'close'} edit pre tenancy form
          </Button>
          {isEditing && <TheForm />}
        </div>
      )}
    </div>
  );
};

export default PreTenancyStep;

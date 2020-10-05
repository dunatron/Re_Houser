import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Typography } from '@material-ui/core';
import { toast } from 'react-toastify';
import CloseIcon from '@material-ui/icons/CloseOutlined';
import EditIcon from '@material-ui/icons/EditOutlined';
import FormCreator from '@/Components/Forms/FormCreator';
import PRE_TENENACY_FORM_CONF from '@/Lib/configs/preTenancyFormConf';
import { UPDATE_RENTAL_GROUP_APPLICANT_MUTATION } from '@/Gql/mutations/index';
import { SINGLE_RENTAL_APPLICATION_QUERY } from '@/Gql/queries/index';

const PreTenancyStep = ({
  me,
  rentalApplication,
  property,
  update,
  completed,
  updateUser,
}) => {
  const [isEditing, setIsEditing] = useState();

  const handleOnCompleted = data => {
    // setIsEditing(false);
    toast.success(
      <Typography>
        Your PreTenancy form has been updated and attached to your application
      </Typography>
    );
    setIsEditing(false);
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

  console.log(
    'preTenancyApplicationForm currentApplicant => ',
    currentApplicant
  );

  console.log('preTenancyApplicationForm form => ', preTenancyApplicationForm);

  const hasForm = preTenancyApplicationForm ? true : false;

  const formData = {
    fullName: me.firstName + ' ' + me.lastName,
    phone: me.phone,
    email: me.email,
    dob: me.dob,
    referrence1Name: me.referee1Name,
    referrence1Phone: me.referee1Phone,
    referrence1Email: me.referee1Email,
    referrence2Name: me.referee2Name,
    referrence2Phone: me.referee2Phone,
    referrence2Email: me.referee2Email,
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
        if (!me.dob && data.dob) {
          updateUser({
            variables: {
              data: {
                dob: data.dob,
              },
            },
          });
        }
        updateRentalGroupApplicant({
          variables: {
            // data: {
            //   preTenancyApplicationForm: {
            //     create: {
            //       ...data,
            //     },
            //   },
            // },
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

PreTenancyStep.propTypes = {
  completed: PropTypes.any.isRequired,
  me: PropTypes.shape({
    dob: PropTypes.any,
    email: PropTypes.any,
    firstName: PropTypes.string,
    id: PropTypes.any,
    lastName: PropTypes.any,
    phone: PropTypes.any,
  }).isRequired,
  property: PropTypes.any.isRequired,
  rentalApplication: PropTypes.shape({
    applicants: PropTypes.shape({
      find: PropTypes.func,
    }),
  }).isRequired,
  update: PropTypes.any.isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default PreTenancyStep;

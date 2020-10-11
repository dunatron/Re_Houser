import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';

import { USER_PROFILE_CONF } from '@/Lib/configs/userProfileConfig';
import TextInput from '@/Styles/TextInput';
import InputErrors from '@/Components/InputErrors/index';
import PhotoIdUploader from '@/Components/PhotoIdUploader/index';
import { isEmptyObj } from '@/Lib/isEmpty';
import { Button, Typography } from '@material-ui/core';
import FileUploader from '@/Components/FileUploader';
import { CURRENT_USER_QUERY } from '@/Gql/queries';

import { isEmpty } from 'ramda';

/**
 * Remember the effects and the effects of when the component should update. i.e on new props recieved
 * aswel as state change... state change should rerender,
 * errorsBag props will need to be caught for 1
 */
const UserDetailsStep = ({
  me,
  userInfo,
  property,
  onChange,
  errorsBag,
  applicantData,
  completed,
  rentalApplication,
  updateRentalGroupApplicant,
}) => {
  const userRentalApplicantData = rentalApplication.applicants.find(
    applicant => applicant.user.id === me.id
  );
  const hasPhotoId = me.identificationNumber;
  const [showUploader, setShowUploader] = useState(!hasPhotoId);
  if (completed) return <Typography>Step is complete</Typography>;

  return (
    <div>
      {Object.keys(userInfo).map((userVar, i) => {
        const isFieldEditable = userInfo[userVar].editable;
        return (
          <div key={i}>
            <TextInput
              fullWidth={true}
              name={userVar}
              disabled={!userInfo[userVar].editable}
              label={userInfo[userVar].label}
              value={userInfo[userVar].value}
              onChange={e => onChange(e)}
            />
            {errorsBag[userVar] && (
              <InputErrors
                errors={errorsBag[userVar] ? errorsBag[userVar].errors : null}
              />
            )}
          </div>
        );
      })}

      <FileUploader
        me={me}
        title="Your Photo ID"
        description="We require a valid photo id of you. We accept the following. Passport, drivers license"
        files={
          userRentalApplicantData.user.photoIdentification
            ? [userRentalApplicantData.user.photoIdentification]
            : []
        }
        maxFilesAllowed={1}
        removeFile={file => {}}
        refetchQueries={[
          { query: CURRENT_USER_QUERY, fetchPolicy: 'network-only' },
        ]}
        recieveFile={file => {
          updateRentalGroupApplicant({
            variables: {
              data: {
                user: {
                  update: {
                    photoIdentification: {
                      connect: {
                        id: file.id,
                      },
                    },
                  },
                },
              },
              where: {
                id: userRentalApplicantData.id,
              },
            },
          });
        }}
      />
    </div>
  );
};

UserDetailsStep.propTypes = {
  applicantData: PropTypes.any.isRequired,
  completed: PropTypes.any.isRequired,
  errorsBag: PropTypes.any.isRequired,
  me: PropTypes.shape({
    id: PropTypes.any,
    identificationNumber: PropTypes.any,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  property: PropTypes.any.isRequired,
  rentalApplication: PropTypes.shape({
    applicants: PropTypes.shape({
      find: PropTypes.func,
    }),
  }).isRequired,
  updateRentalGroupApplicant: PropTypes.func.isRequired,
  userInfo: PropTypes.any.isRequired,
};

export default UserDetailsStep;

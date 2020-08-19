// const DetailsStep = () => {
//   return <h2>I am details Step</h2>;
// };
// export default DetailsStep;

import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';

import { USER_PROFILE_CONF } from '../../../lib/configs/userProfileConfig';
import TextInput from '../../../styles/TextInput';
import InputErrors from '../../InputErrors/index';
import PhotoIdUploader from '../../PhotoIdUploader/index';
import { isEmptyObj } from '../../../lib/isEmpty';
import { Button, Typography } from '@material-ui/core';
import FileUploader from '../../FileUploader';
import { CURRENT_USER_QUERY } from '../../../graphql/queries';

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

export default UserDetailsStep;

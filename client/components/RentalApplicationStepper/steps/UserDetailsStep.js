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
  // const [activeStep, setActiveStep] = useState([]) // Um what was this meant to be
  // just goes to show we need to refactor everything to useState, useEffect, useQuery etc, useMutation 90%
  // just a thought, since a user can only update 1 rentalAPplication at a time, why not store it in local state
  // then use hooks to update the local apollo state
  // probably easy to get updates
  // const hasPhotoId = !isEmpty(me.photoIdentification)
  const userRentalApplicantData = rentalApplication.applicants.find(
    applicant => applicant.user.id === me.id
  );
  const hasPhotoId = me.identificationNumber;
  const [showUploader, setShowUploader] = useState(!hasPhotoId);
  if (completed) return <Typography>Step is complete</Typography>;

  //   approved: true
  // completed: null
  // email: null
  // firstName: null
  // id: "ckc1nteb5gpdr09994yu0c6tb"
  // lastName: null
  // preTenancyApplicationForm: null
  // user:
  // {email: "heathd@rehouser.co.nz"
  // firstName: "Heath R"
  // id: "ckc1m3rc00oek0975ghr75upe"
  // lastName: "Dunlop"
  // phone: "0212439998"
  // photoIdentification:
  // createdAt: "2020-06-30T08:19:11.441Z"
  // encoding: "7bit"
  // filename: "12421.jpg"
  // id: "ckc1nto0h0ujj0975b044u3l0"
  // mimetype: "image/jpeg"
  // updatedAt: "2020-06-30T08:19:11.441Z"
  // url: "https://res.cloudinary.com/dkhe0hx1r/image/upload/v1593505150/nzlim2m0fpqhaseanvta.jpg"
  // __typename: "File"
  // __proto__: Object
  // profilePhoto: null
  // rehouserStamp: null}

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
      {/* title,
    description,
    files,
    maxFilesAllowed,
    recieveFile,
    removeFile,
    fileRemovedFromServer,
    refetchQueries,
    updateCacheOnRemovedFile, */}
      {/* {!me.photoIdentification && (
        <FileUploader
          me={me}
          files={[]}
          maxFilesAllowed={1}
          recieveFile={file => {
            console.log(
              'Well here is the created file, maybe add it to the user',
              file
            );

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
      )}
      {me.photoIdentification && (
        <div>
          <h4>WE have your photo Id</h4>
          <Button
            onClick={() => setShowUploader(!showUploader)}
            variant="outlined">
            {showUploader ? 'close photo id' : 'SHow Photo id'}
          </Button>
        </div>
      )}
      {showUploader && <PhotoIdUploader me={me} />} */}
      {/* <PhotoIdUploader me={me} /> */}
    </div>
  );
};

export default UserDetailsStep;

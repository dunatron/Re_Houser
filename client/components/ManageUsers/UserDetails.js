import React, { useState, Fragment } from 'react';

import {
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@material-ui/core';
import Image from 'material-ui-image';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { useLazyQuery } from '@apollo/client';

import { SINGLE_USER_QUERY } from '@/Gql/queries/index';

import Loader from '@/Components/Loader';
import Error from '@/Components/ErrorMessage';
import useStyles from './useStyles';
import moment from 'moment';

import UpdateUser from './UpdateUser';

export default function UserDetails({ userId, me }) {
  const classes = useStyles();
  const accordionDetailsId = `user-details-accordion-${userId}`;
  const accordionFormId = `user-update-form-accordion-${userId}`;

  const [fetchUser, { called, loading, data, error }] = useLazyQuery(
    SINGLE_USER_QUERY
  );

  const handleFetchUser = (e, nativeExpanded) => {
    if (!called)
      fetchUser({
        variables: {
          where: {
            id: userId,
          },
        },
      });
  };

  return (
    <Fragment>
      <Accordion onChange={handleFetchUser} square>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={accordionDetailsId}
          id={accordionDetailsId}>
          <Typography variant="body2">User Details</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
          <Fragment>
            {called && loading && (
              <Loader loading={loading} text="Fetching users details" />
            )}
            <Error error={error} />
            {data && (
              <Fragment>
                <RenderFetchedDetails user={data.user} />
              </Fragment>
            )}
          </Fragment>
        </AccordionDetails>
      </Accordion>
      <Accordion onChange={handleFetchUser} square>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={accordionFormId}
          id={accordionFormId}>
          <Typography variant="body2">Update User Form</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
          <Fragment>
            {called && loading && (
              <Loader loading={loading} text="Fetching users details" />
            )}
            <Error error={error} />
            {data && (
              <Fragment>
                <UpdateUser user={data.user} me={me} />
              </Fragment>
            )}
          </Fragment>
        </AccordionDetails>
      </Accordion>
    </Fragment>
  );
}

const StringDetailItem = ({ label, value }) => {
  const classes = useStyles();
  return (
    <Box className={classes.detailItem}>
      <Typography className={classes.detailLabel} variant="caption">
        {label}
      </Typography>
      <Typography className={classes.detailValue} variant="body2">
        {value}
      </Typography>
    </Box>
  );
};

const ImageDetailItem = ({ label, value }) => {
  const classes = useStyles();
  return (
    <Box className={classes.detailItem}>
      <Typography className={classes.detailLabel} variant="caption">
        {label}
      </Typography>
      <Typography className={classes.detailValue} variant="body2">
        {value}
      </Typography>
    </Box>
  );
};

const RenderFetchedDetails = ({
  user: {
    phone,
    bankDetails,
    emailValidated,
    acceptedSignupTerms,
    acceptedTermsOfEngagement,
    createdAt,
    updatedAt,
    dob,
    bondLodgementNumber,
    emergencyContactName,
    emergencyContactNumber,
    emergencyContactEmail,
    referees,
    rehouserStamp,
    adminSettings,
    identificationNumber,
    currentAddress,
    proofOfAddress,
    photoIdentification,
    profilePhoto,
    signature,
    permissions,
  },
}) => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.details}>
        <StringDetailItem label="Phone" value={phone} />
        {/* Below is actually its own entity with properties */}
        {/* <StringDetailItem label="BankDetails" value={bankDetails} /> */}
        <StringDetailItem
          label="Email Validated"
          value={emailValidated === true ? 'YES' : 'NO'}
        />
        <StringDetailItem
          label="acceptedSignupTerms"
          value={acceptedSignupTerms === true ? 'YES' : 'NO'}
        />
        <StringDetailItem
          label="acceptedTermsOfEngagement"
          value={acceptedTermsOfEngagement === true ? 'YES' : 'NO'}
        />
        <StringDetailItem
          label="createdAt"
          value={moment(createdAt).format('llll')}
        />
        <StringDetailItem
          label="updatedAt"
          value={moment(updatedAt).format('llll')}
        />
        <StringDetailItem
          label="dob"
          value={moment(updatedAt).format('ddd, MMM Do, YYYY')}
        />

        <StringDetailItem
          label="bondLodgementNumber"
          value={bondLodgementNumber}
        />
        <StringDetailItem
          label="Photo ID Number"
          value={identificationNumber}
        />
        <StringDetailItem
          label="emergencyContactName"
          value={emergencyContactName}
        />
        <StringDetailItem
          label="emergencyContactNumber"
          value={emergencyContactNumber}
        />
        <StringDetailItem
          label="emergencyContactEmail"
          value={emergencyContactEmail}
        />
        <StringDetailItem
          label="RehouserStamp"
          value={rehouserStamp === true ? 'YES' : 'NO'}
        />
      </Box>
      {/* ADMIN SETTINGS */}
      {permissions.includes('ADMIN') && (
        <Box className={classes.details}>
          <StringDetailItem
            label="appraisalCreatedSub"
            value={adminSettings.appraisalCreatedSub === true ? 'YES' : 'NO'}
          />
          <StringDetailItem
            label="propertyCreatedSub"
            value={adminSettings.propertyCreatedSub === true ? 'YES' : 'NO'}
          />
          <StringDetailItem
            label="rentalApplicationCreatedSub"
            value={
              adminSettings.rentalApplicationCreatedSub === true ? 'YES' : 'NO'
            }
          />
        </Box>
      )}
      {/* Referees */}
      <Box className={classes.details}>
        {referees.length === 0 && (
          <Box className={classes.detailItem}>
            <Typography className={classes.detailLabel} variant="body1">
              NO REFEREES
            </Typography>
          </Box>
        )}
        {referees.map((referee, idx) => {
          return (
            <Box className={classes.details}>
              <StringDetailItem label="Name" value={referee.name} />
              <StringDetailItem label="Email" value={referee.email} />
              <StringDetailItem label="Phone" value={referee.phone} />
              <StringDetailItem
                label="Relationship"
                value={referee.relationship}
              />
            </Box>
          );
        })}
      </Box>
      {/* Current Address */}
      <Box className={classes.details}>
        <StringDetailItem
          label="currentAddress"
          value={currentAddress && currentAddress.desc}
        />
      </Box>
      {/* FILES */}
      <Box className={classes.details}>
        <Box className={classes.detailItem}>
          <Typography className={classes.detailLabel}>
            proofOfAddress
          </Typography>
          <Typography className={classes.detailValue}>
            {proofOfAddress ? proofOfAddress.url : 'NO PROOF OF ADDRESS'}
          </Typography>
        </Box>
        <ImageDetailItem
          label="photoIdentification"
          value={photoIdentification && <Image src={photoIdentification.url} />}
        />
        <ImageDetailItem
          label="profilePhoto"
          value={profilePhoto && <Image src={profilePhoto.url} />}
        />

        <Box className={classes.detailItem}>
          <Typography className={classes.detailLabel}>signature</Typography>
          <Typography className={classes.detailValue}>
            {signature ? signature.url : 'NO SIGNATURE'}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

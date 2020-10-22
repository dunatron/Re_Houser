import React, { useState, Fragment } from 'react';

import {
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { useLazyQuery } from '@apollo/client';

import { SINGLE_USER_QUERY } from '@/Gql/queries/index';

import Loader from '@/Components/Loader';
import Error from '@/Components/ErrorMessage';
import useStyles from './useStyles';
import moment from 'moment';

export default function UserDetails({ userId }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const accordionId = `user-details-accordion-${userId}`;

  const [fetchUser, { called, loading, data, error }] = useLazyQuery(
    SINGLE_USER_QUERY
  );

  const handleToggleExpanded = (e, nativeExpanded) => {
    if (!called)
      fetchUser({
        variables: {
          where: {
            id: userId,
          },
        },
      });
    setExpanded(nativeExpanded);
  };

  return (
    <Accordion expanded={expanded} onChange={handleToggleExpanded} square>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={accordionId}
        id={accordionId}>
        <Typography variant="body2">User Details</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        {expanded && (
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
        )}
      </AccordionDetails>
    </Accordion>
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
        <StringDetailItem label="BankDetails" value={bankDetails} />
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
          <StringDetailItem
            label="leaseCreatedSub"
            value={adminSettings.leaseCreatedSub === true ? 'YES' : 'NO'}
          />
        </Box>
      )}
      {/* Referees */}
      <Box className={classes.details}>
        {referees.length === 0 && (
          <Box className={classes.detailItem}>
            <Typography className={classes.detailLabel}>NO REFEREES</Typography>
          </Box>
        )}
        {referees.map((referee, idx) => {
          return (
            <Box className={classes.details}>
              <Box className={classes.detailItem}>
                <Typography className={classes.detailLabel}>Name</Typography>
                <Typography className={classes.detailValue}>
                  {referee.name}
                </Typography>
              </Box>
              <Box className={classes.detailItem}>
                <Typography className={classes.detailLabel}>Email</Typography>
                <Typography className={classes.detailValue}>
                  {referee.email}
                </Typography>
              </Box>
              <Box className={classes.detailItem}>
                <Typography className={classes.detailLabel}>Phone</Typography>
                <Typography className={classes.detailValue}>
                  {referee.phone}
                </Typography>
              </Box>
              <Box className={classes.detailItem}>
                <Typography className={classes.detailLabel}>
                  Relationship
                </Typography>
                <Typography className={classes.detailValue}>
                  {referee.relationship}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
      {/* Current Address */}
      <Box className={classes.details}>
        <Box className={classes.detailItem}>
          <Typography className={classes.detailLabel}>
            currentAddress
          </Typography>
          <Typography className={classes.detailValue}>
            {currentAddress && currentAddress.desc}
          </Typography>
        </Box>
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
        <Box className={classes.detailItem}>
          <Typography className={classes.detailLabel}>
            photoIdentification
          </Typography>
          <Typography className={classes.detailValue}>
            {photoIdentification ? photoIdentification.url : 'NO PHOTO ID'}
          </Typography>
        </Box>
        <Box className={classes.detailItem}>
          <Typography className={classes.detailLabel}>profilePhoto</Typography>
          <Typography className={classes.detailValue}>
            {profilePhoto ? profilePhoto.url : 'NO PROFILE PHOTO'}
          </Typography>
        </Box>
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

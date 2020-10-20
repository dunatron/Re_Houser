import PropTypes from 'prop-types';
import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { SINGLE_RENTAL_APPLICATION_QUERY } from '@/Gql/queries';
import Error from '@/Components/ErrorMessage';
import { Paper, Box, Typography } from '@material-ui/core';
import OwnerView from './views/OwnerView';
import ApplicantView from './views/ApplicantView';
import PageHeader from '@/Components/PageHeader';
import RentalApplicationStepper from '@/Components/RentalApplicationStepper';
import RehouserPaper from '@/Styles/RehouserPaper';
import isAdmin from '@/Lib/isAdmin';
import DisplayJson from '@/Components/DisplayJson';
import PropertyRentalApplications from '@/Components/PropertyDetails/Applications';

/**
 * page is wrapped in a must be loggedIn
 */
const RentalApplication = ({ id, me }) => {
  const { data, loading, error } = useQuery(SINGLE_RENTAL_APPLICATION_QUERY, {
    variables: {
      where: {
        id: id,
      },
    },
  });
  if (loading) return 'Loading';
  if (error) return <Error error={error} />;
  const {
    rentalApplication: {
      __typename,
      visibility,
      stage,
      finalised,
      owner,
      applicants,
    },
  } = data;

  const isOwner = me.id === owner.id;

  const isAnAdmin = isAdmin(me);

  const isAnApplicant = data.rentalApplication.applicants
    ? data.rentalApplication.applicants.includes(me.id)
    : false;

  console.log('isAnApplicant => ', isAnApplicant);

  return (
    <>
      <PageHeader
        title="Rental application"
        intro={`Rental application for ${data.rentalApplication.property.location}`}
        metaData={{
          title: `${data.rentalApplication.property.location} rental application`,
          content: `Rental application for ${data.rentalApplication.property.location}`,
        }}
        children={[
          <Typography key={1} gutterBottom>
            Application ID: {data.rentalApplication.id}
          </Typography>,
        ]}
      />
      {isAnAdmin && (
        <RehouserPaper>
          <Typography gutterBottom>
            You are an admin and can therefore accept rental applications on
            behalf of the landlord
          </Typography>
          <DisplayJson
            title="Rental Application data"
            json={data.rentalApplication}
          />
        </RehouserPaper>
      )}
      <RehouserPaper>
        {isAnAdmin && (
          <Box>
            <Typography gutterBottom>
              Admin: Please be careful when accepting rental applications. They will then create a lease that needs to be signed by the landlord and the tenants
            </Typography>
            <PropertyRentalApplications
              property={data.rentalApplication.property}
            />
          </Box>
        )}
        {isOwner && (
          <>
            <OwnerView rentalApplication={data.rentalApplication} me={me} />
            <RentalApplicationStepper
              application={data.rentalApplication}
              me={me}
              property={data.rentalApplication.property}
            />
          </>
        )}
        {!isOwner && isAnApplicant && (
          <>
            <ApplicantView rentalApplication={data.rentalApplication} me={me} />
            <RentalApplicationStepper
              application={data.rentalApplication}
              me={me}
              property={data.rentalApplication.property}
            />
          </>
        )}
      </RehouserPaper>
    </>
  );
};

RentalApplication.propTypes = {
  id: PropTypes.any,
  me: PropTypes.shape({
    id: PropTypes.any,
  }).isRequired,
};

export default RentalApplication;

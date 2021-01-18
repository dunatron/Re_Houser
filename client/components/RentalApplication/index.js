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
import DisplayJson from '@/Components/DisplayJson';
import PropertyRentalApplications from '@/Components/PropertyDetails/Applications';
import RentalApplicationSub from '@/Components/SubscriptionComponents/RentalApplicationSub';
import { toast } from 'react-toastify';

import ApplyToGroup from './ApplyToGroup';

import isAdmin from '@/Lib/isAdmin';
import { _isRentalApplicant } from '@/Lib/_isRentalApplicant';
import { _isRentalApplicationOwner } from '@/Lib/_isRentalApplicationOwner';

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

  // Maybe we could sub into changes for a rentalApplication?

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

  const isAnAdmin = isAdmin(me);
  const isOwner = _isRentalApplicationOwner(me.id, owner);
  const isAnApplicant = _isRentalApplicant(me.id, applicants);

  const handleSubData = ({ client, subscriptionData }) => {
    toast(<div>Rental APplication has been updated</div>);
  };

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
      {/* <RentalApplicationSub variables={{}} onSubscriptionData={handleSubData} /> */}
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
              Admin: Please be careful when accepting rental applications. They
              will then create a lease that needs to be signed by the landlord
              and the tenants
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
        {!isAnApplicant && (
          <>
            <div>Would you like to apply for this application</div>
            <ApplyToGroup applicationId={data.rentalApplication.id} />
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

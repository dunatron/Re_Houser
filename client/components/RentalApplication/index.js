import PropTypes from 'prop-types';
import React, { useState } from 'react';
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
import Button from '@/Styles/Button';

import isAdmin from '@/Lib/isAdmin';
import { _isRentalApplicant } from '@/Lib/_isRentalApplicant';
import { _isRentalApplicationOwner } from '@/Lib/_isRentalApplicationOwner';

import PropertyPublicDetails from '@/Components/Property/PublicDetails';
import ApplicationFullDetails from '@/Components/RentalApplication/FullDetails';
import Modal from '@/Components/Modal';

/**
 * page is wrapped in a must be loggedIn
 */
const RentalApplication = ({ id, me, invited }) => {
  // open={isPropertyModalOpen} close={handleClosePropertyModal}
  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

  const { data, loading, error } = useQuery(SINGLE_RENTAL_APPLICATION_QUERY, {
    variables: {
      where: {
        id: id,
      },
    },
  });

  const handleClosePropertyModal = () => setIsPropertyModalOpen(false);
  const handleOpenPropertyModal = () => setIsPropertyModalOpen(true);

  const handleCloseApplicationModal = () => setIsApplicationModalOpen(false);
  const handleOpenApplicationModal = () => setIsApplicationModalOpen(true);

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
  const isOwner = me ? _isRentalApplicationOwner(me.id, owner) : false;
  const isAnApplicant = me ? _isRentalApplicant(me.id, applicants) : false;

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
          <Button variant="contained" onClick={handleOpenPropertyModal}>
            Property Details
          </Button>,
          <Button variant="contained" onClick={handleOpenApplicationModal}>
            Application Details
          </Button>,
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
        {invited && !isAnApplicant && (
          <Typography gutterBottom>
            You have been invited to the application. You will still need to
            apply with the below button and fill out the details in the form
          </Typography>
        )}

        {/* Possibly good idea to show a Property Details Modal. Good idea to make a full details to implememt on search item view */}
        {!isAnApplicant && (
          <>
            <Typography gutterBottom>
              Click the below Button to apply to the application
            </Typography>
            <ApplyToGroup applicationId={data.rentalApplication.id} />
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
      <Modal open={isPropertyModalOpen} close={handleClosePropertyModal}>
        <PropertyPublicDetails />
      </Modal>
      <Modal open={isApplicationModalOpen} close={handleCloseApplicationModal}>
        <ApplicationFullDetails id={data.rentalApplication.id} />
      </Modal>
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

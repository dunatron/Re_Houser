import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { CREATE_RENTAL_APPLICATION } from '@/Gql/mutations/index';
import {
  RENTAL_APPLICATIONS_QUERY,
  CURRENT_USER_QUERY,
} from '@/Gql/queries/index';
import RentalApplications from './RentalApplications';
import Button from '@material-ui/core/Button';
import Error from '@/Components/ErrorMessage/index';
import Modal from '@/Components/Modal/index';
import RentalApplicationStepperComponent from '@/Components/RentalApplicationStepper/index';
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify';
import OpenSuperLoginButton from '@/Components/SuperLogin/OpenSuperLoginButton';
import Router from 'next/router';
import ButtonLoader from '@/Components/Loader/ButtonLoader';

const handleLink = ({ route, query }) => {
  Router.push({
    pathname: route,
    query: query,
  });
};

const Apply = props => {
  const user = useQuery(CURRENT_USER_QUERY);
  const me = user.data ? user.data.me : null;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [applicationData, setApplicationData] = useState({});

  const handleComplete = data => {
    toast.success(
      <Typography variant="body1">
        New Rental Application has been created. Please complete it and send it
        to the landlord, placing it into the PENDING stage
      </Typography>
    );
    handleLink({
      route: '/tenant/applications/application',
      query: {
        id: data.createRentalApplication.id,
      },
    });
  };

  const [createApplication, { error, loading }] = useMutation(
    CREATE_RENTAL_APPLICATION,
    {
      variables: {
        data: {
          stage: 'INITIALIZING',
          visibility: 'PRIVATE',
          title: `${me && me.firstName} ${me && me.lastName} Application for ${
            props.property.location
          }`,
          finalised: false,
          property: {
            connect: {
              id: props.property.id,
            },
          },
          owner: {
            connect: {
              id: me !== null ? me.id : null,
            },
          },
        },
      },
      onCompleted: handleComplete,
    }
  );

  if (!me) {
    return (
      <div style={{ maxWidth: '100vw' }}>
        <Typography variant="body1" gutterBottom>
          You need to sign in or up to apply
        </Typography>
        <OpenSuperLoginButton />
      </div>
    );
  }

  return (
    <div>
      <div style={{ padding: '16px' }}>
        <Error error={error} />
        <Modal
          open={modalIsOpen}
          title={`Application for ${location}`}
          close={() => setModalIsOpen(false)}>
          <RentalApplicationStepperComponent
            property={props.property}
            me={me}
            application={applicationData}
          />
        </Modal>
        <ButtonLoader
          text="Apply for property"
          successText="Finished creating application"
          loading={loading}
          onClick={() => createApplication()}
        />
      </div>
      {/* <RentalApplications
        propertyId={props.property.id}
        property={props.property}
        me={me}
        openRentalAppModal={rentalData => {
          setModalIsOpen(true);
          setApplicationData(rentalData);
        }}
      /> */}
    </div>
  );
};

Apply.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.any,
    location: PropTypes.any,
  }).isRequired,
};

export default Apply;

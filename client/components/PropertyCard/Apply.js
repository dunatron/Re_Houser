import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { CREATE_RENTAL_APPLICATION } from '../../graphql/mutations/index';
import {
  RENTAL_APPLICATIONS_QUERY,
  CURRENT_USER_QUERY,
} from '../../graphql/queries/index';

import RentalApplications from './RentalApplications';
import Button from '@material-ui/core/Button';
import Error from '../ErrorMessage/index';
import ChangeRouteButton from '../Routes/ChangeRouteButton';
import Modal from '../Modal/index';
import RentalApplicationStepperComponent from '../RentalApplicationStepper/index';
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify';
import OpenSuperLoginButton from '../SuperLogin/OpenSuperLoginButton';

import Router from 'next/router';

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

  const [createApplication, createApplicationProps] = useMutation(
    CREATE_RENTAL_APPLICATION,
    {
      variables: {
        data: {
          stage: 'INITIALIZING',
          visibility: 'PRIVATE',
          title: `Jon Doe's Application`,
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
      update: async (cache, payload) => {
        try {
          const variables = {
            where: {
              OR: [
                {
                  visibility: 'PUBLIC',
                },
                {
                  owner: {
                    id: me.id,
                  },
                },
              ],
              AND: {
                property: {
                  id: props.property.id,
                },
              },
            },
          };
          const data = await cache.readQuery({
            query: RENTAL_APPLICATIONS_QUERY,
            variables: variables,
          });
          const applicationId = payload.data.createRentalApplication.id;
          const haveApplication = data.rentalApplications.find(
            application => application.id === applicationId
          );
          // return early as to not add to cache subs are listening
          if (haveApplication) {
            return;
          }
          data.rentalApplications.push({
            ...payload.data.createRentalApplication,
          });
          cache.writeQuery({
            query: RENTAL_APPLICATIONS_QUERY,
            data,
            variables: variables,
          });
        } catch (e) {
        } finally {
          toast.success(
            <div>
              <p>
                New Rental Application has been created. Please complete it and
                send it to the landlord, placing it into the PENDING stage
              </p>
            </div>
          );
          handleLink({
            route: '/applications/application',
            query: {
              id: payload.data.createRentalApplication.id,
            },
          });
        }
      },
    }
  );

  if (!me)
    return (
      <div style={{ maxWidth: '100vw' }}>
        <Typography variant="body1" gutterBottom>
          You need to sign in or up to apply
        </Typography>
        <OpenSuperLoginButton />
      </div>
    );

  return (
    <div>
      <div style={{ padding: '16px' }}>
        <Error error={createApplicationProps.error} />
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
        <Button
          disabled={createApplicationProps.loading}
          color="primary"
          variant="outlined"
          size="small"
          style={{ padding: '16px', margin: '0 0 16px 0' }}
          onClick={() => createApplication()}>
          {createApplicationProps.loading
            ? 'Processing Rental Application...'
            : 'Apply for property'}
        </Button>
      </div>
      <RentalApplications
        propertyId={props.property.id}
        property={props.property}
        me={me}
        openRentalAppModal={rentalData => {
          setModalIsOpen(true);
          setApplicationData(rentalData);
        }}
      />
    </div>
  );
};

export default Apply;

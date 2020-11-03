import React, { Component, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import { InsulationStatementForm } from '@/Components/Forms/index';
import { SINGLE_OWNER_PROPERTY_QUERY } from '@/Gql/queries/index';

import Map from '@/Components/Map/index';
import CarouselSlider from '@/Components/CarouselSlider';
import DetailItem from '@/Components/PropertyCard/DetailItem';
import {
  IconButton,
  Button,
  Switch,
  Typography,
  Paper,
} from '@material-ui/core';
import RehouserPaper from '@/Styles/RehouserPaper';
import Card from '@/Styles/Card';
//icons
import EditIcon from '@/Styles/icons/EditIcon';
import MoreIcon from '@/Styles/icons/MoreIcon';
import DetailsIcon from '@/Styles/icons/DetailsIcon';
import CameraIcon from '@/Styles/icons/CameraIcon';
import CloseIcon from '@/Styles/icons/CloseIcon';
import CheckIcon from '@/Styles/icons/CheckIcon';
// Update variable components ToDo: move to own file
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/client';
import InputModal from '@/Components/Modal/InputModal';
import TextInput from '@/Styles/TextInput';
import DateInput from '@/Components/Inputs/DateInput';
import Error from '@/Components/ErrorMessage/index';
import ChangeRouteButton from '@/Components/Routes/ChangeRouteButton';
import UpdatePropertyVariable from './UpdatePropertyVariable';

import { UPDATE_PROPERTY_MUTATION } from '@/Gql/mutations/index';
import { OWNER_PROPERTIES_QUERY } from '@/Gql/queries/index';
import useKeyPress from '@/Lib/useKeyPress';
import EditProperty from './Edit';

import {
  NowToDate,
  LongDatePretty,
  LeaseLength,
} from '@/Components/LeaseManager/LeaseLengthInfo';

import UserDetails from '@/Components/UserDetails';

import FileUploader from '@/Components/FileUploader';
import { FileInfoFragment } from '@/Gql/fragments/fileInfo';
import { PropertyInfoFragment } from '@/Gql/fragments/propertyInfo';
import SaveButtonLoader from '@/Components/Loader/SaveButtonLoader';
import AdminDetails from './AdminDetails';
import DetailItems from './DetailItems';
import ImportantDetails from './ImportantDetails';
import PropertyImages from './Images';

import AddUserToList from '@/Components/User/AddUserToList';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  detailsWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(2),
  },
  detailItem: {
    padding: '0 16px 16px 0',
    display: 'flex',
    alignItems: 'center',
  },
  variablesHeader: {
    marginTop: '16px',
    marginLeft: '16px',
  },
}));

const Details = props => {
  const { property, isAdmin, me, isOwner, isAgent } = props;
  const classes = useStyles();

  const PROPERTY_SINGLE_PROPERTY_MUTATION = gql`
    mutation UPDATE_PROPERTY_MUTATION($id: ID!, $data: PropertyUpdateInput!) {
      updateProperty(id: $id, data: $data) {
        id
        images {
          ...fileInfo
        }
        ...propertyInfo
      }
    }
    ${PropertyInfoFragment}
    ${FileInfoFragment}
  `;
  const [updateProperty, updatePropertyPayload] = useMutation(
    PROPERTY_SINGLE_PROPERTY_MUTATION
  );

  const handleAddOwner = result =>
    updateProperty({
      variables: {
        id: property.id,
        data: {
          owners: {
            connect: {
              id: result.id,
            },
          },
        },
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateProperty: {
          __typename: 'Property',
          ...property,
          owners: [
            ...property.owners,
            {
              ...result,
              __typename: 'User',
            },
          ],
        },
      },
    });

  const handleRemoveOwner = result =>
    updateProperty({
      variables: {
        id: property.id,
        data: {
          owners: {
            disconnect: {
              id: result.id,
            },
          },
        },
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateProperty: {
          __typename: 'Property',
          ...property,
          owners: property.owners.filter(a => a.id !== result.id),
        },
      },
    });

  const handleAddAgent = result =>
    updateProperty({
      variables: {
        id: property.id,
        data: {
          agents: {
            connect: {
              id: result.id,
            },
          },
        },
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateProperty: {
          __typename: 'Property',
          ...property,
          agents: [
            ...property.agents, // there may not be agents already?
            {
              email: result.email ? result.email : '',
              firstName: result.firstName
                ? `Adding agent ${result.firstName}`
                : 'Adding Agent',
              id: result.id ? result.id : '',
              lastName: result.lastName ? result.lastName : '',
              phone: result.phone ? result.phone : '',
              profilePhoto: result.profilePhoto ? result.profilePhoto : '',
              rehouserStamp: result.rehouserStamp ? result.rehouserStamp : '',
              __typename: 'User',
            },
          ],
        },
      },
    });

  const handleRemoveAgent = result =>
    updateProperty({
      variables: {
        id: property.id,
        data: {
          agents: {
            disconnect: {
              id: result.id,
            },
          },
        },
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateProperty: {
          __typename: 'Property',
          ...property,
          agents: property.agents.filter(a => a.id !== result.id),
        },
      },
    });

  return (
    <div>
      <RehouserPaper>
        {me.isWizard && (
          <>
            <Typography gutterBottom variant="h6">
              You are A Wizard
            </Typography>
            <Typography gutterBottom variant="body2">
              As A Wizard you will need to add Agents against this property for
              it to be managed property. An Agent Acts for rehouser on behalf of
              the property owner
            </Typography>
          </>
        )}

        {isOwner && (
          <>
            <Typography gutterBottom variant="h6">
              You are an owner of the Property
            </Typography>
            {property.rehouserManaged && (
              <Typography gutterBottom variant="body2">
                The Property is now managed by Rehouser at this point. You will
                recieve updates from us along the way allowing you to see the
                progress of your property
              </Typography>
            )}
          </>
        )}
        {isAgent && (
          <>
            <Typography gutterBottom variant="h6">
              You are an Agent for this property
            </Typography>
            <Typography gutterBottom variant="body2">
              As an Agent you will be in charge of advertising the property and
              getting a lease signed as soon as possible
            </Typography>
          </>
        )}
      </RehouserPaper>
      {isAdmin && (
        <Card>
          <ChangeRouteButton
            title="Edit with Original Form"
            route="/landlord/properties/property/edit"
            query={{ id: property.id }}
          />
        </Card>
      )}

      <ImportantDetails property={property} />
      <DetailItems
        title={isAdmin ? 'Admin Section' : 'Admins Only'}
        property={property}
        items={
          isAdmin
            ? [
                {
                  name: 'onTheMarket',
                  label: 'On The Market',
                  type: 'boolean',
                  icon: <CameraIcon color="default" />,
                  disabled: true,
                },
                {
                  name: 'rehouserManaged',
                  label: 'Managed by Rehouser',
                  type: 'boolean',
                  icon: <CameraIcon color="default" />,
                  disabled: true,
                },
              ]
            : []
        }
      />
      <RehouserPaper
        square
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
        <InsulationStatementForm
          data={null}
          propertyId={property.id}
          property={property}
          insulationFormId={
            property.insulationForm ? property.insulationForm.id : null
          }
          onSubmit={data => {}}
          recieveFile={file => {
            updateProperty({
              variables: {
                id: property.id,
                data: {
                  insulationStatementFile: {
                    connect: {
                      id: file.id,
                    },
                  },
                },
              },
            });
          }}
        />
      </RehouserPaper>
      <DetailItems
        title="Property Variables"
        property={property}
        items={[
          {
            name: 'rent',
            label: 'Rent',
            type: 'number',
            icon: <CameraIcon color="default" />,
          },
          {
            name: 'moveInDate',
            label: 'Move in Date',
            type: 'date',
            icon: <CameraIcon color="default" />,
          },
          {
            name: 'expiryDate',
            label: 'Expiry date',
            type: 'date',
            icon: <CameraIcon color="default" />,
          },
          {
            name: 'rooms',
            label: 'Rooms',
            type: 'int',
            icon: <CameraIcon color="default" />,
          },
        ]}
      />
      <RehouserPaper>
        <LeaseLength
          title="Lease will be for"
          moveInDate={property.moveInDate}
          expiryDate={property.expiryDate}
        />
      </RehouserPaper>
      <RehouserPaper>
        <Typography>Property creator</Typography>
        <UserDetails me={me} user={property.creator} />
      </RehouserPaper>
      <RehouserPaper>
        <Typography>Owners</Typography>
        {property.owners.length > 0 &&
          property.owners.map((owner, idx) => {
            return <UserDetails me={me} user={owner} />;
          })}
        {me.isWizard && (
          <AddUserToList
            id="properties-owners"
            filters=""
            selected={property.owners}
            me={me}
            add={handleAddOwner}
            remove={handleRemoveOwner}
            selectedListLabel="Properties Owners"
          />
        )}
      </RehouserPaper>
      <RehouserPaper>
        <Typography>Agents</Typography>
        {!me.isWizard && (
          <Typography>
            Ability for admin to add users as agent?? probably a wizard thing
          </Typography>
        )}
        {property.agents.length > 0 &&
          property.agents.map((agent, idx) => {
            return <UserDetails me={me} user={agent} />;
          })}
        {me.isWizard && (
          <AddUserToList
            id="properties-agents"
            filters="(permissions:ADMIN OR permissions:WIZARD)"
            selected={property.agents}
            me={me}
            add={handleAddAgent}
            remove={handleRemoveAgent}
            selectedListLabel="Properties Agents"
          />
        )}
      </RehouserPaper>
      <Card disablePadding>
        <PropertyImages property={property} updateProperty={updateProperty} />
      </Card>
      <Card disablePadding>
        <Map
          center={{
            lat: property.locationLat,
            lng: property.locationLng,
          }}
        />
      </Card>
    </div>
  );
};

Details.propTypes = {
  property: PropTypes.shape({
    expiryDate: PropTypes.any,
    id: PropTypes.any,
    images: PropTypes.shape({
      map: PropTypes.func,
    }),
    insulationForm: PropTypes.shape({
      id: PropTypes.any,
    }),
    isLeased: PropTypes.any,
    leaseId: PropTypes.any,
    locationLat: PropTypes.any,
    locationLng: PropTypes.any,
    moveInDate: PropTypes.any,
    onTheMarket: PropTypes.any,
    placeId: PropTypes.any,
    rent: PropTypes.any,
    rooms: PropTypes.any,
  }).isRequired,
};

export default Details;

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

import FileUploader from '@/Components/FileUploader';
import { FileInfoFragment } from '@/Gql/fragments/fileInfo';
import SaveButtonLoader from '@/Components/Loader/SaveButtonLoader';
import AdminDetails from './AdminDetails';
import DetailItems from './DetailItems';
import ImportantDetails from './ImportantDetails';
import PropertyImages from './Images';

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
  const { property, isAdmin } = props;
  const classes = useStyles();

  const PROPERTY_SINGLE_PROPERTY_MUTATION = gql`
    mutation UPDATE_PROPERTY_MUTATION($id: ID!, $data: PropertyUpdateInput!) {
      updateProperty(id: $id, data: $data) {
        id
        images {
          ...fileInfo
        }
      }
    }
    ${FileInfoFragment}
  `;
  const [updateProperty, updatePropertyPayload] = useMutation(
    PROPERTY_SINGLE_PROPERTY_MUTATION
  );
  return (
    <div>
      <Typography
        variant="h5"
        // color="primary"
        gutterBottom={true}
        className={classes.variablesHeader}>
        Manage
      </Typography>
      {isAdmin && (
        <ChangeRouteButton
          title="Edit with Original Form"
          route="/landlord/properties/property/edit"
          query={{ id: property.id }}
        />
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
            name: 'onTheMarket',
            label: 'On The Market',
            type: 'boolean',
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
      <PropertyImages property={property} updateProperty={updateProperty} />
      <Map
        center={{
          lat: property.locationLat,
          lng: property.locationLng,
        }}
      />
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

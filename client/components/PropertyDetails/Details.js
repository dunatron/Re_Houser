import React, { Component, useState, useRef, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { InsulationStatementForm } from '../Forms/index';
import { SINGLE_OWNER_PROPERTY_QUERY } from '../../graphql/queries/index';

import Map from '../Map/index';
import CarouselSlider from '../CarouselSlider';
import DetailItem from '../PropertyCard/DetailItem';
import {
  IconButton,
  Button,
  Switch,
  Typography,
  Paper,
} from '@material-ui/core';
import RehouserPaper from '../../styles/RehouserPaper';
//icons
import EditIcon from '../../styles/icons/EditIcon';
import MoreIcon from '../../styles/icons/MoreIcon';
import DetailsIcon from '../../styles/icons/DetailsIcon';
import CameraIcon from '../../styles/icons/CameraIcon';
import CloseIcon from '../../styles/icons/CloseIcon';
import CheckIcon from '../../styles/icons/CheckIcon';
// Update variable components ToDo: move to own file
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/client';
import InputModal from '../Modal/InputModal';
import TextInput from '../../styles/TextInput';
import DateInput from '../Inputs/DateInput';
import Error from '../ErrorMessage/index';
import ChangeRouteButton from '../Routes/ChangeRouteButton';

import { UPDATE_PROPERTY_MUTATION } from '../../graphql/mutations/index';
import { OWNER_PROPERTIES_QUERY } from '../../graphql/queries/index';
import useKeyPress from '../../lib/useKeyPress';
import EditProperty from './Edit';

import {
  NowToDate,
  LongDatePretty,
  LeaseLength,
} from '../LeaseManager/LeaseLengthInfo';

import FileUploader from '../FileUploader';
import { FileInfoFragment } from '../../graphql/fragments/fileInfo';
import SaveButtonLoader from '../Loader/SaveButtonLoader';

const sanitizeInput = (type, value) => {
  if (type === 'number') {
    return parseFloat(value);
  }
  return value;
};

const UpdatePropertyVariableModal = ({
  propertyId,
  name,
  label,
  type = 'text', // [color, date, datetime-local, email, month, number, range, search, text, time, url, checkbox, file, password]
  value = '',
  cy,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [originalValue, setOriginalVal] = useState(value);
  const [propertyValue, setPropertyValue] = useState(value);
  const [hasValChange, setHasValChange] = useState(false);

  const handleSetPropertyValue = val => {
    setPropertyValue(val);
    setHasValChange(true);
  };

  const canUpdate = () => {
    if (propertyValue == originalValue) return false;
    return true;
  };

  function downHandler({ key }) {
    if (key === 'Escape') {
      setModalIsOpen(false);
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  const PROPERTY_SINGLE_PROPERTY_MUTATION = gql`
    mutation UPDATE_PROPERTY_MUTATION($id: ID!, $data: PropertyUpdateInput!) {
      updateProperty(id: $id, data: $data) {
        id
        ${name}
      }
    }
  `;
  const handleMutationComplete = data => {
    setModalIsOpen(false);
    setHasValChange(false);
    setOriginalVal(data.updateProperty[name]);
  };
  // ToDo: Mutation Props
  const [updateProperty, updatePropertyPayload] = useMutation(
    PROPERTY_SINGLE_PROPERTY_MUTATION,
    {
      variables: {
        id: propertyId,
        data: {
          [name]: sanitizeInput(type, propertyValue),
          // sff: "dfsfd", // test error. Need to get error out of network
        },
      },
      onCompleted: handleMutationComplete,
      // lets try apollo 3.0 from cache
      // update: (proxy, payload) => {
      // },
      // errorPolicy: 'all',
      // That update needs to come back
      // update: (proxy, payload) => {},
      optimisticResponse: {
        __typename: 'Mutation',
        updateProperty: {
          __typename: 'Property',
          id: propertyId,
          [name]: sanitizeInput(type, propertyValue),
        },
      },
    }
  );
  return (
    <div>
      <InputModal
        title={`Update ${label}`}
        open={modalIsOpen}
        close={() => setModalIsOpen(false)}>
        <form
          onSubmit={async e => {
            e.preventDefault();
            updateProperty();
            setModalIsOpen(false);
          }}>
          {loading && <p>confirming on the server...</p>}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Error error={error} />
            <Error error={updatePropertyPayload.error} />
            {type === 'checkbox' && (
              <Switch
                checked={propertyValue}
                inputProps={{
                  'data-cy': `${cy}-variable-modal-val`,
                }}
                disabled={updatePropertyPayload.loading}
                // onChange={this.handleChange}
                // onChange={e => {
                //   setPropertyValue(e.target.checked);
                // }}
                onChange={e => handleSetPropertyValue(e.target.checked)}
                aria-label="LoginSwitch"
              />
            )}
            {type === 'text' && (
              <TextInput
                inputProps={{
                  'data-cy': `${cy}-variable-modal-val`,
                }}
                autoFocus="true"
                style={{ margin: 0, paddingRight: '16px' }}
                type={type}
                // disabled={loading}
                disabled={updatePropertyPayload.loading}
                label={label}
                value={propertyValue}
                // onChange={e => setPropertyValue(e.target.value)}
                onChange={e => handleSetPropertyValue(e.target.value)}
              />
            )}
            {type === 'number' && (
              <TextInput
                inputProps={{
                  'data-cy': `${cy}-variable-modal-val`,
                }}
                autoFocus="true"
                style={{ margin: 0, paddingRight: '16px' }}
                type={type}
                // disabled={loading}
                disabled={updatePropertyPayload.loading}
                label={label}
                value={propertyValue}
                // onChange={e => setPropertyValue(e.target.value)}
                onChange={e => handleSetPropertyValue(e.target.value)}
              />
            )}
            {type === 'date' && (
              <div style={{ padding: '16px' }}>
                <DateInput
                  // value={"2015-03-25T12:00:00-06:30"}
                  inputProps={{
                    'data-cy': `${cy}-variable-modal-val`,
                  }}
                  disabled={updatePropertyPayload.loading}
                  id="moveInDate"
                  label="Move In Date"
                  value={propertyValue}
                  // onChange={date => setPropertyValue(date)}
                  onChange={date => handleSetPropertyValue(date)}
                />
              </div>
            )}

            {/* loading, success, onClick, text, successText */}
            <SaveButtonLoader
              disabled={!canUpdate()}
              loading={updatePropertyPayload.loading}
              onClick={() => updateProperty()}
            />
          </div>
        </form>
      </InputModal>
      <IconButton
        data-cy={`${cy}-variable-modal-btn`}
        aria-label="Delete"
        onClick={() => setModalIsOpen(true)}>
        <EditIcon color="default" />
      </IconButton>
    </div>
  );
};

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
  const { property } = props;
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
        color="primary"
        gutterBottom={true}
        className={classes.variablesHeader}>
        Manage
      </Typography>
      <RehouserPaper
        square
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
        {/* <InsulationStatementForm
          data={null}
          propertyId={property.id}
          property={property}
          insulationFormId={
            property.insulationForm ? property.insulationForm.id : null
          }
          onSubmit={data => {}}
        />
        <ChangeRouteButton
          title="Edit with Original Form"
          route="/properties/property/edit"
          query={{ id: property.id }}
        /> */}
      </RehouserPaper>
      <Typography
        variant="h5"
        color="primary"
        gutterBottom={true}
        className={classes.variablesHeader}>
        Important Info
      </Typography>
      <RehouserPaper
        square
        style={{
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginRight: '16px',
          }}>
          {property.isLeased ? (
            <CheckIcon fontSize="small" color="primary" />
          ) : (
            <CloseIcon fontSize="small" color="secondary" />
          )}
          <Typography>Leased</Typography>
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginRight: '16px',
          }}>
          {property.onTheMarket ? (
            <CheckIcon fontSize="small" color="primary" />
          ) : (
            <CloseIcon fontSize="small" color="secondary" />
          )}
          <Typography>onTheMarket</Typography>
        </div>
        {property.leaseId && (
          <Typography>current lease id: {property.leaseId}</Typography>
        )}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginRight: '16px',
          }}>
          <CloseIcon fontSize="small" />
          <Typography>lease expires in</Typography>
        </div>
        {property.leaseId && (
          <Typography>current lease id: {property.leaseId}</Typography>
        )}
      </RehouserPaper>
      <Typography
        variant="h5"
        color="primary"
        gutterBottom={true}
        className={classes.variablesHeader}>
        Property variables
      </Typography>
      {/* <div className={classes.variablesHeader}>Property variables</div> */}
      <RehouserPaper className={classes.detailsWrapper} square>
        <div className={classes.detailItem}>
          <DetailItem
            icon={<CameraIcon color="primary" />}
            label="Rent"
            value={property.rent}
          />
          <UpdatePropertyVariableModal
            propertyId={property.id}
            name="rent"
            label="Rent"
            type="number"
            cy="rent"
            value={property.rent}
          />
        </div>
        <div className={classes.detailItem}>
          <DetailItem
            icon={<CameraIcon color="primary" />}
            type={'boolean'}
            label="On The Market"
            value={property.onTheMarket}
          />
          <UpdatePropertyVariableModal
            propertyId={property.id}
            name="onTheMarket"
            label="onTheMarket"
            type="checkbox"
            cy="on-the-market"
            value={property.onTheMarket}
          />
        </div>
        <div className={classes.detailItem}>
          <DetailItem
            icon={<CameraIcon color="primary" />}
            type={'date'}
            label="Move in Date"
            value={<LongDatePretty date={property.expiryDate} />}
          />
          <UpdatePropertyVariableModal
            propertyId={property.id}
            name="moveInDate"
            label="moveInDate"
            type="date"
            cy="move-in-date"
            value={property.moveInDate}
          />
        </div>
        <div className={classes.detailItem}>
          <DetailItem
            icon={<CameraIcon color="primary" />}
            type={'date'}
            label="Expiry Date"
            value={<LongDatePretty date={property.moveInDate} />}
          />
          <UpdatePropertyVariableModal
            propertyId={property.id}
            name="expiryDate"
            label="expiryDate"
            type="date"
            cy="expiry-date"
            value={property.expiryDate}
          />
        </div>
        <div className={classes.detailItem}>
          <DetailItem
            icon={<CameraIcon color="primary" />}
            label="Rooms"
            value={property.rooms}
          />
          <UpdatePropertyVariableModal
            propertyId={property.id}
            name="rooms"
            label="Rooms"
            type="number"
            value={property.rooms}
          />
        </div>
      </RehouserPaper>

      <div>
        <LeaseLength
          title="Lease will be for"
          moveInDate={property.moveInDate}
          expiryDate={property.expiryDate}
        />
      </div>

      <FileUploader
        title="Property Images"
        files={property.images ? property.images : []}
        refetchQueries={[
          {
            query: SINGLE_OWNER_PROPERTY_QUERY,
            variables: {
              id: property.id,
            },
          },
        ]}
        updateCacheOnRemovedFile={(cache, result) => {
          updateProperty({
            variables: {
              id: property.id,
              data: {
                images: {
                  disconnect: [
                    {
                      id: result.data.deleteFile.id,
                    },
                  ],
                },
              },
            },
          });
        }}
        recieveFile={file => {
          updateProperty({
            variables: {
              id: property.id,
              data: {
                images: {
                  connect: [
                    {
                      id: file.id,
                    },
                  ],
                },
              },
            },
          });
        }}
      />
      <CarouselSlider
        slides={property.images.map(imgObj => ({ ...imgObj, img: imgObj.url }))}
      />
      <Map
        center={{
          lat: property.locationLat,
          lng: property.locationLng,
        }}
      />
    </div>
  );
};

export default Details;

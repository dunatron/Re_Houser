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

const sanitizeInput = (type, value) => {
  if (type === 'number') {
    return parseFloat(value);
  }
  return value;
};

const UpdatePropertyVariable = ({
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
            {type === 'boolean' && (
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
            {type === 'int' && (
              <TextInput
                inputProps={{
                  'data-cy': `${cy}-variable-modal-val`,
                }}
                autoFocus="true"
                style={{ margin: 0, paddingRight: '16px' }}
                type={'number'}
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

UpdatePropertyVariable.propTypes = {
  cy: PropTypes.any.isRequired,
  label: PropTypes.any.isRequired,
  name: PropTypes.any.isRequired,
  propertyId: PropTypes.any.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default UpdatePropertyVariable;

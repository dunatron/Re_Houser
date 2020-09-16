import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CreateProperty from '@/Components/CreateProperty/index';

const AddProperty = () => {
  const formattedData = {
    location: 'bla bla bla',
    rent: 209,
    rooms: 6,
    bathrooms: 2,
  };
  return (
    <>
      <CreateProperty prefilledData={formattedData} />
    </>
  );
};

AddProperty.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired
  }).isRequired
};

export default AddProperty;

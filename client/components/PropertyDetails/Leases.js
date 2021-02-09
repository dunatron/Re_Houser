import PropTypes from 'prop-types';
import React, { Component } from 'react';
import LeaseTable from '@/Components/Tables/LeasesTable';

const PropertyLeases = props => {
  return (
    <div>
      <LeaseTable
        where={{
          property: {
            id: props.property.id,
          },
        }}
      />
    </div>
  );
};

PropertyLeases.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.any,
  }).isRequired,
};

export default PropertyLeases;

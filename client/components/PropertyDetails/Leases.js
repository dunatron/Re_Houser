import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import ChangeRouteButton from '@/Components/Routes/ChangeRouteButton';

import DisplayJson from "@/Components/DisplayJson"
import moment from 'moment'

import LeaseTable from "@/Components/Tables/LeasesTable"


const PropertyLeases = props => {
  
  return (
    <div>
      <LeaseTable where={{
        property: {
          id: props.property.id
        }
      }} />
    </div>
  );
};

PropertyLeases.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.any
  }).isRequired
};

export default PropertyLeases;

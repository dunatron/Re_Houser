import React, { Component, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { useQuery, useMutation } from '@apollo/client';
import { SINGLE_OWNER_PROPERTY_QUERY } from '../../graphql/queries/index';
import Error from '../ErrorMessage/index';
import styled from 'styled-components';
import Head from 'next/head';
import Tabs from '@material-ui/core/Tabs';
// import Tab from "@material-ui/core/Tab"
import Tab from '../../styles/Tab';
// tabs
import Details from './Details';
import Leases from './Leases';
import Applications from './Applications';
// import Badge from "@material-ui/core/Badge"
import Badge from '../../styles/Badge';
import Typography from '@material-ui/core/Typography';
// constants
import { SITE_NAME } from '../../lib/const';
import { toast } from 'react-toastify';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const PropertyCard = styled.div`
  max-width: 1200px;
  /* margin: 2rem auto; */
  margin: 0;
  box-shadow: ${props => props.theme.bs};
  box-sizing: border-box;
  min-height: 800px;
  .location__name {
    margin: 0;
    padding: 16px;
    line-height: 1;
  }
  @media (max-width: ${props => props.theme.breakpoints.values.sm}px) {
    /* display: flex;
    flex-wrap: wrap; */
  }
`;

const PropertyDetails = ({ id }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const { data, loading, error } = useQuery(SINGLE_OWNER_PROPERTY_QUERY, {
    variables: {
      id: id,
    },
  });
  if (loading) return 'loading';
  if (error) return 'error';
  const property = data.ownerProperty;

  if (!property) {
    toast('Real interesting error ');
    return 'This shouldnt happen apologies 😭😭😭 🤢 🤮';
  }

  return (
    <PropertyCard>
      <Head>
        <title>
          {SITE_NAME} | {property ? property.location : null}
        </title>
      </Head>
      <h1 className="location__name"> {property ? property.location : null}</h1>
      <Tabs value={tabIndex} onChange={(e, v) => setTabIndex(v)}>
        <Tab label="Details" />
        <Tab
          label={
            <Badge color="secondary" badgeContent={3}>
              Applications
            </Badge>
          }
        />
        <Tab label="Leases" />
      </Tabs>
      {tabIndex === 0 && (
        <TabContainer>
          <Details property={property} />
        </TabContainer>
      )}
      {tabIndex === 1 && (
        <TabContainer>
          <Applications property={property} />
        </TabContainer>
      )}
      {tabIndex === 2 && (
        <TabContainer>
          <Leases property={property} />
        </TabContainer>
      )}
    </PropertyCard>
  );
};

export default PropertyDetails;

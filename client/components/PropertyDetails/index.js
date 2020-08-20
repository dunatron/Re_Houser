import React, { Component, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { useQuery, useMutation } from '@apollo/client';
import { SINGLE_OWNER_PROPERTY_QUERY } from '../../graphql/queries/index';
import Error from '../ErrorMessage/index';
import styled from 'styled-components';
import Head from 'next/head';
import { Tabs, Tab } from '@material-ui/core';
// tabs
import Details from './Details';
import Leases from './Leases';
import Applications from './Applications';
import Activity from '../ActivityManager/Activity';
import PropertyViewings from './Viewings';
import Inspections from './Inspections';
import ShareProperty from './Share';
// import Badge from "@material-ui/core/Badge"
import Badge from '../../styles/Badge';
import Typography from '@material-ui/core/Typography';
// constants
import { SITE_NAME } from '../../lib/const';
import { toast } from 'react-toastify';
import Loader from '../Loader/index';
import PageHeader from '../PageHeader';
import TabContainer from '../Account/TabContainer';
import InspectionsTable from '../Tables/InspectionsTable';

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const aggregateFields = gql`
  fragment aggregateFields on RentalApplicationConnection {
    aggregate {
      count
    }
  }
`;

const RENTAL_APPLICATIONS_CONNECTION = gql`
  query RENTAL_APPLICATIONS_CONNECTION(
    $where: RentalApplicationWhereInput
    $orderBy: RentalApplicationOrderByInput
    $skip: Int
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    rentalApplicationsConnection(
      where: $where
      orderBy: $orderBy
      skip: $skip
      after: $after
      before: $before
      first: $first
      last: $last
    ) {
      ...aggregateFields
    }
  }
  ${aggregateFields}
`;

// 1. create gql rentalApplicationsConnection for the aggregate data
const PropertyApplicationsBadgeCount = ({ property }) => {
  const { data, loading, error } = useQuery(RENTAL_APPLICATIONS_CONNECTION, {
    variables: {
      where: {
        property: {
          id: property.id,
        },
      },
    },
  });
  return (
    <Badge
      color="secondary"
      badgeContent={
        loading ? 0 : data.rentalApplicationsConnection.aggregate.count
      }>
      Applications
    </Badge>
  );
};

const PropertyCard = styled.div`
  max-width: 1200px;

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
  }
`;

const PropertyDetails = ({ id, location, me }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const { data, loading, error } = useQuery(SINGLE_OWNER_PROPERTY_QUERY, {
    variables: {
      id: id,
    },
  });
  if (loading)
    return <Loader loading={loading} text={`Loading ${location} details`} />;
  if (error) return 'error';
  const property = data.ownerProperty;

  if (!property) {
    toast('No Property passed in to component');
    return 'No Property passed in to component';
  }

  return (
    <>
      <PageHeader
        title={property ? property.location : null}
        titleVariant="h4"
        intro={`this is where you can manage ${
          property ? property.location : null
        }. This is where you can review and accept applications, sign and manage leases associated with this property, and change the details before it goes on the market`}
        metaData={{
          title: `${property ? property.location : null}`,
          content: 'The properties for the current logged in user',
        }}
      />
      <PropertyCard>
        {/* <h1 className="location__name"> {property ? property.location : null}</h1> */}

        <Tabs
          value={tabIndex}
          onChange={(e, v) => setTabIndex(v)}
          indicatorColor="secondary"
          textColor="secondary"
          wrapped={true}
          variant="scrollable">
          <Tab label="Details" />
          <Tab label={<PropertyApplicationsBadgeCount property={property} />} />
          <Tab label="Leases" />
          <Tab label="Activity" />
          <Tab label="Viewings" />
          <Tab label="Inspections" />
          <Tab label="Share" />
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
        {tabIndex === 3 && (
          <TabContainer>
            <Activity
              args={{
                where: {
                  property: {
                    id: property.id,
                  },
                },
              }}
            />
          </TabContainer>
        )}

        {tabIndex === 4 && (
          <TabContainer>
            <PropertyViewings propertyId={property.id} me={me} />
          </TabContainer>
        )}
        {tabIndex === 5 && (
          <TabContainer>
            <Inspections property={property} me={me} />
          </TabContainer>
        )}
        {tabIndex === 6 && (
          <TabContainer>
            <ShareProperty property={property} me={me} />
          </TabContainer>
        )}
      </PropertyCard>
    </>
  );
};

export default PropertyDetails;

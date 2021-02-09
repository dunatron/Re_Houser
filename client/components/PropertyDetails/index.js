import React, { Component, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { useQuery, useMutation } from '@apollo/client';
import { SINGLE_OWNER_PROPERTY_QUERY } from '@/Gql/queries/index';
import Error from '@/Components/ErrorMessage/index';
import styled from 'styled-components';
import Head from 'next/head';
import { Tabs, Tab } from '@material-ui/core';
import Section from '@/Components/Section';
// tabs
import Details from './Details';
import Leases from './Leases';
import Applications from './Applications';
import Activity from '../ActivityManager/Activity';
import PropertyViewings from './Viewings';
import Inspections from './Inspections';
import AssociatedFiles from './AssociatedFiles';
import ShareProperty from './Share';
// import Badge from "@material-ui/core/Badge"
import Badge from '@/Styles/Badge';
import Typography from '@material-ui/core/Typography';
// constants
import { SITE_NAME } from '@/Lib/const';
import { toast } from 'react-toastify';
import Loader from '@/Components/Loader/index';
import PageHeader from '@/Components/PageHeader';
import TabContainer from '@/Components/Account/TabContainer';
import InspectionsTable from '@/Components/Tables/InspectionsTable';
import { isAdmin } from '@/Lib/isAdmin';
import { _isWizard } from '@/Lib/_isWizard';
import { _isInList } from '@/Lib/_isInList';

import DetailsIcon from '@material-ui/icons/Details';
import DescriptionIcon from '@material-ui/icons/Description';
import AssignmentIcon from '@material-ui/icons/Assignment';
import EventNoteIcon from '@material-ui/icons/EventNote';
import StreetviewIcon from '@material-ui/icons/Streetview';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ShareIcon from '@material-ui/icons/Share';

//counts
import {
  useLeasesCount,
  useRentalApplicationCount,
  useInspectionsCount,
} from '@/Lib/hooks/counts';
import moment from 'moment';

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
      fetchPolicy: 'network-only',
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

PropertyApplicationsBadgeCount.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.any,
  }).isRequired,
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
  const [todaysDate, setTodaysDate] = useState(moment().format());
  const [oneMonthFromNow, setOneMonthFromNow] = useState(
    moment()
      .add(1, 'months')
      .format()
  );
  const [tabIndex, setTabIndex] = useState(0);

  const countVariables = {
    where: {
      property: {
        id: id,
      },
    },
  };

  // INITIALIZING, PENDING, SHORTLISTED, DENIED, ACCEPTED
  const rentalApplicationsCount = useRentalApplicationCount({
    fetchPolicy: 'network-only',
    where: {
      ...countVariables.where,
      stage_in: ['INITIALIZING', 'SHORTLISTED', 'PENDING'],
    },
  });
  // INITIALIZING, SIGNED, PAID, COMPLETED
  const leasesCount = useLeasesCount({
    fetchPolicy: 'network-only',
    where: {
      ...countVariables.where,
      // OR: [
      //   {stage_in: ["INITIALIZING", "SIGNED"]},
      //   {expiryDate_lte: oneMonthFromNow}
      // ]
    },
  });
  const inspectionsCount = useInspectionsCount({
    fetchPolicy: 'network-only',
    where: {
      ...countVariables.where,
      completed: false,
    },
  });

  const { data, loading, error } = useQuery(SINGLE_OWNER_PROPERTY_QUERY, {
    variables: {
      id: id,
    },
  });
  if (loading)
    return <Loader loading={loading} text={`Loading ${location} details`} />;
  if (error) return 'error';

  if (!data) {
    toast('No DATA');
    return 'No DATA returned for property';
  }

  const property = data.ownerProperty;

  if (!property) {
    toast('No Property passed in to component');
    return 'No Property passed in to component';
  }

  const isOwner = _isInList(me.id, property.owners, 'id');
  const isAgent = _isInList(me.id, property.agents, 'id');

  const tabProps = {
    me: me,
    property: property,
    isAgent: isAgent,
    isOwner: isOwner,
    isAdmin: me.isAdmin,
  };

  return (
    <>
      <PageHeader
        title={property ? property.location : null}
        titleVariant="h4"
        // intro={`this is where you can manage ${
        //   property ? property.location : null
        // }. This is where you can review and accept applications, sign and manage leases associated with this property, and change the details before it goes on the market`}
        intro={property.headline}
        metaData={{
          title: `${property ? property.location : null}`,
          content: 'The properties for the current logged in user',
        }}
      />
      <div>
        {/* <h1 className="location__name"> {property ? property.location : null}</h1> */}
        <Section botSpace={1}>
          <Tabs
            value={tabIndex}
            onChange={(e, v) => setTabIndex(v)}
            // indicatorColor="secondary"
            // textColor="secondary"
            // wrapped={false}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto">
            <Tab label="Details" icon={<DetailsIcon />} />
            <Tab
              label={
                <Badge
                  color="secondary"
                  badgeContent={rentalApplicationsCount.count}>
                  Applications
                </Badge>
              }
              icon={<DescriptionIcon />}
            />
            <Tab
              label={
                <Badge color="secondary" badgeContent={leasesCount.count}>
                  Leases
                </Badge>
              }
              icon={<AssignmentIcon />}
            />
            <Tab label="Activity" icon={<EventNoteIcon />} />
            <Tab label="Viewings" icon={<StreetviewIcon />} />
            <Tab
              label={
                <Badge color="secondary" badgeContent={inspectionsCount.count}>
                  Inspections
                </Badge>
              }
              icon={<EventAvailableIcon />}
            />
            <Tab label="Files" icon={<FileCopyIcon />} />
            <Tab label="Share" icon={<ShareIcon />} />
          </Tabs>
        </Section>

        {tabIndex === 0 && (
          <TabContainer>
            <Details {...tabProps} />
          </TabContainer>
        )}
        {tabIndex === 1 && (
          <TabContainer>
            <Applications {...tabProps} />
          </TabContainer>
        )}
        {tabIndex === 2 && (
          <TabContainer>
            <Leases {...tabProps} />
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
            <PropertyViewings propertyId={property.id} {...tabProps} />
          </TabContainer>
        )}
        {tabIndex === 5 && (
          <TabContainer>
            <Inspections {...tabProps} />
          </TabContainer>
        )}
        {tabIndex === 6 && (
          <TabContainer>
            {property.files !== null && (
              <AssociatedFiles
                filesId={property.files.id}
                placeId={property.placeId}
              />
            )}
          </TabContainer>
        )}
        {tabIndex === 7 && (
          <TabContainer>
            <ShareProperty {...tabProps} />
          </TabContainer>
        )}
      </div>
    </>
  );
};

PropertyDetails.propTypes = {
  id: PropTypes.any,
  location: PropTypes.any,
  me: PropTypes.any,
};

export default PropertyDetails;

import PropTypes from 'prop-types';
import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Avatar,
} from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import moment from 'moment';
import ButtonLoader from '@/Components/Loader/ButtonLoader';
import Skeleton from '@material-ui/lab/Skeleton';
import RefreshIcon from '@material-ui/icons/RefreshOutlined';
import PersonIcon from '@material-ui/icons/PersonOutline';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooksOutlined';
import ChangeRouteButton from '@/Components/Routes/ChangeRouteButton';
import ActivityIcon from './ActivityIcon';

const ACTIVITY_QUERY = gql`
  query ACTIVITY_QUERY(
    $where: ActivityWhereInput
    $orderBy: ActivityOrderByInput
    $skip: Int
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    activities(
      where: $where
      orderBy: $orderBy
      skip: $skip
      after: $after
      before: $before
      first: $first
      last: $last
    ) {
      id
      title
      content
      jsonObj
      createdAt
      type
      user {
        id
        firstName
        lastName
      }
      property {
        id
        location
      }
      propertyLease {
        id
      }
    }
  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '800px',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  detailActions: {
    display: 'flex',
    flexDirection: 'row',
  },
  actionItem: {
    padding: '0 8px 8px 0',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

const ActivityTitle = ({ activity }) => {
  let str = activity.title;
  return str;
};

const ActivitySkeleton = () => {
  const classes = useStyles();

  const activityItem = {
    __typename: 'Activity',
    id: 'ck7wwuy7c55sz09811znjyea1',
    title: 'Rehouser Created',
    content: 'Property fields updated',
    jsonObj: {
      data: {
        creators: [
          {
            firstName: 'Heath',
            lastName: 'Dunlop',
          },
          {
            firstName: 'Heath',
            lastName: 'McDonough',
          },
        ],
      },
    },
    createdAt: '2018-11-18T05:54:27.624Z', // how old this thing is
    type: 'UPDATED_PROPERTY',
    user: {
      __typename: 'User',
      id: 'ck7mjyhckip610984ug2614pr',
      firstName: '[Heath]',
      lastName: '[Dunlop]',
    },
  };

  var arr = [{ ...activityItem }, { ...activityItem }];
  return (
    <div className={classes.root}>
      <ButtonLoader
        cy="create-card-btn"
        text="Refresh Activity"
        successText="Refreshed"
        loading={true}
        disabled={true}
        btnProps={{
          fullWidth: true,
          startIcon: <RefreshIcon />,
        }}></ButtonLoader>
      {arr.map((activity, idx) => {
        return (
          <Accordion key={activity.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header">
              <Avatar className={classes.orange}>N</Avatar>
              <Skeleton variant="rect" height={'100%'}>
                <Typography className={classes.heading}>
                  <ActivityTitle activity={activity} /> <br />
                  {activity.user
                    ? `${activity.user.firstName} ${activity.user.lastName} `
                    : null}
                  created {moment(activity.createdAt).fromNow(true)} ago
                </Typography>
              </Skeleton>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {activity.content}
                {activity.jsonObj ? (
                  <pre>{JSON.stringify(activity.jsonObj.data, null, 2)}</pre>
                ) : null}
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};

const Activity = ({ args }) => {
  const classes = useStyles();
  const { data, error, loading, refetch } = useQuery(ACTIVITY_QUERY, {
    variables: {
      orderBy: 'createdAt_DESC',
      pollInterval: 500, // By setting the pollInterval to 500, you'll fetch from the server every 0.5 seconds
      ...args,
      //   where: {
      //     // type_in: ['CREATED_PROPERTY'],
      //     property: {
      //       id: 'ck7ww7xvx9ers0934l7sscvil',
      //     },
      //   },
    },
    notifyOnNetworkStatusChange: true, //The networkStatus https://github.com/apollographql/apollo-client/blob/master/src/core/networkStatus.ts
  });

  if (loading) return <ActivitySkeleton />;
  if (error) return 'Erro loading Property Activity';

  const { activities } = data;

  return (
    <div className={classes.root}>
      <ButtonLoader
        cy="refresh-activity-btn"
        text="Refresh Activity"
        successText="Refreshed"
        loading={loading}
        disabled={loading}
        onClick={() => refetch()}
        btnProps={{ fullWidth: true, startIcon: <RefreshIcon /> }}
      />
      {activities.map((activity, idx) => {
        return <ActivityItem activity={activity} key={activity.id} />;
      })}
    </div>
  );
};

Activity.propTypes = {
  args: PropTypes.any,
};

const ActivityItem = ({ activity }) => {
  const classes = useStyles();
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header">
        <ActivityIcon type={activity.type} />
        <Typography className={classes.heading}>
          <ActivityTitle activity={activity} /> <br />
          <span style={{ color: 'grey' }}>
            {activity.user
              ? `${activity.user.firstName} ${activity.user.lastName} `
              : null}
            created {moment(activity.createdAt).fromNow(true)} ago
          </span>
        </Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.details}>
        <div className={classes.detailActions}>
          {activity.propertyLease && (
            <div className={classes.actionItem}>
              {/* Maybe we can pass in a base route to activity. oneOf tenant || landlord */}
              <ChangeRouteButton
                route="/leases/lease"
                title="Lease"
                query={{ id: activity.propertyLease.id }}
                btnProps={{
                  fullWidth: true,
                  variant: 'outlined',
                  startIcon: <LibraryBooksIcon />,
                }}
              />
            </div>
          )}
          {activity.user && (
            <div className={classes.actionItem}>
              <ChangeRouteButton
                route="/users/user"
                title="Actioner"
                query={{ id: activity.user.id }}
                btnProps={{
                  fullWidth: true,
                  variant: 'outlined',
                  startIcon: <PersonIcon />,
                }}
              />
            </div>
          )}

          {activity.property && (
            <div className={classes.actionItem}>
              <ChangeRouteButton
                route="/properties/property"
                title="Property"
                query={{ id: activity.property.id }}
                btnProps={{
                  fullWidth: true,
                  variant: 'outlined',
                  startIcon: <RefreshIcon />,
                }}
              />
            </div>
          )}
        </div>

        <Typography>
          {activity.content}
          {activity.jsonObj ? (
            <pre>{JSON.stringify(activity.jsonObj, null, 2)}</pre>
          ) : null}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

ActivityItem.propTypes = {
  activity: PropTypes.shape({
    content: PropTypes.any,
    createdAt: PropTypes.any,
    jsonObj: PropTypes.any,
    property: PropTypes.shape({
      id: PropTypes.any,
    }),
    propertyLease: PropTypes.shape({
      id: PropTypes.any,
    }),
    type: PropTypes.any,
    user: PropTypes.shape({
      firstName: PropTypes.any,
      id: PropTypes.any,
      lastName: PropTypes.any,
    }),
  }).isRequired,
};

export default Activity;

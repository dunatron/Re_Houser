import React, { useRef, useState, useContext } from 'react';
import { store } from '../../store';
import gql from 'graphql-tag';
import {
  useApolloClient,
  useQuery,
  useSubscription,
  useMutation,
} from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import ConnectionTable, {
  getEnumLookupList,
} from '@/Components/SuperiorTable/ConnectionTable';
import {
  Input,
  Typography,
  IconButton,
  Badge,
  Button,
} from '@material-ui/core';

import { PROPERTY_APPRAISAL_SUBSCRIPTION } from '../../graphql/subscriptions/PropertyAppraisalSub';
import moment from 'moment';
import formatCentsToDollars from '../../lib/formatCentsToDollars';
import Modal from '../../components/Modal/index';
import Error from '../../components/ErrorMessage';

// querys
import { RENTAL_APPRAISALS_CONNECTION_QUERY } from '../../graphql/connections';
// mutations
import { OFFER_RENTAL_APPRAISAL_MUTATION } from '../../graphql/mutations';

//icons
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';

const useStyles = makeStyles(theme => ({
  root: {},
  tableHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
}));
//https://medium.com/@harshverma04111989/material-table-with-graphql-remote-data-approach-f05298e1d670
//https://github.com/harshmons/material-table-with-graphql-using-remote-data-approach
const APPRAISALS_COUNT_QUERY = gql`
  query APPRAISALS_COUNT_QUERY(
    $where: RentalAppraisalWhereInput
    $orderBy: RentalAppraisalOrderByInput
    $skip: Int
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    rentalAppraisalsConnection(
      where: $where
      orderBy: $orderBy
      skip: $skip
      after: $after
      before: $before
      first: $first
      last: $last
    ) {
      aggregate {
        count
      }
    }
  }
`;

const AdminRentalAppraisalsTable = ({ where }) => {
  const globalStore = useContext(store);
  const { dispatch, state } = globalStore;
  const classes = useStyles();
  const tableRef = useRef(null);

  const houseTypeLookup = getEnumLookupList('PropertyType');

  const columns = React.useMemo(
    () => [
      {
        title: 'location',
        field: 'location',
        editable: false,
        filtering: false,
      },
      { title: 'created', field: 'createdAt', editable: false, type: 'date' },
      {
        title: 'locationLat',
        field: 'locationLat',
        editable: false,
        filtering: false,
      },
      {
        title: 'locationLng',
        field: 'locationLng',
        editable: false,
        filtering: false,
      },
      { title: 'rooms', field: 'rooms', editable: false, type: 'numeric' },
      {
        title: 'bathrooms',
        field: 'bathrooms',
        editable: false,
        type: 'numeric',
      },
      { title: 'rent', field: 'rent', type: 'numeric' },
      {
        title: 'property',
        field: 'property.id',
        editable: false,
        filtering: false,
        sorting: false,
      },
      { title: 'used', field: 'hasBeenUsed', editable: false, type: 'boolean' },
    ],
    [houseTypeLookup]
  );

  const [offerAppraisal, { error }] = useMutation(
    OFFER_RENTAL_APPRAISAL_MUTATION
  );

  const handleOnSubscriptionData = () => {};

  useSubscription(PROPERTY_APPRAISAL_SUBSCRIPTION, {
    onSubscriptionData: handleOnSubscriptionData,
    variables: {},
  });

  return (
    <div className={classes.root}>
      <Error error={error} />
      <ConnectionTable
        title="Appraisals"
        connectionKey="rentalAppraisalsConnection"
        countQuery={APPRAISALS_COUNT_QUERY}
        gqlQuery={RENTAL_APPRAISALS_CONNECTION_QUERY}
        searchKeysOR={['location_contains', 'id_contains']}
        orderBy="createdAt_DESC"
        tableRef={tableRef}
        columns={columns}
        editable={{
          isEditable: rowData => rowData.rent === null,
          // onRowUpdate must be promise based
          onRowUpdate: (newData, oldData) =>
            offerAppraisal({
              variables: {
                data: {
                  rent: parseFloat(newData.rent),
                },
                where: {
                  id: oldData.id,
                },
              },
            }),
        }}
      />
    </div>
  );
};

export default AdminRentalAppraisalsTable;

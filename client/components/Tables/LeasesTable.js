import React, { useRef, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { store } from '../../store';
import { useApolloClient } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
// import MaterialTable from 'material-table';
import ConnectionTable, {
  getEnumLookupList,
} from '@/Components/SuperiorTable/ConnectionTable';
import moment from 'moment';

//components
import Error from '@/Components/ErrorMessage';
import UserDetails from '../../components/UserDetails';
import List from '@material-ui/core/List';

import { Typography } from '@material-ui/core';

import {
  PROPERTY_LEASES_CONNECTION_QUERY,
  PROPERTY_LEASES_COUNT_QUERY,
} from '../../graphql/connections';
// mutations

import {
  formatCentsToDollars,
  formatCentsToDollarsVal,
} from '@/Lib/formatCentsToDollars';

const useStyles = makeStyles(theme => ({
  root: {},
  tableHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
}));

const LeasesTable = ({
  where,
  me,
  orderBy = 'createdAt_DESC',
  enableAddressParams,
  baseManageLink = '/landlord/leases/',
}) => {
  const router = useRouter();

  const connectionKey = 'propertyLeasesConnection'; // e.g inspectionsConnection
  const globalStore = useContext(store);
  const { dispatch, state } = globalStore;
  const classes = useStyles();
  const client = useApolloClient();
  const tableRef = useRef(null);
  const [tableErr, setTableErr] = useState({});

  const columns = React.useMemo(
    () => [
      { title: 'location', field: 'location', editable: false },
      { title: 'bankRef', field: 'bankRef', editable: false },
      { title: 'stage', field: 'stage', editable: false },
      {
        title: 'createdAt',
        field: 'createdAt',
        render: rowData => {
          return moment(rowData.createdAt).format('Do MMM YYYY');
        },
      },

      {
        title: 'expiryDate',
        field: 'expiryDate',
        render: rowData => {
          return moment(rowData.expiryDate).format('Do MMM YYYY');
        },
      },
      {
        title: 'wallet',
        field: 'wallet',
        render: rowData => {
          const val = formatCentsToDollars(rowData.wallet.amount);
          console.log('Wallet row val => ', val);
          return <Typography>{val}</Typography>;
        },
      },
      {
        title: 'rent',
        field: 'rent',
        editable: false,
        render: rowData => {
          return `${formatCentsToDollarsVal(rowData.rent)}`;
        },
      },
    ],
    []
  );

  const manageLease = (e, rowData) => {
    router.push({
      pathname: `${baseManageLink}${rowData.id}`,
    });
  };

  return (
    <div className={classes.root}>
      <Error error={tableErr} />
      <ConnectionTable
        enableAddressParams={enableAddressParams}
        title="All Leases"
        connectionKey={connectionKey}
        where={where}
        countQuery={PROPERTY_LEASES_COUNT_QUERY}
        gqlQuery={PROPERTY_LEASES_CONNECTION_QUERY}
        searchKeysOR={['location_contains', 'id_contains']}
        orderBy="createdAt_DESC"
        tableRef={tableRef}
        columns={columns}
        actions={[
          {
            icon: 'settings',
            tooltip: 'Manage Lease',
            onClick: manageLease,
          },
        ]}
      />
    </div>
  );
};

LeasesTable.propTypes = {
  where: PropTypes.object,
  orderBy: PropTypes.object,
  baseManageLink: PropTypes.oneOf([
    '/landlord/leases/',
    '/tenant/leases/',
    '/admin/leases',
  ]),
};
export default LeasesTable;

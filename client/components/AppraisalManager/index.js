// import SuperiorTable from '../SuperiorTable';
// import { useQuery, useMutation } from '@apollo/client';
// import { RENTAL_APPRAISALS_QUERY } from '../../graphql/queries';
// import { OFFER_RENTAL_APPRAISAL_MUTATION } from '../../graphql/mutations';
// import Loader from '../Loader';
// import Error from '../ErrorMessage';

// const AppraisalManager = () => {
//   const { error, loading, data } = useQuery(RENTAL_APPRAISALS_QUERY);
//   const [offerAppraisal, offerAppraisalProps] = useMutation(
//     OFFER_RENTAL_APPRAISAL_MUTATION
//   );
//   if (error) return <Error error={error} />;
//   if (loading) return <Loader />;
//   const { rentalAppraisals } = data;

//   const formattedData = rentalAppraisals.map(appraisal => ({
//     ...appraisal,
//   }));

//   const columns = [
//     { title: 'id', field: 'id', editable: false },
//     { title: 'location', field: 'location', editable: false },
//     { title: 'locationLat', field: 'locationLat', editable: false },
//     { title: 'locationLng', field: 'locationLng', editable: false },
//     { title: 'rooms', field: 'rooms', editable: false },
//     { title: 'bathrooms', field: 'bathrooms', editable: false },
//     { title: 'lowRent', field: 'lowRent' },
//     { title: 'rent', field: 'rent' },
//     { title: 'highRent', field: 'highRent' },
//     { title: 'property', field: 'property.id', editable: false },
//   ];
//   return (
//     <>
//       <Error error={offerAppraisalProps.error} />
//       <SuperiorTable
//         // colomns={columns}
//         title="Property Appraisals"
//         data={formattedData}
//         columns={columns}
//         options={{
//           search: true,
//           exportButton: true,
//           exportAllData: true, // Flag for export all data instead of rendered data
//           filtering: true,
//           grouping: true,
//           // selection: true,
//           sorting: true,
//         }}
//         editable={{
//           isEditable: rowData => rowData.rent === null,
//           onRowUpdate: (newData, oldData) =>
//             new Promise((resolve, reject) => {
//               setTimeout(() => {
//                 {
//                   offerAppraisal({
//                     variables: {
//                       data: {
//                         rent: parseFloat(newData.rent),
//                         lowRent: parseFloat(newData.lowRent),
//                         highRent: parseFloat(newData.highRent),
//                       },
//                       where: {
//                         id: oldData.id,
//                       },
//                     },
//                   });
//                   // Note remove setTimeout and resolve onCOmpleted or on an error
//                   resolve();
//                 }
//                 resolve();
//               }, 1000);
//             }),
//         }}
//       />
//     </>
//   );
// };

// export default AppraisalManager;

import React, { useRef, useState } from 'react';
import gql from 'graphql-tag';
import {
  useApolloClient,
  useQuery,
  useSubscription,
  useMutation,
} from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import { Input, Typography, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Modal from '../Modal/index';
import { PROPERTY_APPRAISAL_SUBSCRIPTION } from '../../graphql/subscriptions/PropertyAppraisalSub';
import moment from 'moment';
import formatCentsToDollars from '../../lib/formatCentsToDollars';
import Error from '../ErrorMessage';

// querys
import { RENTAL_APPRAISALS_CONNECTION_QUERY } from '../../graphql/connections';
// mutations
import { OFFER_RENTAL_APPRAISAL_MUTATION } from '../../graphql/mutations';

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
  const classes = useStyles();
  const client = useApolloClient();
  const tableRef = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [networkOnly, setNetworkOnly] = useState(false);
  const [tableErr, setTableErr] = useState(null);

  const tableColumnConfig = [
    // { title: 'id', field: 'id', editable: false },
    { title: 'location', field: 'location', editable: false },
    { title: 'created', field: 'createdAt', editable: false },
    { title: 'locationLat', field: 'locationLat', editable: false },
    { title: 'locationLng', field: 'locationLng', editable: false },
    { title: 'rooms', field: 'rooms', editable: false },
    { title: 'bathrooms', field: 'bathrooms', editable: false },
    { title: 'lowRent', field: 'lowRent' },
    { title: 'rent', field: 'rent' },
    { title: 'highRent', field: 'highRent' },
    { title: 'property', field: 'property.id', editable: false },
  ];

  const sharedWhere = {
    ...where,
    OR: [
      {
        location_contains: searchText,
      },
      // {
      //   amount: parseFloat(searchText),
      // },
    ],
  };

  const { data, loading, error, refetch } = useQuery(APPRAISALS_COUNT_QUERY, {
    variables: {
      where: {
        ...where,
        // ...sharedWhere, every letter change would retrigger this
      },
    },
  });

  const [offerAppraisal, offerAppraisalProps] = useMutation(
    OFFER_RENTAL_APPRAISAL_MUTATION
  );

  if (error) return <Error error={error} />;

  const handleOnSubscriptionData = () => {
    setNetworkOnly(true);
    tableRef.current.onQueryChange();
  };

  useSubscription(PROPERTY_APPRAISAL_SUBSCRIPTION, {
    onSubscriptionData: handleOnSubscriptionData,
    variables: {},
  });

  const totalItemCount = data
    ? data.rentalAppraisalsConnection.aggregate.count
    : 0;

  const handleSearchTextChange = e => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    tableRef.current.onQueryChange(); // informs table that we need to refetch remoteData
  };

  const remoteData = query => {
    return client
      .query({
        query: RENTAL_APPRAISALS_CONNECTION_QUERY,
        // fetchPolicy: 'network-only', // simply for subscriptions...
        fetchPolicy: networkOnly ? 'network-only' : 'cache-first', // who needs a tradeoff when your a god
        variables: {
          //   orderBy: 'created_ASC',
          where: {
            ...where,
            ...sharedWhere,
            // OR: [
            //   {
            //     location_contains: searchText,
            //   },
            //   // {
            //   //   amount: parseFloat(searchText),
            //   // },
            // ],
          },
          orderBy: 'createdAt_DESC',
          // orderBy: 'rent_DESC',
          skip: query.page * query.pageSize,
          first: query.pageSize,
          limit: query.pageSize,
        },
      })
      .then(res => {
        const {
          data: {
            rentalAppraisalsConnection: { pageInfo, aggregate, edges },
          },
        } = res;
        // immutatble/freezeObject
        const formattedData = edges.map(edge => ({
          ...edge.node,
        }));
        return {
          data: formattedData,
          page: query.page,
          totalCount: totalItemCount,
        };
      })
      .catch(e => {
        setTableErr(e);
      })
      .finally(() => {
        setNetworkOnly(false);
      });
  };

  return (
    <div className={classes.root}>
      <div className={classes.tableHeader}>
        <Typography variant="h5">Appraisals</Typography>
        <div>
          <Input
            value={searchText}
            onChange={handleSearchTextChange}
            placeholder="id or amount"
          />
          <IconButton onClick={handleSearch} aria-label="search-table">
            <SearchIcon />
          </IconButton>
        </div>
      </div>
      <Error error={tableErr} />
      <MaterialTable
        style={{
          marginBottom: '16px',
        }}
        tableRef={tableRef}
        columns={tableColumnConfig}
        data={remoteData}
        options={{
          toolbar: false, // This will disable the in-built toolbar where search is one of the functionality
        }}
        editable={{
          isEditable: rowData => rowData.rent === null,
          //   onRowUpdate: (newData, oldData) =>
          //     new Promise((resolve, reject) => {
          //       setTimeout(() => {
          //         {
          //           offerAppraisal({
          //             variables: {
          //               data: {
          //                 rent: parseFloat(newData.rent),
          //                 lowRent: parseFloat(newData.lowRent),
          //                 highRent: parseFloat(newData.highRent),
          //               },
          //               where: {
          //                 id: oldData.id,
          //               },
          //             },
          //           });
          //           // Note remove setTimeout and resolve onCOmpleted or on an error
          //           resolve();
          //         }
          //         resolve();
          //       }, 1000);
          //     }),
          // }}
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  offerAppraisal({
                    variables: {
                      data: {
                        rent: parseFloat(newData.rent),
                        lowRent: parseFloat(newData.lowRent),
                        highRent: parseFloat(newData.highRent),
                      },
                      where: {
                        id: oldData.id,
                      },
                    },
                  });
                  // Note remove setTimeout and resolve onCOmpleted or on an error
                  resolve();
                }
                resolve();
              }, 1000);
            }),
        }}
      />
    </div>
  );
};

export default AdminRentalAppraisalsTable;

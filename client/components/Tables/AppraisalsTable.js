import React, { useRef, useState } from 'react';

import gql from 'graphql-tag';
import { useApolloClient, useQuery, useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import Error from '@/Components/ErrorMessage';
import Loader from '@/Components/Loader';

import { RENTAL_APPRAISALS_CONNECTION_QUERY } from '@/Gql/connections';
import PropTypes from 'prop-types';
import { mePropTypes } from '../../propTypes';
import moment from 'moment';
import { useRouter } from 'next/router';

import Modal from '@/Components/Modal/index';
import RentalAppraisal from '@/Components/RentalAppraisal';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  tableHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
}));

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

const AppraisalsTable = ({ where, me, orderBy = 'createdAt_DESC' }) => {
  const connectionKey = 'rentalAppraisalsConnection'; // e.g inspectionsConnection

  const classes = useStyles();
  const client = useApolloClient();
  const tableRef = useRef(null);
  const [networkOnly, setNetworkOnly] = useState(false);
  const [tableErr, setTableErr] = useState(null);
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appraisalModalData, setAppraisalModalData] = useState({});

  const tableColumnConfig = [
    { title: 'location', field: 'location', editable: false },
    {
      title: 'createdAt',
      field: 'createdAt',
      render: rowData => {
        return moment(rowData.createdAt).format('Mo MMM YYYY');
      },
    },
    { title: 'rent', field: 'rent', editable: false },
    { title: 'hasBeenUsed', field: 'hasBeenUsed', editable: false },
  ];

  const sharedWhere = {
    ...where,
  };

  const { data, loading, error, refetch } = useQuery(APPRAISALS_COUNT_QUERY, {
    variables: {
      where: {
        ...where,
      },
      orderBy: orderBy,
    },
  });

  if (loading)
    return <Loader loading={loading} text="Getting total appraisal count" />;

  if (error) return <Error error={error} />;

  const totalItemCount = data ? data[connectionKey].aggregate.count : 0;

  const remoteData = query => {
    return client
      .query({
        query: RENTAL_APPRAISALS_CONNECTION_QUERY,
        fetchPolicy: networkOnly ? 'network-only' : 'cache-first', // who needs a tradeoff when your a god
        variables: {
          where: {
            ...where,
            ...sharedWhere,
          },
          orderBy: orderBy,
          skip: query.page * query.pageSize,
          first: query.pageSize,
          limit: query.pageSize,
        },
      })
      .then(res => {
        const {
          data: {
            [connectionKey]: { pageInfo, aggregate, edges },
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

  const viewAppraisal = (e, d) => {
    setAppraisalModalData({ ...d });
    setIsModalOpen(true);
  };

  const addAppraisalRoute = () =>
    router.push({
      pathname: `${router.pathname}/add`,
    });

  const addPropertyFromAppraisal = (e, d) => {
    router.push({
      pathname: `/landlord/properties/add`,
      query: {
        appraisalId: d.id,
      },
    });
  };

  const isAddPropertyDisabled = rowData => {
    if (rowData.hasBeenUsed || !rowData.rent) return true;
    return false;
  };

  return (
    <div className={classes.root}>
      <Modal
        title="Appraisal view"
        open={isModalOpen}
        close={() => setIsModalOpen(false)}>
        <RentalAppraisal rentalAppraisal={appraisalModalData} />
      </Modal>

      <div className={classes.tableHeader}>
        <Button onClick={addAppraisalRoute} color="secondary">
          Request new APPRAISAL
        </Button>
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
          toolbar: false,
        }}
        actions={[
          {
            icon: 'pageview',
            tooltip: 'View appraisal details',
            onClick: viewAppraisal,
          },
          rowData => ({
            icon: 'add',
            tooltip: 'Add Property from appraisal',
            // onClick: (event, rowData) =>
            //   confirm('You want to delete ' + rowData.name),
            onClick: addPropertyFromAppraisal,
            disabled: isAddPropertyDisabled(rowData),
            hidden: isAddPropertyDisabled(rowData),
          }),
          //   {
          //     icon: 'pageview',
          //     tooltip: 'Add Property from appraisal',
          //     onClick: addPropertyFromAppraisal,
          //     disabled: isAddPropertyDisabled
          //   },
        ]}
      />
    </div>
  );
};

AppraisalsTable.propTypes = {
  me: mePropTypes,
  where: PropTypes.object,
  orderBy: PropTypes.object,
};

export default AppraisalsTable;

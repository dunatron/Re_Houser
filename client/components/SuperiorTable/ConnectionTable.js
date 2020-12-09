import MaterialTable from 'material-table';
import tableIcons from './tableIcons';

import PropTypes from 'prop-types';

import { useState, useEffect, useRef } from 'react';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { useApolloClient, useQuery, NetworkStatus } from '@apollo/client';

import Error from '@/Components/ErrorMessage';
import Loader from '@/Components/Loader';

const SuperiorTable = props => {
  const {
    title,
    columns,
    options,
    countQuery,
    connectionKey,
    gqlQuery,
    where,
    ...rest
  } = props;
  const tableRef = useRef();
  const wrapperDivRef = useRef();
  const client = useApolloClient();
  const [remoteCalled, setRemoteCalled] = useState(false);
  const [sharedWhere, setSharedWhere] = useState({ ...where });
  const router = useRouter();

  const [addressParams, setAddressParams] = useState({
    page: parseInt(router.query.page ? router.query.page : 0),
    orderBy: router.query.orderBy ? router.query.orderBy : 'createdAt_DESC',
    first: parseInt(router.query.first ? router.query.first : 5),
    searchText: router.query.search ? router.query.search : '',
  });

  const remoteData = async query => {
    const page = remoteCalled ? query.page : addressParams.page;
    const skip = remoteCalled
      ? query.page * query.pageSize
      : addressParams.page * query.pageSize;
    const first = query.pageSize;
    const search = remoteCalled ? query.search : addressParams.searchText;

    const localCount = await client.query({
      query: countQuery,
      variables: {
        where: {
          location_contains: search,
          ...where,
          ...sharedWhere,
        },
      },
    });

    const totalLocalCount = localCount.data
      ? localCount.data[connectionKey].aggregate.count
      : 0;

    return client
      .query({
        query: gqlQuery,
        // fetchPolicy: networkOnly ? 'network-only' : 'cache-first', // who needs a tradeoff when your a god
        variables: {
          where: {
            location_contains: search,
            // location_contains: query.search,
            ...where,
            ...sharedWhere,
          },
          // orderBy: orderBy,
          skip: skip,
          first: first,
        },
      })
      .then(res => {
        const {
          data: {
            [connectionKey]: { pageInfo, aggregate, edges },
          },
        } = res;
        const formattedData = edges.map(edge => ({
          ...edge.node,
        }));
        return {
          data: formattedData,
          page: page,
          totalCount: totalLocalCount ? totalLocalCount : 0,
        };
      })
      .catch(e => {
        // setTableErr(e);
      })
      .finally(() => {
        if (remoteCalled && query.search !== addressParams.searchText) {
          setAddressParams({
            ...addressParams,
            searchText: query.search,
          });
        }
        if (!remoteCalled) {
          setRemoteCalled(true);
        }
      });
  };

  // kinda need this as component does a soft reload when the query params are changed
  // so we scroll the window to the top of the table element instead
  useEffect(() => {
    const handleRouteChangeComplete = url => {
      // tableRef.current &&
      //   tableRef.current.tableContainerDiv.current.scrollIntoView(true);
      wrapperDivRef.current && wrapperDivRef.current.scrollIntoView(true);
    };
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeComplete);
    };
  }, []);

  // replaces the url/router state when addressParams/query changes
  // does a soft reload so will re-render page essentiall but not reload
  useEffect(() => {
    router.replace(
      router.pathname,
      {
        query: {
          page: addressParams.page,
          orderBy: addressParams.orderBy,
          skip: addressParams.skip,
          first: addressParams.first,
          search: addressParams.searchText,
        },
      },
      { shallow: true }
    );
    return () => {};
  }, [addressParams]);

  return (
    <div ref={wrapperDivRef}>
      <MaterialTable
        {...rest}
        tableRef={tableRef}
        style={{ marginBottom: '16px' }}
        icons={tableIcons}
        columns={columns}
        title={title}
        data={remoteData}
        options={{
          ...options,
          draggable: false, // now we can have it SSR
          emptyRowsWhenPaging: false,
          orderBy: addressParams.orderBy,
          searchText: addressParams.search,
          pageSize: addressParams.first,
          pageSizeOptions: [5, 10, 20, 40],
          search: true,
          searchText: addressParams.searchText,
          debounceInterval: 500, // 0.5s wait to trigger query after stop typing in search
          searchAutoFocus: true,
          searchFieldVariant: 'standard',
        }}
        onChangeRowsPerPage={pageSize =>
          setAddressParams({
            ...addressParams,
            first: pageSize,
          })
        }
        onChangePage={page =>
          setAddressParams({ ...addressParams, page: page })
        }
      />
    </div>
  );
};

SuperiorTable.propTypes = {
  columns: PropTypes.any,
  data: PropTypes.any,
  title: PropTypes.any,
};

SuperiorTable.propTypes = PropTypes.instanceOf(MaterialTable);

export default SuperiorTable;

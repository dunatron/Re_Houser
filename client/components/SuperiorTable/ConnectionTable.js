import MaterialTable from 'material-table';
import tableIcons from './tableIcons';

import PropTypes from 'prop-types';

import { useState, useEffect } from 'react';
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
  const client = useApolloClient();
  const [remoteCalled, setRemoteCalled] = useState(false);
  const [sharedWhere, setSharedWhere] = useState({ ...where });
  const {
    // `String` of the actual path (including the query) shows in the browser
    asPath,
    // `String` Current route
    route,
    // `Function` navigate back
    back,
    // `Function` prefetch a specific page
    prefetch,
    // `Function` navigate to a specific page (adds entry to history)
    push,
    // `Function` navigate to a specific page
    replace,
    // `Object` current query
    query,
    // `Function` Reload current page
    reload,
  } = useRouter();

  // first query we need to make is for the count to get total count
  const { data, loading, error, refetch, networkStatus } = useQuery(
    countQuery,
    {
      variables: {
        where: {
          ...where,
          ...sharedWhere,
        },
      },
    }
  );

  const totalItemCount = data ? data[connectionKey].aggregate.count : 0;

  const [addressParams, setAddressParams] = useState({
    page: parseInt(query.page ? query.page : 0),
    orderBy: query.orderBy ? query.orderBy : 'createdAt_DESC',
    // skip: query.skip ?? 0, dont need skip in the url as we can use page * pageSize
    first: parseInt(query.first ? query.first : 5),
    limit: parseInt(query.limit ? query.limit : 5),
    searchText: query.search ? query.search : '',
  });

  const remoteData = async query => {
    const page = remoteCalled ? query.page : addressParams.page;
    const skip = remoteCalled
      ? query.page * query.pageSize
      : addressParams.page * query.pageSize;
    const first = query.pageSize;
    const limit = query.pageSize;
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

    console.log('ConnectionTable Debug: query ', query);

    if (!remoteCalled) {
      setRemoteCalled(true);
    }
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
          limit: limit,
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
        // setNetworkOnly(false);
        // should then set the setAddressState then let the useEffect for the router pick the change up
      });
  };

  /**
   * This is probably too hard too, we dont want to keep adding state,
   * rather we want to just set it in the url
   */
  useEffect(() => {
    Router.push(
      Router.pathname,
      {
        query: {
          page: addressParams.page,
          orderBy: addressParams.orderBy,
          skip: addressParams.skip,
          first: addressParams.first,
          limit: addressParams.limit,
          search: addressParams.searchText,
        },
      },
      { shallow: true }
    );
    return () => {};
  }, [addressParams]);

  if (loading && networkStatus === NetworkStatus.loading)
    return <Loader loading={loading} text={`Getting total ${title} count`} />;

  if (error) return <Error error={error} />;

  return (
    <MaterialTable
      {...rest}
      style={{ marginBottom: '16px' }}
      icons={tableIcons}
      columns={columns}
      title={title}
      data={remoteData}
      options={{
        draggable: false, // now we can have it SSR
        emptyRowsWhenPaging: false,
        search: true,
        orderBy: addressParams.orderBy,
        searchText: addressParams.search,
        pageSize: addressParams.first,
        pageSizeOptions: [5, 10, 20, 40],
      }}
      onChangeRowsPerPage={pageSize =>
        setAddressParams({
          ...addressParams,
          first: pageSize,
          limit: pageSize,
        })
      }
      onSearchChange={e => console.log('search changed: ' + e)}
      onChangePage={page => setAddressParams({ ...addressParams, page: page })}
      onSearchChange={search => {
        console.log('MUI Table remote onSearchChange => ', search);
        setAddressParams({ ...addressParams, searchText: search }); // the prop isnt workng for material table
      }}
    />
  );
};

SuperiorTable.propTypes = {
  columns: PropTypes.any,
  data: PropTypes.any,
  title: PropTypes.any,
};

SuperiorTable.propTypes = PropTypes.instanceOf(MaterialTable);

export default SuperiorTable;

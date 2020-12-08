import { forwardRef } from 'react';
import MaterialTable from 'material-table';

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import PropTypes from 'prop-types';
import mePropTypes from '../../propTypes/mePropTypes';

import { useState, useEffect } from 'react';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { useApolloClient, useQuery, NetworkStatus } from '@apollo/client';

import Error from '@/Components/ErrorMessage';
import Loader from '@/Components/Loader';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const setAddressParams = () => {
  Router.push(
    Router.pathname,
    {
      query: {
        page: 0,
        orderBy: orderBy,
        skip: query.page * query.pageSize,
        first: query.pageSize,
        limit: query.pageSize,
      },
    },
    { shallow: true }
  );
};

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
        },
      },
    }
  );

  const totalItemCount = data ? data[connectionKey].aggregate.count : 0;

  console.log('ConectionTable: countData ', data);

  const [addressParams, setAddressParams] = useState({
    page: parseInt(query.page ?? 0),
    orderBy: query.orderBy ?? 'createdAt_DESC',
    // skip: query.skip ?? 0, dont need skip in the url as we can use page * pageSize
    first: parseInt(query.first ?? 5),
    limit: parseInt(query.limit ?? 5),
    searchText: query.search ?? '',
  });

  console.log('MUI Table addressParams => ', addressParams);

  const remoteData = query => {
    console.log('MUI Table remote query => ', query);
    const page = remoteCalled ? query.page : addressParams.page;
    const skip = remoteCalled
      ? query.page * query.pageSize
      : addressParams.page * query.pageSize;
    const first = query.pageSize;
    const limit = query.pageSize;
    if (!remoteCalled) {
      setRemoteCalled(true);
    }
    return client
      .query({
        query: gqlQuery,
        // fetchPolicy: networkOnly ? 'network-only' : 'cache-first', // who needs a tradeoff when your a god
        variables: {
          where: {
            // location_contains: searchText,
            location_contains: query.search,
            ...where,
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
        console.log('MUI Table remote result => ', res);
        // immutatble/freezeObject
        const formattedData = edges.map(edge => ({
          ...edge.node,
        }));
        return {
          data: formattedData,
          // page: query.page,
          page: page,
          totalCount: totalItemCount ?? 0,
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
    return <Loader loading={loading} text="Getting total properties count" />;

  if (error) return <Error error={error} />;

  return (
    <MaterialTable
      {...rest}
      style={{ marginBottom: '16px' }}
      icons={tableIcons}
      columns={columns}
      title={title}
      data={remoteData}
      // data={query => {
      //   setRemoteCalled(true);
      //   return props.data(query, {
      //     ...addressParams,
      //     page: remoteCalled ? query.page : addressParams.page,
      //   });
      // }}
      options={{
        draggable: false, // now we can have it SSR
        emptyRowsWhenPaging: false,
        search: true,
        orderBy: 'createdAt_DESC',
        searchText: addressParams.search,
        // initialPage: addressParams.page,
        // page: addressParams.page,
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
      // onSearchChange={() => alert('Booo')}
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

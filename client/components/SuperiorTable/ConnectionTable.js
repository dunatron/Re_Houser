import MaterialTable from 'material-table';
import tableIcons from './tableIcons';

import PropTypes from 'prop-types';

import { useState, useEffect, useRef } from 'react';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { useApolloClient, useQuery, NetworkStatus } from '@apollo/client';

import Error from '@/Components/ErrorMessage';
import Loader from '@/Components/Loader';
import moment from 'moment';
import { GET_ENUM_QUERY } from '@/Gql/queries';

export const getEnumLookupList = __type => {
  const { data, error, loading } = useQuery(GET_ENUM_QUERY, {
    variables: {
      name: __type,
    },
  });

  if (!data) return {};
  const mappedVals = data.__type.enumValues.reduce((acc, enumObj) => {
    return { ...acc, [enumObj.name]: enumObj.name };
  }, {});

  console.log('Mapped enum vals => ', mappedVals);

  return mappedVals;

  return data ? data.__type.enumValues.map(enumObj => enumObj.name) : [];
};

// all props
// https://github.com/mbrn/material-table.com/tree/master/src/pages/docs/all-props
// props for columns
// https://github.com/mbrn/material-table.com/blob/master/src/pages/docs/all-props/columns.md
const generateSearchWhereOR = (searchKeys, searchText) => {
  if (searchText.length < 2) return;
  return {
    OR: [
      ...(searchKeys.length > 0 &&
        searchKeys.map((key, idx) => ({ [key]: searchText }))),
    ],
  };
};

// boolean, numeric, date, datetime, time, currency
const makeFilterByType = filter => {
  switch (filter.column.type) {
    case 'boolean':
      return {
        [filter.column.field]: filter.value === 'checked' ? true : false,
      };
    case 'date':
      const key = `${filter.column.field}_lte`;
      return {
        // [filter.column.field]: moment(filter.value).format(),
        // the field is createdAt so we need the sortDirection down is createdAt_lte and up is createdAt_gte
        [key]: moment(filter.value).format(),
      };
    case undefined: // this is assumed to be string
      return {
        [filter.column.field]: filter.value,
      };
      break;
    default:
    // code block
  }
  return {};
};

// we may need to pass in the filter key for the and?
// possibly not. it would be AND {onTheMarket: true}
const generateFilters = userFilters => {
  if (userFilters.length === 0) return;
  return {
    AND: [
      // map the filters to types for gql
      ...(userFilters.length > 0 &&
        userFilters.map(filter => makeFilterByType(filter))),
      // ...(userFilters.length > 0 && userFilters.map(filter => ({}))),
      // ...(userFilters.length > 0 &&
      //   userFilters.map((key, idx) => ({ [key]: '' }))),
    ],
  };
};

// https://medium.com/@harshverma04111989/material-table-with-graphql-remote-data-approach-f05298e1d670
const MaterialConnectionTable = props => {
  const {
    title,
    columns,
    options,
    countQuery,
    connectionKey,
    gqlQuery,
    where,
    searchKeysOR,
    ...rest
  } = props;
  const tableRef = useRef();
  const wrapperDivRef = useRef();
  const client = useApolloClient();
  const [remoteCalled, setRemoteCalled] = useState(false);
  const [sharedWhere, setSharedWhere] = useState({ ...where });

  const [remoteErrors, setRemoteErrors] = useState({});
  const router = useRouter();

  const [addressParams, setAddressParams] = useState({
    page: parseInt(router.query.page ? router.query.page : 0),
    orderBy: router.query.orderBy ? router.query.orderBy : 'createdAt_DESC',
    first: parseInt(router.query.first ? router.query.first : 5),
    searchText: router.query.search ? router.query.search : '',
  });

  const handleRemoteDataError = e => {
    console.log('An error occurred fetching remoteData: ', e);
    setRemoteErrors(e);
  };

  const remoteData = async query => {
    console.log('ConnectionTable remote query: ', query);
    const page = remoteCalled ? query.page : addressParams.page;
    const skip = remoteCalled
      ? query.page * query.pageSize
      : addressParams.page * query.pageSize;
    const first = query.pageSize;
    const search = remoteCalled ? query.search : addressParams.searchText;

    const searchWhereOR = generateSearchWhereOR(searchKeysOR, search);
    const userFilters = generateFilters(query.filters);

    const localCount = await client.query({
      query: countQuery,
      variables: {
        where: {
          ...searchWhereOR,
          ...userFilters,
          ...where,
          ...sharedWhere,
        },
      },
    });

    const totalLocalCount = localCount.data
      ? localCount.data[connectionKey].aggregate.count
      : 0;

    // errors are not making it
    return client
      .query({
        query: gqlQuery,
        // fetchPolicy: networkOnly ? 'network-only' : 'cache-first', // who needs a tradeoff when your a god
        variables: {
          where: {
            ...searchWhereOR,
            ...userFilters,
            ...where,
            ...sharedWhere,
          },
          // orderBy: orderBy,
          skip: skip,
          first: first,
        },
      })
      .then(res => {
        console.log('The res => ', res);
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
        console.log('Error getting remote data: ', e);
        handleRemoteDataError(e); // errors arent working as expected. Possily being caught in apollCLient errorHandling?
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
      <Error error={remoteErrors} />
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
          // draggable: false, // now we can have it SSR
          draggable: typeof window !== 'undefined' ? true : false, // now we can have it SSR
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
          filtering: true, // you must disable fields individually
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

MaterialConnectionTable.propTypes = {
  columns: PropTypes.any,
  data: PropTypes.any,
  title: PropTypes.any,
};

MaterialConnectionTable.propTypes = PropTypes.instanceOf(MaterialTable);

export default MaterialConnectionTable;

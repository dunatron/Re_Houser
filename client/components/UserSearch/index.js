import React, { useState, useRef, useEffect } from 'react';
import algoliasearch from 'algoliasearch/lite';
import FriendRequestButton from '../MutationButtons/FriendRequestButton';
import UserDetails from '../UserDetails';
import { UserSearchInterface } from './styles';
import CustomSearchBox from './SearchBox';
import HitsConnection from './HitsConnection';

import {
  InstantSearch,
  Hits,
  connectHighlight,
  SearchBox,
  Pagination,
  Stats,
  SortBy,
  Configure,
  connectCurrentRefinements,
} from 'react-instantsearch-dom';

var applicationId = process.env.ALGOLIA_APP_ID;
var apiKey = process.env.ALGOLIA_API_KEY;
const algoliaClient = algoliasearch(applicationId, apiKey);
const indexPrefix = process.env.NODE_ENV === 'development' ? 'dev' : 'prod';

const Hit = ({ hit, me }) => {
  if (!me) return 'Hit Doesnt get me';
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
      }}>
      <FriendRequestButton me={me} requestFriendId={hit.id} />
      <UserDetails me={me} user={hit} />
    </div>
  );
};

const Content = ({ me }) => (
  <div className="si-content">
    <Stats />
    {/* <Hits hitComponent={Hit} me={me} /> */}
    <HitsConnection me={me} />
    <Pagination />
  </div>
);

const UserSearch = ({ me, ...rest }) => {
  const [touched, setTouched] = useState(false);
  const searchClient = {
    search(requests) {
      const newRequests = requests.map(request => {
        // do not send requests if search box has not been touched
        if (!touched) return;
        // test for empty string and change request parameter: analytics`
        // if (!request.params.query || request.params.query.length === 0) {
        //   request.params.analytics = false;
        // }
        return request;
      });

      return algoliaClient.search(newRequests);
    },
  };

  if (!me) return 'Search has no me';
  return (
    <InstantSearch
      indexName={`${indexPrefix}_UserSearch`}
      searchClient={searchClient}>
      <UserSearchInterface>
        <CustomSearchBox fullwidth handleFocus={() => setTouched(true)} />
        <Content me={me} />
      </UserSearchInterface>
    </InstantSearch>
  );
};

export default UserSearch;

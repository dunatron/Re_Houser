import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import algoliasearch from 'algoliasearch/lite';

import { UserSearchInterface } from './styles';
import CustomSearchBox from './SearchBox';
import HitsConnection from './HitsConnection';

import mePropTypes from '../../propTypes/mePropTypes';

import { InstantSearch, Pagination, Stats } from 'react-instantsearch-dom';

var applicationId = process.env.ALGOLIA_APP_ID;
var apiKey = process.env.ALGOLIA_API_KEY;
const algoliaClient = algoliasearch(applicationId, apiKey);
const indexPrefix = process.env.NODE_ENV === 'development' ? 'dev' : 'prod';

const Content = ({ me }) => (
  <div className="si-content">
    <Stats />
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

Content.propTypes = {
  me: mePropTypes,
};

UserSearch.propTypes = {
  me: mePropTypes,
};

export default UserSearch;

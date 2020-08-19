import React, { useState, useRef, useEffect } from 'react';
import algoliasearch from 'algoliasearch/lite';

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

var applicationId = '4QW4S8SE3J';
var apiKey = '506b6dcf7516c20a1789e6eb9d9a5b39';
const searchClient = algoliasearch(applicationId, apiKey);
const indexPrefix = process.env.NODE_ENV === 'development' ? 'dev' : 'prod';

const Hit = ({ hit }) => (
  <div className="si-hit">
    <div>{hit.id}</div>
    <div>
      {hit.firstName} {hit.lastName}
    </div>
    <div>
      {hit.email} {hit.email}
    </div>
  </div>
);

const Content = () => (
  <div className="si-content">
    <Stats />
    <Hits hitComponent={Hit} />
    <Pagination />
  </div>
);

const UserSearch = props => {
  return (
    <InstantSearch
      indexName={`${indexPrefix}_UserSearch`}
      searchClient={searchClient}>
      <SearchBox />
      <Content />
    </InstantSearch>
  );
};

export default UserSearch;

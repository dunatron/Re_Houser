import algoliasearch from 'algoliasearch/lite';
import React, { useState, useEffect } from 'react';

import { InputBase, IconButton } from '@material-ui/core';
//icons
import SearchIcon from '@material-ui/icons/Search';

const applicationId = process.env.ALGOLIA_APP_ID;
const apiKey = process.env.ALGOLIA_API_KEY;
const indexPrefix = process.env.NODE_ENV === 'development' ? 'dev' : 'prod';
const indexName = `${indexPrefix}_UserSearch`;

const searchClient = algoliasearch(applicationId, apiKey);
const index = searchClient.initIndex(indexName);

const SearchUsers = ({ setHits }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    index.search(searchText).then(({ hits }) => {
      setHits(hits);
    });
  };

  //   useEffect(() => {
  //     handleSearch();
  //   }, []);

  return (
    <div
      style={{
        width: '100%',
      }}>
      <InputBase
        placeholder="Search Users"
        inputProps={{ 'aria-label': 'search users' }}
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
      />
      <IconButton onClick={handleSearch} aria-label="search">
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default SearchUsers;

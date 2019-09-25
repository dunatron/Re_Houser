import React, { useState } from 'react';
import DelayInput from '../../components/Inputs/DelayInput';
import VirtuallyDynamic from '../../components/VirtuallyDynamic/index';

/**
 * Just a simple search box to return names of people,
 * could have it search the database with delay Input firing a mutation
 * perhaps from there drill into records
 */
const SEARCH_ITEMS_LIST = [
  { title: 'Test 1', url: 'https://' },
  { title: 'Test 2', url: 'https://' },
  { title: 'Test 2', url: 'https://' },
  { title: 'Test 4', url: 'https://' },
  { title: 'Test 5', url: 'https://' },
];
const AgentDashboardPage = () => {
  // Declare a new state variable, which we'll call "count"
  const [searchString, setSearchString] = useState('');
  const [searchItems, setSearchItems] = useState(SEARCH_ITEMS_LIST);
  return (
    <div>
      <h1>You have searched For {searchString}</h1>
      <DelayInput
        name="searchString"
        label="Search"
        // handleChange={v => setSearchString(v)}
        handleChange={v => alert(v)}
        waitLength={1000}
        fullWidth={true}
      />
      <div style={{ height: 600 }}>
        <VirtuallyDynamic uniqueStamp={searchString} data={searchItems} />
      </div>
    </div>
  );
};

export default AgentDashboardPage;

import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import Filter from './Filter';
import Activity from './Activity';

const ActivityManager = ({ args, me }) => {
  // We sould subscript to updates for activities with this thing
  // or maybe for the app overall...
  // an activities servive
  const [searchId, setSearchId] = useState(me.id);
  const [searchType, setSearchType] = useState('user');

  if (!me) return 'You must be logged in to view your activity';

  const searchWhereId = searchId.length
    ? {
        [searchType]: {
          id: searchId,
        },
      }
    : null;
  const activityArgs = {
    where: {
      ...searchWhereId,
    },
  };

  console.group('==ACTIVITY MANAGER DATA==');
  console.log('searchId => ', searchId);
  console.log('searchType => ', searchType);
  console.groupEnd();

  return (
    <>
      <Filter
        me={me}
        doSearch={data => {
          setSearchId(data.searchId);
          setSearchType(data.searchType);
        }}
      />
      <Activity args={activityArgs} />
    </>
  );
};

export { ActivityManager, Activity };
export default ActivityManager;

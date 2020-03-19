import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import Filter from './Filter';
import Activity from './Activity';
import Help from '../Help';
import { Button } from '@material-ui/core';

const ActivityManager = props => {
  const { args, me } = props;
  // We sould subscript to updates for activities with this thing
  // or maybe for the app overall...
  // an activities servive
  const [searchId, setSearchId] = useState(me.id);
  const [searchType, setSearchType] = useState('user');
  const [collapsed, setCollapsed] = useState(
    props.collapsed ? props.collapsed : false
  );

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
      <Button
        onClick={() => {
          setCollapsed(!collapsed);
        }}>
        {collapsed ? 'Show Activity' : 'Hide activity'}
      </Button>
      <div style={collapsed ? { display: 'none' } : { display: 'block' }}>
        {!collapsed && (
          <>
            <Help toolTip="Help for activity manager" />
            <Filter
              me={me}
              doSearch={data => {
                console.log('Do Serach => ', data);
                setSearchId(data.searchId);
                setSearchType(data.searchType);
              }}
            />
            <Activity args={activityArgs} />
          </>
        )}
      </div>
    </>
  );
};

export { ActivityManager, Activity };
export default ActivityManager;

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Filter from './Filter';
import Activity from './Activity';
import Help from '@/Components/Help';
import { ACTIVITY_MANAGER_HELP } from '@/Lib/configs/help/activityManagerHelp';
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
            <Help
              toolTip="Help for activity manager"
              helpConf={ACTIVITY_MANAGER_HELP}
            />
            <Filter
              me={me}
              doSearch={data => {
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

ActivityManager.propTypes = {
  args: PropTypes.any.isRequired,
  collapsed: PropTypes.any.isRequired,
  me: PropTypes.shape({
    id: PropTypes.any
  }).isRequired
};

export { ActivityManager, Activity };
export default ActivityManager;

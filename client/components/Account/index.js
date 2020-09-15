import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/client';

// gql queries/mutations
import { CURRENT_USER_QUERY } from '@/Gql/queries/index';

// material-ui
import { AppBar, Tabs, Tab } from '@material-ui/core';

// Icons
import DetailsIcon from '@/Styles/icons/DetailsIcon';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
import PaymentIcon from '@material-ui/icons/Payment';

// components
import Loader from '@/Components/Loader';
import Error from '@/Components/ErrorMessage';

import TabContainer from './TabContainer';
// Tabs
import DetailsTab from './tabs/DetailsTab';
import ProfilePhotoTab from './tabs/ProfilePhotoTab';
import PhotoIdTab from './tabs/PhotoIdTab';
import SettingsTab from './tabs/SettingsTab';

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '800px',
    // flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
  },
}));

export default function TabsWrappedLabel() {
  const tabOneVal = 'details-tab';
  const tabTwoVal = 'profile-photo-tab';
  const tabThreeVal = 'photo-id-tab';
  const tabFourVal = 'settings-tab';
  const classes = useStyles();
  const [value, setValue] = React.useState(tabOneVal);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { data, loading, error } = useQuery(CURRENT_USER_QUERY);

  if (loading) return <Loader loading={loading} />;
  if (error) return <Error error={error} />;

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="wrapped label tabs example">
          <Tab
            wrapped
            label="Personal Details"
            icon={<DetailsIcon />}
            value={tabOneVal}
            {...a11yProps(tabOneVal)}
          />
          <Tab
            wrapped
            value={tabTwoVal}
            label="Profile Photo"
            icon={<PhotoCameraOutlinedIcon />}
            {...a11yProps(tabTwoVal)}
          />
          <Tab
            wrapped
            value={tabThreeVal}
            label="Photo Identification"
            icon={<PhotoCameraOutlinedIcon />}
            {...a11yProps(tabThreeVal)}
          />
          <Tab
            wrapped
            value={tabFourVal}
            label="Settings"
            icon={<PaymentIcon />}
            {...a11yProps(tabFourVal)}
          />
        </Tabs>
      </AppBar>
      {/* TAB CONTAINERS */}
      <TabContainer value={value} index={tabOneVal}>
        <DetailsTab me={data.me} />
      </TabContainer>
      <TabContainer value={value} index={tabTwoVal}>
        <ProfilePhotoTab me={data.me} />
      </TabContainer>
      <TabContainer value={value} index={tabThreeVal}>
        <PhotoIdTab me={data.me} />
      </TabContainer>
      <TabContainer value={value} index={tabFourVal}>
        <SettingsTab me={data.me} />
      </TabContainer>
    </div>
  );
}

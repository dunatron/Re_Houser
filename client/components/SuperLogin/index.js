import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
// Forms
import Signup from '../Signup/index';
import Signin from '../Signin/index';
import RequestReset from '../RequestReset/index';
// icons
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonIcon from '@material-ui/icons/Person';
import ResetIcon from '@material-ui/icons/Build';

import LoggedInAs from './LoggedInAs';

import { CURRENT_USER_QUERY } from '../../graphql/queries/index';

const TabContainer = ({ children, dir }) => {
  return (
    <Typography component="div" dir={dir} style={{ padding: `16px 0` }}>
      {children}
    </Typography>
  );
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    // backgroundColor: theme.palette.background.paper,
    // maxWidth: 800,
    // margin: "auto",
  },
});

const LoginPage = props => {
  const [tabIndex, setTabIndex] = useState(0);
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const saveToState = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const { data, error } = useQuery(CURRENT_USER_QUERY, { suspend: true });
  if (error) {
    return <div>Error! {error.message}</div>;
  }

  // logged in so show show logged in page
  // if (data.me) return <LoggedInAs me={data.me} />
  if (data) {
    if (data.me) return <LoggedInAs me={data.me} />;
  }

  const handleChange = (event, value) => {
    setTabIndex(value);
  };

  const handleChangeIndex = index => {
    setTabIndex(value);
  };

  const { classes, theme } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth">
          <Tab label="Sign Up " icon={<PersonAddIcon />} />
          <Tab label="Sign In" icon={<PersonIcon />} />
          <Tab label="Request Reset" icon={<ResetIcon />} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={tabIndex}
        onChangeIndex={handleChangeIndex}>
        <TabContainer dir={theme.direction}>
          <Signup
            email={email}
            password={password}
            update={e => saveToState(e)}
          />
        </TabContainer>
        <TabContainer dir={theme.direction}>
          <Signin
            email={email}
            password={password}
            update={e => saveToState(e)}
          />
        </TabContainer>
        <TabContainer dir={theme.direction}>
          <RequestReset />
        </TabContainer>
      </SwipeableViews>
    </div>
  );
};

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(LoginPage);

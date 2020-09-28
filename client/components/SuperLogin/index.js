import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
// Forms
import Signup from '@/Components/Signup/index';
import Signin from '@/Components/Signin/index';
import RequestReset from '@/Components/RequestReset/index';
// icons
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonIcon from '@material-ui/icons/Person';
import ResetIcon from '@material-ui/icons/Build';

import LoggedInAs from './LoggedInAs';
import Error from '@/Components/ErrorMessage';

import { CURRENT_USER_QUERY } from '@/Gql/queries/index';

import { useRecoilState } from 'recoil';
import { loginModalState } from '@/Recoil/loginModalState';

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
  root: {},
});

const LoginPage = props => {
  const [loginModal, setLoginModal] = useRecoilState(loginModalState);
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
    return <Error error={error} />;
  }

  if (data) {
    if (data.me) return <LoggedInAs me={data.me} />;
  }

  const handleChange = (event, value) => {
    // setTabIndex(value);
    setLoginModal({
      ...loginModal,
      tabIndex: value,
    });
  };

  const handleChangeIndex = index => {
    // setTabIndex(index);
    setLoginModal({
      ...loginModal,
      tabIndex: index,
    });
  };

  const handleSignedInOrUp = data => {
    props.handleSignedIn && props.handleSignedIn();
  };

  const { classes, theme } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" dense>
        <Tabs
          value={loginModal.tabIndex}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          dense
          variant="fullWidth">
          <Tab
            label="Sign Up "
            data-cy="sign-up-tab"
            icon={<PersonAddIcon />}
          />
          <Tab label="Sign In" data-cy="sign-in-tab" icon={<PersonIcon />} />
          <Tab
            label="Request Reset"
            data-cy="reset-password-tab"
            icon={<ResetIcon />}
          />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={loginModal.tabIndex}
        onChangeIndex={(index, indexLatest, meta) => {
          handleChangeIndex(index);
        }}>
        <TabContainer dir={theme.direction}>
          <Signup
            email={state.email}
            password={state.password}
            handleCompleted={handleSignedInOrUp}
            update={e => {
              saveToState(e);
            }}
          />
        </TabContainer>
        <TabContainer dir={theme.direction}>
          <Signin
            email={state.email}
            password={state.password}
            handleCompleted={handleSignedInOrUp}
            update={e => saveToState(e)}
          />
        </TabContainer>
        <TabContainer dir={theme.direction}>
          <RequestReset email={state.email} />
        </TabContainer>
      </SwipeableViews>
    </div>
  );
};

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSignedIn: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(LoginPage);

import React from 'react';
import PropTypes from 'prop-types';
import SuperLogin from '../components/SuperLogin';

const LoginPage = props => {
  const {
    appData: { currentUser },
  } = props;
  return <SuperLogin />;
};

export default LoginPage;

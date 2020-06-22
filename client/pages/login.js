import React from 'react';
import PropTypes from 'prop-types';
import SuperLogin from '../components/SuperLogin';
import PageHeader from '../components/PageHeader';

const LoginPage = props => {
  const {
    appData: { currentUser },
  } = props;
  return (
    <>
      <PageHeader
        title="Login / Signup"
        metaData={{
          title: 'Login',
          content: 'rehouser platform login',
        }}
      />
      <SuperLogin />
    </>
  );
};

export default LoginPage;

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import SuperLogin from '../components/SuperLogin';
import PageHeader from '../components/PageHeader';
import SendConfirmEmailButton from '../components/MutationButtons/SendConfrimEmailButton';

/**
 *
 * Doesnt actually require login, just needs a token in the url bar
 */
const LoginPage = props => {
  const {
    appData: { currentUser },
  } = props;

  return (
    <>
      <PageHeader
        title="Confirm account"
        metaData={{
          title: 'Confirm account',
          content: 'rehouser platform login',
        }}
      />
      <SendConfirmEmailButton />
    </>
  );
};

export default LoginPage;

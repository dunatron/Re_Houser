import React, { Component } from 'react';

import LookPage from './look';

const HomePage = props => {
  const {
    appData: { currentUser },
  } = props;
  return <LookPage {...props} />; // Notice its a page so we need to spread page props.
};
export default HomePage;

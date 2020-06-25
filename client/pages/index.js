import React, { Component } from 'react';
import Banner from '../components/Banner';

import { Button } from '@material-ui/core';
import ChangeRouteButton from '../components/Routes/ChangeRouteButton';

import LookPage from './look';

const HomePage = props => {
  const {
    appData: { currentUser },
  } = props;
  // query={{ id: data.createProperty.id }}
  return (
    <div>
      <Banner imageSrc="images/banners/home-page-banner.jpg">
        <ChangeRouteButton
          title="Free Appraisal"
          variant="contained"
          color="secondary"
          route="/freeappraisal"
        />
      </Banner>
      <LookPage {...props} />
    </div>
  ); // Notice its a page so we need to spread page props.
};

// const HomePage = props => {
//   const {
//     appData: { currentUser },
//   } = props;
//   return <LookPage {...props} />; // Notice its a page so we need to spread page props.
// };
export default HomePage;

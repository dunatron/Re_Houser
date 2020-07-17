import React, { Component } from 'react';
import Banner from '../components/Banner';

import { Button, Typography } from '@material-ui/core';
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
        <Typography
          variant="h4"
          style={{ marginBottom: '64px', textAlign: 'center' }}>
          Welcome to Rehouser
        </Typography>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '112px',
          }}>
          <ChangeRouteButton
            title="Free Appraisal"
            variant="contained"
            color="secondary"
            route="/freeappraisal"
          />
          <Button variant="contained" color="primary" href="#property-search">
            Look for rental
          </Button>
        </div>
        <Typography
          variant="h5"
          style={{ marginTop: '64px', textAlign: 'center' }}>
          Turning empty houses into friendly abodes
        </Typography>
      </Banner>
      <div>
        <Typography>No information barriers</Typography>
        <Typography component="ul">
          <Typography component="li">
            All details, updates and historical information can be viewed on
            your Rehouser website profile
          </Typography>
        </Typography>
        <Typography>No hidden fees</Typography>
        <Typography component="ul">
          <Typography component="li">
            We offer all fee information upfront and pre-notify you of any
            upcoming additional costs
          </Typography>
        </Typography>
        <Typography>No time wasted</Typography>
        <Typography component="ul">
          <Typography component="li">
            We take care of the entire rental term and process, you get notified
            as and when you like
          </Typography>
        </Typography>
      </div>
      <LookPage {...props} />
    </div>
  ); // Notice its a page so we need to spread page props.
};

export default HomePage;

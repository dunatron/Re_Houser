import React, { Component } from 'react';
import Banner from '../components/Banner';

import { Button, Typography, IconButton } from '@material-ui/core';
import ChangeRouteButton from '../components/Routes/ChangeRouteButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import LookPage from './look';

import Dashboard from '../components/Dashboard';

import ContactForm from '../components/Contact/ContactForm';
import Fees from '../components/Fees';
import TeamInfoText from '../components/Team/TeamInfoText';
import Team from '../components/Team/index';

import HOME_PAGE_DASHBOARD_CONFIG from '../lib/configs/homepageDashboardConf';

const HomePage = props => {
  const {
    appData: { currentUser },
  } = props;
  // query={{ id: data.createProperty.id }}
  return (
    <div>
      <Banner
        imageSrc="images/banners/home-page-banner.jpg"
        footer={[
          <Typography variant="h5" style={{ textAlign: 'center' }}>
            Turning empty houses into friendly abodes
          </Typography>,
        ]}>
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
          <ChangeRouteButton
            title="Look for rental"
            variant="contained"
            color="primary"
            route="/look"
          />
        </div>
        <Typography
          variant="h6"
          style={{ marginTop: '64px', textAlign: 'center' }}>
          Read More
        </Typography>
        <IconButton aria-label="read-more" href="#banner-footer">
          <ArrowDownwardIcon fontSize="large" />
        </IconButton>
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
      {/* <LookPage {...props} /> */}

      <Dashboard
        config={HOME_PAGE_DASHBOARD_CONFIG}
        elevation={0}
        heading=""
        intro=""
      />

      {/* <Fees />
      <br />
      <TeamInfoText />
      <br />
      <ContactForm />
      <Team /> */}
    </div>
  ); // Notice its a page so we need to spread page props.
};

export default HomePage;

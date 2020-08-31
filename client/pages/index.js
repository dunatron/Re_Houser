import React, { Component } from 'react';
import Banner from '../components/Banner';

import { Button, Typography, IconButton } from '@material-ui/core';
import ChangeRouteButton from '../components/Routes/ChangeRouteButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import Dashboard from '../components/Dashboard';

import ContactForm from '../components/Contact/ContactForm';
import Fees from '../components/Fees';
import TeamInfoText from '../components/Team/TeamInfoText';
import Team from '../components/Team/index';

import HOME_PAGE_DASHBOARD_CONFIG from '../lib/configs/homepageDashboardConf';

import Particles from 'react-particles-js';
import Particles2 from 'react-tsparticles';

const HomePage = props => {
  const {
    appData: { currentUser },
  } = props;

  return (
    <div>
      <Banner
        imageSrc="images/banners/home-page-banner.jpg"
        disablePointerEvents={true}
        footer={[
          <Typography
            variant="h5"
            style={{ textAlign: 'center', padding: '0 30px' }}>
            Turning empty houses into friendly abodes
          </Typography>,
        ]}>
        <Typography
          variant="h3"
          // color="primary"
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
            color="primary"
            route="/freeappraisal"
            btnProps={{
              size: 'large',
              style: {
                pointerEvents: 'all',
              },
            }}
          />
          <ChangeRouteButton
            title="Search for rental"
            variant="contained"
            // color="primary"
            route="/property-search"
            btnProps={{
              size: 'large',
              style: {
                pointerEvents: 'all',
              },
            }}
          />
        </div>
        <Typography
          variant="h4"
          // color="primary"
          style={{ marginTop: '64px', textAlign: 'center' }}>
          Read More
        </Typography>
        <IconButton
          style={{
            marginTop: '16px',
            pointerEvents: 'all',
            // height: '3rem',
            // width: '3rem',
          }}
          aria-label="read-more"
          href="#banner-footer"
          color="primary">
          <ArrowDownwardIcon
            fontSize="large"
            style={{
              height: '6rem',
              width: '6rem',
            }}
          />
        </IconButton>
      </Banner>
      <Dashboard
        config={HOME_PAGE_DASHBOARD_CONFIG}
        elevation={0}
        heading=""
        intro=""
      />
    </div>
  );
};

export default HomePage;

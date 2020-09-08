import React, { Component } from 'react';
import ParticleBanner from '../components/Banner/ParticleBanner';
import Banner from '../components/Banner/index';

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

const HomePageBannerBody = () => {
  return (
    <>
      <Typography
        variant="h1"
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
        color="secondary"
        style={{ marginTop: '32px', textAlign: 'center' }}>
        Read More
      </Typography>
      <IconButton
        style={{
          marginTop: '16px',
          pointerEvents: 'all',
        }}
        aria-label="read-more"
        href="#banner-footer"
        color="secondary">
        <ArrowDownwardIcon
          fontSize="large"
          style={{
            height: '3rem',
            width: '3rem',
          }}
        />
      </IconButton>
    </>
  );
};

const HomePage = props => {
  const {
    appData: { currentUser },
  } = props;

  return (
    <div>
      <ParticleBanner
        imageSrc="images/banners/home-page-banner.jpg"
        disablePointerEvents={true}
        footer={[
          <Typography
            variant="h5"
            color="secondary"
            style={{ textAlign: 'center', padding: '0 30px' }}>
            Turning empty houses into friendly abodes
          </Typography>,
        ]}>
        <HomePageBannerBody />
      </ParticleBanner>
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

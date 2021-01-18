import React, { Component } from 'react';
import dynamic from 'next/dynamic';
// import PropTypes from 'prop-types';
import ParticleBanner from '@/Components/Banner/ParticleBanner';
// import Banner from '@/Components/Banner/index';

import { Button, Typography, IconButton } from '@material-ui/core';
import ChangeRouteButton from '@/Components/Routes/ChangeRouteButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import Dashboard from '@/Components/Dashboard';

import HOME_PAGE_DASHBOARD_CONFIG from '@/Lib/configs/dashboards/homepageDashConf';

// server side props
import { initializeApollo, addApolloState } from '@/Lib/apolloClient';
import { CURRENT_USER_QUERY } from '@/Gql/queries';

import { parseCookies, setCookie, destroyCookie } from 'nookies';

// const DynamicParticleBanner = dynamic(
//   () => import('@/Components/Banner/ParticleBanner'),
//   { ssr: false }
// );

const HomePageBannerBody = () => {
  return (
    <>
      <Typography
        variant="h1"
        style={{ marginBottom: '64px', textAlign: 'center' }}>
        Rehouser
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
          route="/landlord/appraisals/add"
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
  return (
    <div>
      <ParticleBanner
        imageSrc="images/banners/home-page-banner.jpg"
        disablePointerEvents={true}
        footer={[
          <Typography
            key={1}
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

export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo(null, ctx);
  await apolloClient.query({
    query: CURRENT_USER_QUERY,
  });
  return addApolloState(apolloClient, {
    props: {},
  });
}

HomePage.propTypes = {};

export default HomePage;

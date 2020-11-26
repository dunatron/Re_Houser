import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import PleaseSignIn from '@/Components/PleaseSignIn';
import { ActivityManager, Activity } from '@/Components/ActivityManager';
import PageHeader from '@/Components//PageHeader';
import { Typography } from '@material-ui/core';

import FileUploader from '@/Components/FileUploader';
import { Image, Transformation, CloudinaryContext } from 'cloudinary-react';
import NoSSRUploadWidget from '@/Components/UploadWidget';

// server side props
import { initializeApollo, addApolloState } from '@/Lib/apolloClient';
import { CURRENT_USER_QUERY } from '@/Gql/queries';

const TutorialsPage = ({ appData: { currentUser } }) => {
  const me = currentUser.data ? currentUser.data.me : null;
  return (
    <Fragment>
      <PageHeader
        title="Rehouser Tutorials"
        intro=""
        metaData={{
          title: 'Rehouser Tutorials',
          content: '',
        }}
      />
      <NoSSRUploadWidget />
    </Fragment>
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

TutorialsPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object,
  }),
};

export default TutorialsPage;

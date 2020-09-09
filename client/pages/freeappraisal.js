import React from 'react';
import PropTypes from 'prop-types';
import PleaseSignIn from '../components/PleaseSignIn';
import PropertyAppraisal from '../components/PropertyAppraisal';
import { Typography } from '@material-ui/core';

import PageHeader from '../components/PageHeader';

const FreeAppraisalPage = ({ appData: { currentUser } }) => {
  const me = currentUser.data ? currentUser.data.me : null;
  return (
    <div>
      <PageHeader
        title="Free Property Appraisal"
        intro="Fill out the form and we will generate an appraisal for you."
        metaData={{
          title: 'Free property appraisal',
          content: 'free property appraisal',
        }}>
        {!me && (
          <Typography variant="h6" gutterBottom>
            Our platform requires that you be logged in to request a free
            appraisal{' '}
          </Typography>
        )}
      </PageHeader>
      <PleaseSignIn
        currentUser={currentUser}
        alert={
          <div>
            <Typography variant="body1">
              <strong>Please Sign In</strong>
            </Typography>
            <Typography variant="body1">
              You must be signed up/in to get a free rental Appraisal
            </Typography>
          </div>
        }>
        <PropertyAppraisal />
      </PleaseSignIn>
    </div>
  );
};

FreeAppraisalPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
};

export default FreeAppraisalPage;

import React from 'react';
import PropTypes from 'prop-types';
import PleaseSignIn from '@Components/PleaseSignIn';
import PropertyAppraisal from '@Components/PropertyAppraisal';
import { Typography } from '@material-ui/core';

import PageHeader from '@Components/PageHeader';

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
            <Typography variant="body1" gutterBottom color="inherit">
              <strong>Please Sign In</strong>
            </Typography>
            <Typography variant="body1" gutterBottom color="inherit">
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

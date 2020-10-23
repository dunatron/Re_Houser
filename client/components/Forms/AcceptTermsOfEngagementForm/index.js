import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { LANDLORD_TERMS_OF_ENGAGEMENT_FORM_CONF } from '@/Lib/configs/landlordTermsOfEngagementForm';

import { UPDATE_USER_MUTATION } from '@/Gql/mutations/index';
import FormCreator from '@/Components/Forms/FormCreator';
import TermsOfEngagement from '@/Components/Terms/TermsOfEngagement';
import { Typography } from '@material-ui/core';
import ChangeRouteButton from '@/Components/Routes/ChangeRouteButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import TextPdfGeneratorCombo from '@/Components/Pdfs/TextPdfGeneratorCombo';
import termsOfEngagementPdfConf from '@/Lib/configs/pdfs/termsOfEngagement';

const AcceptTermsOfEngagementForm = ({ me }) => {
  const handleCompleted = data => {
    window.scrollTo(0, 0);
  };

  const [updateUser, { loading, error, data }] = useMutation(
    UPDATE_USER_MUTATION,
    {
      onCompleted: handleCompleted,
    }
  );

  if (me === null)
    return (
      <Typography>Please Signin to accept the terms of engagement</Typography>
    );

  if (me.acceptedTermsOfEngagement)
    return (
      <div>
        <Typography>
          You have accepted the Terms of engagement! You can now add property to
          the platform
        </Typography>
        <ChangeRouteButton
          route="/landlord/properties/add"
          title="Add Property"
          color="primary"
          variant="contained"
          size="large"
          btnProps={{
            startIcon: <CloudUploadIcon />,
          }}
        />
        <TextPdfGeneratorCombo
          config={termsOfEngagementPdfConf}
          docConf={{
            title: 'Terms of Engagement',
            author: 'Dunatron',
            subject: 'Rehouser Terms of Engagement for Landlords',
            keywords: 'Terms of engagement, security, files, pdf',
            creator: 'Heath Dunlop',
            producer: 'Heath Dunlop',
          }}
        />
      </div>
    );

  return (
    <>
      <TextPdfGeneratorCombo
        config={termsOfEngagementPdfConf}
        docConf={{
          title: 'Terms of Engagement',
          author: 'Dunatron',
          subject: 'Rehouser Terms of Engagement for Landlords',
          keywords: 'Terms of engagement, security, files, pdf',
          creator: 'Heath Dunlop',
          producer: 'Heath Dunlop',
        }}
      />
      <br />
      <FormCreator
        folder={`users/${me.id}`}
        title="huh"
        data={{
          ...me,
        }}
        isNew={true}
        error={error}
        posting={loading}
        createText="Submit terms of engagement"
        config={LANDLORD_TERMS_OF_ENGAGEMENT_FORM_CONF}
        onSubmit={data => {
          updateUser({
            variables: {
              where: {
                id: me.id,
              },
              data: {
                ...data,
                currentAddress: data.currentAddress
                  ? {
                      create: {
                        ...data.currentAddress,
                      },
                    }
                  : {},
                bankDetails: data.bankDetails
                  ? {
                      create: {
                        ...data.bankDetails,
                      },
                    }
                  : {},
              },
            },
          });
        }}
      />
    </>
  );
};

AcceptTermsOfEngagementForm.propTypes = {
  me: PropTypes.shape({
    acceptedTermsOfEngagement: PropTypes.any,
    id: PropTypes.any,
  }).isRequired,
};

export default AcceptTermsOfEngagementForm;

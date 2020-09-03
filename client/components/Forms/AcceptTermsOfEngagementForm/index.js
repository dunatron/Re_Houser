import { useMutation } from '@apollo/client';
import { LANDLORD_TERMS_OF_ENGAGEMENT_FORM_CONF } from '../../../lib/configs/landlordTermsOfEngagementForm';

import { UPDATE_USER_MUTATION } from '../../../graphql/mutations/index';
import FormCreator from '../../Forms/FormCreator';
import TermsOfEngagement from '../../Terms/TermsOfEngagement';
import { Typography } from '@material-ui/core';
import ChangeRouteButton from '../../Routes/ChangeRouteButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const AcceptTermsOfEngagementForm = ({ me }) => {
  const handleCompleted = data => {
    window.scrollTo(0, 0);
  };

  const [acceptedTermsOfEngagement, { loading, error, data }] = useMutation(
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
          route="/properties/add"
          title="Add Property"
          color="primary"
          variant="contained"
          size="large"
          btnProps={{
            startIcon: <CloudUploadIcon />,
          }}
        />
        <TermsOfEngagement />
      </div>
    );

  return (
    <>
      <TermsOfEngagement />
      <br />
      <FormCreator
        folder={`users/${me.id}`}
        title="huh"
        isNew={true}
        error={error}
        posting={loading}
        createText="Submit terms of engagement"
        config={LANDLORD_TERMS_OF_ENGAGEMENT_FORM_CONF}
        onSubmit={data => {
          acceptedTermsOfEngagement({
            variables: {
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

export default AcceptTermsOfEngagementForm;

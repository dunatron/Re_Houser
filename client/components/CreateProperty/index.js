import { useState } from 'react';
import { FormCreator } from '../Forms';
import { useMutation } from '@apollo/client';
import {
  CREATE_PROPERTY_MUTATION,
  UPDATE_USER_MUTATION,
} from '../../graphql/mutations/index';
import {
  PROPERTIES_QUERY,
  OWNER_PROPERTIES_QUERY,
} from '../../graphql/queries/index';

import ChangeRouteButton from '../Routes/ChangeRouteButton';
import { Typography, Button } from '@material-ui/core';

import { toast } from 'react-toastify';
import CREATE_PROPERTY_FORM_CONF from '../../lib/configs/createPropertyForm';
import Error from '../../components/ErrorMessage';
import SuccessPaper from '../../components/SuccessPaper';
import TermsOfEngagement from '../../components/Terms/TermsOfEngagement';
import CheckAndSubmit from './CheckAndSubmit';
import Modal from '../Modal';
import LANDLORD_TERMS_OF_ENGAGEMENT_FORM_CONF from '../../lib/configs/landlordTermsOfEngagementForm';

const CreatePropertyComponent = props => {
  const { me } = props;
  const [createdPropertyId, setCreatedPropertyId] = useState(null);
  const [createdData, setCreatedData] = useState({});
  const [isChecking, setIsChecking] = useState(false);
  const [submittedData, setSubmittedData] = useState({});
  // No idea how the fuck me is getting into here
  if (!me) return 'You must be logged in to create a property appraisal';

  const handlePropertyCreated = data => {
    console.log('data at level 3... => ', data);
    setCreatedData(data);
    setCreatedPropertyId(data.createProperty.id);
    setIsChecking(false);
    toast.success(
      <div>
        <p>New Property Created</p>
        <ChangeRouteButton
          title="Go to property"
          route="/properties/property"
          query={{ id: data.createProperty.id }}
        />
      </div>
    );
  };

  const [
    acceptedTermsOfEngagement,
    acceptedTermsOfEngagementProps,
  ] = useMutation(UPDATE_USER_MUTATION, {
    // onCompleted: data => handleCompleted(data),
    // onCompleted: handleCompleted,
    // refetchQueries: [
    //   { query: PROPERTIES_QUERY },
    //   { query: OWNER_PROPERTIES_QUERY },
    // ],
  });

  // I wonder if we are best to display some information
  // that lets them confirm all of this data
  const submitFormWithData = data => {
    setSubmittedData(data);
    setIsChecking(true);
    // createProperty({
    //   variables: {
    //     data: {
    //       ...data,
    //       rent: data.rent * 100,
    //       onTheMarket: false,
    //       useAdvancedRent: false,
    //       owners: {
    //         connect: {
    //           id: me.id,
    //         },
    //       },
    //       creator: {
    //         connect: {
    //           id: me.id,
    //         },
    //       },
    //       insulationForm: data.insulationForm
    //         ? {
    //             create: {
    //               ...data.insulationForm,
    //             },
    //           }
    //         : {},
    //     },
    //   },
    // });
  };

  const handleCreateMore = () => {
    setCreatedPropertyId(null);
  };

  if (createdPropertyId) {
    return (
      <SuccessPaper
        handleCreateMore={handleCreateMore}
        show={createdPropertyId}>
        <Typography gutterBottom>
          Your property has been created in our system. You may need to supply
          some more data before your property can go on the market
        </Typography>
        <Typography gutterBottom>
          You can manage the property and put it on the market by clicking the
          below button
        </Typography>
        <ChangeRouteButton
          title="Go to property"
          route="/properties/property"
          query={{ id: createdData.createProperty.id }}
          variant="contained"
          color="primary"
        />
      </SuccessPaper>
    );
  }

  // import a modal and chuck this in it <CheckAndSubmit data={} />

  return (
    <div style={{ maxWidth: '800px' }}>
      <Modal
        open={isChecking}
        close={() => setIsChecking(false)}
        title="check details"
        disableBackdrop={true}>
        <CheckAndSubmit
          formData={submittedData}
          me={me}
          handlePropertyCreated={handlePropertyCreated}
        />
      </Modal>
      {/* id, close, title, open, fullScreen, disableBackdrop */}

      {!me.acceptedTermsOfEngagement && (
        <div>
          <Typography variant="h4">
            Too add Property to our platform you must first accept the terms of
            engagement
          </Typography>
          {/* Accept Terms Text */}
          <TermsOfEngagement />
          <Typography>
            I was fishing in some humble pussy the other day
          </Typography>
          <Typography>
            I swallowed my pride, then the weed made me coof it up
          </Typography>
          <Typography></Typography>
          <Typography>Aint afraid to die, just afraid to die sober</Typography>
          <Typography>Switching up my swag, bitch my swag bipolar</Typography>
          <Typography>
            Gettin with that weed and beam, give me self esteem
          </Typography>
          <Typography>
            I merc your bitch/radio arse like radio ra....
          </Typography>
          <Typography>Got that chineese aka</Typography>

          <Typography>That ouzi machine</Typography>
          <Typography>That banna clip</Typography>
          <Typography>all I need is peaches and cream.</Typography>
          <br />
          <Typography>Marching on the sun</Typography>
          <Typography>Stomping on the moon</Typography>
          <Typography>French Kiss a nun</Typography>
          <Typography>With posion on my toungue</Typography>
          <Typography>Smoking on that good</Typography>
          <Typography>Coffing up a lung</Typography>
          <br />
          <FormCreator
            config={LANDLORD_TERMS_OF_ENGAGEMENT_FORM_CONF}
            onSubmit={data => {
              console.log('Terms of engagement data => ', data);
              acceptedTermsOfEngagement({
                variables: {
                  data: {
                    acceptedTermsOfEngagement: true,
                  },
                },
              });
            }}
          />
          {/* <Typography>immortal forever if i...</Typography> */}
          {/* <TermsOfEngagement me={me} /> */}
          {/* <Button
            disabled={acceptedTermsOfEngagementProps.loading}
            onClick={() => {
              acceptedTermsOfEngagement({
                variables: {
                  data: {
                    acceptedTermsOfEngagement: true,
                  },
                },
              });
            }}>
            I Accept the terms of engagement
          </Button> */}
        </div>
      )}
      {me.acceptedTermsOfEngagement && (
        <FormCreator
          title="Property"
          isNew={true}
          config={CREATE_PROPERTY_FORM_CONF}
          onSubmit={submitFormWithData}
        />
      )}
    </div>
  );
};

export default CreatePropertyComponent;

import { useState } from 'react';
import { FormCreator } from '../Forms';
import { useMutation } from '@apollo/client';
import { CREATE_PROPERTY_MUTATION, UPDATE_USER_MUTATION } from '../../graphql/mutations/index';
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
import TermsOfEngagement from "../../components/Terms/TermsOfEngagement"

const CreatePropertyComponent = props => {
  const { me } = props;
  const [createdPropertyId, setCreatedPropertyId] = useState(null);
  // No idea how the fuck me is getting into here
  if (!me) return 'You must be logged in to create a property appraisal';

  const handleCompleted = data => {
    setCreatedPropertyId(data.createProperty.id);
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

  const [createProperty, { loading, error, data }] = useMutation(
    CREATE_PROPERTY_MUTATION,
    {
      // onCompleted: data => handleCompleted(data),
      onCompleted: handleCompleted,
      refetchQueries: [
        { query: PROPERTIES_QUERY },
        { query: OWNER_PROPERTIES_QUERY },
      ],
    }
  );

  const [acceptedTermsOfEngagement, acceptedTermsOfEngagementProps] = useMutation(
    UPDATE_USER_MUTATION,
    {
      // onCompleted: data => handleCompleted(data),
      // onCompleted: handleCompleted,
      // refetchQueries: [
      //   { query: PROPERTIES_QUERY },
      //   { query: OWNER_PROPERTIES_QUERY },
      // ],
    }
  );

  const submitFormWithData = data => {
    createProperty({
      variables: {
        data: {
          ...data,
          rent: data.rent * 100,
          onTheMarket: false,
          useAdvancedRent: false,
          owners: {
            connect: {
              id: me.id,
            },
          },
          creator: {
            connect: {
              id: me.id,
            },
          },
          insulationForm: data.insulationForm
            ? {
                create: {
                  ...data.insulationForm,
                },
              }
            : {},
        },
      },
    });
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
          query={{ id: data.createProperty.id }}
          variant="contained"
          color="primary"
        />
      </SuccessPaper>
    );
  }

  return ( 
    <div style={{ maxWidth: '800px' }}>
      {!me.acceptedTermsOfEngagement && <div >
      
<Typography variant="h4">Too add Property to our platform you must first accept the terms of engagement</Typography>
<TermsOfEngagement me={me} />
<Button disabled={acceptedTermsOfEngagementProps.loading} onClick={() => {
        acceptedTermsOfEngagement({
          variables: {
            data: {
              acceptedTermsOfEngagement: true
            }
          }
        })
      }}>I Accept the terms of engagement</Button>
        
        </div>}
      {me.acceptedTermsOfEngagement && <FormCreator
        title="Property"
        isNew={true}
        config={CREATE_PROPERTY_FORM_CONF}
        error={error}
        posting={loading}
        onSubmit={submitFormWithData}
      />}
    </div>
  );
};

export default CreatePropertyComponent;

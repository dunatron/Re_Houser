import { useState, useEffect } from 'react';
import { FormCreator } from '../Forms';
import { useMutation, useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { UPDATE_USER_MUTATION } from '../../graphql/mutations/index';
import { SINGLE_RENTAL_APPRAISAL_QUERY } from '../../graphql/queries/index';

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
  const router = useRouter();
  const [waitForLazy, setWaitForLazy] = useState(
    router.query.appraisalId ? true : false
  );
  const { me } = props;
  const [createdPropertyId, setCreatedPropertyId] = useState(null);
  const [createdData, setCreatedData] = useState({});
  const [isChecking, setIsChecking] = useState(false);
  const [defaultFormData, setDefaultFormData] = useState({
    bankDetails: me.bankDetails ? me.bankDetails : {},
  });
  const [submittedData, setSubmittedData] = useState({});

  if (!me) return 'You must be logged in to create a property appraisal';

  const [loadAppraisal, { called, loading, data, error }] = useLazyQuery(
    SINGLE_RENTAL_APPRAISAL_QUERY,
    {
      fetchPolicy: 'network-only', // simply becaus emutation isnt updating lazyQuery. at very least should retrigger network fetch
      partialRefetch: true,
    }
  );

  useEffect(() => {
    if (data && data.rentalAppraisal && !loading) {
      setDefaultFormData({ ...defaultFormData, ...data.rentalAppraisal });
      setWaitForLazy(false);
    }
  }, [data, loading]);

  const handlePropertyCreated = data => {
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

  const handleTermsOfEngagementAccepted = data => {
    window.scrollTo(0, 0);
  };

  const [
    acceptedTermsOfEngagement,
    acceptedTermsOfEngagementProps,
  ] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: handleTermsOfEngagementAccepted,
  });

  const submitFormWithData = data => {
    setSubmittedData({
      ...data,
      bankDetails: data.bankDetails
        ? {
            create: {
              ...data.bankDetails,
            },
          }
        : {},
      rehouserAssist: {
        create: {
          ...data.rehouserAssist,
        },
      },
    });
    setIsChecking(true);
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
          Rehouser Property Management Ltd will be in contact to arrange for
          their three keys to be handed over and photos of the property to be
          taken if this has not already occurred.
        </Typography>
        <Typography gutterBottom>
          You can now rest easy knowing your investment is in safe hands. We
          will keep you informed throughout the letting process.
        </Typography>
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
  if (!called && router.query.appraisalId) {
    loadAppraisal({
      variables: {
        where: {
          id: router.query.appraisalId,
        },
      },
    });
  }

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
      {!me.acceptedTermsOfEngagement && (
        <div>
          <Typography variant="h5" gutterBottom>
            To add Property to our platform you must first accept the terms of
            engagement
          </Typography>
          <TermsOfEngagement />
          <br />
          <FormCreator
            title="huh"
            isNew={true}
            error={acceptedTermsOfEngagementProps.error}
            posting={acceptedTermsOfEngagementProps.loading}
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
        </div>
      )}

      {me.acceptedTermsOfEngagement && (
        <>
          {waitForLazy && <div>Loading in the appraisal data first</div>}

          <Error error={error} />
          {!waitForLazy && (
            <FormCreator
              title="Property"
              forceFormUpdates={true}
              data={{
                ...defaultFormData,
              }}
              isNew={true}
              config={CREATE_PROPERTY_FORM_CONF}
              onSubmit={submitFormWithData}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CreatePropertyComponent;

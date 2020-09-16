import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { FormCreator } from '@/Components/Forms';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { SINGLE_RENTAL_APPRAISAL_QUERY } from '@/Gql/queries/index';
import { UPDATE_RENTAL_APPRAISAL_MUTATION } from '@/Gql/mutations/index';
import ChangeRouteButton from '@/Components/Routes/ChangeRouteButton';
import { Box, Typography } from '@material-ui/core';
import { toast } from 'react-toastify';
import CREATE_PROPERTY_FORM_CONF from '@/Lib/configs/createPropertyForm';
import Error from '@/Components/ErrorMessage';
import Loader from '@/Components/Loader';
import SuccessPaper from '@/Components/SuccessPaper';
import CheckAndSubmit from './CheckAndSubmit';
import Modal from '@/Components/Modal';
import AcceptTermsOfEngagementForm from '@/Components/Forms/AcceptTermsOfEngagementForm';
import AssociatedAppraisal from './AssociatedAppraisal';

const LoadingAppraisal = () => (
  <Loader loading={true} text="Loading in Appraisal" />
);

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

  const [folderName, setFolderName] = useState('properties');

  if (!me)
    return (
      <Typography gutterBottom variant="body1">
        You must be logged in to create a property appraisal
      </Typography>
    );

  const [loadAppraisal, { called, loading, data, error }] = useLazyQuery(
    SINGLE_RENTAL_APPRAISAL_QUERY,
    {
      fetchPolicy: 'network-only', // simply becaus emutation isnt updating lazyQuery. at very least should retrigger network fetch
      partialRefetch: true,
    }
  );

  useEffect(() => {
    if (data && data.rentalAppraisal && !loading) {
      if (data.rentalAppraisal.hasBeenUsed) {
        toast.info(
          <Box>
            <Typography variant="h6" color="inherit" gutterBottom>
              Alert!
            </Typography>
            <Typography color="inherit" gutterBottom>
              Appraisal has been used to create a property already and will not
              be used
            </Typography>
          </Box>
        );
      } else {
        setDefaultFormData({ ...defaultFormData, ...data.rentalAppraisal });
      }
      setWaitForLazy(false);
    }
  }, [data, loading]);

  // Will watch for changes to me, and fill the form
  useEffect(() => {
    setDefaultFormData({
      ...defaultFormData,
      bankDetails: me.bankDetails,
    });
    return () => {
      console.log('Create Property dismounted');
    };
  }, [me.bankDetails]);

  const [updateAppraisal, updateAppraisalProps] = useMutation(
    UPDATE_RENTAL_APPRAISAL_MUTATION
  );

  const handlePropertyCreated = data => {
    setCreatedData(data);
    setCreatedPropertyId(data.createProperty.id);
    setIsChecking(false);
    toast.success(
      <Box component="div">
        <Typography gutterBottom variant="h6">
          New Property Created
        </Typography>
        <ChangeRouteButton
          title="Go to property"
          route="/landlord/properties/property"
          query={{ id: data.createProperty.id }}
        />
      </Box>
    );

    if (router.query.appraisalId) {
      updateAppraisal({
        variables: {
          where: {
            id: router.query.appraisalId,
          },
          data: {
            hasBeenUsed: true,
          },
        },
      });
    }

    // Check if we had had an appraisalId attached. If we did.
    // remove the query from the url bar
    // send a mutation to update the rentalAppraisal field hasBeenUsed.
    // Then on lazy load if hasBeenUsed we show something else explaining the appraisal has been used to create the property already!
    // Send them to that property? if its not theres it will say so.
  };

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
        <Typography gutterBottom color="inherit">
          Rehouser Property Management Ltd will be in contact to arrange for
          their three keys to be handed over and photos of the property to be
          taken if this has not already occurred.
        </Typography>
        <Typography gutterBottom color="inherit">
          You can now rest easy knowing your investment is in safe hands. We
          will keep you informed throughout the letting process.
        </Typography>
        <Typography gutterBottom color="inherit">
          Your property has been created in our system. You may need to supply
          some more data before your property can go on the market
        </Typography>
        <ChangeRouteButton
          title="Go to property"
          route="/landlord/properties/property"
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
    return <LoadingAppraisal />;
  }

  if ((!called && router.query.appraisalId) || loading) {
    return <LoadingAppraisal />;
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
          <AcceptTermsOfEngagementForm me={me} />
        </div>
      )}

      {me.acceptedTermsOfEngagement && (
        <>
          {waitForLazy && (
            <Typography gutterBottom variant="h6">
              Loading in the appraisal data first
            </Typography>
          )}
          {data.rentalAppraisal && (
            <AssociatedAppraisal id={router.query.appraisalId} />
          )}
          <Error error={error} />
          {!waitForLazy && (
            <FormCreator
              folder={folderName}
              title="Property"
              watchFields={['placeId']}
              handleWatchChanges={changes => {
                if (changes.placeId)
                  setFolderName(`properties/${changes.placeId}`);
              }}
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

CreatePropertyComponent.propTypes = {
  me: PropTypes.shape({
    acceptedTermsOfEngagement: PropTypes.any,
    bankDetails: PropTypes.any,
  }).isRequired,
};

export default CreatePropertyComponent;

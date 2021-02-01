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
import RPaper from '@/Styles/RehouserPaper';
import Alert from '@/Components/Alert';

const LoadingAppraisal = () => (
  <Loader loading={true} text="Loading in Appraisal" />
);

const HasBeenUsedMessage = () => {
  return (
    <Box>
      <Typography variant="h6" color="inherit" gutterBottom>
        Alert!
      </Typography>
      <Typography color="inherit" gutterBottom>
        Appraisal has been used to create a property already and will not be
        used to prefill the add property form
      </Typography>
    </Box>
  );
};

const CreatePropertyComponent = props => {
  const router = useRouter();

  const appraisal_id = router.query.appraisal_id;

  const [waitForLazy, setWaitForLazy] = useState(appraisal_id ? true : false);
  const { me } = props;
  const [createdPropertyId, setCreatedPropertyId] = useState(null);
  const [createdData, setCreatedData] = useState({});
  const [isChecking, setIsChecking] = useState(false);

  const defaultMeData = {
    bankDetails: me.bankDetails ? me.bankDetails : {},
  };

  const [defaultFormData, setDefaultFormData] = useState({
    ...defaultMeData,
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
    if (data && data.rentalAppraisal && !loading && !createdPropertyId) {
      if (data.rentalAppraisal.hasBeenUsed) {
        toast.info(<HasBeenUsedMessage />);
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
    return () => {};
  }, [me.bankDetails]);

  const [updateAppraisal, updateAppraisalProps] = useMutation(
    UPDATE_RENTAL_APPRAISAL_MUTATION
  );

  const handlePropertyCreated = data => {
    const newPropertyId = data.createProperty.id;
    setCreatedData(data);
    setCreatedPropertyId(newPropertyId);
    setIsChecking(false);
    setDefaultFormData({
      ...defaultMeData,
    });
    toast.success(
      <Box component="div">
        <Typography gutterBottom variant="h6">
          New Property Created
        </Typography>
        <ChangeRouteButton
          title="Go to property"
          route={`/landlord/properties/${newPropertyId}`}
        />
      </Box>
    );

    if (appraisal_id) {
      updateAppraisal({
        variables: {
          where: {
            id: appraisal_id,
          },
          data: {
            hasBeenUsed: true,
            property: {},
          },
        },
      });
    }
  };

  const submitFormWithData = data => {
    setSubmittedData({
      ...data,
      // bankDetails: data.bankDetails
      //   ? {
      //       create: {
      //         ...data.bankDetails,
      //       },
      //     }
      //   : {},
      // rehouserAssist: {
      //   create: {
      //     ...data.rehouserAssist,
      //   },
      // },
    });
    setIsChecking(true);
  };

  // lets see if we can get rid of the appraisal for a create more
  const handleCreateMore = () => {
    setCreatedPropertyId(null);
    router.push({
      url: '/landlord/properties/add',
    });
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
          route={`/landlord/properties/${createdData.createProperty.id}`}
          variant="contained"
          color="primary"
        />
      </SuccessPaper>
    );
  }
  if (!called && appraisal_id) {
    loadAppraisal({
      variables: {
        where: {
          id: appraisal_id,
        },
      },
    });
    return <LoadingAppraisal />;
  }

  if ((!called && appraisal_id) || loading) {
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
        <>
          {/* <Alert severity="info"> */}
          <Alert severity="info">
            <Typography variant="body1">
              To add Property to our platform you must first accept the terms of
              engagement
            </Typography>
          </Alert>
          <AcceptTermsOfEngagementForm me={me} />
        </>
      )}

      {me.acceptedTermsOfEngagement && (
        <>
          {waitForLazy && (
            <Typography gutterBottom variant="h6">
              Loading in the appraisal data first
            </Typography>
          )}
          {data && data.rentalAppraisal && (
            <>
              <AssociatedAppraisal
                rentalAppraisal={data.rentalAppraisal}
                appraisalId={appraisal_id}
              />
              {data.rentalAppraisal.hasBeenUsed && (
                <Box
                  style={{
                    marginBottom: '16px',
                  }}>
                  <HasBeenUsedMessage />
                </Box>
              )}
            </>
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

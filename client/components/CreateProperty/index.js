import { useState, useEffect } from 'react';
import { FormCreator } from '../Forms';
import { useMutation, useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import {
  CREATE_PROPERTY_MUTATION,
  UPDATE_USER_MUTATION,
} from '../../graphql/mutations/index';
import {
  PROPERTIES_QUERY,
  OWNER_PROPERTIES_QUERY,
  SINGLE_RENTAL_APPRAISAL_QUERY,
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
      // setDefaultFormData({ ...defaultFormData, ...data.rentalAppraisal });
      setDefaultFormData({
        lowRent: null,
        location: '22 Oakland Street, Mataura, New Zealand',
        acceptTerms: true,
        __typename: 'RentalAppraisal',
        highRent: null,
        heatSources: ['HEAT_PUMP', 'ELECTRIC_HEATER'],
        requestedBy: {
          email: 'heath.dunlop.hd@gmail.com',
          __typename: 'User',
          profilePhoto: null,
          lastName: 'Dunlop',
          firstName: 'Heath',
          id: 'ckdft77484maf0999xrbteqbp',
          rehouserStamp: null,
          phone: '0212439998',
        },
        rooms: 66,
        locationLng: 168.8614981,
        rentValueAccepted: null,
        rent: null,
        id: 'ckdfwcjbd55ho0999w71yv820',
        createdAt: '2020-08-04T12:06:17.545Z',
        bathrooms: 2,
        property: null,
        locationLat: -46.19499399999999,
      });
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
    // onCompleted: data => handleCompleted(data),
    onCompleted: handleTermsOfEngagementAccepted,
    // refetchQueries: [
    //   { query: PROPERTIES_QUERY },
    //   { query: OWNER_PROPERTIES_QUERY },
    // ],
  });

  // I wonder if we are best to display some information
  // that lets them confirm all of this data
  //   ? {
  //     create: {
  //       ...data.bankDetails,
  //     },
  //   }
  // : {},
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
    });
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
      {/* id, close, title, open, fullScreen, disableBackdrop */}

      {!me.acceptedTermsOfEngagement && (
        <div>
          <Typography variant="h5" gutterBottom>
            To add Property to our platform you must first accept the terms of
            engagement
          </Typography>
          {/* Accept Terms Text */}
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
        <>
          {/* {router.query.appraisalId && (
            <Button
              onClick={() =>
                loadAppraisal({
                  variables: {
                    where: {
                      id: router.query.appraisalId,
                    },
                  },
                })
              }>
              LOAD IN YOUR APPRAISAL
            </Button>
          )} */}
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

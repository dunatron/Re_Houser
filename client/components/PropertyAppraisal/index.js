import { FormCreator } from '../Forms';
import { CREATE_RENTAL_APPRAISAL_MUTATION } from '../../graphql/mutations';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import SpanRoute from '../Routes/SpanRoute';
import { Typography } from '@material-ui/core';

const PROPERTY_APPRAISAL_CONF = [
  {
    type: 'Location',
    key: 'location',
    fieldProps: {
      name: 'location',
      label:
        'Lodation of property. SHould probs use google like normal property picker',
    },
    refConf: {
      required: {
        value: true,
        message: 'You need a location to appraise a property...',
      },
    },
  },
  {
    type: 'Int',
    key: 'rooms',
    fieldProps: {
      name: 'rooms',
      label: 'number of bedrooms on the property',
    },
    refConf: {
      required: {
        value: true,
        message:
          'You need to supply the number of bedrooms on the property for an appraisal',
      },
    },
  },
  {
    type: 'Int',
    key: 'bathrooms',
    fieldProps: {
      name: 'bathrooms',
      label: 'number of bedrooms on the property',
    },
    refConf: {
      required: {
        value: true,
        message:
          'You need to supply the number of bathrooms on the property for an appraisal',
      },
    },
  },
  {
    type: 'SelectMultipleEnum',
    __type: 'HeatSource',
    key: 'heatSources',
    fieldProps: {
      name: 'heatSources',
      label: 'select all valid heat source on propery',
    },

    refConf: {
      required: {
        value: true,
        message: 'You need to supply heat sources for an appraisal',
      },
    },
  },
];

const PropertyAppraisal = props => {
  const { propertyId, me } = props;
  // No idea how the fuck me is getting into here
  if (!me) return 'You must be logged in to create a property appraisal';

  // if (me.usedFreeAppraisal && !propertyId)
  //   return (
  //     <>
  //       <Typography>
  //         You have used your free appraisal. You can however create properties
  //         and then get them appraised.
  //       </Typography>
  //       <Typography>
  //         To do this head on over to the add properties{' '}
  //         <SpanRoute text="properties" route="/properties/add" /> Page
  //       </Typography>
  //       <Typography>
  //         We will send you an email once your property has been appraised,
  //         allowing you to create a property with the appraised information
  //         prefilled
  //       </Typography>
  //     </>
  //   );

  const handleCompleted = data => {
    const { id } = data.createRentalAppraisal;
    toast.success(
      `Rental Appraisal has been sent. We will send you an email once it has been appraised RentalAppraisal ID ${id}`
    );
  };

  const [createRentalAppraisal, { loading, error, data }] = useMutation(
    CREATE_RENTAL_APPRAISAL_MUTATION,
    {
      // onCompleted: data => handleCompleted(data),
      onCompleted: handleCompleted,
    }
  );

  return (
    <>
      <FormCreator
        title="Property Appraisal"
        isNew={!propertyId}
        // data={{
        //   heatSources: ['HEAT_PUMP'],
        // }}
        config={PROPERTY_APPRAISAL_CONF}
        error={error}
        posting={loading}
        onSubmit={prismaReadyData => {
          createRentalAppraisal({
            variables: {
              data: {
                ...prismaReadyData,
                requestedBy: {
                  connect: {
                    id: me.id,
                  },
                },
                property: propertyId
                  ? {
                      connect: {
                        id: propertyId,
                      },
                    }
                  : null,
              },
            },
          });
        }}
      />
    </>
  );
};

export default PropertyAppraisal;

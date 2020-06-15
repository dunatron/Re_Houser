import { FormCreator } from '../Forms';
import { useMutation } from '@apollo/client';
import { CREATE_PROPERTY_MUTATION } from '../../graphql/mutations/index';
import {
  PROPERTIES_QUERY,
  OWNER_PROPERTIES_QUERY,
} from '../../graphql/queries/index';

import ChangeRouteButton from '../Routes/ChangeRouteButton';

import { toast } from 'react-toastify';
import CREATE_PROPERTY_FORM_CONF from '../../lib/configs/createPropertyForm';

const CreatePropertyComponent = props => {
  const { me } = props;
  // No idea how the fuck me is getting into here
  if (!me) return 'You must be logged in to create a property appraisal';

  const handleCompleted = data => {
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

  const submitFormWithData = data => {
    console.log('The submitted Data => ', data);
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

  return (
    <div style={{ maxWidth: '800px' }}>
      <FormCreator
        title="Property"
        isNew={true}
        // data={{
        //   heatSources: ['HEAT_PUMP'],
        // }}
        config={CREATE_PROPERTY_FORM_CONF}
        error={error}
        posting={loading}
        onSubmit={submitFormWithData}
        // onSubmit={d => {
        //   console.log('Submitted create form => ', d);
        // }}
        // onSubmit={prismaReadyData => {
        //   createProperty(prismaReadyData);
        // }}
      />
    </div>
  );
};

export default CreatePropertyComponent;

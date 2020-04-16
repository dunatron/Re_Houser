import { FormCreator } from '../Forms';
import { CREATE_PROPERTY_MUTATION } from '../../graphql/mutations/index';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import CREATE_PROPERTY_FORM_CONF from '../../lib/configs/createPropertyForm';

const CreatePropertyComponent = props => {
  const { me } = props;
  // No idea how the fuck me is getting into here
  if (!me) return 'You must be logged in to create a property appraisal';

  const handleCompleted = data => {
    console.log('Finished successful property upload');
  };

  const [createProperty, { loading, error, data }] = useMutation(
    CREATE_PROPERTY_MUTATION,
    {
      // onCompleted: data => handleCompleted(data),
      onCompleted: handleCompleted,
    }
  );

  const submitFormWithData = data => {
    console.log('Here is submitted data => ', data);
    // alert('Check console logs');
    createProperty({
      variables: {
        data: {
          ...data,
        },
      },
    });
  };

  return (
    <>
      <FormCreator
        title="Property"
        isNew={true}
        // data={{
        //   heatSources: ['HEAT_PUMP'],
        // }}
        config={CREATE_PROPERTY_FORM_CONF}
        error={error}
        posting={loading}
        // onSubmit={submitFormWithData}
        onSubmit={d => {
          console.log('Submitted create form => ', d);
        }}
        // onSubmit={prismaReadyData => {
        //   createProperty(prismaReadyData);
        // }}
      />
    </>
  );
};

export default CreatePropertyComponent;

import { useMutation } from '@apollo/client';

import FormCreator from '@/Components/Forms/FormCreator';
import USER_FORM_CONF from '@/Lib/configs/forms/userForm';
import { UPDATE_USER_MUTATION } from '@/Gql/mutations/index';
// import {_isWizard} from '@'

const UpdateUser = ({ user, me }) => {
  const [updateUser, { error, loading }] = useMutation(UPDATE_USER_MUTATION);

  const handleFormSubmit = data => {
    // delete email as cant change it
    delete data.email;
    const bankCreateKey = user.bankDetails ? 'update' : 'create';
    updateUser({
      variables: {
        data: {
          ...data,
          adminSettings: {
            update: {
              ...data.adminSettings,
            },
          },
          ...(data.bankDetails && {
            bankDetails: {
              [bankCreateKey]: {
                ...data.bankDetails,
              },
            },
          }),
        },
        where: {
          id: user.id,
        },
      },
    });
  };

  return (
    <div>
      <FormCreator
        data={user}
        posting={loading}
        error={error}
        title={`${user.firstName} ${user.lastName}`}
        config={USER_FORM_CONF}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default UpdateUser;

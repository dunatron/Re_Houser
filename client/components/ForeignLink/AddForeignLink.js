import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Tooltip, Typography } from '@material-ui/core';
import { useMutation } from '@apollo/client';

import FormCreator from '@/Components/Forms/FormCreator';
import ADD_FOREIGN_LINK_FORM_CONF from '@/Lib/configs/forms/addForeignLinkForm';
import { CREATE_FOREIGN_LINK_MUTATION } from '@/Gql/mutations';
import { toast } from 'react-toastify';

const useStyles = makeStyles(theme => ({
  root: {},
}));

export default function AddForeignLink({ id, type, onCompleted }) {
  const classes = useStyles();

  const handleOnCompleted = data => {
    toast.success(<div>Link Added</div>);
    onCompleted && onCompleted(data); // pass data up if has function
  };

  const [createForeignLink, { data, loading, error }] = useMutation(
    CREATE_FOREIGN_LINK_MUTATION,
    {
      onCompleted: handleOnCompleted,
    }
  );

  const handleFormSubmission = formData =>
    createForeignLink({
      variables: {
        data: {
          ...formData,
          [type]: {
            // e.g property or user
            connect: {
              id: id,
            },
          },
        },
      },
    });

  return (
    <div>
      <FormCreator
        posting={loading}
        error={error}
        config={ADD_FOREIGN_LINK_FORM_CONF}
        onSubmit={handleFormSubmission}
      />
    </div>
  );
}

AddForeignLink.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['property', 'user']).isRequired,
};

// type oneOf "property", "user"

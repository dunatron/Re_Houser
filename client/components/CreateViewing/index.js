import PropTypes from 'prop-types';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_VIEWING_MUTATION } from '@/Gql/mutations';
import { toast } from 'react-toastify';

import EnumSelectOption from '@/Components/Inputs/EnumSelectOption';
import DateInput from '@/Components/Inputs/DateInput';
import Error from '@/Components/ErrorMessage';
import Loader from '@/Components/Loader';
// material
import { Button, TextField } from '@material-ui/core';

const CreateViewing = ({ propertyId, me }) => {
  const [state, setState] = useState({
    dateTime: '2020-06-30T17:31:33.263Z',
    recurringType: 'ONCE',
    minutesFor: 90,
    hosts: [
      {
        id: me.id,
        firstName: '',
        lastName: '',
        email: '',
      },
    ],
  });

  const handleCompleted = data => {
    toast(
      <div>
        <h1>New Viewing created</h1>
      </div>
    );
  };

  const handleError = error => {
    toast(
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  };

  const [createViewing, { loading, error }] = useMutation(
    CREATE_VIEWING_MUTATION,
    {
      onCompleted: handleCompleted,
      onError: handleError,
    }
  );

  const handleCreateViewing = () => {
    createViewing({
      variables: {
        data: {
          dateTime: state.dateTime,
          recurringType: state.recurringType,
          minutesFor: state.minutesFor,
          property: {
            connect: {
              id: propertyId,
            },
          },
          hosts: {
            connect: state.hosts.map(host => ({ id: host.id })),
          },
        },
      },
    });
  };

  if (loading)
    return (
      <Loader loading={loading} text="checking for clashes for new viewing" />
    );

  if (error) return <Error error={error} />;

  return (
    <div>
      <DateInput onChange={date => setState({ ...state, dateTime: date })} />
      <TextField
        type="number"
        label="Viewing Length"
        helperText="in  15 min intervals with 90 minutes as the max"
        InputProps={{ inputProps: { min: 15, max: 9, step: 15 } }}
        onChange={e => setState({ ...state, minutesFor: e.target.value })}
      />
      <EnumSelectOption
        __type="RecurringType"
        value={state.recurringType}
        name="recurringType"
        label="Recurring Type"
        selectID="recurringType"
        helperText="You need a recurring type"
        handleChange={v => setState({ ...state, recurringType: v })}
      />
      <Button onClick={handleCreateViewing}>Create Viewing</Button>
    </div>
  );
};

CreateViewing.propTypes = {
  me: PropTypes.shape({
    id: PropTypes.any
  }).isRequired,
  propertyId: PropTypes.any
};

export default CreateViewing;

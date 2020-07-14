import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_VIEWING_MUTATION } from '../../graphql/mutations';
import { toast } from 'react-toastify';

import EnumSelectOption from '../Inputs/EnumSelectOption';
import DateInput from '../Inputs/DateInput';
import BooleanInput from '../Inputs/Boolean';
import NumberInput from '../Inputs/NumberInput';
import Error from '../ErrorMessage';
import Loader from '../Loader';
// material
import { Button, TextField, InputAdornment } from '@material-ui/core';
import moment from 'moment';

const CreateViewing = ({ propertyId, me }) => {
  const [state, setState] = useState({
    dateTime: moment().format(),
    recurringType: 'ONCE',
    minutesFor: 30,
    onRequest: true,
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

  return (
    <div>
      <Error error={error} />
      <DateInput
        onChange={date => setState({ ...state, dateTime: date })}
        value={state.dateTime}
      />
      <NumberInput
        label="Viewing Length"
        helperText="in  15 min intervals with 90 minutes as the max"
        name="minutesFor"
        InputProps={{ inputProps: { min: 15, max: 90, step: 15 } }}
        endAdornment={<InputAdornment position="end">minutes</InputAdornment>}
        defaultValue={state.minutesFor}
        handleChange={v => setState({ ...state, minutesFor: v })}
      />
      <BooleanInput
        name="onRequest"
        label="hold viewings on request"
        helperText="Boolean helper text. Like we will create viewings on client request"
        defaultChecked={state.onRequest}
        handleChange={v =>
          setState({
            ...state,
            onRequest: v,
          })
        }
      />
      <EnumSelectOption
        __type="RecurringType"
        value={state.recurringType}
        defaultValue={state.recurringType}
        name="recurringType"
        label="Recurring Type"
        selectID="recurringType"
        helperText="You need a recurring type"
        handleChange={v => setState({ ...state, recurringType: v })}
      />
      <Error error={error} />
      <Button onClick={handleCreateViewing}>Create Viewing</Button>
    </div>
  );
};

export default CreateViewing;

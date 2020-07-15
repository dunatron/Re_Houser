import { useState } from 'react';
import { withStyles } from '@material-ui//core/styles';
import { useMutation } from '@apollo/client';
import { CREATE_VIEWING_MUTATION } from '../../graphql/mutations';
import { toast } from 'react-toastify';
import { VIEWINGS_QUERY } from '../../graphql/queries';

import EnumSelectOption from '../Inputs/EnumSelectOption';
import DateInput from '../Inputs/DateInput';
import BooleanInput from '../Inputs/Boolean';
import NumberInput from '../Inputs/NumberInput';
import Error from '../ErrorMessage';
import Loader from '../Loader';
// material
import {
  Button,
  TextField,
  InputAdornment,
  Typography,
} from '@material-ui/core';
import moment from 'moment';

const styles = theme => ({
  root: {
    marginBottom: theme.spacing(4),
    // padding: theme.spacing(2),
  },
});

const ViewingForm = ({
  viewing,
  propertyId,
  me,
  where,
  cancel,
  error,
  loading,
  onSave,
  classes,
}) => {
  const [state, setState] = useState({
    dateTime: viewing ? viewing.dateTime : moment().format(),
    recurringType: viewing ? viewing.recurringType : 'ONCE',
    minutesFor: viewing ? viewing.minutesFor : 30,
    onRequest: viewing ? viewing.onRequest : true,
    hosts: viewing
      ? viewing.hosts
      : [
          {
            id: me.id,
            firstName: '',
            lastName: '',
            email: '',
          },
        ],
  });

  const handleSave = () => {
    onSave(state);
  };

  return (
    <div className={classes.root}>
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
      <Button onClick={handleSave} disabled={loading}>
        Save Viewing
      </Button>
      <Button onClick={cancel}>CANCEL</Button>
    </div>
  );
};

export default withStyles(styles)(ViewingForm);

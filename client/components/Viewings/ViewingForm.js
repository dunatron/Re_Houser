import PropTypes from 'prop-types';
import { useState } from 'react';
import { withStyles } from '@material-ui//core/styles';

import EnumSelectOption from '@/Components/Inputs/EnumSelectOption';
import DateInput from '@/Components/Inputs/DateInput';
import BooleanInput from '@/Components/Inputs/Boolean';
import NumberInput from '@/Components/Inputs/NumberInput';
import Error from '@/Components/ErrorMessage';
import Loader from '@/Components/Loader';
// material
import { Button, InputAdornment } from '@material-ui/core';
import moment from 'moment';

// proptypes
import mePropTypes from '../../propTypes/mePropTypes';

const styles = theme => ({
  root: {
    marginBottom: theme.spacing(4),
  },
});

const ViewingForm = ({
  viewing,
  me,
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

ViewingForm.propTypes = {
  viewing: PropTypes.shape({
    dateTime: PropTypes.string,
    recurringType: PropTypes.string,
    minutesFor: PropTypes.number,
    onRequest: PropTypes.bool,
    hosts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
      })
    ),
  }),
  me: mePropTypes,
  cancel: PropTypes.func.isRequired,
  error: PropTypes.object,
  loading: PropTypes.bool,
  onSave: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewingForm);

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(2),
  },
});

/**
 * https://stackoverflow.com/questions/7372038/is-there-any-way-to-change-input-type-date-format
 * I was hoping to use material-ui/pickers but they are not fit for SSR
 * 1. use local date
 * 2. use moment and our db format
 * 3. catch our db format before entering datepicker and convert to YYYY-MM-DD as I am led to believe
 * 4. feed it into picker
 * 5. onChange convert into our db format and send back up
 */
/**
 *
 * Do I, seperate these out into two seperate components, e.g, date vs datetime-local
 * times and dates are crucial to get right
 */
const DateInput = props => {
  const { id, classes, value, onChange, label } = props;
  // const RFCIsoValue = moment(value).format("YYYY-MM-DD")
  const RFCIsoValue = value
    ? moment(value).format('YYYY-MM-DDTkk:mm')
    : moment().format('YYYY-MM-DDTkk:mm');
  //
  return (
    <TextField
      {...props}
      className={classes.root}
      id={id ? id : 'default-datePicker'}
      label={label ? label : 'Some Date'}
      margin="normal"
      type="datetime-local"
      // value={RFCIsoValue}
      value={RFCIsoValue}
      onChange={e => {
        const formattedDate = moment(e.target.value).format();
        onChange(formattedDate);
      }}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export default withStyles(styles)(DateInput);

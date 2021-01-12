import React, { useState } from 'react';

import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

// https://material-ui-pickers.dev/demo/datepicker
// https://material-ui-pickers.dev/api/DatePicker
const RehouserDatePicker = ({ value, onChange, ...rest }) => {
  // const [selectedDate, handleDateChange] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(value);

  const handleDateChange = date => {
    onChange(date);
    setSelectedDate(date);
  };
  return (
    <div>
      <KeyboardDatePicker
        // color="secondary"
        style={{
          color: `inherit !important`,
        }}
        value={selectedDate}
        onChange={handleDateChange}
        InputAdornmentProps={{ position: 'start' }}
        {...rest}
      />
    </div>
  );
};

export default RehouserDatePicker;

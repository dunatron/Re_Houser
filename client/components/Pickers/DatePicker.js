import React, { useState } from 'react';

import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const RehouserDatePicker = ({ value, onChange }) => {
  // const [selectedDate, handleDateChange] = useState(new Date());
  return (
    <div>
      <KeyboardDatePicker
        // color="secondary"
        style={{
          color: `inherit !important`,
        }}
        // value={selectedDate}
        value={value}
        onChange={onChange}
        // variant="inline"
        // inputVariant="outlined"
        InputAdornmentProps={{ position: 'start' }}
      />
    </div>
  );
};

export default RehouserDatePicker;

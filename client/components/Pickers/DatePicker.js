import React, { useState } from 'react';

import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const RehouserDatePicker = () => {
  const [selectedDate, handleDateChange] = useState(new Date());
  return (
    <div>
      <KeyboardDatePicker
        // color="secondary"
        style={{
          color: `inherit !important`,
        }}
        value={selectedDate}
        onChange={handleDateChange}
        // variant="inline"
        // inputVariant="outlined"
        InputAdornmentProps={{ position: 'start' }}
      />
    </div>
  );
};

export default RehouserDatePicker;

import React, { useState } from 'react';

import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

const RehouserTimePicker = () => {
  const [selectedDate, handleDateChange] = useState(new Date());
  return (
    <div>
      <TimePicker value={selectedDate} onChange={handleDateChange} />
    </div>
  );
};

export default RehouserTimePicker;

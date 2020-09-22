import React, { useState } from 'react';

import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

const RehouserDateTimePicker = () => {
  const [selectedDate, handleDateChange] = useState(new Date());
  return (
    <div>
      <DateTimePicker value={selectedDate} onChange={handleDateChange} />
    </div>
  );
};

export default RehouserDatePicker;

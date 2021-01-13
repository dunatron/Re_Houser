import debounce from 'lodash/debounce';
import { useState } from 'react';
import { TextField } from '@material-ui/core';

import { useDebouncedCallback } from 'use-debounce';

export default function DelayedInput({
  defaultValue,
  timeout = 1000,
  onChanged,
  ...rest
}) {
  // Debounce callback
  const debounced = useDebouncedCallback(
    // function
    value => {
      onChanged(value);
    },
    // delay in ms
    timeout
  );

  // you should use `e => debounced.callback(e.target.value)` as react works with synthetic events
  return (
    <TextField
      {...rest}
      defaultValue={defaultValue}
      onChange={e => debounced.callback(e.target.value)}
    />
  );
}

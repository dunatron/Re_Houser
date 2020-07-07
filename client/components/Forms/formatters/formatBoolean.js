import React from 'react';

const _preFormatBoolean = val => {
  //   if (val === true) return 'Yes';
  //   if (val === false) return 'No';
  if (val === null) return true;
  return val;
};

const _postFormatBoolean = val => {
  return val;
};

export { _preFormatBoolean, _postFormatBoolean };

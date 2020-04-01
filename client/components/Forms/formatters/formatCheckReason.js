import React from 'react';

const _preFormatCheckReason = val => {
  if (val === true) return 'Yes';
  if (val === false) return 'No';
  return val;
};

const _postFormatCheckReason = val => {
  if (val === 'Yes') return true;
  if (val === 'No') return false;
  return val;
};

export { _preFormatCheckReason, _postFormatCheckReason };

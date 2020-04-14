import React from 'react';

const _preFormatSelectMultipleEnum = values => {
  if (
    (typeof values === 'object' || typeof values === 'function') &&
    values !== null
  ) {
    return values.set ? values.set : values;
  }
  return values;
};

const _postFormatSelectMultipleEnum = values => {
  return { set: values };
};

export { _preFormatSelectMultipleEnum, _postFormatSelectMultipleEnum };

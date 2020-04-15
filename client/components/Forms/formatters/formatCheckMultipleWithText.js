import React from 'react';

const _preCheckMultipleWithText = values => {
  if (
    (typeof values === 'object' || typeof values === 'function') &&
    values !== null
  ) {
    return values.set ? values.set : values;
    return values.set;
  }
  return values;
};

const _postCheckMultipleWithText = values => {
  return { set: values };
};

export { _preCheckMultipleWithText, _postCheckMultipleWithText };

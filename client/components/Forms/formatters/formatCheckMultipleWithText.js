import React from 'react';

const _preCheckMultipleWithText = values => {
  console.log('_preCheckMultipleWithText => ', values);
  if (
    (typeof values === 'object' || typeof values === 'function') &&
    values !== null
  ) {
    console.log('Do we get here? => ', values);
    return values.set ? values.set : values;
    return values.set;
  }
  console.log('did we get here?? => ', values);
  return values;
};

const _postCheckMultipleWithText = values => {
  console.log('_postCheckMultipleWithText => ', values);
  return { set: values };
};

export { _preCheckMultipleWithText, _postCheckMultipleWithText };

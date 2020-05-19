import React from 'react';
import { is } from 'ramda';

const _preFormatFile = values => {
  // if (
  //   (typeof values === 'object' || typeof values === 'function') &&
  //   values !== null
  // ) {
  //   return values.set ? values.set : values;
  // }
  // return values;
  console.log('_preformat file values => ', values);
  if (is(Array, values)) {
    return values;
  }
  // otherwise we assume its an object, just add that to an array
  return [values];
};

const _postFormatFile = value => {
  // determine if it is an array or an object
  if (is(Array, value)) {
    return {
      // connect: [{
      //     id:
      // }]
      connect: value.map(f => ({ id: f.id })),
    };
  }
  return {
    connect: {
      id: value.id,
    },
  };
};

export { _preFormatFile, _postFormatFile };

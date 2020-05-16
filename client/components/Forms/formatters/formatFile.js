import React from 'react';
import { is } from 'ramda';

const _preFormatFile = values => {
  if (
    (typeof values === 'object' || typeof values === 'function') &&
    values !== null
  ) {
    return values.set ? values.set : values;
  }
  return values;
};

const _postFormatFile = value => {
  // determine if it is an array or an object
  console.log('_postFormatFile value => ', value);
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

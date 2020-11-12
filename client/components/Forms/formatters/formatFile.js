import React from 'react';
import { is } from 'ramda';

const _preFormatFile = values => {
  if (is(Array, values)) {
    return values;
  }
  return [values];
};

const _postFormatFile = value => {
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

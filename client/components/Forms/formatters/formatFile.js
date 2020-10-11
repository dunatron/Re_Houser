import React from 'react';
import { is } from 'ramda';

const _preFormatFile = values => {
  if (is(Array, values)) {
    return values;
  }
  // otherwise we assume its an object, just add that to an array.
  // Well thats where you are fucking up! it needs to be that object yo

  // console.log('Debug FILE: _preformat => ', values);
  // return values;
  return [values];
};

const _postFormatFile = value => {
  // determine if it is an array or an object

  console.log('Debug FILE: POST FORMAT FILE STUFF => ', value);

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

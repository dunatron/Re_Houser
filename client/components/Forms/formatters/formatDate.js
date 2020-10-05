import React from 'react';
import moment from 'moment';
//2020-04-05

const _preFormatDate = val => {
  const formattedVal = moment(val).format();
  console.log('date bug _preFormatDate => ', formattedVal);
  return formattedVal;
};

const _postFormatDate = val => {
  console.log('date bug _postFormatDate => ', val);
  if (val == '') return null;
  const formattedVal = moment(val).format();
  console.log('date bug _postFormatDate => ', formattedVal);
  return formattedVal;
};

export { _preFormatDate, _postFormatDate };

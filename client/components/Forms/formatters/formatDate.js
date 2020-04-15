import React from 'react';
import moment from 'moment';
//2020-04-05

const _preFormatDate = val => {
  return moment(val).format('YYYY-MM-DD');
};

const _postFormatDate = val => {
  if (val == '') return null;
  return val;
};

export { _preFormatDate, _postFormatDate };

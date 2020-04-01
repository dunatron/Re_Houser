import {
  _preFormatCheckReason,
  _postFormatCheckReason,
} from './formatCheckReason';

import {
  _preCheckMultipleWithText,
  _postCheckMultipleWithText,
} from './formatCheckMultipleWithText';

import { isEmpty } from 'ramda';

import { _preFormatDate, _postFormatDate } from './formatDate';

const _preFormatData = (data, keyTypes, mode) => {
  if (!data) return {};
  if (isEmpty(data)) return {};
  const filterEmptyAndFormat = Object.entries(data).reduce(
    (a, [k, v]) =>
      v == null ? a : { ...a, [k]: formatValByType(v, keyTypes[k], mode) },
    {}
  );

  return {
    ...filterEmptyAndFormat,
  };
};

const formatValByType = (v, type, mode) => {
  console.group('formatValByType');
  console.log('v => ', v);
  console.log('type => ', type);
  console.log('mode => ', mode);
  console.groupEnd();

  if (type) {
    switch (type) {
      case 'CheckReason':
        return mode === 'pre'
          ? _preFormatCheckReason(v)
          : _postFormatCheckReason(v);
      case 'CheckMultipleWithText':
        return mode === 'pre'
          ? _preCheckMultipleWithText(v)
          : _postCheckMultipleWithText(v);
      case 'Date':
        return mode === 'pre' ? _preFormatDate(v) : _postFormatDate(v);
      default:
        return v;
    }
  }
  return v;
};

export { _preFormatData };
export default _preFormatData;
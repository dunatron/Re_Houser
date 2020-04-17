import { isEmpty } from 'ramda';

import {
  _preFormatCheckReason,
  _postFormatCheckReason,
} from './formatCheckReason';

import {
  _preCheckMultipleWithText,
  _postCheckMultipleWithText,
} from './formatCheckMultipleWithText';

import { _preFormatDate, _postFormatDate } from './formatDate';

import {
  _preFormatSelectMultipleEnum,
  _postFormatSelectMultipleEnum,
} from './formatSelectMultipleEnum';

const _preFormatData = (data, keyTypes, mode) => {
  if (!data) return {};
  if (isEmpty(data)) return {};
  const filterEmptyAndFormat = Object.entries(data).reduce(
    (a, [k, v]) =>
      v == null ? a : { ...a, [k]: formatValByType(v, keyTypes[k], mode) },
    {}
  );
  console.log('Ok cant Reslove KeyTypes u piece of shit => ', keyTypes);

  return {
    ...filterEmptyAndFormat,
  };
};

/**
 * ToDo: passing in a Section with inners, does not fromat its input anymore....
 * // perhaps dues to no keyTypes look up and above
 */
const formatValByType = (v, type, mode) => {
  // console.log('v => ', v);
  // console.log('type => ', type);

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
      case 'SelectMultipleEnum':
        return mode === 'pre'
          ? _preFormatSelectMultipleEnum(v)
          : _postFormatSelectMultipleEnum(v);
      case 'Int':
        return parseInt(v);
      case 'Float':
        return parseFloat(v);

      default:
        return v;
    }
  }
  return v;
};

export { _preFormatData };
export default _preFormatData;

import moment from 'moment';

const _preFormatDate = val => {
  const formattedVal = moment(val).format();
  return formattedVal;
};

const _postFormatDate = val => {
  if (val == '') return null;
  const formattedVal = moment(val).format();
  return formattedVal;
};

export { _preFormatDate, _postFormatDate };

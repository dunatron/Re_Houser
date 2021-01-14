const _preFormatMoney = val => val;

const _postFormatMoney = val => {
  const extractedFloatVal = Number(val.replace(/[^0-9.-]+/g, '')); // no useles escape lint
  const floatValAsIntInCents = extractedFloatVal * 100;
  return floatValAsIntInCents;
};

export { _preFormatMoney, _postFormatMoney };

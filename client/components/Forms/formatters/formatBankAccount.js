const _preFormatBankAccount = val => {
  console.log('Pre format bank account nuber => ', val);

  // this may not quite work..
  const preformattedSring =
    val.bankNumber +
    '-' +
    val.branchNumber +
    '-' +
    val.accountNumber +
    '-' +
    val.suffix;
  console.log('preformattedSring => ', preformattedSring);
  //   return {
  //     ...val,
  //   };
  return preformattedSring;
};

const _postFormatBankAccount = val => {
  console.log('_postFormatBankAccount val => ', val);
  var bankAccountChunks = val.split('-');
  let bankObj = {
    bankNumber: bankAccountChunks[0],
    branchNumber: bankAccountChunks[1],
    accountNumber: bankAccountChunks[2],
    suffix: bankAccountChunks[3],
  };
  console.log('bankObj => ', val);
  return bankObj;
};

export { _preFormatBankAccount, _postFormatBankAccount };

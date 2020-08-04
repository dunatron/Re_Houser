const _preFormatBankAccount = val => {
  // this may not quite work..
  const preformattedSring =
    val.bankNumber +
    '-' +
    val.branchNumber +
    '-' +
    val.accountNumber +
    '-' +
    val.suffix;
  //   return {
  //     ...val,
  //   };
  return preformattedSring;
};

const _postFormatBankAccount = val => {
  var bankAccountChunks = val.split('-');
  let bankObj = {
    bankNumber: bankAccountChunks[0],
    branchNumber: bankAccountChunks[1],
    accountNumber: bankAccountChunks[2],
    suffix: bankAccountChunks[3],
  };
  return bankObj;
};

export { _preFormatBankAccount, _postFormatBankAccount };

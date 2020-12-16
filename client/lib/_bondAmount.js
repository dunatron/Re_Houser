const _bondAmount = (bondType, rent) => {
  var thenum = bondType.replace(/^\D+/g, '');

  return thenum * rent;
};

export default _bondAmount;

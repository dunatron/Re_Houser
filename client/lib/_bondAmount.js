const _bondAmount = (bondType, rent) => {
  if (!bondType) return rent;
  var thenum = bondType.replace(/^\D+/g, '');

  return thenum * rent;
};

export default _bondAmount;

const getBondAmount = lease => {
  let multiplier = 1;
  if (lease.bondType == "WEEKS_RENT_2") {
    multiplier = 2;
  }
  if (lease.bondType == "WEEKS_RENT_3") {
    multiplier = 3;
  }
  if (lease.bondType == "WEEKS_RENT_4") {
    multiplier = 4;
  }

  return lease.rent * multiplier;
};

module.exports = getBondAmount;

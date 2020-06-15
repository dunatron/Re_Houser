const formatCentsToDollars = (amount, type) => {
  const dollarAmount = amount / 100;

  console.log('doloar amount => ', dollarAmount);

  const isPositive = dollarAmount > 0;

  const formattedMoney = new Intl.NumberFormat('en-US', {
    style: 'currency',
    // currency: 'NZD',
    currency: 'USD',
  }).format(dollarAmount); // '$100.00'

  const _color = () => {
    if (type === 'charge') return 'red'; // if is a charge, show positive as red
    return isPositive ? 'green' : 'red';
  };

  return (
    <span
      style={{
        color: _color(),
      }}>
      {formattedMoney}
    </span>
  );
};

export default formatCentsToDollars;

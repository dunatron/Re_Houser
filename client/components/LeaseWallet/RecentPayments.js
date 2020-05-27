const RecentPayments = ({ payments }) =>
  payments.map((p, i) => <div>Recent Payment {i}</div>);

export default RecentPayments;

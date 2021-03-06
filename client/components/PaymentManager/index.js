import PropTypes from "prop-types";
import PaymentsTable from './PaymentsTable';
const PaymentManager = ({ payments, title }) => {
  return (
    <div>
      <h1>{title} Payments Manager</h1>
      <PaymentsTable payments={payments} title="Lease Payments" />
    </div>
  );
};

PaymentManager.propTypes = {
  payments: PropTypes.any,
  title: PropTypes.any
}

export default PaymentManager;

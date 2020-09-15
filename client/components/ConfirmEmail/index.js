import PropTypes from 'prop-types';
import SendConfrimEmailButton from '@/Components/MutationButtons/SendConfrimEmailButton';
import OpenSuperLoginButton from '@/Components/SuperLogin/OpenSuperLoginButton';
import { Typography } from '@material-ui/core';

const ConfirmEmail = ({ me, children }) => {
  if (!me) {
    return (
      <>
        <Typography variant="h5" gutterBottom>
          To confirm your email you must first be logged in
        </Typography>
        <OpenSuperLoginButton />
      </>
    );
  }
  if (!me.emailValidated)
    return (
      <div>
        <Typography gutterBottom>
          PLease confirm your email address. You will be limited on the platform
          untill you do
        </Typography>
        <SendConfrimEmailButton />
      </div>
    );
  return children ? children : null;
};

ConfirmEmail.propTypes = {
  children: PropTypes.any.isRequired,
  me: PropTypes.shape({
    emailValidated: PropTypes.any,
  }).isRequired,
};

export default ConfirmEmail;

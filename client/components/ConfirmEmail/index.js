import PropTypes from 'prop-types';
import SendConfrimEmailButton from '@/Components/MutationButtons/SendConfrimEmailButton';
import OpenSuperLoginButton from '@/Components/SuperLogin/OpenSuperLoginButton';
import { Typography } from '@material-ui/core';
import RehouserPaper from '@/Styles/RehouserPaper';

const ConfirmEmail = ({ me, children }) => {
  if (!me) {
    return (
      <RehouserPaper>
        <Typography variant="h5" gutterBottom>
          To confirm your email you must first be logged in
        </Typography>
        <OpenSuperLoginButton />
      </RehouserPaper>
    );
  }
  if (!me.emailValidated)
    return (
      <RehouserPaper>
        <Typography variant="h6" gutterBottom>
          PLease confirm your email address. You will be limited on the platform
          untill you do
        </Typography>
        <SendConfrimEmailButton />
      </RehouserPaper>
    );
  return children ? children : null;
};

ConfirmEmail.propTypes = {
  children: PropTypes.any,
  me: PropTypes.shape({
    emailValidated: PropTypes.any,
  }).isRequired,
};

export default ConfirmEmail;

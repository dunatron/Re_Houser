import SendConfrimEmailButton from '../MutationButtons/SendConfrimEmailButton';
import SuperLogin from '../SuperLogin';
import { Typography } from '@material-ui/core';

const ConfirmEmail = ({ me, children }) => {
  if (!me) {
    return (
      <>
        <Typography variant="h5" gutterBottom>
          To confirm your email you must first be logged in
        </Typography>
        <SuperLogin tabIndex={1} />
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

export default ConfirmEmail;

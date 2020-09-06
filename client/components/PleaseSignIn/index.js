import React, { useState, useEffect } from 'react';
import OpenSuperLoginButton from '../SuperLogin/OpenSuperLoginButton';
import { toast } from 'react-toastify';
import Error from '../ErrorMessage';
import Loader from '../Loader/index';
import Typography from '@material-ui/core/Typography';

const Message = ({ message, alert }) => {
  // only fire alerts once per mount
  useEffect(() => {
    if (alert) toast.info(alert);
  }, []);

  if (message) return <Typography variant="h3">{message}</Typography>;
  return null;
};

/**
 * The WithUser is giving every page it's me variable
 * use this
 */
const PleaseSignIn = props => {
  const { currentUser } = props;
  const { error, loading, data } = currentUser;

  if (loading) return <Loader loading={loading} text="Loading user settings" />;
  if (error) return <Error error={error} />;

  const notSIgnedInRender = (
    <div>
      <Message message={props.message} alert={props.alert} />
      <OpenSuperLoginButton />
    </div>
  );

  if (!data) return notSIgnedInRender;
  if (!data.me) return notSIgnedInRender;
  const children = React.Children.map(props.children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        me: data.me,
      });
    }
    return child;
  });
  return children;
};

export default PleaseSignIn;

import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import OpenSuperLoginButton from '@/Components/SuperLogin/OpenSuperLoginButton';
import { toast } from 'react-toastify';
import Error from '@/Components/ErrorMessage';
import Loader from '@/Components/Loader/index';
import Typography from '@material-ui/core/Typography';
import { useCurrentUser } from '@/Components/User';
import { is } from 'ramda';

const Message = ({ message, alert }) => {
  // only fire alerts once per mount
  useEffect(() => {
    if (alert)
      toast.info(<div>{alert}</div>, {
        autoClose: 5000,
      });
  }, []);

  if (message)
    if (is(String, message)) {
      return (
        <Typography variant="h5" display="inline">
          {message}
        </Typography>
      );
    }
  return message;
  // if string return this else if components render it by itself

  return null;
};

Message.propTypes = {
  alert: PropTypes.any,
  message: PropTypes.any,
};

/**
 * The WithUser is giving every page it's me variable
 * use this
 */
const PleaseSignIn = props => {
  // const { currentUser } = props;
  // const { error, loading, data } = currentUser;
  const { error, loading, data } = useCurrentUser();

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

PleaseSignIn.propTypes = {
  alert: PropTypes.any,
  children: PropTypes.any,
  message: PropTypes.any,
};

export default PleaseSignIn;

import { useContext } from 'react';
import { Button } from '@material-ui/core';
import { store } from '../../store';

const OpenSuperLoginButton = () => {
  const { state, dispatch } = useContext(store);
  return (
    <Button onClick={() => dispatch({ type: 'openLoginModal' })}>
      Login/Signup
    </Button>
  );
};

export default OpenSuperLoginButton;

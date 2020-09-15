import { useContext } from 'react';
import { Button, Fab } from '@material-ui/core';
import { store } from '@/Store/index';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const OpenSuperLoginButton = () => {
  const { state, dispatch } = useContext(store);
  const classes = useStyles();
  return (
    <Fab
      className={classes.root}
      variant="extended"
      color="secondary"
      onClick={() => dispatch({ type: 'openLoginModal' })}>
      <ExitToAppIcon className={classes.extendedIcon} />
      Login/Signup
    </Fab>
  );
};

export default OpenSuperLoginButton;

import { useContext } from 'react';
import { Button, Fab } from '@material-ui/core';
import { store } from '@/Store/index';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core/styles';

//recoil
import { useRecoilState } from 'recoil';
import { loginModalState } from '@/Recoil/loginModalState';

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
  const [loginModal, setLoginModal] = useRecoilState(loginModalState);

  const handleOpen = () =>
    setLoginModal({
      ...loginModal,
      open: true,
    });

  const classes = useStyles();
  return (
    <Fab
      className={classes.root}
      variant="extended"
      color="secondary"
      onClick={handleOpen}>
      <ExitToAppIcon className={classes.extendedIcon} />
      Login/Signup
    </Fab>
  );
};

export default OpenSuperLoginButton;

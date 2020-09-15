import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import Error from '@/Components/ErrorMessage';
import { DELETE_USER_ACCOUNT } from '@/Gql/mutations';
import { CURRENT_USER_QUERY } from '@/Gql/queries/index';
// Material
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import { red, purple } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  popper: {
    margin: theme.spacing(1),
    zIndex: 1500,
  },
  paper: {
    padding: theme.spacing(2),
    maxWidth: '300px',
  },
  inputs: {
    display: 'grid',
    gridGap: '16px',
  },
}));

const ErrorButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
}))(Button);

const DeleteAccount = () => {
  const user = useQuery(CURRENT_USER_QUERY);
  const [email, setEmail] = useState(user ? user.email : '');
  const [password, setPassword] = useState('');
  const [deleteAccount, deleteAccountProps] = useMutation(DELETE_USER_ACCOUNT, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  if (!user.data) return null;

  const handleOpenPopperClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleDeleteAccountClick = () => {
    deleteAccount({
      variables: {
        email,
        password,
      },
    });
  };

  const open = Boolean(anchorEl);
  const id = open ? 'transitions-popper' : undefined;
  return (
    <>
      <Button
        data-cy="launch-delete-account"
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteIcon />}
        aria-describedby={id}
        type="button"
        onClick={handleOpenPopperClick}>
        Delete Account
      </Button>
      <Popper
        open={open}
        anchorEl={anchorEl}
        transition
        className={classes.popper}>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper className={classes.paper}>
              <Typography className={classes.typography}>
                Warning: performing this action will permanently remove you from
                the account and any entities your user is associated with. This
                cannot be undone. Please enter your credentials below
              </Typography>
              <form className={classes.root} noValidate autoComplete="off">
                <Error error={deleteAccountProps.error} />
                <div className={classes.inputs}>
                  <TextField
                    required
                    id="standard-required"
                    data-cy="delete-account-email"
                    label="Email"
                    onChange={e => setEmail(e.target.value)}
                    disabled={deleteAccountProps.loading}
                    variant="outlined"
                  />
                  <TextField
                    id="standard-password-input"
                    data-cy="delete-account-password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    helperText="Incorrect entry."
                    onChange={e => setPassword(e.target.value)}
                    disabled={deleteAccountProps.loading}
                    variant="outlined"
                  />
                  <ErrorButton
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                    aria-describedby={id}
                    type="button"
                    data-cy="delete-account-btn"
                    disabled={deleteAccountProps.loading}
                    onClick={handleDeleteAccountClick}>
                    PERMANENTLY DELETE ACCOUNT
                    {deleteAccountProps.loading && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )}
                  </ErrorButton>
                </div>
              </form>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default DeleteAccount;

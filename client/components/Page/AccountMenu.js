import React, { useState, useContext } from 'react';
import Router from 'next/router';
import { useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Menu, MenuItem, Fade } from '@material-ui/core';
import Error from '../ErrorMessage';
import gql from 'graphql-tag';
import { toast } from 'react-toastify';
import { store } from '../../store';
import RToolTip from '../../styles/RToolTip';

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(2),
      marginRight: 0,
    },
  },
  icon: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

const handleLink = (route = '/', query = {}) => {
  Router.push({
    pathname: route,
    query: query,
  }).then(() => window.scrollTo(0, 0));
};

const AccountMenu = ({ me = null }) => {
  const globalStore = useContext(store);
  const { dispatch, state } = globalStore;
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const _profilePhotoUrl = () => {
    if (me) {
      if (me.profilePhoto) {
        return me.profilePhoto.url;
      }
    }
    return null;
  };

  const photoUrl = _profilePhotoUrl();

  console.log('RENDER=====ACCOUNT MENU RENDER=====');

  return (
    <div className={classes.root}>
      <RToolTip
        title={me ? `Signed in as ${me.firstName} ${me.lastName}` : 'Account'}>
        <Avatar
          alt={me ? `${me.firstName} ${me.lastName}` : 'Account'}
          src={photoUrl}
          className={classes.icon}
          aria-controls="faccount-menu"
          aria-haspopup="true"
          onClick={handleClick}
        />
      </RToolTip>

      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}>
        {me
          ? [
              <MenuItem
                key="account-menu-account"
                onClick={e => {
                  handleLink('/account');
                  handleClose(e);
                }}>
                Account
              </MenuItem>,
              <MenuItem
                key="account-menu-messages"
                onClick={e => {
                  handleLink('/messages');
                  handleClose(e);
                }}>
                Messages
              </MenuItem>,
            ]
          : [
              <MenuItem
                key="account-menu-login"
                onClick={e => {
                  handleClose(e);
                  dispatch({
                    type: 'openLoginModal',
                  });
                }}>
                Login
              </MenuItem>,
            ]}
        <SignOutMenuItem onClick={handleClose} me={me} />
      </Menu>
    </div>
  );
};

const SignOutMenuItem = props => {
  const { me } = props;
  const [signOut, { client, data, loading, error }] = useMutation(
    SIGN_OUT_MUTATION,
    {
      onError: error => toast.error(<Error error={error} />),
      onCompleted: data => {
        toast.info(data.signout.message);
        props.onClick();
      },
    }
  );

  const handleBtnClick = () => {
    signOut({
      update: (cache, data) => {
        // cache.evict({ id: 'User:ckdrorkme3ic60999guamh8x2' });
        // cache.gc();
        // cache.reset();
        client.resetStore();
        console.log('Data for cache => ', cache);
        console.log('Data for signout => ', data);
      },
    });
  };

  return me ? (
    <MenuItem
      key="account-menu-logout"
      onClick={handleBtnClick}
      disabled={loading}>
      Logout
    </MenuItem>
  ) : null;
};

export default AccountMenu;

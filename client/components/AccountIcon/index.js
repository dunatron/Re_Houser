import PropTypes from "prop-types";
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Signout from '../Signout/index';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';

const AccountIcon = ({ me, sendRoute }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const _handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const _handleClose = () => {
    setAnchorEl(null);
  };

  const _sendRoute = route => {
    _handleClose();
    sendRoute(route);
  };

  if (!me) return null;

  return (
    <div>
      <Fab
        color="primary"
        aria-label="Add"
        onClick={_handleClick}
        style={{ margin: 8 }}>
        <RenderProfileFabContent me={me} />
      </Fab>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={_handleClose}>
        <MenuItem onClick={() => _sendRoute('/account')}>My account</MenuItem>
        <Signout fullWidth={true} label={`Logout`} me={me} />
      </Menu>
    </div>
  );
};

AccountIcon.propTypes = {
  me: PropTypes.any.isRequired,
  sendRoute: PropTypes.func.isRequired
}

const RenderProfileFabContent = ({ me }) => {
  const firstName = me.firstName ? me.firstName.charAt(0) : '';
  const lastName = me.lastName ? me.lastName.charAt(0) : '';
  return `${firstName}${lastName}`;
};

export default AccountIcon;

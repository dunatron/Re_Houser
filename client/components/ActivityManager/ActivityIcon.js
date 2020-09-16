import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Avatar, Tooltip } from '@material-ui/core';
// icons
import PersonIcon from '@material-ui/icons/PersonOutline';
import AccountCircleIcon from '@material-ui/icons/AccountCircleOutlined';
import HouseIcon from '@material-ui/icons/HouseOutlined';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooksOutlined';
import LibraryBooksAdd from '@material-ui/icons/LibraryAdd';
import LibraryBooksAddCheck from '@material-ui/icons/LibraryAddCheckOutlined';

import {
  deepOrange,
  deepPurple,
  lightGreen,
  lightBlue,
  red,
} from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  orange: {
    marginRight: theme.spacing(1),
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    marginRight: theme.spacing(1),
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  lightBlue: {
    marginRight: theme.spacing(1),
    color: theme.palette.getContrastText(lightBlue[500]),
    backgroundColor: lightBlue[500],
  },
  lightGreen: {
    marginRight: theme.spacing(1),
    color: theme.palette.getContrastText(lightGreen[500]),
    backgroundColor: lightGreen[500],
  },
  red: {
    marginRight: theme.spacing(1),
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
  },
}));

const ActivityIcon = ({ type }) => {
  const classes = useStyles();
  const avatarIcon = () => {
    switch (type) {
      case 'SIGNED_UP':
        return (
          <Avatar className={classes.lightGreen}>
            <AccountCircleIcon />
          </Avatar>
        );
      case 'CREATED_PROPERTY':
        return (
          <Avatar className={classes.lightBlue}>
            <HouseIcon />
          </Avatar>
        );
      case 'UPDATED_PROPERTY':
        return (
          <Avatar className={classes.lightBlue}>
            <HouseIcon />
          </Avatar>
        );
      case 'PROPERTY_DRAFT':
        return (
          <Avatar className={classes.red}>
            <HouseIcon />
          </Avatar>
        );
      case 'PROPERTY_LIVE':
        return (
          <Avatar className={classes.lightGreen}>
            <HouseIcon />
          </Avatar>
        );
      case 'CREATED_LEASE':
        return (
          <Avatar className={classes.orange}>
            <LibraryBooksAdd />
          </Avatar>
        );
      case 'LEASE_SIGNED':
        return (
          <Avatar className={classes.orange}>
            <LibraryBooksAddCheck />
          </Avatar>
        );
      case 'LEASE_FINALISED':
        return (
          <Avatar className={classes.lightGreen}>
            <LibraryBooksIcon />
          </Avatar>
        );
      case 'LEASE_EXPIRED':
        return (
          <Avatar className={classes.red}>
            <PersonIcon />
          </Avatar>
        );
      default:
        return (
          <Avatar className={classes.orange}>
            <PersonIcon />
          </Avatar>
        );
    }
  };
  return <Tooltip title={type}>{avatarIcon()}</Tooltip>;
};

ActivityIcon.propTypes = {
  type: PropTypes.any.isRequired
};

export default ActivityIcon;

import {
  Box,
  Typography,
  Checkbox,
  ListItemSecondaryAction,
  Button,
  IconButton,
  Link,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import { useState, useEffect } from 'react';

import List from '@material-ui/core/List';

import CloseIcon from '@material-ui/icons/Close';
import ResendConfrimEmail from '@/Components/MutationButtons/ResendConfirmEmail';

const useStyles = makeStyles(theme => ({
  container: {
    color: theme.palette.text.primary,
    border: '1px solid green',
    width: '100%',
  },
  announcement: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    opacity: 0.85,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    padding: '16px',
    '&:hover': {
      opacity: 1,
      cursor: 'pointer',
      // backgroundColor: theme.palette.primary.main,
      // color: theme.palette.primary.contrastText,
    },
  },
  text: {},
  type: {},
  closeBox: {
    padding: '16px 16px 16px 0',
  },
  close: {
    color: theme.palette.secondary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    color: theme.palette.primary.main,
    marginTop: '16px',
  },
  action: {
    marginRight: '8px',
    marginBottom: '8px',
  },
}));

export default useStyles;

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
import useStyles from './useStyles';

const AnnouncementItem = ({
  index,
  item: { text, url, offsite, type, actions },
  remove,
}) => {
  const router = useRouter();
  const classes = useStyles();
  const handleUrlClick = () => {
    if (url) {
      if (type === 'offsite') {
        // alert('Offsite');
        window.open(url, '_blank');
      } else if (type === 'onsite') {
        router.push({
          url: url,
        });
      } else {
        // do nothing it is just an alert
      }
    }
  };

  return (
    <Box className={classes.announcement}>
      <Box className={classes.content} onClick={handleUrlClick}>
        <Typography variant="body1" color="inherit" className={classes.text}>
          {text}
          <Typography variant="body2" color="inherit" className={classes.type}>
            {type}
          </Typography>
        </Typography>
        {actions && (
          <Box className={classes.actions}>
            {actions.map((a, i) => (
              <Box className={classes.action}>{a}</Box>
            ))}
          </Box>
        )}
      </Box>
      <Box className={classes.closeBox}>
        <IconButton
          onClick={remove}
          edge="end"
          aria-label="comments"
          size="medium"
          className={classes.close}>
          <CloseIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default AnnouncementItem;

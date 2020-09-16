import {
  Box,
  Typography,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
  Link,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import clsx from 'clsx';

import { useState, useEffect } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  container: {
    color: theme.palette.text.primary,
    border: '1px solid green',
    width: '100%',
  },
  announcement: {
    width: '100%',
    opacity: 0.85,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    // marginBottom: '8px',
    padding: '16px',
    '&:hover': {
      opacity: 1,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },
  text: {},
  type: {
    // color: theme.palette.primary.main,
    // '&:hover': {
    //   color: theme.palette.primary.contrastText,
    // },
  },
  close: {
    color: theme.palette.secondary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },
}));

const Announcements = ({ me, bannerRoutes }) => {
  const router = useRouter();
  const classes = useStyles();
  const [annoucements, setAnnoucements] = useState([
    {
      text: 'Black Lives Matter Movement',
      offsite: true,
      url: 'https://blacklivesmatter.com/',
      type: 'offsite',
    },
    {
      text: 'Simple OnSite Alert',
      type: 'onsite',
    },
    {
      text: `Complete Task ALert: Simple persistant alert with just a message e.g please confirm email . Maybe make these more robust as to accept a component and allow a resend email button`,
      type: 'todo',
    },
  ]);

  useEffect(() => {}, [me]); // cant actualy tell if the obj updates, you know this as you type it.

  const containerClasses = clsx(classes.container);

  const beDisabled = bannerRoutes.includes(router.pathname);
  /**
   *
   * Take the lead and let everyone follow
   */
  const removeItem = rmIndex =>
    setAnnoucements(annoucements.filter((item, i) => rmIndex !== i));

  if (annoucements.length === 0) return null;

  return (
    <List
      component="nav"
      aria-label="main mailbox folders"
      style={
        beDisabled
          ? {
              marginTop: '64px',
            }
          : {
              zIndex: '0',
            }
      }>
      {annoucements.map((a, i) => (
        <AnnouncementItem item={a} index={i} remove={() => removeItem(i)} />
      ))}
    </List>
  );
};

const AnnouncementItem = ({
  index,
  item: { text, url, offsite, type },
  remove,
}) => {
  const classes = useStyles();
  const handleUrlClick = () => {
    if (url) {
      if (offsite) {
        alert('Offsite');
      } else {
        alert('Onsite');
      }
    }
  };

  return (
    <ListItem
      color="secondary"
      className={classes.announcement}
      role={undefined}
      dense
      button
      onClick={handleUrlClick}>
      <Typography variant="body1" color="inherit" className={classes.text}>
        {text}
        <Typography variant="body2" color="inherit" className={classes.type}>
          {type}
        </Typography>
      </Typography>

      <ListItemSecondaryAction onClick={remove}>
        <IconButton
          edge="end"
          aria-label="comments"
          size="medium"
          className={classes.close}>
          <CloseIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Announcements;

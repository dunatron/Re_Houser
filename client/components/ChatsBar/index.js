import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
    maxWidth: '100%',
    [theme.breakpoints.up('sm')]: {
      maxWidth: `calc(100% - ${theme.sideBarWidth}px)`,
    },
  },
}));

/**
 * I should use Apollo local state.
 * I will simply hold any open chats.
 */
const ChatsBar = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      I am a little scrollable chats bar hiolding your open chats
    </div>
  );
};

export default ChatsBar;

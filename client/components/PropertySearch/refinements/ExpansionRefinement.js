import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  listItemTextRoot: {
    color: theme.palette.secondary.contrastText,
  },
  listItemIcon: {
    color: theme.palette.secondary.contrastText,
  },
}));

const ExpansionRefinement = ({ children, title, nested }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem
        button
        onClick={handleClick}
        classes={{
          root: classes.root,
        }}>
        <ListItemIcon
          classes={{
            root: classes.listItemIcon,
          }}>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText
          primary={title}
          classes={{
            root: classes.listItemTextRoot,
            primary: classes.listItemTextRoot,
          }}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <div
          style={{
            padding: nested ? '16px' : 0,
          }}>
          {children}
        </div>
      </Collapse>
    </>
  );
};

export default ExpansionRefinement;

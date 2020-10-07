import React, { useState } from 'react';
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
import dollarsToCents from '@/Lib/dollarsToCents';

const useStyles = makeStyles(theme => ({
  listRoot: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
  listItemRoot: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
  listItemSelected: {
    color: theme.palette.primary.contrastText,
    backgroundColor: `${theme.palette.primary.main} !important`,
  },
  listItemText: {
    color: theme.palette.primary.contrastText,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const PRCE_ITEMS = [
  {
    label: 'ALL',
    bottomPrice: 0,
    topPrice: dollarsToCents(9999999),
  },
  {
    label: '$200 - $400',
    bottomPrice: dollarsToCents(200),
    topPrice: dollarsToCents(400),
  },
  {
    label: '$400 - $600',
    bottomPrice: dollarsToCents(400),
    topPrice: dollarsToCents(600),
  },
  {
    label: '$600 - $800',
    bottomPrice: dollarsToCents(600),
    topPrice: dollarsToCents(800),
  },
  {
    label: '$800 - $1000',
    bottomPrice: dollarsToCents(800),
    topPrice: dollarsToCents(1000),
  },
  {
    label: '$1000 - $2000',
    bottomPrice: dollarsToCents(1000),
    topPrice: dollarsToCents(2000),
  },
];

const PriceFilter = ({ setPrice, items }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const classes = useStyles();
  const selectionItems = items ? items : PRCE_ITEMS;

  const RenderListItem = ({ item, selected, onClick }) => {
    return (
      <ListItem
        classes={{
          root: classes.listItemRoot,
          selected: classes.listItemSelected,
        }}
        button
        selected={selected}
        onClick={onClick}>
        <ListItemText
          classes={{
            root: classes.listItemText,
            primary: classes.listItemText,
          }}
          primary={item.label}
        />
      </ListItem>
    );
  };

  const handleSelection = (item, idx) => {
    setSelectedIdx(idx);
    setPrice({
      bottomPrice: item.bottomPrice,
      topPrice: item.topPrice,
    });
  };

  return (
    <List
      component="nav"
      //   color="primary"
      aria-labelledby="nested-list-subheader"
      //   className={classes.root}
      classes={{
        root: classes.listRoot,
      }}>
      {selectionItems.map((item, idx) => {
        return (
          <RenderListItem
            item={item}
            button
            selected={idx === selectedIdx ? true : false}
            onClick={() => handleSelection(item, idx)}
          />
        );
      })}
    </List>
  );
};

export default PriceFilter;

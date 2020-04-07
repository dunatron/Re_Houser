import React, { useState } from 'react';
import styled from 'styled-components';
import { connectRefinementList } from 'react-instantsearch-dom';
import {
  Collapse,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
} from '@material-ui/core';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

const CollapseMenu = styled(Collapse)`
  && {
  }
`;

const ListStyle = styled(List)`
  && {
    /* margin: ${props => props.theme.spacing(3)}px 0 0 0; */
    margin: 0 0 16px 0;
    padding: 0;
    border-bottom: 1px dashed grey;
  }
`;

const CheckboxItem = styled(FormControlLabel)`
  && {
    margin: ${props => props.theme.spacing(3)}px 0 0 0;
    margin: 0;
    padding: 0;
  }
`;

const MaterialUiCheckBoxRefinementList = ({
  items,
  attribute,
  refine,
  createURL,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ListItem button onClick={() => setOpen(!open)}>
        <ListItemIcon style={{ minWidth: '32px' }}>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText inset={false} primary={attribute.toUpperCase()} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <CollapseMenu in={open} timeout="auto" unmountOnExit>
        <ListStyle>
          {items.map(({ count, isRefined, label, value }, i) => (
            <CheckboxItem
              key={i}
              control={
                <Checkbox
                  checked={isRefined}
                  onClick={event => {
                    event.preventDefault();
                    refine(value);
                  }}
                  value="checkedA"
                />
              }
              label={
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '1.2em',
                    fontWeight: '300',
                    fontSize: '1rem',
                    wordBreak: 'break-word',
                    // letterSpacing: '0.00938em',
                  }}>
                  {label}
                  <span
                    style={{
                      fontSize: '0.8em',
                      alignSelf: 'end',
                      padding: '0 0 0 4px',
                      wordBreak: 'break-all',
                    }}>
                    ({count})
                  </span>
                </span>
              }
            />
          ))}
        </ListStyle>
      </CollapseMenu>
    </>
  );
};

const CheckBoxList = connectRefinementList(MaterialUiCheckBoxRefinementList);

export default CheckBoxList;

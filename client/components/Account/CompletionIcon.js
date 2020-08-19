import React, { Component } from 'react';
// Icons
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

const CompletionIcon = ({ val }) => {
  if (val === '' || val === null) {
    return <ClearIcon color="secondary" style={{ margin: '8px' }} />;
  }
  if (val === undefined) {
    return <ClearIcon color="secondary" style={{ margin: '8px' }} />;
  }
  return <DoneIcon color="primary" style={{ margin: '8px' }} />;
};

export default CompletionIcon;

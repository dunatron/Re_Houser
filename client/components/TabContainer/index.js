import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

export default function TabContainer(props) {
  return <Typography component="div">{props.children}</Typography>;
}

import React from 'react';
import Router from 'next/router';
import { Button } from '@material-ui/core';

const ForceReloadButton = ({ title }) => (
  <Button onClick={() => Router.push(Router.pathname)}>
    {title ? title : 'Reload Page'}
  </Button>
);

export default ForceReloadButton;

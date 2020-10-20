import PropTypes from "prop-types";
import React from 'react';
import Router from 'next/router';
import { Button } from '@material-ui/core';

const ForceReloadButton = ({ title }) => (
  <Button onClick={() => Router.push(Router.pathname)}>
    {title ? title : 'Reload Page'}
  </Button>
);

ForceReloadButton.propTypes = {
  title: PropTypes.any
}

export default ForceReloadButton;

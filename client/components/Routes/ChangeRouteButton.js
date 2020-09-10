import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Router from 'next/router';
import { Button } from '@material-ui/core';

const handleLink = ({ route, query }) => {
  Router.push({
    pathname: route,
    query: query,
  }).then(() => window.scrollTo(0, 0));
};

const ChangeRouteButton = ({
  route,
  query,
  color,
  title,
  variant,
  size,
  btnProps,
}) => (
  <Button
    color={color}
    variant={variant}
    size={size}
    onClick={() => handleLink({ route, query })}
    {...btnProps}>
    {title ? title : 'Route Button'}
  </Button>
);

ChangeRouteButton.propTypes = {
  btnProps: PropTypes.any.isRequired,
  color: PropTypes.oneOf(["default", "inherit", "primary", "secondary"]).isRequired,
  query: PropTypes.object.isRequired,
  route: PropTypes.string.isRequired,
  size: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["text", "outlined", "contained"]).isRequired
};

export default ChangeRouteButton;

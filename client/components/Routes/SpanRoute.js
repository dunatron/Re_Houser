import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Router from 'next/router';
import { Typography, Link } from '@material-ui/core';

const handleLink = ({ route, query }) => {
  Router.push({
    pathname: route,
    query: query,
  });
};

const SpanRoute = ({ text, route, query, color }) => {
  const preventDefault = event => event.preventDefault();
  return (
    <Link
      href={route}
      color={color ? color : 'primary'}
      onClick={e => {
        preventDefault(e);
        handleLink({ route, query });
      }}>
      {text}
    </Link>
  );
};

SpanRoute.propTypes = {
  color: PropTypes.oneOf(["default", "inherit", "primary", "secondary"]).isRequired,
  query: PropTypes.object.isRequired,
  route: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default SpanRoute;

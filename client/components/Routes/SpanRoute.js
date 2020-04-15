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
  route: PropTypes.string.isRequired,
  query: PropTypes.object,
  text: PropTypes.string,
  color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
};

export default SpanRoute;

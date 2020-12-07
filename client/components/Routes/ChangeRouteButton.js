// import React, { useState } from 'react';
// import PropTypes from 'prop-types';

// import Router from 'next/router';
// import { Button } from '@material-ui/core';

// const handleLink = ({ route, query }) => {
//   Router.push({
//     pathname: route,
//     query: query,
//   }).then(() => window.scrollTo(0, 0));
// };

// const ChangeRouteButton = ({
//   route,
//   query,
//   color,
//   title,
//   variant,
//   size,
//   btnProps,
// }) => (
//   <Button
//     color={color}
//     variant={variant}
//     size={size}
//     onClick={() => handleLink({ route, query })}
//     {...btnProps}>
//     {title ? title : 'Route Button'}
//   </Button>
// );

// ChangeRouteButton.propTypes = {
//   btnProps: PropTypes.any,
//   color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
//   query: PropTypes.object,
//   route: PropTypes.string.isRequired,
//   size: PropTypes.any,
//   title: PropTypes.string.isRequired,
//   variant: PropTypes.oneOf(['text', 'outlined', 'contained']),
// };

// export default ChangeRouteButton;

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Router from 'next/router';
import Link from 'next/link';
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
  <Link href={route} passHref>
    <Button
      color={color}
      variant={variant}
      size={size}
      // onClick={() => handleLink({ route, query })}
      {...btnProps}>
      {title ? title : 'Route Button'}
    </Button>
  </Link>
);

ChangeRouteButton.propTypes = {
  btnProps: PropTypes.any,
  color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
  query: PropTypes.object,
  route: PropTypes.string.isRequired,
  size: PropTypes.any,
  title: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['text', 'outlined', 'contained']),
};

export default ChangeRouteButton;

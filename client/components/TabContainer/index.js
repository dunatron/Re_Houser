import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';
import mePropTypes from '../../propTypes/mePropTypes';

const TabContainer = ({ children }) => (
  <Typography component="div">{children}</Typography>
);

TabContainer.propTypes = {
  children: PropTypes.element.isRequired
};

export default TabContainer;

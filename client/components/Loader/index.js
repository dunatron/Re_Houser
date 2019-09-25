import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loader = props => {
  const { color, text } = props;
  return (
    <div>
      <CircularProgress
        variant="determinate"
        color={color ? color : 'primary'}
      />
      {text}
    </div>
  );
};

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
  color: PropTypes.string,
  text: PropTypes.string,
};

export default Loader;

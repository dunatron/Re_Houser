import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";

const Loader = props => {
  const { color, text } = props;
  return (
    <div>
      <CircularProgress variant="determinate" color={color} />
      {text}
    </div>
  );
};

Loader.propTypes = {
  //   size: PropTypes.number.isRequired,
  //   currentSize: PropTypes.number.isRequired
};

export default Loader;

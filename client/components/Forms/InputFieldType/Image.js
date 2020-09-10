import PropTypes from "prop-types";
import React from 'react';
import Image from 'material-ui-image';

const ImageField = props => {
  const { config } = props;
  const { fieldProps } = config;
  return <Image {...fieldProps} />;
};

ImageField.propTypes = {
  config: PropTypes.any.isRequired
}

export default ImageField;

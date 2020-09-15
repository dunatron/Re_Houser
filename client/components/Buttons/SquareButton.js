import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const SquareButton = withStyles(theme => ({
  root: {
    borderRadius: 0,
  },
}))(Button);

export default function CustomizedButtons({ btnProps, children, onClick }) {
  return (
    <SquareButton
      variant="contained"
      color="primary"
      onClick={onClick}
      {...btnProps}>
      {children}
    </SquareButton>
  );
}

CustomizedButtons.propTypes = {
  btnProps: PropTypes.any.isRequired,
  children: PropTypes.any.isRequired,
  onClick: PropTypes.any.isRequired,
};

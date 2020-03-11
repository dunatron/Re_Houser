import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { Portal } from '../Portal/index';

const styles = theme => ({
  root: {
    display: 'flex',
    position: 'fixed',
    top: 0,
    // background: fade(theme.palette.primary.main, 0.2),
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    // height: 100,
    // width: 100,
    background: '#FFF',
    overflow: 'auto',
    zIndex: 9000,
    // height: "100%",
    // width: "100%",
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    // padding: `0 ${theme.spacing.unit * 2}px`,
    padding: theme.spacing.unit * 2,
  },
  modalTitle: {
    margin: 0,
    alignSelf: 'center',
    color: theme.palette.primary.main,
    fontWeight: 300,
  },
  closeBtn: {},

  modalBody: {
    padding: `0 ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px ${theme
      .spacing.unit * 2}px`,
  },
  overlay: {
    position: 'fixed',
    top: 0,
    background: fade(theme.palette.primary.main, 0.2),
    height: '100%',
    width: '100%',
    zIndex: 1000,
  },
});

class Modal extends Component {
  render() {
    const { classes, close, title, open } = this.props;
    return (
      <Fragment>
        {open && (
          <Portal selector="#modal">
            <div className={classes.root}>
              <div
                className={classes.content}
                style={{
                  maxWidth: `${this.props.width}px`,
                  maxHeight: `${this.props.height}px`,
                }}>
                <div className={classes.modalHeader}>
                  <h2 className={classes.modalTitle}>{title}</h2>
                  <IconButton
                    data-cy="close-input-modal-btn"
                    color={'secondary'}
                    aria-label="Delete"
                    className={classes.closeBtn}
                    onClick={() => close()}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </div>
                <div className={classes.modalBody}>{this.props.children}</div>
              </div>
              <div
                className={classes.overlay}
                onClick={() => this.props.close()}>
                Overlay
              </div>
            </div>
          </Portal>
        )}
      </Fragment>
    );
  }
}

export default withStyles(styles)(Modal);

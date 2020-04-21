import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { IconButton, Paper } from '@material-ui/core';
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
    zIndex: 9000,
  },
  content: {
    // height: 100,
    // width: 100,
    // background: '#FFF',
    borderRadius: 0,
    overflow: 'auto',
    // zIndex: 9000,
    // height: "100%",
    // width: "100%",
    zIndex: 10,
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: theme.spacing(2),
  },
  modalTitle: {
    margin: 0,
    alignSelf: 'center',
    color: theme.palette.primary.main,
    fontWeight: 300,
  },
  closeBtn: {},

  modalBody: {
    padding: `0 ${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(
      2
    )}px`,
  },
  overlay: {
    position: 'fixed',
    top: 0,
    // background: fade(theme.palette.primary.main, 0.3),
    background: fade(theme.palette.background.paper, 0.85),
    height: '100%',
    width: '100%',
    zIndex: 5,
    // zIndex: 1000,
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
              <Paper
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
              </Paper>
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

import React, { useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Paper } from '@material-ui/core';

import { Portal } from '@/Components/Portal/index';
import isBrowser from '@/Lib/isBrowser';
import clsx from 'clsx';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import ButtonGroup from '@material-ui/core/ButtonGroup';

// icons
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '3%',
  },
  modalFullscreen: {
    margin: 0,
  },
  modalContent: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
    height: '800px',
    maxHeight: '90%',
    maxWidth: '1000px',
    overflow: 'scroll',
    position: 'relative',
  },
  fullScreen: {
    maxHeight: '100%',
    height: '100%',
    maxWidth: '100%',
    width: '100%',
  },
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginRight: '70px', // for the actions
  },
  headerActions: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backgroundColor: theme.palette.background.paper,
    opacity: 0.85,
    borderBottomLeftRadius: '12px',
    padding: '3px',
  },
  spacer: {
    height: '3px',
    width: '64px',
    backgroundColor: theme.palette.primary.main,
    marginBottom: '16px',
    marginLeft: '16px',
  },
  title: {
    margin: theme.spacing(1, 2, 1, 2),
  },
  closeBtn: {},
  modalBody: {
    padding: theme.spacing(0, 2, 2, 2),
  },
}));

const ModalComponent = props => {
  const { id, close, title, open, fullScreen, disableBackdrop } = props;
  const [isfullScreen, setFullscreen] = useState(fullScreen);
  const modalNode = useRef();
  const node = useRef();
  const headerNode = useRef();
  const classes = useStyles({ isfullScreen });
  // If Open we need to make the body overflow hidden, to save our place and not scroll body when modal is open

  const handleClose = () => {
    close();
  };

  const toggleFullscreen = () => setFullscreen(!isfullScreen);

  const modalClasses = clsx({
    [classes.modal]: true,
    [classes.modalFullscreen]: isfullScreen,
  });

  const modalContentClass = clsx({
    [classes.modalContent]: true,
    [classes.fullScreen]: isfullScreen,
  });

  if (!open) return null;

  return (
    <Modal
      aria-labelledby={`${id}-transition-modal-title`}
      aria-describedby={`${id}-transition-modal-description`}
      className={modalClasses}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      disableBackdropClick={disableBackdrop}
      BackdropProps={{
        timeout: 500,
      }}>
      <Fade in={open}>
        <div className={modalContentClass}>
          <div className={classes.header}>
            <h2 className={classes.title} id={`${id}-transition-modal-title`}>
              {title}
            </h2>
          </div>
          <div
            style={{ position: 'absolute', top: 0, right: 0, height: '100%' }}>
            <div className={classes.headerActions}>
              <IconButton
                size="small"
                color={'secondary'}
                aria-label="Delete"
                className={classes.closeBtn}
                onClick={() => toggleFullscreen()}>
                {!isfullScreen ? (
                  <FullscreenIcon fontSize="small" />
                ) : (
                  <FullscreenExitIcon fontSize="small" />
                )}
              </IconButton>
              <IconButton
                size="medium"
                color={'secondary'}
                aria-label="Delete"
                className={classes.closeBtn}
                onClick={() => close()}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </div>
          </div>

          <div className={classes.spacer}></div>
          <div
            id={`${id}-transition-modal-description`}
            className={classes.modalBody}>
            {props.children}
          </div>
        </div>
      </Fade>
    </Modal>
  );

  return (
    open && (
      <Portal selector="#modal">
        <div className={classes.root} ref={modalNode}>
          <div
            className={classes.content}
            style={{
              maxWidth: `${props.width}px`,
              maxHeight: `${props.height}px`,
            }}>
            <Paper className={classes.modalInner} ref={node}>
              <div
                // ref={elementRef}
                className={classes.modalHeader}
                id={`${id}-modal-header`}
                style={{
                  // position: '-webkit-sticky',
                  position: 'sticky', // ToDo, only apply when elemnt is out of view
                  top: 0,
                }}>
                <h2 className={classes.modalTitle}>{title}</h2>
                <IconButton
                  color={'secondary'}
                  aria-label="Delete"
                  className={classes.closeBtn}
                  onClick={() => close()}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </div>
              <div className={classes.modalBody}>{props.children}</div>
            </Paper>
          </div>
          {/* Backdrop */}
          <div
            className={classes.backdrop}
            onClick={() => (disableBackdrop ? null : props.close())}
          />
        </div>
      </Portal>
    )
  );
};

ModalComponent.propTypes = {
  children: PropTypes.any,
  classes: PropTypes.any,
  close: PropTypes.func.isRequired,
  disableBackdrop: PropTypes.any,
  fullScreen: PropTypes.any,
  height: PropTypes.any,
  id: PropTypes.string,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  width: PropTypes.any,
};

export default ModalComponent;

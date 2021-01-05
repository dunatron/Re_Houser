import React, { useEffect, useRef } from 'react';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Paper } from '@material-ui/core';

import { Portal } from '@/Components/Portal/index';
import isBrowser from '@/Lib/isBrowser';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1201,
  },
  content: {
    position: 'relative',
    overflow: 'auto',
    height: '100%',
    width: '100%',
  },
  modalInner: {
    borderRadius: 0,
    maxWidth: '500px',
    position: 'relative',
    zIndex: 30,
    height: 'auto',
    minHeight: '100%',
  },
  modalHeader: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: theme.spacing(2),
    background: theme.palette.background.paper,
    zIndex: 50,
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
  backdrop: {
    pointerEvents: 'none',
    position: 'fixed',
    top: 0,
    background: fade(theme.palette.background.paper, 0.85),
    height: '100%',
    width: '100%',
    zIndex: 10,
  },
}));

const Modal = props => {
  const { id, close, title, open, fullScreen, disableBackdrop } = props;
  const modalNode = useRef();
  const node = useRef();
  const headerNode = useRef();
  const classes = useStyles();
  // If Open we need to make the body overflow hidden, to save our place and not scroll body when modal is open

  useEffect(() => {
    document.addEventListener('mousedown', handleModalClick);
    return () => {
      document.removeEventListener('mousedown', handleModalClick);
    };
  }, []);

  const mainDiv = isBrowser() ? document.body : null;
  const setBodyOverFlowToAuto = () => {
    mainDiv.style.overflow = 'auto';
  };
  const setBodyOverFlowToHidden = () => {
    mainDiv.style.overflow = 'hidden';
  };

  useEffect(() => {
    if (open) {
      setBodyOverFlowToHidden();
    } else {
      setBodyOverFlowToAuto();
    }
    return () => {
      setBodyOverFlowToAuto();
    };
  }, [open]);

  const handleModalClick = e => {
    if (modalNode.current) {
      if (modalNode.current.contains(e.target)) {
        if (node.current.contains(e.target)) {
          return;
        } else {
          if (!disableBackdrop) {
            props.close();
          }
        }
      }
    }
  };

  if (!open) return null;

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

Modal.propTypes = {
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

export default Modal;

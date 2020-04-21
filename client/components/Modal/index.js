// import React, { Component, Fragment } from 'react';

// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import { fade } from '@material-ui/core/styles/colorManipulator';
// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';

// import { Portal } from '../Portal/index';

// const styles = theme => ({
//   root: {
// display: 'flex',
// position: 'fixed',
// top: 0,
// // background: fade(theme.palette.primary.main, 0.2),
// height: '100%',
// width: '100%',
// alignItems: 'center',
// justifyContent: 'center',
// zIndex: 1201,
//   },
//   content: {
//     // height: 100,
//     // width: 100,
//     background: '#FFF',
//     overflow: 'auto',
//     zIndex: 1201,
//     height: '100%',
//     width: '100%',
//     padding: '16px',
//   },
//   modalHeader: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     // padding: `0 ${theme.spacing.unit * 2}px`,
//     padding: theme.spacing.unit * 2,
//   },
//   modalTitle: {
//     margin: 0,
//     alignSelf: 'center',
//     color: theme.palette.primary.main,
//     fontWeight: 300,
//   },
//   closeBtn: {},

//   modalBody: {
//     padding: `0 ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px ${theme
//       .spacing.unit * 2}px`,
//   },
//   overlay: {
//     position: 'fixed',
//     top: 0,
//     background: fade(theme.palette.primary.main, 0.2),
//     height: '100%',
//     width: '100%',
//     zIndex: 1000,
//   },
// });

// class Modal extends Component {
//   render() {
//     const { id, classes, close, title, open, fullScreen } = this.props;
//     // If Open we need to make the body overflow hidden, to save our place and not scroll body when modal is open
//     const mainDiv = document.body;
//     if (open) {
//       mainDiv.style.overflow = 'hidden';
//     } else {
//       mainDiv.style.overflow = 'auto';
//     }
//     return (
//       <Fragment>
//         {open && (
//           <Portal selector="#modal">
//             <div className={classes.root}>
//               <div
//                 className={classes.content}
//                 style={{
//                   maxWidth: `${this.props.width}px`,
//                   maxHeight: `${this.props.height}px`,
//                 }}>
//                 <div className={classes.modalHeader} id={`${id}-modal-header`}>
//                   <h2 className={classes.modalTitle}>{title}</h2>
//                   <IconButton
//                     color={'secondary'}
//                     aria-label="Delete"
//                     className={classes.closeBtn}
//                     onClick={() => close()}>
//                     <CloseIcon fontSize="small" />
//                   </IconButton>
//                 </div>
//                 <div className={classes.modalBody}>{this.props.children}</div>
//               </div>
//               <div
//                 className={classes.overlay}
//                 onClick={() => this.props.close()}>
//                 Overlay
//               </div>
//             </div>
//           </Portal>
//         )}
//       </Fragment>
//     );
//   }
// }

// Modal.propTypes = {
//   id: PropTypes.string,
//   classes: PropTypes.any,
//   close: PropTypes.func,
//   title: PropTypes.string,
//   open: PropTypes.bool,
// };

// export default withStyles(styles)(Modal);

import React, { useEffect, useRef } from 'react';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Paper } from '@material-ui/core';

import { Portal } from '../Portal/index';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    position: 'fixed',
    top: 0,
    left: 0,
    // background: fade(theme.palette.primary.main, 0.2),
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1201,
  },
  content: {
    position: 'relative',
    overflow: 'auto',
    // zIndex: 20,
    height: '100%',
    width: '100%',
  },
  modalInner: {
    // background: '#FFF',
    borderRadius: 0,
    maxWidth: '500px',
    position: 'relative',
    zIndex: 30,
    height: 'auto',
    minHeight: '100%',
    // top: props => (props.fullScreen ? 0 : '10%'),
    // left: props => (props.fullScreen ? 0 : '10%'),
  },
  modalHeader: {
    display: 'flex',
    position: 'relative',
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
    padding: `0 ${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing
      .unit * 2}px`,
  },
  overlay: {
    pointerEvents: 'none',
    position: 'fixed',
    top: 0,
    // background: fade(theme.palette.primary.main, 0.3),
    background: fade(theme.palette.background.paper, 0.85),
    height: '100%',
    width: '100%',
    zIndex: 10,
  },
}));

const Modal = props => {
  const { id, close, title, open, fullScreen } = props;
  const modalNode = useRef();
  const node = useRef();
  const classes = useStyles();
  // If Open we need to make the body overflow hidden, to save our place and not scroll body when modal is open
  // const mainDiv = document.body;

  useEffect(() => {
    // add when mounted
    document.addEventListener('mousedown', handleModalClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener('mousedown', handleModalClick);
    };
  }, []);

  const mainDiv = document.body;
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
          props.close();
        }
      }
    }
  };

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
              <div className={classes.modalHeader} id={`${id}-modal-header`}>
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
          <div className={classes.overlay} onClick={() => props.close()}>
            Overlay
          </div>
        </div>
      </Portal>
    )
  );
};

Modal.propTypes = {
  id: PropTypes.string,
  classes: PropTypes.any,
  close: PropTypes.func,
  title: PropTypes.string,
  open: PropTypes.bool,
};

export default Modal;

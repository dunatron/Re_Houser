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
    // top: props => (props.fullScreen ? 0 : '10%'),
    // left: props => (props.fullScreen ? 0 : '10%'),
    // // background: fade(theme.palette.primary.main, 0.2),
    // height: props => (props.fullScreen ? '100%' : 'auto'),
    // width: props => (props.fullScreen ? '100%' : '80%'),
    top: 0,
    left: 0,
    // background: fade(theme.palette.primary.main, 0.2),
    height: '100%',
    width: '100%',
    // maxWidth: props => (props.fullScreen ? 'none' : '800px'),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1201,
    // display: 'flex',
    // position: 'fixed',
    // // top: 0,
    // top: props => (props.fullScreen ? 0 : '10%'),
    // // background: fade(theme.palette.primary.main, 0.2),
    // height: '100%',
    // width: '100%',
    // alignItems: 'center',
    // justifyContent: 'center',
    // zIndex: 1201,
  },
  content: {
    // height: 100,
    // width: 100,
    position: 'relative',
    // top: props => (props.fullScreen ? 0 : '10%'),
    // left: props => (props.fullScreen ? 0 : '10%'),
    maxWidth: props => (props.fullScreen ? 'none' : '800px'),
    background: '#FFF',
    overflow: 'auto',
    zIndex: 1201,
    // height: '100%',
    height: props => (props.fullScreen ? '100%' : '80%'),
    width: '100%',
    padding: '16px',
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
    padding: `0 ${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing
      .unit * 2}px`,
  },
  overlay: {
    position: 'fixed',
    top: 0,
    background: fade(theme.palette.primary.main, 0.2),
    height: '100%',
    width: '100%',
    zIndex: 5,
  },
});

class Modal extends Component {
  render() {
    const { id, classes, close, title, open, fullScreen } = this.props;
    // If Open we need to make the body overflow hidden, to save our place and not scroll body when modal is open
    const mainDiv = document.body;
    if (open) {
      mainDiv.style.overflow = 'hidden';
    } else {
      mainDiv.style.overflow = 'auto';
    }
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

Modal.propTypes = {
  id: PropTypes.string,
  classes: PropTypes.any,
  close: PropTypes.func,
  title: PropTypes.string,
  open: PropTypes.bool,
};

export default withStyles(styles)(Modal);

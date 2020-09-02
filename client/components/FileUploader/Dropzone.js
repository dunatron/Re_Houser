import React, { useState, useRef, useEffect } from 'react';
// import './dropzone.css';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import dropZoneStyles from './DropZoneStyles';
import CloudUploadIcon from '@material-ui/icons/CloudUploadOutlined';

const Dropzone = props => {
  const classes = dropZoneStyles();
  const fileInputRef = useRef();
  const [state, setState] = useState({
    hightlight: false,
  });

  // probably need some useRefs
  // constructor(props) {
  //   super(props);
  //   this.state = { hightlight: false };
  //   this.fileInputRef = React.createRef();

  //   this.openFileDialog = this.openFileDialog.bind(this);
  //   this.onFilesAdded = this.onFilesAdded.bind(this);
  //   this.onDragOver = this.onDragOver.bind(this);
  //   this.onDragLeave = this.onDragLeave.bind(this);
  //   this.onDrop = this.onDrop.bind(this);
  // }

  const openFileDialog = () => {
    if (props.disabled) return;
    fileInputRef.current.click();
  };

  const onFilesAdded = evt => {
    if (props.disabled) return;
    const files = evt.target.files;
    console.log('onFilesAdded: files => ', files);
    if (props.onFilesAdded) {
      const array = fileListToArray(files);
      props.onFilesAdded(array);
      fileInputRef.current.value = '';
    }
  };

  const onDragOver = event => {
    event.preventDefault();
    if (props.disabed) return;
    setState({ ...state, hightlight: true });
  };

  const onDragLeave = event => {
    setState({ ...state, hightlight: false });
  };

  const onDrop = event => {
    event.preventDefault();
    if (props.disabed) return;
    const files = event.dataTransfer.files;
    if (props.onFilesAdded) {
      const array = fileListToArray(files);
      props.onFilesAdded(array);
    }
    setState({ ...state, hightlight: false });
  };

  const fileListToArray = list => {
    const array = [];
    for (var i = 0; i < list.length; i++) {
      array.push(list.item(i));
    }
    return array;
  };

  const dropZoneClasses = clsx(
    classes.dropzone,
    state.hightlight && classes.highlight
  );

  return (
    <div
      // className={`Dropzone ${state.hightlight ? 'Highlight' : ''}`}
      className={dropZoneClasses}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={openFileDialog}
      style={{ cursor: props.disabled ? 'default' : 'pointer' }}>
      <input
        ref={fileInputRef}
        className={classes.fileInput}
        type="file"
        multiple={props.multiple}
        onChange={onFilesAdded}
      />
      <CloudUploadIcon fontSize="large" />
      {/* <img
        alt="upload"
        className={classes.icon}
        src="baseline-cloud_upload-24px.svg"
      /> */}
      <span>Drop Files</span>
    </div>
  );
};

export default Dropzone;

// class Dropzone extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { hightlight: false };
//     this.fileInputRef = React.createRef();

//     this.openFileDialog = this.openFileDialog.bind(this);
//     this.onFilesAdded = this.onFilesAdded.bind(this);
//     this.onDragOver = this.onDragOver.bind(this);
//     this.onDragLeave = this.onDragLeave.bind(this);
//     this.onDrop = this.onDrop.bind(this);
//   }

//   openFileDialog() {
//     if (this.props.disabled) return;
//     this.fileInputRef.current.click();
//   }

//   onFilesAdded(evt) {
//     if (this.props.disabled) return;
//     const files = evt.target.files;
//     if (this.props.onFilesAdded) {
//       const array = this.fileListToArray(files);
//       this.props.onFilesAdded(array);
//     }
//   }

//   onDragOver(event) {
//     event.preventDefault();
//     if (this.props.disabed) return;
//     this.setState({ hightlight: true });
//   }

//   onDragLeave(event) {
//     this.setState({ hightlight: false });
//   }

//   onDrop(event) {
//     event.preventDefault();
//     if (this.props.disabed) return;
//     const files = event.dataTransfer.files;
//     if (this.props.onFilesAdded) {
//       const array = this.fileListToArray(files);
//       this.props.onFilesAdded(array);
//     }
//     this.setState({ hightlight: false });
//   }

//   fileListToArray(list) {
//     const array = [];
//     for (var i = 0; i < list.length; i++) {
//       array.push(list.item(i));
//     }
//     return array;
//   }

//   render() {
//     return (
//       <div
//         className={`Dropzone ${this.state.hightlight ? 'Highlight' : ''}`}
//         onDragOver={this.onDragOver}
//         onDragLeave={this.onDragLeave}
//         onDrop={this.onDrop}
//         onClick={this.openFileDialog}
//         style={{ cursor: this.props.disabled ? 'default' : 'pointer' }}>
//         <input
//           ref={this.fileInputRef}
//           className="FileInput"
//           type="file"
//           multiple
//           onChange={this.onFilesAdded}
//         />
//         <img
//           alt="upload"
//           className="Icon"
//           src="baseline-cloud_upload-24px.svg"
//         />
//         <span>Upload Files</span>
//       </div>
//     );
//   }
// }

// export default Dropzone;

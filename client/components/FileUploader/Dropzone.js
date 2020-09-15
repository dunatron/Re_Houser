import PropTypes from 'prop-types';
import React, { useState, useRef } from 'react';

import clsx from 'clsx';
import dropZoneStyles from './DropZoneStyles';
import CloudUploadIcon from '@material-ui/icons/CloudUploadOutlined';

const Dropzone = props => {
  const classes = dropZoneStyles();
  const fileInputRef = useRef();
  const [state, setState] = useState({
    hightlight: false,
  });

  const openFileDialog = () => {
    if (props.disabled) return;
    fileInputRef.current.click();
  };

  const onFilesAdded = evt => {
    if (props.disabled) return;
    const files = evt.target.files;
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
      <span>Drop Files</span>
    </div>
  );
};

Dropzone.propTypes = {
  disabed: PropTypes.any.isRequired,
  disabled: PropTypes.any.isRequired,
  multiple: PropTypes.any.isRequired,
  onFilesAdded: PropTypes.func.isRequired,
};

export default Dropzone;

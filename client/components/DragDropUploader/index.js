import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import { DropZone, HiddenInput, InputLabel, ProgressBar } from './styles';
import LinearBuffer from '../LinearBuffer/index';
import CircularProgress from '@material-ui/core/CircularProgress';
import fileTypesGen from './fileTypeGen';

const readFileIntoMemory = (file, callback) => {
  var reader = new FileReader();
  reader.onload = function() {
    callback({
      name: file.name,
      size: file.size,
      type: file.type,
      content: new Uint8Array(this.result),
      raw: file,
    });
  };
  reader.readAsArrayBuffer(file);
};

const _allowedExtensions = (types, extensions) => {
  const allowed = fileTypesGen(
    types ? types : undefined,
    extensions ? extensions : undefined
  );
  return allowed;
};

const DragDropUploader = ({
  title,
  classes,
  addText,
  addBtnText,
  externalLoading,
  disabled,
  dropStyles,
  receiveFile,
  types,
  extensions,
  multiple,
}) => {
  const initialState = {
    dragging: false,
    processing: false,
    numToProcess: 0,
    numProcessed: 0,
  };

  const [state, setState] = useState({
    ...initialState,
  });

  const { dragging, processing, numToProcess, numProcessed } = state;

  const allowedExtensions = _allowedExtensions(types, extensions);

  const reset = () => {
    setState({
      ...initialState,
    });
  };

  const renderDropText = () => {
    const text = addText ? addText : 'Click To Browse';
    return <h2>{text}</h2>;
  };

  const renderBtnText = () => {
    const text = addBtnText ? addBtnText : 'Click To Browse';

    if (processing || externalLoading) return 'Please Wait';
    if (dragging) return 'DROP';
    return text;
  };

  const renderUploadButton = () => {
    if (processing || externalLoading)
      return (
        <div>
          <Button
            disabled={disabled}
            color={dragging ? 'secondary' : 'primary'}
            variant="contained"
            component="span">
            {renderBtnText()}
          </Button>
        </div>
      );

    return (
      <label htmlFor="file-multi-input">
        <Button
          disabled={disabled}
          color={dragging ? 'secondary' : 'primary'}
          variant="contained"
          component="span">
          {renderBtnText()}
        </Button>
      </label>
    );
  };

  const renderDropZone = () => {
    return (
      <DropZone
        style={dropStyles ? dropStyles : {}}
        dragging={dragging}
        disabled={disabled}
        onClick={onZoneClick}
        onDrop={disabled ? e => e.preventDefault() : e => onDrop(e)}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}>
        <span>{title}</span>
        <CloudUploadOutlinedIcon />
        <HiddenInput
          accept="image/*"
          id="file-multi-input"
          multiple
          type="file"
          onChange={e => onFileChange(e)}
        />
        <span>{renderDropText()}</span>
        {renderUploadButton()}
      </DropZone>
    );
  };

  const updateProgress = () => {
    const numberNowProcessed = numProcessed + 1;
    setState({
      ...state,
      processing: numToProcess <= numberNowProcessed ? false : true,
      numProcessed: numberNowProcessed,
    });
    if (numToProcess <= numberNowProcessed) {
      reset();
    }
  };

  const processedFile = fileInfo => {
    receiveFile(fileInfo);
    updateProgress();
  };

  const handleSingleFile = file => {
    readFileIntoMemory(file, processedFile);
  };

  const handleFiles = async files => {
    const allowedFiles = Object.values(files)
      .map(file => file)
      .filter(f => allowedExtensions.includes(f.type));
    if (!multiple) {
      return handleSingleFile(allowedFiles[0]);
    }
    setState({ ...state, numToProcess: allowedFiles.length });
    allowedFiles.map(file => readFileIntoMemory(file, processedFile));
  };

  const onFileChange = e => {
    // const files = e.target.files;
    handleFiles(e.target.files);
  };
  const onDrop = e => {
    e.preventDefault();
    setState({ ...state, dragging: false, processing: true });
    // const files = e.dataTransfer.files;
    handleFiles(e.dataTransfer.files);
  };

  const onDragEnter = e => {
    e.preventDefault();
    if (!state.dragging) {
      setState({
        ...state,
        dragging: true,
      });
    }
  };

  const onDragLeave = e => {
    e.preventDefault();
    if (state.dragging) {
      setState({
        ...state,
        dragging: false,
      });
    }
  };

  const onDragOver = e => {
    e.preventDefault();
    if (!state.dragging) {
      setState({
        ...state,
        dragging: true,
      });
    }
  };

  const onZoneClick = () => {};

  if (processing) {
    return (
      <ProgressBar>
        streaming files to browser please wait
        <LinearBuffer
          size={numToProcess}
          currentSize={numProcessed + 1}
          color="secondary"
        />
      </ProgressBar>
    );
  }

  return renderDropZone();
};

DragDropUploader.propTypes = {
  addBtnText: PropTypes.string.isRequired,
  addText: PropTypes.string.isRequired,
  classes: PropTypes.any.isRequired,
  disabled: PropTypes.bool.isRequired,
  dropStyles: PropTypes.object.isRequired,
  extensions: PropTypes.array.isRequired,
  externalLoading: PropTypes.bool.isRequired,
  multiple: PropTypes.any.isRequired,
  receiveFile: PropTypes.func.isRequired,
  title: PropTypes.any.isRequired,
  types: PropTypes.array.isRequired
};

export default DragDropUploader;

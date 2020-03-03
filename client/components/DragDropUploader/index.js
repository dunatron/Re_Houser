import React, { Component } from 'react';
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

class DragDropUploader extends Component {
  initialState = {
    dragging: false,
    processing: false,
    numToProcess: 0,
    numProcessed: 0,
  };

  state = {
    ...this.initialState,
  };

  render = () => {
    const { classes, title } = this.props;
    const { dragging, processing, numToProcess, numProcessed } = this.state;

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

    return this.renderDropZone();
  };

  renderDropText = () => {
    const { dragging, processing } = this.state;
    const { addText, externalLoading } = this.props;
    const text = addText ? addText : 'Click To Browse';
    // Lokks bets when size doesn't change. So use btn for messages
    // if (processing) return "Processing please wait..."
    return <h2>{text}</h2>;
  };

  renderBtnText = () => {
    const { dragging, processing } = this.state;
    const { addBtnText, externalLoading } = this.props;
    const text = addBtnText ? addBtnText : 'Click To Browse';

    if (processing || externalLoading) return 'Please Wait';
    if (dragging) return 'DROP';
    return text;
  };

  renderUploadButton = () => {
    const {
      classes,
      title,
      disabled,
      multiple,
      dropStyles,
      externalLoading,
    } = this.props;
    const { dragging, processing } = this.state;
    if (processing || externalLoading)
      return (
        <div>
          <Button
            disabled={disabled}
            color={dragging ? 'secondary' : 'primary'}
            variant="contained"
            component="span"
            //  className={classes.button}
          >
            {this.renderBtnText()}
          </Button>
        </div>
      );

    return (
      <label htmlFor="file-multi-input">
        <Button
          disabled={disabled}
          color={dragging ? 'secondary' : 'primary'}
          variant="contained"
          component="span"
          //  className={classes.button}
        >
          {this.renderBtnText()}
        </Button>
      </label>
    );
  };

  renderDropZone = () => {
    const { classes, title, disabled, multiple, dropStyles } = this.props;
    const { dragging, processing } = this.state;
    return (
      <DropZone
        style={dropStyles ? dropStyles : {}}
        dragging={dragging}
        disabled={disabled}
        onClick={this.onZoneClick}
        onDrop={disabled ? e => e.preventDefault() : e => this.onDrop(e)}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
        onDragOver={this.onDragOver}>
        <span>{title}</span>
        <CloudUploadOutlinedIcon />
        <HiddenInput
          accept="image/*"
          id="file-multi-input"
          multiple
          type="file"
          onChange={e => this.onFileChange(e)}
        />
        <span
        // className={classes.dropSubTitle}
        >
          {/* {processing ? "Please Wait" : "Add some files"} */}
          {this.renderDropText()}
        </span>
        {this.renderUploadButton()}
      </DropZone>
    );
  };

  allowedExtensions = () => {
    const { types, extensions } = this.props;
    const allowed = fileTypesGen(
      types ? types : undefined,
      extensions ? extensions : undefined
    );
    return allowed;
  };

  updateProgress = () => {
    let { numToProcess, numProcessed } = this.state;
    const numberNowProcessed = numProcessed + 1;
    this.setState({
      processing: numToProcess <= numberNowProcessed ? false : true,
      numProcessed: numberNowProcessed,
    });
    if (numToProcess <= numberNowProcessed) {
      this.reset();
    }
  };

  processedFile = fileInfo => {
    const { receiveFile } = this.props;
    receiveFile(fileInfo);
    this.updateProgress();
  };

  handleSingleFile = file => {
    readFileIntoMemory(file, this.processedFile);
  };

  handleFiles = async files => {
    const { multiple } = this.props;
    const allowedExtensions = this.allowedExtensions();
    const allowedFiles = Object.values(files)
      .map(file => file)
      .filter(f => allowedExtensions.includes(f.type));
    if (!multiple) {
      return this.handleSingleFile(allowedFiles[0]);
    }
    this.setState({ numToProcess: allowedFiles.length });
    allowedFiles.map(file => readFileIntoMemory(file, this.processedFile));
  };

  onFileChange = e => {
    const files = e.target.files;
    this.handleFiles(files);
  };
  onDrop = e => {
    e.preventDefault();
    this.setState({ dragging: false, processing: true });
    const files = e.dataTransfer.files;
    this.handleFiles(files);
  };

  onDragEnter = e => {
    e.preventDefault();
    if (!this.state.dragging) {
      this.setState({
        dragging: true,
      });
    }
  };

  onDragLeave = e => {
    e.preventDefault();
    if (this.state.dragging) {
      this.setState({
        dragging: false,
      });
    }
  };

  onDragOver = e => {
    e.preventDefault();
    if (!this.state.dragging) {
      this.setState({
        dragging: true,
      });
    }
  };

  onZoneClick = () => {};

  reset = () => {
    this.setState({
      ...this.initialState,
    });
  };
}

DragDropUploader.propTypes = {
  types: PropTypes.array,
  extensions: PropTypes.array,
  receiveFile: PropTypes.func.isRequired,
  dropStyles: PropTypes.object,
  addBtnText: PropTypes.string,
  addText: PropTypes.string,
  externalLoading: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default DragDropUploader;

import React, {
  useState,
  useReducer,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { useMutation, gql, useApolloClient } from '@apollo/client';
import { Paper, Button, IconButton, CircularProgress } from '@material-ui/core';

import Dropzone from './Dropzone';
import UploadFileButton from './UploadFileButton';
// import './index.css';
import Progress from './Progress';
import Error from '../ErrorMessage';
import errorAlert from '../../lib/errorAlert';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import uploadStyles from './UploadStyles';
import UploadIcon from '@material-ui/icons/CloudUploadOutlined';
import TrashIcon from '@material-ui/icons/DeleteOutlined';
import ViewIcon from '@material-ui/icons/VisibilityOutlined';
import CheckIcon from '@material-ui/icons/Check';

// https://www.apollographql.com/blog/graphql-file-uploads-with-react-hooks-typescript-amazon-s3-tutorial-ef39d21066a2
// maybe try for progress https://github.com/jaydenseric/apollo-upload-client/issues/88
// TGHIS LOOKS GOOD => https://medium.com/@enespalaz/file-upload-with-graphql-9a4927775ef7
const SINGLE_UPLOAD = gql`
  mutation($file: Upload!) {
    singleUpload(file: $file) {
      id
      filename
      mimetype
      encoding
      url
    }
  }
`;

const UPLOAD_FILES_MUTATION = gql`
  mutation($files: [Upload!]!) {
    uploadFiles(files: $files) {
      id
      filename
      mimetype
      encoding
      url
    }
  }
`;
// type: 'ADD_TODO',

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_FILES':
      return {
        ...state,
        files: [
          ...state.files,
          // ...action.payload.files,
          ...action.payload.files.map((file, idx) => ({
            ...file,
            raw: file,
            loading: false,
            uploadCompleted: false,
            error: null,
          })),
        ],
      };
    case 'START_FILE_UPLOAD':
      return {
        ...state,
        files: state.files.map((f, idx) =>
          idx === action.payload.idx ? { ...f, loading: true } : f
        ),
      };
    case 'UPDATE_FILE_STATE':
      return {
        ...state,
        files: state.files.map((f, idx) =>
          idx === action.payload.idx
            ? { ...f, [action.payload.key]: action.payload.value }
            : f
        ),
      };
    case 'COMPLETE_FILE_UPLOAD':
      return {
        ...state,
        uploadedCount: state.uploadedCount + 1,
        files: state.files.map((f, idx) =>
          f.raw.name === action.payload.file.filename
            ? { ...f, uploadCompleted: true, loading: false }
            : f
        ),
        recentlyUploaded: [...state.recentlyUploaded, action.payload.file],
      };
    case 'REMOVE_FILE':
      return {
        ...state,
        files: state.files.filter((f, idx) => idx !== action.payload.idx),
      };
    case 'ADD_ERROR':
      return {
        ...state,
        files: state.files.map((f, idx) =>
          idx === action.payload.idx
            ? {
                ...f,
                error: action.payload.error,
                loading: false,
              }
            : f
        ),
      };
    default:
      return state;
  }
};

const UploadFile = forwardRef((props, ref) => {
  // The component instance will be extended
  // with whatever you return from the callback passed
  // as the second argument
  const client = useApolloClient();
  const multiple = true;
  const classes = uploadStyles();
  const [store, dispatch] = useReducer(reducer, {
    files: [],
    errors: [],
    recentlyUploaded: [],
    uploadedCount: 0,
  });
  const { files, errors, recentlyUploaded, uploadedCount } = store;

  useImperativeHandle(ref, () => ({
    getAlert() {
      alert('getAlert from Child');
    },
  }));

  // can either handle remove the files that have been completed and render the files that have just been uploaded
  const handleOnCompleted = (data, idx) => {
    console.log('Data from single upload => ', data);
    dispatch({
      type: 'COMPLETE_FILE_UPLOAD',
      payload: {
        file: data.singleUpload,
      },
    });
    props.recieveFile(data.singleUpload);
  };

  const handleOnError = (error, idx) => {
    errorAlert(error);
    dispatch({
      type: 'ADD_ERROR',
      payload: {
        error,
        idx,
      },
    });
  };

  const onFilesAdded = addedFiles => {
    dispatch({
      type: 'ADD_FILES',
      payload: {
        files: addedFiles,
      },
    });
  };

  const handleStartUpload = idx => {
    dispatch({
      type: 'START_FILE_UPLOAD',
      payload: {
        idx,
      },
    });
  };

  const handleFileUpload = (file, idx) => {
    client
      .mutate({
        mutation: SINGLE_UPLOAD,
        variables: {
          file: file.raw,
        },
      })
      .then(res => {
        handleOnCompleted(res.data, idx);
      })
      .catch(error => {
        handleOnError(error, idx);
      });
  };

  const doUploadFiles = () => {
    files.forEach((f, idx) => {
      handleStartUpload(idx);
      handleFileUpload(f, idx);
    });
  };

  const uploadSingleFile = idx => {
    const singleFileAtIndex = files[idx];
    handleFileUpload(singleFileAtIndex, idx);
  };

  console.log('The store => ', store);

  return (
    <Paper className={classes.upload}>
      {/* <input type="file" required onChange={onChange} /> */}
      <Dropzone multiple={multiple} onFilesAdded={onFilesAdded} />
      {/* Files list  */}
      <div className={classes.files}>
        {files.map((f, idx) => {
          return (
            <div key={f.raw.name} className={classes.row}>
              <div className={classes.actions}>
                <UploadFileButton
                  key={f.raw.name}
                  file={f}
                  idx={idx}
                  loading={f.loading}
                  uploadCompleted={f.uploadCompleted}
                  handleClick={() => {
                    handleStartUpload(idx);
                    handleFileUpload(f, idx);
                  }}
                />
                <IconButton
                  size="medium"
                  disabled={f.loading}
                  onClick={() =>
                    alert(
                      'Todo: create modal to handle viewing differnet file types'
                    )
                  }
                  color="default"
                  aria-label="upload picture"
                  component="span">
                  <ViewIcon size="small" />
                </IconButton>
                <IconButton
                  size="medium"
                  disabled={f.loading}
                  onClick={() =>
                    dispatch({
                      type: 'REMOVE_FILE',
                      payload: {
                        idx: idx,
                      },
                    })
                  }
                  color="default"
                  aria-label="upload picture"
                  component="span">
                  <TrashIcon size="small" />
                </IconButton>
              </div>
              <span className={classes.filename}>{f.raw.name}</span>{' '}
              {f.error && <Error key={idx} error={f.error} />}
              {/* <Error key={idx} error={f.error} /> */}
            </div>
          );
        })}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}>
          {files.length > 0 && (
            <Button
              className={classes.button}
              color="primary"
              onClick={() => doUploadFiles()}
              disabled={files.includes(f => f.loading === true)}>
              Upload Files To Server
            </Button>
          )}
          {/* <div className="Files">
            {this.state.files.map(file => {
              return (
                <div key={file.name} className="Row">
                  <span className="Filename">{file.name}</span>
                  {this.renderProgress(file)}
                </div>
              );
            })}
          </div> */}
          {/* Actualy say what is uploading */}
          <div>
            {uploadedCount} / {files.length}
          </div>
        </div>
      </div>

      {recentlyUploaded.length > 0 && (
        <div
          style={{
            width: '100%',
          }}>
          <h3>Recently Uploaded</h3>
          {/* Recently Added */}
          {recentlyUploaded.map((rFile, i) => {
            return (
              <div
                style={{
                  width: '100%',
                }}>
                Uploaded: {rFile.filename}
              </div>
            );
          })}
        </div>
      )}
    </Paper>
  );
});

export default UploadFile;

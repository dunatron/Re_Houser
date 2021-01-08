import { uuid } from 'uuidv4';
import ReactCardFlip from 'react-card-flip';
import PropTypes from 'prop-types';
import React, {
  useState,
  useReducer,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from 'react';
import { useMutation, gql, useApolloClient } from '@apollo/client';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import {
  Paper,
  ButtonGroup,
  Button,
  IconButton,
  Box,
  Typography,
} from '@material-ui/core';

import { toast } from 'react-toastify';

import Dropzone from './Dropzone';
import FileActions from './FileActions';
import FilePreviewer from './FilePreviewer';

import Modal from '@/Components/Modal';
import Error from '@/Components/ErrorMessage';
import errorAlert from '@/Lib/errorAlert';

import useUploadStyles from './UploadStyles';

import { FileInfoFragment } from '@/Gql/fragments/fileInfo';

//icons
import FlipToBackIcon from '@material-ui/icons/FlipToBackOutlined';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import FlipToFrontIcon from '@material-ui/icons/FlipToFrontOutlined';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

//component pieces
import FlipCardHeader from './FlipCardHeader';

const SINGLE_UPLOAD = gql`
  mutation($file: Upload!, $data: CloudinaryParams) {
    singleUpload(file: $file, data: $data) {
      id
      updatedAt
      createdAt
      filename
      mimetype
      encoding
      url
      ...fileInfo
    }
  }
  ${FileInfoFragment}
`;

const UploadFile = forwardRef((props, ref) => {
  const {
    title,
    serverFiles,
    remove,
    store,
    dispatch,
    isRemoving,
    fileParams,
    flip,
  } = props;
  const maxFilesAllowed = props.maxFilesAllowed ? props.maxFilesAllowed : 10;
  const client = useApolloClient();
  const multiple = true;
  const classes = useUploadStyles();

  const { files, recentlyUploaded, uploadedCount, removingIds } = store;

  // serverFiles Length + files length
  const totalFileCount = files.length + serverFiles.length;

  // when server files chnages we need to remove the from the files state
  useImperativeHandle(ref, () => ({
    getAlert() {
      alert('getAlert from Child');
    },
  }));

  const clientFilenames = files.map(f => f.raw.name);

  const isLoadingAFile = files.some(f => f.loading === true);

  const hasAFileToUpload =
    files.filter(f => f.uploadCompleted === false).filter(f => !f.error)
      .length > 0;

  // can either handle remove the files that have been completed and render the files that have just been uploaded
  const handleOnCompleted = (data, file) => {
    dispatch({
      type: 'COMPLETE_FILE_UPLOAD',
      payload: {
        data: data.singleUpload,
        file: file,
      },
    });
    props.recieveFile(data.singleUpload);
  };

  const handleOnError = (error, file) => {
    errorAlert(error);
    dispatch({
      type: 'ADD_ERROR',
      payload: {
        error,
        file,
      },
    });
  };

  const onFilesAdded = addedFiles => {
    if (totalFileCount > maxFilesAllowed) return;
    if (addedFiles.length + totalFileCount > maxFilesAllowed) {
      toast.info(
        <Typography>You can only upload {maxFilesAllowed} files</Typography>
      );
      return;
    }
    dispatch({
      type: 'ADD_FILES',
      payload: {
        files: addedFiles
          .filter(f => !clientFilenames.includes(f.name))
          .filter((i, index) => index < maxFilesAllowed - files.length),
      },
    });
  };

  const handleStartUpload = file => {
    dispatch({
      type: 'START_FILE_UPLOAD',
      payload: {
        file,
      },
    });
  };

  const handleStartLoader = idx => {
    dispatch({
      type: 'START_LOADER',
      payload: {
        idx,
      },
    });
  };

  const handleFileUpload = file => {
    client
      .mutate({
        mutation: SINGLE_UPLOAD,
        variables: {
          file: file.raw,
          data: fileParams
            ? {
                // resource_type: fileParams.resource_type,
                folder: fileParams.folder,
                access_mode: fileParams.access_mode,
              }
            : {},
          // data: fileParams
          //   ? {
          //       ...fileParams,
          //     }
          //   : {},
        },
      })
      .then(res => {
        handleOnCompleted(res.data, file);
      })
      .catch(error => {
        handleOnError(error, file);
      });
  };

  const handleRemoveFile = f => {
    dispatch({
      type: 'REMOVE_FILE',
      payload: {
        file: f,
      },
    });
  };

  const doUploadFiles = () => {
    files.forEach((f, idx) => {
      if (f.uploadCompleted) return;
      if (f.loading) return;
      handleStartUpload(f);
      handleFileUpload(f);
    });
  };

  const paperClasses = clsx({
    [classes.flipCard]: true,
    [classes.upload]: true,
  });

  useEffect(() => {
    serverFiles.forEach(sFile => handleRemoveFile(sFile));
  }, [serverFiles.length]);

  const recentlyUploadedServerFiles = recentlyUploaded
    ? recentlyUploaded.map(file => ({ ...file.serverFile }))
    : [];

  const serverIds = serverFiles.map(f => {
    if (f === null) return;
    return f.id;
  });

  const recentlyUploadedWithoutAttached = recentlyUploadedServerFiles.filter(
    f => {
      if (serverIds.includes(f.id)) return;
      return f;
    }
  );

  return (
    <Paper className={paperClasses}>
      <div
        style={{
          width: '100%',
          marginBottom: '16px',
        }}>
        <Typography>{props.description}</Typography>
      </div>
      <Dropzone multiple={multiple} onFilesAdded={onFilesAdded} />
      {/* Files list  */}
      <div className={classes.content}>
        <div className={classes.files}>
          {files.map((f, idx) => {
            return (
              <>
                <div key={f.raw.name} className={classes.row}>
                  <FileActions
                    file={f}
                    remove={() => {
                      handleRemoveFile(f);
                    }}
                    upload={file => {
                      handleStartUpload(file);
                      handleFileUpload(file);
                    }}
                    isRemoving={isRemoving}
                    removingIds={removingIds}
                    deleteForever={remove}
                  />
                  <span className={classes.filename}>{f.raw.name}</span>{' '}
                </div>
                {f.error && <Error key={idx} error={f.error} />}
              </>
            );
          })}
        </div>
        <div className={classes.footerActions}>
          {hasAFileToUpload && (
            <Button
              className={classes.button}
              color="primary"
              variant="contained"
              onClick={() => doUploadFiles()}
              disabled={isLoadingAFile}>
              Upload files to server ({uploadedCount} / {files.length})
            </Button>
          )}
        </div>
      </div>

      {recentlyUploadedWithoutAttached.length > 0 && (
        <div
          style={{
            width: '100%',
            marginTop: '16px',
          }}>
          <Typography variant="body1">Staged Files</Typography>
          <Typography variant="body2" gutterBottom>
            These files have recently been uploaded and will be connected when
            you upload the form
          </Typography>
          {/* Recently Added */}
          <ul>
            {files
              .filter(f => f.uploadCompleted)
              .map((f, i) => {
                const { serverFile } = f;
                if (!serverFile) return null;
                return (
                  <Box component="li">
                    <Typography
                      variant="body2"
                      gutterBottom
                      key={f.id}
                      style={{
                        width: '100%',
                      }}>
                      {serverFile.filename}
                    </Typography>
                  </Box>
                );
              })}
          </ul>
          <FilePreviewer
            files={recentlyUploadedWithoutAttached}
            remove={remove}
            flip={flip}
            isRemoving={isRemoving}
            removingIds={removingIds}
          />
        </div>
      )}
      {/* Attached Files */}
      {serverFiles.length > 0 && (
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
          }}>
          <h3>Attached Files for {title}</h3>
          <FilePreviewer
            files={serverFiles}
            remove={remove}
            flip={flip}
            isRemoving={isRemoving}
            removingIds={removingIds}
          />
        </div>
      )}
    </Paper>
  );
});

UploadFile.propTypes = {
  description: PropTypes.any,
  dispatch: PropTypes.func.isRequired,
  fileParams: PropTypes.any,
  isRemoving: PropTypes.any,
  maxFilesAllowed: PropTypes.any,
  recieveFile: PropTypes.func.isRequired,
  remove: PropTypes.any,
  serverFiles: PropTypes.array.isRequired,
  store: PropTypes.any,
};

export default UploadFile;

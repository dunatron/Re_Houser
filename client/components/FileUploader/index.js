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

// https://www.apollographql.com/blog/graphql-file-uploads-with-react-hooks-typescript-amazon-s3-tutorial-ef39d21066a2
// maybe try for progress https://github.com/jaydenseric/apollo-upload-client/issues/88
// TGHIS LOOKS GOOD => https://medium.com/@enespalaz/file-upload-with-graphql-9a4927775ef7
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

const DELETE_FILE_MUTATION = gql`
  mutation($id: ID!) {
    deleteFile(id: $id) {
      id
      updatedAt
      createdAt
      filename
      mimetype
      encoding
      url
    }
  }
`;

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_FILES':
      return {
        ...state,
        files: [
          ...state.files,
          ...action.payload.files.map((file, idx) => ({
            ...file,
            id: uuid(),
            raw: file,
            loading: false,
            uploadCompleted: false,
            error: null,
          })),
        ],
      };
    case 'ADD_ID_TO_REMOVING_IDS':
      return {
        ...state,
        removingIds: [...state.removingIds, action.payload.id],
      };
    case 'START_LOADER':
      return {
        ...state,
        files: state.files.map((f, idx) =>
          idx === action.payload.idx ? { ...f, loading: true } : f
        ),
      };
    case 'START_FILE_UPLOAD':
      return {
        ...state,
        files: state.files.map(f =>
          f.id === action.payload.file.id ? { ...f, loading: true } : f
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
        files: state.files.map(f =>
          f.id === action.payload.file.id
            ? {
                ...f,
                id: action.payload.data.id,
                uploadCompleted: true,
                loading: false,
                serverFile: action.payload.data,
              }
            : f
        ),
        recentlyUploaded: [
          ...state.recentlyUploaded,
          { ...action.payload.file, serverFile: action.payload.data },
        ],
      };
    case 'REMOVE_FILE':
      return {
        ...state,
        files: state.files.filter(f => f.id !== action.payload.file.id),
      };
    case 'REMOVE_SERVER_FILE':
      toast.success(
        <Typography>
          successfully removed {action.payload.file.serverFile.filename} from
          server
        </Typography>
      );
      return {
        ...state,
        uploadedCount: state.uploadedCount - 1,
        files: state.files.filter(f => {
          if (!f.serverFile) return f;
          if (f.serverFile.id !== action.payload.file.serverFile.id) return f;
        }),
        recentlyUploaded: state.recentlyUploaded.filter(f => {
          if (!f.serverFile) return f;
          if (f.serverFile.id !== action.payload.file.serverFile.id) return f;
        }),
        removingIds: [
          ...state.removingIds.filter(
            id => id !== action.payload.file.serverFile.id
          ),
        ],
      };
    case 'ADD_ERROR':
      return {
        ...state,
        files: state.files.map(f =>
          f.id === action.payload.file.id
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
  const {
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
    console.log('YOUR FILE', file);
    client
      .mutate({
        mutation: SINGLE_UPLOAD,
        variables: {
          file: file.raw,
          data: fileParams
            ? {
                resource_type: fileParams.resource_type,
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
          }}>
          <Typography variant="h6">Recently Uploaded</Typography>
          <Typography variant="subtitle1" gutterBottom>
            These files will be connected when you upload the form
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
          <h3>Attached Files</h3>
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

const FlipCardHeader = ({
  title,
  isFlipped,
  flip,
  expanded,
  expand,
  hasFile,
}) => {
  const classes = useUploadStyles();
  return (
    <div className={classes.flipHeader}>
      {hasFile && (
        <DoneIcon color="primary" className={classes.hasServerIcon} />
      )}
      <ButtonGroup size="small" aria-label="small outlined button group">
        <Button
          startIcon={isFlipped ? <FlipToBackIcon /> : <FlipToFrontIcon />}
          onClick={flip}>
          Flip
        </Button>
        <Button
          startIcon={
            expanded ? <RemoveCircleOutlineIcon /> : <AddCircleOutlineIcon />
          }
          onClick={expand}>
          {expanded ? 'Close' : 'Add'}
        </Button>
      </ButtonGroup>
      <Typography style={{ marginLeft: '8px' }}>{title}</Typography>
    </div>
  );
};

FlipCardHeader.propTypes = {
  flip: PropTypes.any,
  isFlipped: PropTypes.any,
  title: PropTypes.any,
};

const UploadedServerFiles = ({
  serverFiles,
  remove,
  store,
  isRemoving,
  flip,
}) => {
  const { removingIds } = store;
  const classes = useUploadStyles();

  const paperClasses = clsx({
    [classes.flipCard]: true,
  });
  return (
    <Paper className={paperClasses}>
      <FilePreviewer
        files={serverFiles}
        remove={remove}
        flip={flip}
        removingIds={removingIds}
        isRemoving={isRemoving}
      />
    </Paper>
  );
};

UploadedServerFiles.propTypes = {
  isRemoving: PropTypes.any,
  remove: PropTypes.any,
  serverFiles: PropTypes.any,
  store: PropTypes.any,
};

//remove gets fed into here
const FileManager = props => {
  const theme = useTheme();
  const {
    title,
    description,
    files,
    maxFilesAllowed,
    fileRemovedFromServer,
    refetchQueries,
    updateCacheOnRemovedFile,
    fileParams,
  } = props;

  const [store, dispatch] = useReducer(reducer, {
    files: [],
    errors: [],
    recentlyUploaded: [],
    uploadedCount: 0,
    removingIds: [],
  });

  const [state, setState] = useState({
    isFlipped: props.files.length > 0 ? false : true,
    initialFiles: files,
    expanded: props.expanded ? true : false,
  });

  const _hasFile = () => {
    if (state.initialFiles.length >= 1) return true;
    if (files.length >= 1) return true;
    if (store.files.length >= 1) return true;
    if (store.recentlyUploaded.length >= 1) return true;
    return false;
  };

  useEffect(() => {
    setState({
      ...state,
      isFlipped: props.files.length > 0 ? state.isFlipped : true,
      initialFiles: files,
    });
  }, [files]);

  const handleFileSuccessfullyRemovedFromServer = data => {
    fileRemovedFromServer && fileRemovedFromServer(data.deleteFile);
    setState({
      ...state,
      initialFiles: [
        ...state.initialFiles.filter(f => f.id !== data.deleteFile.id),
      ],
    });

    dispatch({
      type: 'REMOVE_SERVER_FILE',
      payload: {
        file: {
          serverFile: {
            ...data.deleteFile,
          },
        },
        id: data.deleteFile.id,
      },
    });
  };

  const [deleteFile, { data, loading, error }] = useMutation(
    DELETE_FILE_MUTATION,
    {
      onCompleted: handleFileSuccessfullyRemovedFromServer,
      refetchQueries: refetchQueries,
    }
  );

  const handleFlip = () =>
    setState({
      ...state,
      isFlipped: !state.isFlipped,
    });

  const handleExpand = () =>
    setState({
      ...state,
      expanded: !state.expanded,
    });

  const removeFileFromServer = file => {
    // dispatch to ADD_ID_TO_REMOVING_IDS
    dispatch({
      type: 'ADD_ID_TO_REMOVING_IDS',
      payload: {
        id: file.id,
      },
    });
    // make files and recnetly uploaded etc aware of a file being removed
    deleteFile({
      variables: {
        id: file.id,
      },
      // doesnt seem to cut the mustard
      update: updateCacheOnRemovedFile,
    });
  };

  const hasFile = _hasFile();

  return (
    <>
      <FlipCardHeader
        title={title}
        isFlipped={state.isFlipped}
        hasFile={hasFile}
        flip={handleFlip}
        expand={handleExpand}
        expanded={state.expanded}
      />
      <Error error={error} />
      {state.expanded && (
        <ReactCardFlip
          cardZIndex={theme.zIndex.flipCard}
          containerStyle={{
            position: 'relative',
          }}
          isFlipped={state.isFlipped}
          flipDirection="vertical"
          flipSpeedBackToFront={0.6}
          flipSpeedFrontToBack={0.6}
          infinite={false}>
          {/* FRONT OF CARD */}
          <UploadedServerFiles
            store={store}
            isRemoving={loading}
            dispatch={dispatch}
            serverFiles={state.initialFiles}
            flip={handleFlip}
            remove={removeFileFromServer}
          />
          {/* BACK OF CARD */}
          <UploadFile
            store={store}
            dispatch={dispatch}
            serverFiles={state.initialFiles}
            flip={handleFlip}
            description={description}
            {...props}
            isRemoving={loading}
            remove={removeFileFromServer}
            maxFilesAllowed={maxFilesAllowed}
            fileParams={fileParams}
          />
        </ReactCardFlip>
      )}
    </>
  );
};

//https://cloudinary.com/documentation/image_upload_api_reference#required_parameters
FileManager.propTypes = {
  description: PropTypes.string.isRequired,
  fileParams: PropTypes.shape({
    public_id: PropTypes.string,
    filename: PropTypes.string,
    folder: PropTypes.string,
    resource_type: PropTypes.oneOf(['image', 'raw', 'video', 'auto']),
    tags: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.oneOf(['upload', 'private', 'authenticated']),
    access_mode: PropTypes.oneOf(['public', 'authenticated']),
  }).isRequired,
  fileRemovedFromServer: PropTypes.func.isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      type: PropTypes.string,
      url: PropTypes.string,
    })
  ).isRequired,
  maxFilesAllowed: PropTypes.number.isRequired,
  recieveFile: PropTypes.func.isRequired,
  refetchQueries: PropTypes.any,
  title: PropTypes.string.isRequired,
  updateCacheOnRemovedFile: PropTypes.func.isRequired,
};
export default FileManager;

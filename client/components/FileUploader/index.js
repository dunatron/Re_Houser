import { uuid } from 'uuidv4';
import ReactCardFlip from 'react-card-flip';
import React, {
  useState,
  useReducer,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from 'react';
import { useMutation, gql, useApolloClient } from '@apollo/client';
import clsx from 'clsx';
import {
  Paper,
  Button,
  IconButton,
  CircularProgress,
  Typography,
} from '@material-ui/core';

import { toast } from 'react-toastify';

import Dropzone from './Dropzone';
import FileActions from './FileActions';
import FilePreviewer from './FilePreviewer';
import UploadFileButton from './UploadFileButton';
// import './index.css';
import Progress from './Progress';
import Error from '../ErrorMessage';
import errorAlert from '../../lib/errorAlert';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import useUploadStyles from './UploadStyles';
import UploadIcon from '@material-ui/icons/CloudUploadOutlined';
import TrashIcon from '@material-ui/icons/DeleteOutlined';
import DeleteForeverIcon from '@material-ui/icons/DeleteForeverOutlined';
import ViewIcon from '@material-ui/icons/VisibilityOutlined';
import CheckIcon from '@material-ui/icons/Check';
import FlipToBackIcon from '@material-ui/icons/FlipToBackOutlined';
import FlipToFrontIcon from '@material-ui/icons/FlipToFrontOutlined';
import { SINGLE_RENTAL_APPLICATION_QUERY } from '../../graphql/queries/index';
import { FileInfoFragment } from '../../graphql/fragments/fileInfo';

// https://www.apollographql.com/blog/graphql-file-uploads-with-react-hooks-typescript-amazon-s3-tutorial-ef39d21066a2
// maybe try for progress https://github.com/jaydenseric/apollo-upload-client/issues/88
// TGHIS LOOKS GOOD => https://medium.com/@enespalaz/file-upload-with-graphql-9a4927775ef7
const SINGLE_UPLOAD = gql`
  mutation($file: Upload!) {
    singleUpload(file: $file) {
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

const UPLOAD_FILES_MUTATION = gql`
  mutation($files: [Upload!]!) {
    uploadFiles(files: $files) {
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
// type: 'ADD_TODO',

const reducer = (state, action) => {
  switch (action.type) {
    // Note put the min into here
    case 'ADD_FILES':
      // combine the state
      return {
        ...state,
        files: [
          ...state.files,

          // ...action.payload.files,
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
        files: state.files.map(f =>
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
    flip,
    removeFile,
    serverFiles,
    remove,
    store,
    dispatch,
    isRemoving,
  } = props;
  const maxFilesAllowed = props.maxFilesAllowed ? props.maxFilesAllowed : 10;
  const client = useApolloClient();
  const multiple = true;
  const classes = useUploadStyles();
  // const [store, dispatch] = useReducer(reducer, {
  //   files: [],
  //   errors: [],
  //   recentlyUploaded: [],
  //   uploadedCount: 0,
  // });
  const { files, errors, recentlyUploaded, uploadedCount, removingIds } = store;

  // serverFiles Length + files length
  const totalFileCount = files.length + serverFiles.length;

  // when server files chnages we need to remove the from the files state

  useImperativeHandle(ref, () => ({
    getAlert() {
      alert('getAlert from Child');
    },
  }));

  const clientFilenames = files.map(f => f.raw.name);

  const clientFileIds = files.map(f => f.id);

  const isLoadingAFile = files.some(f => f.loading === true);

  const hasFilesToUpload =
    files.filter(f => f.uploadCompleted === false).length >= 1 ? true : false;

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

  const uploadSingleFile = idx => {
    const singleFileAtIndex = files[idx];
    handleFileUpload(singleFileAtIndex, idx);
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

  //serverFiles

  const serverIds = serverFiles.map(f => f.id);

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
                    // deleteForever={handleDeleteForever}
                    deleteForever={remove}
                  />
                  <span className={classes.filename}>{f.raw.name}</span>{' '}
                  {/* <Error key={idx} error={f.error} /> */}
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
          <Typography variant="subtitle1">Recently Uploaded</Typography>
          <Typography variant="body2">
            These files will be connected when you upload the form
          </Typography>
          {/* serverFile */}
          {/* Recently Added */}
          {files
            .filter(f => f.uploadCompleted)
            .map((f, i) => {
              const { serverFile } = f;
              if (!serverFile) return null;
              return (
                <div
                  style={{
                    width: '100%',
                  }}>
                  Uploaded: {serverFile.filename}
                </div>
              );
            })}
          <FilePreviewer
            files={recentlyUploadedWithoutAttached}
            remove={remove}
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
            isRemoving={isRemoving}
            removingIds={removingIds}
          />
        </div>
      )}
    </Paper>
  );
});

const FlipCardHeader = ({ title, isFlipped, flip }) => {
  const classes = useUploadStyles();
  return (
    <div className={classes.flipHeader}>
      <IconButton onClick={flip}>
        {isFlipped ? <FlipToBackIcon /> : <FlipToFrontIcon />}
      </IconButton>
      <Typography>{title}</Typography>
    </div>
  );
};

const UploadedServerFiles = ({
  serverFiles,
  flip,
  remove,
  store,
  isRemoving,
}) => {
  const { files, errors, recentlyUploaded, uploadedCount, removingIds } = store;
  const classes = useUploadStyles();

  const paperClasses = clsx({
    [classes.flipCard]: true,
  });
  return (
    <Paper className={paperClasses}>
      <FilePreviewer
        files={serverFiles}
        remove={remove}
        removingIds={removingIds}
        isRemoving={isRemoving}
      />
    </Paper>
  );
};

//remove gets fed into here
const FileManager = props => {
  const client = useApolloClient();
  const {
    title,
    description,
    files,
    maxFilesAllowed,
    recieveFile,
    removeFile,
    fileRemovedFromServer,
    refetchQueries,
    updateCacheOnRemovedFile,
  } = props;

  const [state, setState] = useState({
    isFlipped: props.files.length > 0 ? false : true,
    initialFiles: files,
  });

  useEffect(() => {
    setState({
      ...state,
      isFlipped: props.files.length > 0 ? state.isFlipped : true,
      initialFiles: files,
    });
  }, [files]);

  const [store, dispatch] = useReducer(reducer, {
    files: [],
    errors: [],
    recentlyUploaded: [],
    uploadedCount: 0,
    removingIds: [],
  });
  // const { files, errors, recentlyUploaded, uploadedCount } = store;
  const classes = useUploadStyles();

  const handleFileSuccessfullyRemovedFromServer = data => {
    // console.log('Here is the data removed from server => ', data);
    // console.log('client=> ', client);
    // client.cache.data.delete(data.deleteFile.id);

    // Object.keys(client.cache.data).forEach(
    //   key => key.match(/^File/) && client.cache.data.delete(key)
    // );

    // client.cache.gc();
    // This still only handle it for the component. e.g removing the photoIdentification doesnt update t in account if you do it from the stepper
    // need to find it from initialFiles and removit
    // cache.data.delete(key)
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
    // props.removeFile(res.data.deleteFile);
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

  return (
    <>
      <FlipCardHeader
        title={title}
        isFlipped={state.isFlipped}
        flip={handleFlip}
      />
      <Error error={error} />
      <ReactCardFlip
        cardZIndex="900"
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
        />
      </ReactCardFlip>
    </>
  );
};

export default FileManager;

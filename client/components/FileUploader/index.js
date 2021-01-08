import { uuid } from 'uuidv4';
import ReactCardFlip from 'react-card-flip';
import PropTypes from 'prop-types';
import React, { useState, useReducer, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';

import { useTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { toast } from 'react-toastify';

import FilePreviewer from './FilePreviewer';

import Modal from '@/Components/Modal';
import Error from '@/Components/ErrorMessage';

import UploadFile from './UploadFile';
import UploadedServerFiles from './UploadedServerFiles';

//component pieces
import FlipCardHeader from './FlipCardHeader';

// https://www.apollographql.com/blog/graphql-file-uploads-with-react-hooks-typescript-amazon-s3-tutorial-ef39d21066a2
// maybe try for progress https://github.com/jaydenseric/apollo-upload-client/issues/88
// TGHIS LOOKS GOOD => https://medium.com/@enespalaz/file-upload-with-graphql-9a4927775ef7

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
    isViewModalOpen: false,
  });

  const _hasFile = () => {
    if (state.initialFiles.length >= 1) return true;
    if (store.recentlyUploaded.length >= 1) return true;
    return false;
  };

  // const hasServerFile = files.length >= 1;
  const hasServerFile = state.initialFiles.length >= 1 ? true : false;

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

  /**
   * if not open we need to open it when they flip the thing
   */
  const handleFlip = () =>
    setState({
      ...state,
      expanded: true,
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

  const handleOpenViewModal = () =>
    setState({
      ...state,
      isViewModalOpen: true,
    });

  const handleCloseViewModal = () =>
    setState({
      ...state,
      isViewModalOpen: false,
    });

  return (
    <>
      <FlipCardHeader
        title={title}
        isFlipped={state.isFlipped}
        hasFile={hasFile}
        hasServerFile={hasServerFile}
        flip={handleFlip}
        expand={handleExpand}
        expanded={state.expanded}
        viewFiles={handleOpenViewModal}
      />
      <Error error={error} />
      {/* View Files Modale */}
      <Modal open={state.isViewModalOpen} close={handleCloseViewModal}>
        <FilePreviewer files={files} disableActions />
      </Modal>
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
            title={title}
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

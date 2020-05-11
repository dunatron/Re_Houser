import React, { useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Paper, Button, IconButton, CircularProgress } from '@material-ui/core';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import { green } from '@material-ui/core/colors';

import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    // margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    // top: -6,
    // left: -6,
    // zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

import UploadIcon from '@material-ui/icons/CloudUploadOutlined';

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

const UploadFileButton = props => {
  // if (props.loading) return 'loading...';
  const { uploadCompleted } = props;
  const classes = useStyles();
  const buttonClassname = clsx({
    [classes.buttonSuccess]: uploadCompleted,
  });
  return (
    <div className={classes.wrapper}>
      <IconButton
        size="medium"
        className={buttonClassname}
        disabled={props.loading}
        onClick={props.handleClick}
        color="default"
        aria-label="upload picture"
        component="span">
        {uploadCompleted ? (
          <CheckIcon size="small" />
        ) : (
          <UploadIcon size="small" />
        )}
        {props.loading && (
          // <CircularProgress size={32} className={classes.fabProgress} />
          <CircularProgress size={47} className={classes.fabProgress} />
        )}
      </IconButton>
    </div>
  );
};

export default UploadFileButton;

// import React, { useEffect } from 'react';
// import { useMutation, gql } from '@apollo/client';
// import { Paper, Button, IconButton, CircularProgress } from '@material-ui/core';

// import UploadIcon from '@material-ui/icons/CloudUploadOutlined';

// const SINGLE_UPLOAD = gql`
//   mutation($file: Upload!) {
//     singleUpload(file: $file) {
//       id
//       filename
//       mimetype
//       encoding
//       url
//     }
//   }
// `;

// const UploadFileButton = props => {
//   const { file, onCompleted, onError, handleIsLoading } = props;

//   const uploadSingleFile = () => {
//     // handleStart();
//     mutate({
//       variables: { file: file.raw, data: {} },
//     });
//   };

//   const [mutate, { loading, error }] = useMutation(SINGLE_UPLOAD, {
//     onCompleted: onCompleted,
//     onError: onError,
//     context: {
//       fetchOptions: {
//         useUpload: true,
//         onProgress: ev => {
//           console.log('Here evloaded => ', ev.loaded);
//           console.log('Here total => ', ev.total);
//           // setProgress(ev.loaded / ev.total);
//         },
//         onAbortPossible: abortHandler => {
//           // abort = abortHandler;
//           console.log('On abort possible => ', abortHandler);
//         },
//       },
//     },
//   });

//   useEffect(() => {
//     handleIsLoading(loading);
//     return () => {
//       //   cleanup;
//     };
//   }, [loading]);

//   if (loading || props.loading) return 'Loading';

//   return (
//     <IconButton
//       size="small"
//       onClick={uploadSingleFile}
//       color="primary"
//       aria-label="upload picture"
//       component="span">
//       <UploadIcon size="small" />
//     </IconButton>
//   );
// };

// export default UploadFileButton;

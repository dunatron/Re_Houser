import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Paper } from '@material-ui/core';

import FilePreviewer from './FilePreviewer';

import useUploadStyles from './UploadStyles';

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

export default UploadedServerFiles;

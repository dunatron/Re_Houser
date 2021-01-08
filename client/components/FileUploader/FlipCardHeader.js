import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  Paper,
  ButtonGroup,
  Button,
  IconButton,
  Box,
  Typography,
  Tooltip,
} from '@material-ui/core';

import useUploadStyles from './UploadStyles';
//icons
import FlipToBackIcon from '@material-ui/icons/FlipToBackOutlined';
import FlipToFrontIcon from '@material-ui/icons/FlipToFrontOutlined';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import MinimizeIcon from '@material-ui/icons/Minimize';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HelpIcon from '@material-ui/icons/Help';

const FlipCardHeader = ({
  title,
  isFlipped,
  flip,
  expanded,
  expand,
  hasFile,
  hasServerFile,
  viewFiles,
}) => {
  const classes = useUploadStyles();
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const toggleViewModal = () => setViewModalOpen(!viewModalOpen);
  const closeViewModal = () => setViewModalOpen(false);
  return (
    <div className={classes.flipHeader}>
      {hasServerFile && (
        <Tooltip title={`We have a file for ${title} on the server`}>
          <DoneIcon color="primary" className={classes.hasServerIcon} />
        </Tooltip>
      )}
      {!hasServerFile && hasFile && (
        <Tooltip
          title={`Files are staged on the server for ${title} and will be attached when you upload the form`}>
          <HelpIcon color="primary" className={classes.hasServerIcon} />
        </Tooltip>
      )}
      {!hasServerFile && !hasFile && (
        <Tooltip title={`No File on the server for ${title}`}>
          <CloseIcon color="primary" className={classes.hasServerIcon} />
        </Tooltip>
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
          {expanded ? 'Close' : `Add ${hasServerFile && '/ remove'}`}
        </Button>
        {hasServerFile && (
          <Button
            startIcon={isFlipped ? <FlipToBackIcon /> : <FlipToFrontIcon />}
            onClick={viewFiles}>
            View
          </Button>
        )}
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

export default FlipCardHeader;
